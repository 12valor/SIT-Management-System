"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getCompletionStatus() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    // 1. Calculate Total Approved Hours
    const logbookStats = await prisma.logbookEntry.aggregate({
      where: {
        studentId: session.user.id,
        status: 'APPROVED'
      },
      _sum: {
        hours: true
      }
    });

    const totalHours = logbookStats._sum.hours || 0;

    // 2. Check for Final Evaluation
    const evaluation = await prisma.sITEvaluation.findFirst({
      where: { studentId: session.user.id },
      orderBy: { submittedAt: 'desc' }
    });

    // 3. Check for Mandatory Documents
    // Mandatory: SIT Intent Form, Student Resume / CV, Liability Waiver, SIT Recommendation Letter
    const docs = await prisma.sITDocument.findMany({
      where: { studentId: session.user.id }
    });

    const MANDATORY_DOC_NAMES = [
      "SIT Intent Form",
      "Student Resume / CV",
      "Liability Waiver",
      "SIT Recommendation Letter"
    ];

    const uploadedMandatoryCount = docs.filter(d => MANDATORY_DOC_NAMES.includes(d.name)).length;

    return {
      success: true,
      data: {
        totalHours,
        hourGoal: 300,
        hasEvaluation: !!evaluation,
        evaluationData: evaluation ? {
          overallGrade: evaluation.overallGrade,
          comments: evaluation.comments,
          companyName: evaluation.companyName
        } : null,
        documentsUploaded: uploadedMandatoryCount,
        totalRequiredDocs: MANDATORY_DOC_NAMES.length,
        isFullyComplete: totalHours >= 300 && !!evaluation && uploadedMandatoryCount >= MANDATORY_DOC_NAMES.length
      }
    };
  } catch (error: unknown) {
    console.error("Industrial audit failure in completion status:", error);
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}
