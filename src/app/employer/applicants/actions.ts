"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { pushNotification } from "@/lib/actions/notifications";

export async function getEmployerApplicants() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const employer = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { company: true }
    });

    if (!employer?.companyId) return { success: false, error: "Employer has no associated company" };

    // Get all applications for this company's postings
    const applications = await prisma.application.findMany({
      where: {
        posting: { companyId: employer.companyId }
      },
      include: {
        student: true,
        posting: true
      },
      orderBy: { appliedAt: 'desc' }
    });

    return { success: true, data: applications };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function updateApplicationStatus(id: string, status: 'ACCEPTED' | 'REJECTED') {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const application = await prisma.application.update({
      where: { id },
      data: { status },
      include: { 
        student: true,
        posting: true
      }
    });

    // Notify Student
    if (application.studentId) {
      const title = status === 'ACCEPTED' ? "SIT Placement Accepted!" : "Status Update: SIT Application";
      const message = status === 'ACCEPTED'
        ? `Congratulations! ${application.posting.title} application has been accepted. Welcome to the team.`
        : `Thank you for your interest in the ${application.posting.title} position. Regrettably, we are going with other candidates at this time.`;

      await pushNotification({
        userId: application.studentId,
        title,
        message,
        type: 'APPLICATION',
        link: '/student/opportunities'
      });
    }

    revalidatePath("/employer/applicants");
    revalidatePath("/student/opportunities");
    revalidatePath("/student/dashboard");
    
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update application status";
    return { success: false, error: message };
  }
}
