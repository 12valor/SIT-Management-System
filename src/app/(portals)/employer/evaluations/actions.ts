"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { pushNotification } from "@/lib/notifications";
import { requireEmployer } from "@/lib/auth-guards";

export async function getEmployerTrainees() {
  const currentEmployer = await requireEmployer();

  try {
    const employer = await prisma.user.findUnique({
      where: { id: currentEmployer.id },
      include: { company: true }
    });

    if (!employer?.companyId) return { success: false, error: "Employer has no associated company" };

    // Get applications accepted by this employer's company
    const trainees = await prisma.application.findMany({
      where: {
        posting: { companyId: employer.companyId },
        status: 'ACCEPTED'
      },
      include: {
        student: {
          include: {
            logbookEntries: {
              where: { status: 'APPROVED' }
            },
            evaluations: true
          }
        }
      }
    });

    return {
      success: true,
      data: trainees.map(t => ({
        id: t.id,
        studentId: t.student.id,
        studentName: t.student.name,
        studentEmail: t.student.email,
        totalHours: t.student.logbookEntries.reduce((acc, curr) => acc + curr.hours, 0),
        evaluation: t.student.evaluations[0] || null,
        companyName: employer.company?.name
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

    const acceptedPlacement = await prisma.application.findFirst({
      where: {
        studentId: data.studentId,
        status: "ACCEPTED",
        posting: { companyId: employer.companyId },
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
        companyName: acceptedPlacement.posting.company.name,
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
