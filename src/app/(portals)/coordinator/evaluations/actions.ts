"use server";

import prisma from "@/lib/prisma";
import { requireCoordinator } from "@/lib/auth-guards";

export async function getCoordinatorEvaluations() {
  await requireCoordinator();

  try {
    // 1. Fetch all submitted evaluations
    const evaluations = await prisma.sITEvaluation.findMany({
      orderBy: { submittedAt: "desc" },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            course: true,
            image: true,
            logbookEntries: {
              where: { status: "APPROVED" },
              select: { hours: true }
            }
          }
        }
      }
    });

    // 2. Fetch students who are currently placed/hired but don't have evaluations yet
    // First, find all accepted applications
    const placements = await prisma.application.findMany({
      where: { status: "ACCEPTED" },
      include: {
        posting: {
          include: {
            company: true
          }
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            course: true,
            image: true,
            evaluations: true,
            logbookEntries: {
              where: { status: "APPROVED" },
              select: { hours: true }
            }
          }
        }
      }
    });

    // Filter students who don't have evaluations yet
    const pendingEvaluations = placements
      .filter(p => p.student.evaluations.length === 0)
      .map(p => ({
        studentId: p.student.id,
        studentName: p.student.name || "Unknown Student",
        studentEmail: p.student.email,
        course: p.student.course || "N/A",
        companyName: p.posting.company.name,
        totalHours: p.student.logbookEntries.reduce((acc, curr) => acc + curr.hours, 0)
      }));

    const formattedEvaluations = evaluations.map((ev) => {
      const totalHours = ev.student?.logbookEntries.reduce((sum, entry) => sum + entry.hours, 0) ?? 0;
      return {
        id: ev.id,
        supervisorName: ev.supervisorName,
        companyName: ev.companyName,
        technicalSkills: ev.technicalSkills,
        professionalism: ev.professionalism,
        punctuality: ev.punctuality,
        qualityOfWork: ev.qualityOfWork,
        overallGrade: ev.overallGrade,
        comments: ev.comments,
        recommendForHire: ev.recommendForHire,
        submittedAt: ev.submittedAt,
        studentId: ev.studentId,
        studentName: ev.student?.name || "Unknown Student",
        studentEmail: ev.student?.email || "N/A",
        course: ev.student?.course || "N/A",
        image: ev.student?.image || null,
        totalHours
      };
    });

    return {
      success: true,
      evaluations: formattedEvaluations,
      pending: pendingEvaluations
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to retrieve evaluations data";
    return { success: false, error: msg };
  }
}
