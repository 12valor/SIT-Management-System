"use server";

import prisma from "@/lib/prisma";

export async function getStudentManifest() {
  const students = await prisma.user.findMany({
    where: { role: "STUDENT", isApproved: true },
    select: {
      id: true,
      name: true,
      email: true,
      course: true,
      createdAt: true,
      logbookEntries: {
        where: { status: "APPROVED" },
        select: { hours: true },
      },
      applications: {
        select: {
          status: true,
          posting: {
            select: {
              title: true,
              company: { select: { name: true } },
            },
          },
        },
        orderBy: { appliedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return students.map((s) => {
    const totalHours = s.logbookEntries.reduce((acc, e) => acc + e.hours, 0);
    const latestApp = s.applications[0];
    const isHired = latestApp?.status === "ACCEPTED";

    return {
      id: s.id,
      name: s.name || "Unknown",
      email: s.email || "",
      course: s.course || "N/A",
      totalHours,
      progress: Math.min((totalHours / 300) * 100, 100),
      status: isHired ? "HIRED" : "SEEKING",
      company: isHired ? latestApp.posting.company?.name || "N/A" : "—",
      role: isHired ? latestApp.posting.title : "—",
      joinedAt: s.createdAt,
    };
  });
}
