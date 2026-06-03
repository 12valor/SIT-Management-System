"use server";

import prisma from "@/lib/prisma";
import { requireStudent } from "@/lib/auth-guards";

export async function getStudentPlacementStatus() {
  const student = await requireStudent();

  const acceptedApplication = await prisma.application.findFirst({
    where: {
      studentId: student.id,
      status: "ACCEPTED",
    },
  });

  return { isPlaced: !!acceptedApplication };
}
