"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPendingRegistrations() {
  const users = await prisma.user.findMany({
    where: { isApproved: false },
    include: { company: true },
    orderBy: { createdAt: "desc" },
  });

  const companies = await prisma.company.findMany({
    where: { isVerified: false },
    orderBy: { joinedAt: "desc" },
  });

  return { users, companies };
}

export async function approveUser(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true },
    });
    revalidatePath("/coordinator/registrations");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to approve user." };
  }
}

export async function rejectUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    revalidatePath("/coordinator/registrations");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to reject user." };
  }
}

export async function verifyCompany(companyId: string) {
  try {
    await prisma.company.update({
      where: { id: companyId },
      data: { isVerified: true },
    });
    revalidatePath("/coordinator/registrations");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to verify company." };
  }
}
