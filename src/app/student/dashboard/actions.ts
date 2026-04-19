"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getStudentDashboardData() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const student = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        applications: {
          include: {
            posting: {
              include: {
                company: true
              }
            }
          },
          orderBy: { appliedAt: 'desc' }
        },
        logbookEntries: true
      }
    });

    if (!student) return { success: false, error: "Student record not found" };

    const totalHours = student.logbookEntries
      .filter(e => e.status === 'APPROVED')
      .reduce((acc, curr) => acc + curr.hours, 0);

    const acceptedApp = student.applications.find(a => a.status === 'ACCEPTED');

    return {
      success: true,
      data: {
        totalHours,
        totalLogs: student.logbookEntries.length,
        approvedLogs: student.logbookEntries.filter(e => e.status === 'APPROVED').length,
        applications: student.applications.map(app => ({
          id: app.id,
          status: app.status,
          appliedAt: app.appliedAt.toISOString(),
          postingTitle: app.posting.title,
          companyName: app.posting.company.name,
        })),
        hiredPlacement: acceptedApp ? {
          title: acceptedApp.posting.title,
          company: acceptedApp.posting.company.name,
          location: acceptedApp.posting.location
        } : null
      }
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}
