"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { isCourseCode } from "@/lib/courses";

export async function getStudentProfile() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      course: true,
      image: true,
      createdAt: true,
      isApproved: true,
      applications: {
        select: { status: true },
      },
      logbookEntries: {
        where: { status: "APPROVED" },
        select: { hours: true },
      },
    },
  });
}

export async function updateStudentOwnImage(imageData: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: imageData },
  });

  revalidatePath("/student/profile");
  revalidatePath("/coordinator/students"); // So coordinator sees the update
  return { success: true };
}

export async function updateStudentProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const name = formData.get("name") as string;
  const course = formData.get("course") as string;

  if (!name?.trim()) return { success: false, error: "Name cannot be empty." };
  if (!isCourseCode(course)) {
    return { success: false, error: "Course must be one of T01-T09." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: name.trim(), course },
  });

  revalidatePath("/student/profile");
  return { success: true };
}
