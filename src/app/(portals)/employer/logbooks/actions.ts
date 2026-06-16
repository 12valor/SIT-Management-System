"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { pushNotification } from "@/lib/notifications";
import { requireEmployer } from "@/lib/auth-guards";

export async function getEmployerStudentsLogs() {
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
        student: {
          include: {
            logbookEntries: {
              orderBy: { date: "desc" },
            },
          },
        },
      },
      orderBy: { startedAt: "desc" },
    });

    const trainees = placements.map((placement) => ({
      id: placement.id,
      studentId: placement.student.id,
      studentName: placement.student.name,
      studentEmail: placement.student.email,
      logs: placement.student.logbookEntries.filter(
        (entry) => !entry.placementId || entry.placementId === placement.id
      ),
    }));

    return { success: true, data: trainees };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function updateLogStatus(entryId: string, status: 'APPROVED' | 'REJECTED', feedback?: string) {
  const employer = await requireEmployer();

  try {
    if (!["APPROVED", "REJECTED"].includes(status)) {
      return { success: false, error: "Invalid logbook status." };
    }

    const allowedEntry = await prisma.logbookEntry.findFirst({
      where: {
        id: entryId,
        OR: [
          {
            placement: {
              companyId: employer.companyId,
              status: "ACTIVE",
            },
          },
          {
            placementId: null,
            student: {
              placements: {
                some: {
                  companyId: employer.companyId,
                  status: "ACTIVE",
                },
              },
            },
          },
        ],
      },
      select: { id: true, placementId: true, studentId: true },
    });

    if (!allowedEntry) {
      return { success: false, error: "Logbook entry not found or access denied" };
    }

    const activePlacement = allowedEntry.placementId
      ? null
      : await prisma.sITPlacement.findFirst({
          where: {
            studentId: allowedEntry.studentId,
            companyId: employer.companyId,
            status: "ACTIVE",
          },
          select: { id: true },
        });

    const entry = await prisma.logbookEntry.update({
      where: { id: entryId },
      data: { status, feedback, placementId: allowedEntry.placementId || activePlacement?.id },
      include: { student: true }
    });

    // Notify Student
    if (entry.studentId) {
      const title = status === 'APPROVED' ? "Logbook Entry Approved" : "Logbook Entry Rejected";
      const message = status === 'APPROVED' 
        ? `Your logbook entry for ${entry.date.toLocaleDateString()} has been verified.` 
        : `Your entry for ${entry.date.toLocaleDateString()} requires revision. Feedback: ${feedback || 'No feedback provided.'}`;

      await pushNotification({
        userId: entry.studentId,
        title,
        message,
        type: 'LOGBOOK',
        link: '/student/logbook'
      });
    }

    revalidatePath("/employer/logbooks");
    revalidatePath("/student/logbook");
    revalidatePath("/student/dashboard");
    
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update logbook status";
    return { success: false, error: message };
  }
}
