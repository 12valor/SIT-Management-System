"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { pushNotification } from "@/lib/notifications";
import { requireStudent } from "@/lib/auth-guards";
import { getOrCreateActivePlacement } from "@/lib/placements";

export async function getStudentLogbook() {
  const student = await requireStudent();

  try {
    const entries = await prisma.logbookEntry.findMany({
      where: { studentId: student.id },
      orderBy: { date: 'desc' }
    });

    const totalApprovedHours = entries
      .filter(e => e.status === 'APPROVED')
      .reduce((acc, curr) => acc + curr.hours, 0);

    const placement = await getOrCreateActivePlacement(student.id);

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
  const student = await requireStudent();

  try {
    if (!Number.isFinite(data.hours) || data.hours <= 0 || data.hours > 24) {
      return { success: false, error: "Hours must be greater than 0 and no more than 24." };
    }

    // Find the associated employer to notify
    const placement = await getOrCreateActivePlacement(student.id);

    if (!placement) {
      return { success: false, error: "No active industrial placement detected. Logbook entries require an active assignment." };
    }

    const entryDate = new Date(data.date);
    if (Number.isNaN(entryDate.getTime())) {
      return { success: false, error: "Invalid logbook date." };
    }

    const startOfDay = new Date(entryDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(entryDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingEntries = await prisma.logbookEntry.findMany({
      where: {
        studentId: student.id,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const totalHoursToday = existingEntries.reduce((sum, entry) => sum + entry.hours, 0);

    if (totalHoursToday + data.hours > 24) {
      return {
        success: false,
        error: `Daily limit exceeded. You have already logged ${totalHoursToday} hours for this date. The total cannot exceed 24 hours.`,
      };
    }

    await prisma.logbookEntry.create({
      data: {
        studentId: student.id,
        date: entryDate,
        hours: data.hours,
        tasks: data.tasks,
        placementId: placement.id,
        status: 'PENDING'
      }
    });

    // Notify Employer
    if (placement.posting.employerId) {
      await pushNotification({
        userId: placement.posting.employerId,
        title: "Industrial Logbook Submission",
        message: `${student.name || 'A trainee'} has submitted a new logbook entry for verification.`,
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
