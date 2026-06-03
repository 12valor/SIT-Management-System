"use server";

import prisma from "@/lib/prisma";

export async function getPlacementTrend(timeframe: 'monthly' | 'weekly' | 'daily' = 'monthly') {
  try {
    const now = new Date();
    const periods: { label: string; start: Date; end: Date }[] = [];

    if (timeframe === 'monthly') {
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthLabel = d.toLocaleString('default', { month: 'short' });
        const start = new Date(d.getFullYear(), d.getMonth(), 1);
        const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
        periods.push({ label: monthLabel, start, end });
      }
    } else if (timeframe === 'weekly') {
      for (let i = 7; i >= 0; i--) {
        const start = new Date(now.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000);
        const end = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        const label = `W${8 - i}`;
        periods.push({ label, start, end });
      }
    } else if (timeframe === 'daily') {
      for (let i = 13; i >= 0; i--) {
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i, 23, 59, 59, 999);
        const label = start.getDate().toString();
        periods.push({ label, start, end });
      }
    }

    const trendData = await Promise.all(
      periods.map(async ({ label, start, end }) => {
        const [students, placements] = await Promise.all([
          prisma.user.count({ where: { role: 'STUDENT', createdAt: { gte: start, lte: end } } }),
          prisma.application.count({ where: { status: 'ACCEPTED', updatedAt: { gte: start, lte: end } } })
        ]);

        return { month: label, students, placements };
      })
    );

    return { success: true, data: trendData };
  } catch (error) {
    console.error("Trend fetch failure:", error);
    return { success: false, error: "Failed to fetch trend data" };
  }
}

export async function getCoordinatorStats() {
  try {
    const [
      totalStudents,
      hiredStudents,
      totalCompanies,
      verifiedCompanies,
      graduationReady,
      recentPlacements,
      pendingCompanies,
      pendingLogbooks,
      trendRes
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.application.count({ where: { status: 'ACCEPTED' } }),
      prisma.company.count(),
      prisma.company.count({ where: { isVerified: true } }),
      prisma.user.count({
        where: {
          role: 'STUDENT',
          logbookEntries: { some: { status: 'APPROVED' } },
          evaluations: { some: {} }
        }
      }),
      prisma.application.findMany({
        where: { status: 'ACCEPTED' },
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: { student: true, posting: { include: { company: true } } }
      }),
      prisma.company.findMany({
        where: { isVerified: false },
        take: 3,
        orderBy: { joinedAt: 'desc' }
      }),
      prisma.logbookEntry.count({ where: { status: 'PENDING' } }),
      getPlacementTrend('monthly')
    ]);

    // Calculate Top Hiring Companies
    const topHiringRes = await prisma.company.findMany({
      select: {
        name: true,
        postings: {
          select: {
            _count: {
              select: {
                applications: {
                  where: { status: 'ACCEPTED' }
                }
              }
            }
          }
        }
      }
    });

    const topHiringCompanies = topHiringRes
      .map(c => ({
        name: c.name,
        count: c.postings.reduce((acc, p) => acc + (p._count?.applications || 0), 0)
      }))
      .filter(c => c.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Fetch real Industry Distribution
    const industryGroups = await prisma.company.groupBy({
      by: ['industry'],
      _count: { industry: true },
      orderBy: { _count: { industry: 'desc' } },
      take: 4
    });

    const topIndustries = industryGroups.map(ig => ig.industry);
    const otherIndustries = await prisma.company.findMany({
      where: { NOT: { industry: { in: topIndustries } } },
      select: { industry: true },
      distinct: ['industry']
    });

    const otherIndustriesCount = await prisma.company.count({
      where: { NOT: { industry: { in: topIndustries } } }
    });

    const industryStats = [
      ...industryGroups.map(ig => ({ name: ig.industry, count: ig._count.industry })),
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
        pendingLogbooks,
        topHiringCompanies,
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
        placementTrend: trendRes.success ? trendRes.data : [],
        industryStats
      }
    };
  } catch (error: unknown) {
    console.error("Historical trace failure in coordinator stats:", error);
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}
