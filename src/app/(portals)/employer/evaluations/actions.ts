"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { pushNotification } from "@/lib/notifications";
import { requireEmployer } from "@/lib/auth-guards";

export async function getEmployerTrainees() {
  const currentEmployer = await requireEmployer();

  try {
    const acceptedApplications = await prisma.application.findMany({
      where: {
        status: "ACCEPTED",
        placement: null,
        posting: { companyId: currentEmployer.companyId },
      },
      select: {
        id: true,
        studentId: true,
        postingId: true,
        posting: { select: { companyId: true } },
      },
    });

    for (const application of acceptedApplications) {
      await prisma.sITPlacement.create({
        data: {
          applicationId: application.id,
          studentId: application.studentId,
          postingId: application.postingId,
          companyId: application.posting.companyId,
        },
      });
    }

    const placements = await prisma.sITPlacement.findMany({
      where: {
        companyId: currentEmployer.companyId,
        status: "ACTIVE",
      },
      include: {
        posting: { include: { company: true } },
        student: {
          include: {
            logbookEntries: {
              where: { status: 'APPROVED' }
            },
            evaluations: {
              orderBy: { submittedAt: "desc" },
            }
          }
        }
      }
    });

    return {
      success: true,
      data: placements.map((placement) => ({
        id: placement.id,
        studentId: placement.student.id,
        studentName: placement.student.name,
        studentEmail: placement.student.email,
        totalHours: placement.student.logbookEntries
          .filter((entry) => !entry.placementId || entry.placementId === placement.id)
          .reduce((acc, curr) => acc + curr.hours, 0),
        requiredHours: placement.posting.requiredHours,
        evaluation: placement.student.evaluations.find((item) => item.placementId === placement.id) || null,
        companyName: placement.posting.company.name
      }))
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function submitTraineeEvaluation(data: {
  studentId: string;
  technicalSkills: number;
  professionalism: number;
  punctuality: number;
  qualityOfWork: number;
  comments: string;
  recommendForHire: boolean;
}) {
  const employer = await requireEmployer();

  try {
    const scores = [
      data.technicalSkills,
      data.professionalism,
      data.punctuality,
      data.qualityOfWork,
    ];

    if (scores.some((score) => !Number.isInteger(score) || score < 1 || score > 5)) {
      return { success: false, error: "Evaluation scores must be between 1 and 5." };
    }

    if (!data.comments?.trim()) {
      return { success: false, error: "Evaluation comments are required." };
    }

    const acceptedPlacement = await prisma.sITPlacement.findFirst({
      where: {
        studentId: data.studentId,
        status: "ACTIVE",
        companyId: employer.companyId,
      },
      include: {
        posting: {
          include: { company: true },
        },
      },
    });

    if (!acceptedPlacement) {
      return { success: false, error: "Student is not assigned to your company." };
    }

    const existingEvaluation = await prisma.sITEvaluation.findFirst({
      where: {
        studentId: data.studentId,
        OR: [
          { placementId: acceptedPlacement.id },
          { companyName: acceptedPlacement.posting.company.name },
        ],
      },
      select: { id: true },
    });

    if (existingEvaluation) {
      return { success: false, error: "This trainee already has a final evaluation from your company." };
    }

    const overallGrade = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    const evaluation = await prisma.sITEvaluation.create({
      data: {
        studentId: data.studentId,
        placementId: acceptedPlacement.id,
        supervisorName: employer.name || "Supervisor",
        companyName: acceptedPlacement.posting.company.name,
        technicalSkills: data.technicalSkills,
        professionalism: data.professionalism,
        punctuality: data.punctuality,
        qualityOfWork: data.qualityOfWork,
        overallGrade,
        comments: data.comments,
        recommendForHire: data.recommendForHire,
      }
    });

    // Notify Student
    await pushNotification({
      userId: data.studentId,
      title: "Performance Evaluation Submitted",
      message: `${evaluation.companyName} has submitted your final SIT assessment. You can now view your grade.`,
      type: 'EVALUATION',
      link: '/student/completion'
    });

    revalidatePath("/employer/evaluations");
    revalidatePath("/student/completion");
    revalidatePath("/coordinator/dashboard");
    
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit evaluation";
    return { success: false, error: message };
  }
}
