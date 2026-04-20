"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getStudentLogbook() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const entries = await prisma.logbookEntry.findMany({
      where: { studentId: session.user.id },
      orderBy: { date: 'desc' }
    });

    const totalApprovedHours = entries
      .filter(e => e.status === 'APPROVED')
      .reduce((acc, curr) => acc + curr.hours, 0);

    return {
      success: true,
      data: {
        entries,
        totalApprovedHours
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
    await prisma.logbookEntry.create({
      data: {
        studentId: session.user.id,
        date: new Date(data.date),
        hours: data.hours,
        tasks: data.tasks,
        status: 'PENDING'
      }
    });

    revalidatePath("/student/logbook");
    revalidatePath("/student/dashboard");
    revalidatePath("/employer/logbooks");
    
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}
