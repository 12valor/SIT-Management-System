"use server";

import prisma from "@/lib/prisma";
import { requireStudent } from "@/lib/auth-guards";

export async function getCompletionStatus() {
  const student = await requireStudent();

  try {
    // 1. Calculate Total Approved Hours
    const logbookStats = await prisma.logbookEntry.aggregate({
      where: {
        studentId: student.id,
        status: 'APPROVED'
      },
      _sum: {
        hours: true
      }
    });

    const totalHours = logbookStats._sum.hours || 0;

    // 2. Check for Final Evaluation
    const evaluation = await prisma.sITEvaluation.findFirst({
      where: { studentId: student.id },
      orderBy: { submittedAt: 'desc' }
    });

    // 3. Check for Mandatory Documents
    // Mandatory: SIT Intent Form, Student Resume / CV, Liability Waiver, SIT Recommendation Letter
    const docs = await prisma.sITDocument.findMany({
      where: { studentId: student.id }
    });

    const MANDATORY_DOC_NAMES = [
      "SIT Intent Form",
      "Student Resume / CV",
      "Liability Waiver",
      "SIT Recommendation Letter"
    ];

    const uploadedMandatoryCount = docs.filter(d => MANDATORY_DOC_NAMES.includes(d.name)).length;

    // 4. Fetch Student Info for Certificate
    const user = await prisma.user.findUnique({
      where: { id: student.id },
      select: { 
        name: true, 
        course: true,
        applications: {
          where: { status: 'ACCEPTED' },
          select: {
            posting: { select: { requiredHours: true } }
          }
        }
      }
    });

    const requiredHours = user?.applications?.[0]?.posting?.requiredHours ?? 300;

    return {
      success: true,
      data: {
        studentName: user?.name || "Unknown Graduate",
        studentCourse: user?.course || "Information Technology",
        totalHours,
        hourGoal: requiredHours,
        hasEvaluation: !!evaluation,
        evaluationData: evaluation ? {
          overallGrade: evaluation.overallGrade,
          comments: evaluation.comments,
          companyName: evaluation.companyName
        } : null,
        documentsUploaded: uploadedMandatoryCount,
        totalRequiredDocs: MANDATORY_DOC_NAMES.length,
        isFullyComplete: totalHours >= requiredHours
      }
    };
  } catch (error: unknown) {
    console.error("Industrial audit failure in completion status:", error);
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}
