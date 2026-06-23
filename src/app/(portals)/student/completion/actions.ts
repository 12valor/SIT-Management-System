"use server";

import prisma from "@/lib/prisma";
import { requireStudent } from "@/lib/auth-guards";
import { getOrCreateActivePlacement } from "@/lib/placements";
import { MANDATORY_DOC_NAMES } from "@/lib/constants";

function createCertificateId() {
  return `SIT-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

export async function getCompletionStatus() {
  const student = await requireStudent();

  try {
    const placement = await getOrCreateActivePlacement(student.id);

    // 1. Calculate Total Approved Hours
    const logbookStats = await prisma.logbookEntry.aggregate({
      where: {
        studentId: student.id,
        status: 'APPROVED',
        ...(placement ? { OR: [{ placementId: placement.id }, { placementId: null }] } : {}),
      },
      _sum: {
        hours: true
      }
    });

    const totalHours = logbookStats._sum.hours || 0;

    // 2. Check for Final Evaluation
    const evaluation = await prisma.sITEvaluation.findFirst({
      where: {
        studentId: student.id,
        ...(placement ? { OR: [{ placementId: placement.id }, { placementId: null }] } : {}),
      },
      orderBy: { submittedAt: 'desc' }
    });

    // 3. Check for Mandatory Documents
    // Mandatory: Personal Data Form, Resume, Police Clearance, Medical Certificate, Parent's Waiver
    const docs = await prisma.sITDocument.findMany({
      where: { studentId: student.id }
    });

    const verifiedMandatoryCount = MANDATORY_DOC_NAMES.filter((name) =>
      docs.some((doc) => doc.name === name && doc.status === "VERIFIED")
    ).length;

    // 4. Fetch Student Info for Certificate
    const user = await prisma.user.findUnique({
      where: { id: student.id },
      select: { 
        name: true, 
        course: true,
        applications: {
          where: { status: 'ACCEPTED' },
          select: {
            posting: { select: { requiredHours: true, company: { select: { name: true } } } }
          }
        }
      }
    });

    const requiredHours = placement?.posting.requiredHours ?? user?.applications?.[0]?.posting?.requiredHours ?? 300;
    const certificate = await prisma.sITCertificate.findFirst({
      where: {
        studentId: student.id,
        status: "ISSUED",
        ...(placement ? { placementId: placement.id } : {}),
      },
      orderBy: { issuedAt: "desc" },
    });
    const hasEvaluation = !!evaluation;
    const isDocsComplete = verifiedMandatoryCount >= MANDATORY_DOC_NAMES.length;
    const isHoursComplete = totalHours >= requiredHours;

    return {
      success: true,
      data: {
        studentName: user?.name || "Unknown Graduate",
        studentCourse: user?.course || "Information Technology",
        totalHours,
        hourGoal: requiredHours,
        hasEvaluation,
        evaluationData: evaluation ? {
          overallGrade: evaluation.overallGrade,
          comments: evaluation.comments,
          companyName: evaluation.companyName
        } : null,
        documentsUploaded: verifiedMandatoryCount,
        totalRequiredDocs: MANDATORY_DOC_NAMES.length,
        certificateId: certificate?.certificateId ?? null,
        isFullyComplete: isHoursComplete && isDocsComplete && hasEvaluation
      }
    };
  } catch (error: unknown) {
    console.error("Industrial audit failure in completion status:", error);
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function issueCompletionCertificate() {
  const student = await requireStudent();

  try {
    const placement = await getOrCreateActivePlacement(student.id);

    if (!placement) {
      return { success: false, error: "No active placement found." };
    }

    const [logbookStats, evaluation, docs, user] = await Promise.all([
      prisma.logbookEntry.aggregate({
        where: {
          studentId: student.id,
          status: "APPROVED",
          OR: [{ placementId: placement.id }, { placementId: null }],
        },
        _sum: { hours: true },
      }),
      prisma.sITEvaluation.findFirst({
        where: {
          studentId: student.id,
          OR: [{ placementId: placement.id }, { placementId: null }],
        },
        orderBy: { submittedAt: "desc" },
      }),
      prisma.sITDocument.findMany({
        where: { studentId: student.id },
      }),
      prisma.user.findUnique({
        where: { id: student.id },
        select: { name: true, course: true },
      }),
    ]);

    const totalHours = logbookStats._sum.hours || 0;
    const docsComplete = MANDATORY_DOC_NAMES.every((name) =>
      docs.some((doc) => doc.name === name && doc.status === "VERIFIED")
    );

    if (totalHours < placement.posting.requiredHours || !evaluation || !docsComplete) {
      return { success: false, error: "Completion requirements are not fully verified yet." };
    }

    const existing = await prisma.sITCertificate.findFirst({
      where: {
        studentId: student.id,
        placementId: placement.id,
        status: "ISSUED",
      },
      orderBy: { issuedAt: "desc" },
    });

    const certificate = existing ?? (await prisma.sITCertificate.create({
      data: {
        certificateId: createCertificateId(),
        studentId: student.id,
        placementId: placement.id,
        studentName: user?.name || student.name || "Unknown Graduate",
        course: user?.course || "Information Technology",
        companyName: placement.company.name,
        totalHours,
        grade: evaluation.overallGrade,
      },
    }));

    return {
      success: true,
      data: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        course: certificate.course,
        companyName: certificate.companyName,
        totalHours: certificate.totalHours,
        grade: certificate.grade,
        issuedAt: certificate.issuedAt,
      },
    };
  } catch (error) {
    console.error("Certificate issuance failure:", error);
    const message = error instanceof Error ? error.message : "Failed to issue certificate";
    return { success: false, error: message };
  }
}
