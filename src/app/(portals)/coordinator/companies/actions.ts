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
  await prisma.company.create({
    data: {
      ...data,
      isVerified: true, // Auto-verified if added by coordinator
    },
  });
  revalidatePath("/coordinator/companies");
  revalidatePath("/partners");
  return { success: true };
}

export async function getPublicPartners() {
  return await prisma.company.findMany({
    where: { isVerified: true },
    orderBy: { joinedAt: "desc" },
  });
}
