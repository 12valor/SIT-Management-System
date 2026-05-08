"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { pushNotification } from "@/lib/actions/notifications";

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

    return { 
      success: true, 
      data: postings.map(p => ({
        ...p,
        requirements: p.requirements || [],
        responsibilities: p.responsibilities || [],
        tags: p.tags || []
      }))
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function applyForOpportunity(postingId: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
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

    const posting = await prisma.sITPosting.findUnique({
      where: { id: postingId },
      include: {
        company: {
          include: { employers: { select: { id: true } } }
        }
      }
    });

    if (posting?.company?.employers) {
      const studentName = session.user.name || "A student";
      for (const employer of posting.company.employers) {
        await pushNotification({
          userId: employer.id,
          title: "New SIT Applicant",
          message: `${studentName} has applied for the ${posting.title} position.`,
          type: 'APPLICATION',
          link: '/employer/applicants'
        });
      }
    }

    revalidatePath("/student/opportunities");
    revalidatePath("/student/dashboard");
    revalidatePath("/employer/applicants");
    
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to apply";
    return { success: false, error: message };
  }
}
