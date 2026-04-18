"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getEmployerTrainees() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const employer = await prisma.user.findUnique({
      where: { id: session.user.id },
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
  } catch (error: any) {
    return { success: false, error: error.message };
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
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const employer = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { company: true }
    });

    const overallGrade = (data.technicalSkills + data.professionalism + data.punctuality + data.qualityOfWork) / 4;

    await prisma.sITEvaluation.create({
      data: {
        studentId: data.studentId,
        supervisorName: session.user.name || "Supervisor",
        companyName: employer?.company?.name || "Partner Company",
        technicalSkills: data.technicalSkills,
        professionalism: data.professionalism,
        punctuality: data.punctuality,
        qualityOfWork: data.qualityOfWork,
        overallGrade,
        comments: data.comments,
        recommendForHire: data.recommendForHire,
      }
    });

    revalidatePath("/employer/evaluations");
    revalidatePath("/coordinator/dashboard");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
