"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireStudent } from "@/lib/auth-guards";
import { getOrCreateActivePlacement } from "@/lib/placements";

export async function getStudentDashboardData() {
  const studentUser = await requireStudent();

  try {
    const student = await prisma.user.findUnique({
      where: { id: studentUser.id },
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
        logbookEntries: true,
        documents: true
      }
    });

    if (!student) return { success: false, error: "Student record not found" };

    const totalHours = student.logbookEntries
      .filter(e => e.status === 'APPROVED')
      .reduce((acc, curr) => acc + curr.hours, 0);

    const activePlacement = await getOrCreateActivePlacement(student.id);

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
        hiredPlacement: activePlacement ? {
          title: activePlacement.posting.title,
          company: activePlacement.posting.company.name,
          location: activePlacement.posting.location
        } : null,
        documents: student.documents.map(doc => ({
          name: doc.name,
          url: doc.url,
          status: doc.status,
        }))
      }
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function withdrawApplication(applicationId: string) {
  const student = await requireStudent();

  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return { success: false, error: "Application not found" };
    }

    if (application.studentId !== student.id) {
      return { success: false, error: "Unauthorized" };
    }

    if (application.status !== "PENDING") {
      return { success: false, error: "Only pending applications can be withdrawn" };
    }

    await prisma.application.update({
      where: { id: applicationId },
      data: { status: "WITHDRAWN" },
    });

    revalidatePath("/student/dashboard");
    revalidatePath("/student/opportunities");
    
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to withdraw application";
    return { success: false, error: message };
  }
}
