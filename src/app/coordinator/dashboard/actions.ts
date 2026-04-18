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
        }))
      }
    };
  } catch (error: any) {
    console.error("Error fetching coordinator stats:", error);
    return { success: false, error: error.message };
  }
}
