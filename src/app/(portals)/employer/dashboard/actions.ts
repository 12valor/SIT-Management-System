"use server";

import prisma from "@/lib/prisma";
import { requireEmployer } from "@/lib/auth-guards";

export async function getEmployerDashboardData() {
  const employer = await requireEmployer();

  const postings = await prisma.sITPosting.findMany({
    where: { employerId: employer.id },
    include: { applications: true },
    orderBy: { postedAt: "desc" },
  });

  const totalPostings = postings.length;
  const allApplications = postings.flatMap((p) => p.applications);
  const totalApplicants = allApplications.length;
  const pendingApplicants = allApplications.filter((a) => a.status === "PENDING").length;
  const hiredCount = allApplications.filter((a) => a.status === "ACCEPTED").length;

  const pendingLogsCount = await prisma.logbookEntry.count({
    where: {
      status: "PENDING",
      student: {
        applications: {
          some: {
            status: "ACCEPTED",
            posting: { employerId: employer.id }
          }
        }
      }
    }
  });

  const recentApplications = await prisma.application.findMany({
    where: {
      posting: { employerId: employer.id },
    },
    include: {
      student: { select: { name: true, email: true, course: true } },
      posting: { select: { title: true } },
    },
    orderBy: { appliedAt: "desc" },
    take: 8,
  });

  const user = await prisma.user.findUnique({
    where: { id: employer.id },
    include: { company: true },
  });

  return {
    success: true,
    data: {
      totalPostings,
      totalApplicants,
      pendingApplicants,
      hiredCount,
      pendingLogsCount,
      recentApplications,
      company: user?.company ? {
        name: user.company.name,
        websiteUrl: user.company.websiteUrl,
        facebookUrl: user.company.facebookUrl,
        linkedinUrl: user.company.linkedinUrl,
        twitterUrl: user.company.twitterUrl,
        instagramUrl: user.company.instagramUrl,
      } : null,
    },
  };
}
