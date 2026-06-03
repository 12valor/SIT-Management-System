"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { pushNotification } from "@/lib/notifications";
import { requireEmployer } from "@/lib/auth-guards";

export async function getEmployerApplicants() {
  const employer = await requireEmployer();

  try {
    // Get all applications for this company's postings
    const applications = await prisma.application.findMany({
      where: {
        posting: { companyId: employer.companyId },
        status: { not: 'WITHDRAWN' }
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
  const employer = await requireEmployer();

  try {
    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return { success: false, error: "Invalid application status." };
    }

    const allowedApplication = await prisma.application.findFirst({
      where: {
        id,
        posting: { companyId: employer.companyId },
      },
      select: { id: true },
    });

    if (!allowedApplication) {
      return { success: false, error: "Application not found or access denied" };
    }

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

export async function getStudentCredentials(studentId: string, applicationId: string) {
  const employer = await requireEmployer();

  try {
    // Security check: Verify the student actually applied to a posting from this company
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        studentId: studentId,
        posting: { companyId: employer.companyId }
      }
    });

    if (!application) return { success: false, error: "Credential record not found or access denied" };

    const student = await prisma.user.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        email: true,
        course: true,
        image: true,
        createdAt: true,
        documents: {
          orderBy: { uploadedAt: 'desc' }
        },
        evaluations: {
          orderBy: { submittedAt: 'desc' },
          take: 5
        }
      }
    });

    if (!student) return { success: false, error: "Student profile not found" };

    return { success: true, data: student };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch credentials";
    return { success: false, error: message };
  }
}
