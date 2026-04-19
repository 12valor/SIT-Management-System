"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getReportsData() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== 'coordinator') {
    return { success: false, error: "Unauthorized access to strategic intelligence." };
  }

  try {
    // 1. Participation Report Data
    const trainees = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        name: true,
        course: true,
        logbookEntries: {
          where: { status: 'APPROVED' },
          select: { hours: true }
        }
      }
    });

    const participationData = trainees.map(t => {
      const totalHours = t.logbookEntries.reduce((sum, l) => sum + l.hours, 0);
      return [t.name || "N/A", t.course || "N/A", `${totalHours} hrs`, totalHours >= 300 ? "COMPLETED" : "ACTIVE"];
    });

    // 2. Compliance Report Data
    const companies = await prisma.company.findMany({
      select: {
        name: true,
        industry: true,
        isVerified: true,
        joinedAt: true
      }
    });

    const complianceData = companies.map(c => [
      c.name,
      c.industry,
      c.isVerified ? "VERIFIED" : "PENDING",
      new Date(c.joinedAt).toLocaleDateString()
    ]);

    // 3. Completion Status Data
    const completionData = trainees
      .map(t => {
        const totalHours = t.logbookEntries.reduce((sum, l) => sum + l.hours, 0);
        return { name: t.name, hours: totalHours, course: t.course };
      })
      .filter(t => t.hours >= 250) // Nearing completion
      .map(t => [t.name || "N/A", t.course || "N/A", `${t.hours} / 300`, `${Math.round((t.hours/300)*100)}%`]);

    return {
      success: true,
      data: {
        participation: participationData,
        compliance: complianceData,
        completion: completionData
      }
    };
  } catch (error: unknown) {
    console.error("Report extraction failure:", error);
    return { success: false, error: "Failed to compile strategic data." };
  }
}
