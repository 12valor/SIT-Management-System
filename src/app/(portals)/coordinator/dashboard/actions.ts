"use server";

import prisma from "@/lib/prisma";

export async function getCoordinatorStats() {
  try {
    const totalStudents = await prisma.user.count({
      where: { role: 'STUDENT' }
    });

    const hiredStudents = await prisma.application.count({
      where: { status: 'ACCEPTED' }
    });

    const totalCompanies = await prisma.company.count();
    const verifiedCompanies = await prisma.company.count({
      where: { isVerified: true }
    });

    const graduationReady = await prisma.user.count({
      where: {
        role: 'STUDENT',
        logbookEntries: {
          some: {
            status: 'APPROVED'
          }
        },
        evaluations: {
          some: {}
        }
      }
    });

    const recentPlacements = await prisma.application.findMany({
      where: { status: 'ACCEPTED' },
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        student: true,
        posting: {
          include: {
            company: true
          }
        }
      }
    });

    const pendingCompanies = await prisma.company.findMany({
      where: { isVerified: false },
      take: 3,
      orderBy: { joinedAt: 'desc' }
    });

    // Fetch real Placement Trend (Last 6 Months)
    const placementTrend = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = d.toLocaleString('default', { month: 'short' });
      const year = d.getFullYear();
      const month = d.getMonth();

      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

      const [studentsInMonth, placementsInMonth] = await Promise.all([
        prisma.user.count({
          where: { role: 'STUDENT', createdAt: { gte: start, lte: end } }
        }),
        prisma.application.count({
          where: { status: 'ACCEPTED', updatedAt: { gte: start, lte: end } }
        })
      ]);

      placementTrend.push({
        month: monthLabel,
        students: studentsInMonth,
        placements: placementsInMonth
      });
    }

    // Fetch real Industry Distribution
    const industryGroups = await prisma.company.groupBy({
      by: ['industry'],
      _count: {
        industry: true
      },
      orderBy: {
        _count: {
          industry: 'desc'
        }
      },
      take: 4
    });

    const topIndustries = industryGroups.map(ig => ig.industry);
    
    // Fetch names of industries in the "Other" category
    const otherIndustries = await prisma.company.findMany({
      where: {
        NOT: {
          industry: { in: topIndustries }
        }
      },
      select: {
        industry: true
      },
      distinct: ['industry']
    });

    const otherIndustriesCount = await prisma.company.count({
      where: {
        NOT: {
          industry: { in: topIndustries }
        }
      }
    });

    const industryStats = [
      ...industryGroups.map(ig => ({
        name: ig.industry,
        count: ig._count.industry
      })),
      ...(otherIndustriesCount > 0 ? [{ 
        name: 'Other', 
        count: otherIndustriesCount,
        subIndustries: otherIndustries.map(oi => oi.industry)
      }] : [])
    ];

    return {
      success: true,
      data: {
        totalStudents,
        hiredStudents,
        totalCompanies,
        verifiedCompanies,
        graduationReady,
        recentPlacements: recentPlacements.map(app => ({
          id: app.id,
          studentName: app.student.name,
          studentEmail: app.student.email,
          postingTitle: app.posting.title,
          companyName: app.posting.company.name,
        })),
        pendingCompanies: pendingCompanies.map(c => ({
          id: c.id,
          name: c.name,
          industry: c.industry,
          joinedAt: c.joinedAt.toISOString()
        })),
        placementTrend,
        industryStats
      }
    };
  } catch (error: unknown) {
    console.error("Historical trace failure in coordinator stats:", error);
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}
