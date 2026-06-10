"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { isCourseCode } from "@/lib/courses";
import { requireStudent } from "@/lib/auth-guards";

function isAllowedProfileImage(imageData: string) {
  return /^data:image\/(png|jpe?g|webp);base64,/i.test(imageData) && imageData.length <= 1_500_000;
}

export async function getStudentProfile() {
  const student = await requireStudent();

  return await prisma.user.findUnique({
    where: { id: student.id },
    select: {
      id: true,
      name: true,
      email: true,
      course: true,
      image: true,
      createdAt: true,
      isApproved: true,
      applications: {
        select: { 
          status: true,
          posting: { select: { requiredHours: true } }
        },
      },
      logbookEntries: {
        where: { status: "APPROVED" },
        select: { hours: true },
      },
    },
  });
}

export async function updateStudentOwnImage(imageData: string) {
  const student = await requireStudent();

  if (!isAllowedProfileImage(imageData)) {
    return { success: false, error: "Profile image must be a PNG, JPG, or WebP under 1.5MB." };
  }

  await prisma.user.update({
    where: { id: student.id },
    data: { image: imageData },
  });

  revalidatePath("/student/profile");
  revalidatePath("/coordinator/students"); // So coordinator sees the update
  return { success: true };
}

export async function updateStudentProfile(formData: FormData) {
  const student = await requireStudent();

  const name = formData.get("name") as string;
  const course = formData.get("course") as string;

  if (!name?.trim()) return { success: false, error: "Name cannot be empty." };
  if (!isCourseCode(course)) {
    return { success: false, error: "Course must be one of T01-T09." };
  }

  await prisma.user.update({
    where: { id: student.id },
    data: { name: name.trim(), course },
  });

  revalidatePath("/student/profile");
  return { success: true };
}
