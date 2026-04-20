"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getEmployerDashboardData() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, data: null };

  const postings = await prisma.sITPosting.findMany({
    where: { employerId: session.user.id },
    include: { applications: true },
    orderBy: { postedAt: "desc" },
  });

  const totalPostings = postings.length;
  const allApplications = postings.flatMap((p) => p.applications);
  const totalApplicants = allApplications.length;
  const pendingApplicants = allApplications.filter((a) => a.status === "PENDING").length;
  const hiredCount = allApplications.filter((a) => a.status === "ACCEPTED").length;

  const recentApplications = await prisma.application.findMany({
    where: {
      posting: { employerId: session.user.id },
    },
    include: {
      student: { select: { name: true, email: true, course: true } },
      posting: { select: { title: true } },
    },
    orderBy: { appliedAt: "desc" },
    take: 8,
  });

  return {
    success: true,
    data: {
      totalPostings,
      totalApplicants,
      pendingApplicants,
      hiredCount,
      recentApplications,
    },
  };
}
