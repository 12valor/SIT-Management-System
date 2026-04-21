"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getStudentPlacementStatus() {
  const session = await auth();
  if (!session?.user?.id) return { isPlaced: false };

  const acceptedApplication = await prisma.application.findFirst({
    where: {
      studentId: session.user.id,
      status: "ACCEPTED",
    },
  });

  return { isPlaced: !!acceptedApplication };
}
