"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getCompanyPresence() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { companyId: true },
  });

  if (!user?.companyId) return { success: false, error: "No company associated" };

  const company = await prisma.company.findUnique({
    where: { id: user.companyId },
    select: {
      name: true,
      websiteUrl: true,
      facebookUrl: true,
      linkedinUrl: true,
      twitterUrl: true,
      instagramUrl: true,
    },
  });

  return { success: true, data: company };
}

export async function updateCompanyPresence(data: {
  websiteUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { companyId: true },
  });

  if (!user?.companyId) return { success: false, error: "No company associated" };

  try {
    await prisma.company.update({
      where: { id: user.companyId },
      data,
    });
    revalidatePath("/employer/presence");
    return { success: true };
  } catch (error) {
    console.error("Failed to update company presence:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
