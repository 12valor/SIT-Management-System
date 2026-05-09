"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { pushNotification } from "@/lib/actions/notifications";

export async function getStudentLogbook() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const entries = await prisma.logbookEntry.findMany({
      where: { studentId: session.user.id },
      orderBy: { date: 'desc' }
    });

    const placement = await prisma.application.findFirst({
      where: { 
        studentId: session.user.id,
        status: 'ACCEPTED'
      }
    });

    return {
      success: true,
      data: {
        entries,
        totalApprovedHours,
        hasPlacement: !!placement
      }
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function submitLogbookEntry(data: {
  date: string;
  hours: number;
  tasks: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    // Find the associated employer to notify
    const placement = await prisma.application.findFirst({
      where: { 
        studentId: session.user.id,
        status: 'ACCEPTED'
      },
      include: {
        posting: true
      }
    });

    if (!placement) {
      return { success: false, error: "No active industrial placement detected. Logbook entries require an active assignment." };
    }

    await prisma.logbookEntry.create({
      data: {
        studentId: session.user.id,
        date: new Date(data.date),
        hours: data.hours,
        tasks: data.tasks,
        status: 'PENDING'
      }
    });

    // Notify Employer
    if (placement.posting.employerId) {
      await pushNotification({
        userId: placement.posting.employerId,
        title: "Industrial Logbook Submission",
        message: `${session.user.name || 'A trainee'} has submitted a new logbook entry for verification.`,
        type: 'LOGBOOK',
        link: '/employer/logbooks'
      });
    }

    revalidatePath("/student/logbook");
    revalidatePath("/student/dashboard");
    revalidatePath("/employer/logbooks");
    
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}
