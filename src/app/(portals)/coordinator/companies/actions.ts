"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCompanies() {
  return await prisma.company.findMany({
    include: {
      _count: { select: { employers: true, postings: true } },
    },
    orderBy: { joinedAt: "desc" },
  });
}

export async function setCompanyVerification(companyId: string, isVerified: boolean) {
  await prisma.company.update({
    where: { id: companyId },
    data: { isVerified },
  });
  revalidatePath("/coordinator/companies");
  return { success: true };
}

export async function addCompany(data: {
  name: string;
  email: string;
  industry: string;
  location: string;
  description: string;
  slots: number;
  logoUrl?: string;
}) {
  try {
    await prisma.company.create({
      data: {
        name: data.name,
        email: data.email,
        industry: data.industry,
        location: data.location,
        description: data.description,
        slots: data.slots,
        logoUrl: data.logoUrl,
        isVerified: true,
      },
    });

    revalidatePath("/coordinator/companies");
    revalidatePath("/partners");
    return { success: true };
  } catch (error) {
    console.error("Failed to add company:", error);
    throw new Error("Failed to add company. Please ensure the email is unique and all fields are valid.");
  }
}

export async function getPublicPartners() {
  return await prisma.company.findMany({
    where: { isVerified: true },
    orderBy: { joinedAt: "desc" },
  });
}
