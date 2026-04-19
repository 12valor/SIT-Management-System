"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getParticipationReport() {
  const session = await auth();
  if (session?.user?.role !== 'COORDINATOR') return { success: false, error: "Unauthorized" };

  try {
    // Group logbook entries by month
    const stats = await prisma.logbookEntry.findMany({
      where: { status: 'APPROVED' },
      select: {
        date: true,
        hours: true,
      }
    });

    const monthlyStats: Record<string, { totalHours: number, activeTrainees: Set<string> }> = {};

    stats.forEach(entry => {
      const monthYear = entry.date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      if (!monthlyStats[monthYear]) {
        monthlyStats[monthYear] = { totalHours: 0, activeTrainees: new Set() };
      }
      monthlyStats[monthYear].totalHours += entry.hours;
    });

    return {
      success: true,
      data: Object.entries(monthlyStats).map(([month, data]) => ({
        month,
        totalHours: data.totalHours,
      }))
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function getComplianceReport() {
  const session = await auth();
  if (session?.user?.role !== 'COORDINATOR') return { success: false, error: "Unauthorized" };

  try {
    const totalCompanies = await prisma.company.count();
    const verifiedCompanies = await prisma.company.count({ where: { isVerified: true } });
    
    const companyList = await prisma.company.findMany({
      select: {
        name: true,
        industry: true,
        isVerified: true,
        joinedAt: true,
      },
      orderBy: { joinedAt: 'desc' }
    });

    return {
      success: true,
      data: {
        totalCompanies,
        verifiedCompanies,
        complianceRate: totalCompanies > 0 ? (verifiedCompanies / totalCompanies) * 100 : 0,
        companyList
      }
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function getCompletionReport() {
  const session = await auth();
  if (session?.user?.role !== 'COORDINATOR') return { success: false, error: "Unauthorized" };

  try {
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: {
        logbookEntries: {
          where: { status: 'APPROVED' }
        },
        evaluations: true,
      }
    });

    const completionStats = students.map(student => {
      const totalHours = student.logbookEntries.reduce((acc, curr) => acc + curr.hours, 0);
      return {
        id: student.id,
        name: student.name,
        email: student.email,
        totalHours,
        isComplete: totalHours >= 300 && student.evaluations.length > 0,
        lastActive: student.logbookEntries[0]?.date || student.createdAt
      };
    });

    return {
      success: true,
      data: completionStats.sort((a, b) => b.totalHours - a.totalHours)
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}
