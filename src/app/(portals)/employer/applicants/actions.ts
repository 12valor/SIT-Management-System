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
      include: {
        student: true,
        posting: true,
      },
    });

    if (!allowedApplication) {
      return { success: false, error: "Application not found or access denied" };
    }

    if (status === "ACCEPTED") {
      const activePlacement = await prisma.sITPlacement.findFirst({
        where: {
          studentId: allowedApplication.studentId,
          status: "ACTIVE",
          applicationId: { not: id },
        },
        include: { company: true },
      });

      if (activePlacement) {
        return {
          success: false,
          error: `This student already has an active placement with ${activePlacement.company.name}.`,
        };
      }

      const otherAccepted = await prisma.application.findFirst({
        where: {
          studentId: allowedApplication.studentId,
          status: "ACCEPTED",
          id: { not: id },
        },
      });

      if (otherAccepted) {
        return { success: false, error: "This student already has an accepted placement." };
      }
    }

    const application = await prisma.$transaction(async (tx) => {
      const updated = await tx.application.update({
        where: { id },
        data: { status },
        include: {
          student: true,
          posting: true,
        },
      });

      if (status === "ACCEPTED") {
        await tx.sITPlacement.upsert({
          where: { applicationId: id },
          update: {
            status: "ACTIVE",
            endedAt: null,
            studentId: updated.studentId,
            postingId: updated.postingId,
            companyId: updated.posting.companyId,
          },
          create: {
            applicationId: id,
            studentId: updated.studentId,
            postingId: updated.postingId,
            companyId: updated.posting.companyId,
          },
        });

        await tx.application.updateMany({
          where: {
            studentId: updated.studentId,
            id: { not: id },
            status: "PENDING",
          },
          data: { status: "REJECTED" },
        });
      }

      return updated;
    });

    // Notify Student
    if (application.studentId) {
      const title = status === 'ACCEPTED' ? "Application Accepted!" : "Application Rejected";
      const message = status === 'ACCEPTED'
        ? `Congratulations! Your application for ${application.posting.title} has been accepted. Welcome to the team.`
        : `Your application for ${application.posting.title} has been rejected. We appreciate your interest and wish you the best.`;

      await pushNotification({
        userId: application.studentId,
        title,
        message,
        type: 'APPLICATION',
        link: '/student/opportunities'
      });
    }

    revalidatePath("/employer/applicants");
    revalidatePath("/employer/logbooks");
    revalidatePath("/employer/evaluations");
    revalidatePath("/student/opportunities");
    revalidatePath("/student/dashboard");
    revalidatePath("/student/logbook");
    
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
          select: {
            id: true,
            name: true,
            type: true,
            uploadedAt: true,
          },
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

export async function getStudentCredentialDocumentUrl(
  studentId: string,
  applicationId: string,
  documentId: string
) {
  const employer = await requireEmployer();

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      studentId,
      posting: { companyId: employer.companyId },
    },
    select: { id: true },
  });

  if (!application) {
    return { success: false, error: "Credential record not found or access denied" };
  }

  const document = await prisma.sITDocument.findFirst({
    where: { id: documentId, studentId },
    select: { url: true },
  });

  if (!document?.url) {
    return { success: false, error: "Document file not found." };
  }

  return { success: true, url: document.url };
}
