"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getEmployerStudentsLogs() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const employer = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { 
        company: {
          include: {
            postings: {
              include: {
                applications: {
                  where: { status: 'ACCEPTED' },
                  include: {
                    student: {
                      include: {
                        logbookEntries: {
                          orderBy: { date: 'desc' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!employer?.company) return { success: false, error: "No associated company" };

    const trainees = employer.company.postings.flatMap(p => 
      p.applications.map(app => ({
        id: app.id,
        studentId: app.student.id,
        studentName: app.student.name,
        studentEmail: app.student.email,
        logs: app.student.logbookEntries
      }))
    );

    return { success: true, data: trainees };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function updateLogStatus(entryId: string, status: 'APPROVED' | 'REJECTED', feedback?: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    await prisma.logbookEntry.update({
      where: { id: entryId },
      data: { status, feedback }
    });

    revalidatePath("/employer/logbooks");
    revalidatePath("/student/logbook");
    revalidatePath("/student/dashboard");
    
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update logbook status";
    return { success: false, error: message };
  }
}
