"use server";

import prisma from "@/lib/prisma";
import { requireCoordinator } from "@/lib/auth-guards";

export async function getPlacements() {
  await requireCoordinator();

  return await prisma.application.findMany({
    where: { status: "ACCEPTED" },
    include: {
      student: { select: { name: true, email: true, course: true } },
      posting: {
        select: {
          title: true,
          location: true,
          type: true,
          company: { select: { name: true, industry: true } },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}
