"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { requireEmployer } from "@/lib/auth-guards";
import { revalidatePath } from "next/cache";

export async function getEmployerSettings() {
  const employer = await requireEmployer();

  return prisma.user.findUnique({
    where: { id: employer.id },
    select: {
      name: true,
      email: true,
    },
  });
}

export async function updateEmployerSettings(formData: FormData) {
  const employer = await requireEmployer();
  const name = String(formData.get("name") || "").trim();
  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");

  if (!name) {
    throw new Error("Supervisor name is required.");
  }

  const data: { name: string; password?: string } = { name };

  if (newPassword) {
    if (newPassword.length < 8) {
      throw new Error("New password must be at least 8 characters.");
    }

    const user = await prisma.user.findUnique({
      where: { id: employer.id },
      select: { password: true },
    });

    const passwordMatches = user?.password
      ? await bcrypt.compare(currentPassword, user.password)
      : false;

    if (!passwordMatches) {
      throw new Error("Current password is incorrect.");
    }

    data.password = await bcrypt.hash(newPassword, 10);
  }

  await prisma.user.update({
    where: { id: employer.id },
    data,
  });

  revalidatePath("/employer/settings");
  revalidatePath("/employer/dashboard");
}
