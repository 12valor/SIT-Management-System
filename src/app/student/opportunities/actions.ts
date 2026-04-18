"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getSITOpportunities() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const postings = await prisma.sITPosting.findMany({
      where: {
        applications: {
          none: {
            studentId: session.user.id,
            status: 'ACCEPTED'
          }
        }
      },
      include: {
        company: true,
        applications: {
          where: { studentId: session.user.id }
        }
      },
      orderBy: { postedAt: 'desc' }
    });

    return { success: true, data: postings };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function applyForOpportunity(postingId: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    // Check if already applied
    const existing = await prisma.application.findFirst({
      where: {
        postingId,
        studentId: session.user.id
      }
    });

    if (existing) return { success: false, error: "Application already exists" };

    await prisma.application.create({
      data: {
        postingId,
        studentId: session.user.id,
        status: 'PENDING'
      }
    });

    revalidatePath("/student/opportunities");
    revalidatePath("/student/dashboard");
    revalidatePath("/employer/applicants");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
