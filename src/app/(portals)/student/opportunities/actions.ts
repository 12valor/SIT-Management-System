"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { pushNotification } from "@/lib/notifications";
import { requireStudent } from "@/lib/auth-guards";

export async function getSITOpportunities() {
  const student = await requireStudent();

  try {
    const postings = await prisma.sITPosting.findMany({
      where: {
        status: "OPEN",
        company: { isVerified: true },
        applications: {
          none: {
            studentId: student.id,
            status: 'ACCEPTED'
          }
        }
      },
      include: {
        company: true,
        applications: {
          where: { studentId: student.id }
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
  const studentUser = await requireStudent();

  try {
    const openPosting = await prisma.sITPosting.findFirst({
      where: {
        id: postingId,
        status: "OPEN",
        company: { isVerified: true },
      },
      select: { id: true },
    });

    if (!openPosting) {
      return { success: false, error: "Opportunity is closed or unavailable." };
    }

    const existing = await prisma.application.findFirst({
      where: {
        postingId,
        studentId: studentUser.id
      }
    });

    if (existing && existing.status !== "WITHDRAWN") {
      return { success: false, error: "Application already exists" };
    }

    // Check for CV compliance
    const student = await prisma.user.findUnique({
      where: { id: studentUser.id },
      include: { documents: true }
    });

    const hasCV = student?.documents.some(doc => doc.name === "Student Resume / CV");
    if (!hasCV) return { success: false, error: "Please upload your Student Resume / CV before applying." };

    if (existing && existing.status === "WITHDRAWN") {
      await prisma.application.update({
        where: { id: existing.id },
        data: { status: 'PENDING', appliedAt: new Date() }
      });
    } else {
      await prisma.application.create({
        data: {
          postingId,
          studentId: studentUser.id,
          status: 'PENDING'
        }
      });
    }

    const posting = await prisma.sITPosting.findUnique({
      where: { id: postingId },
      include: {
        company: {
          include: { employers: { select: { id: true } } }
        }
      }
    });

    if (posting?.company?.employers) {
      const studentName = studentUser.name || "A student";
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
