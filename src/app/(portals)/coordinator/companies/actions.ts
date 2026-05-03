"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
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

export async function deleteCompany(id: string) {
  await prisma.company.deleteMany({
    where: { id },
  });
  revalidatePath("/coordinator/companies");
  return { success: true };
}

export async function updateCompany(id: string, data: {
  name: string;
  email: string;
  industry: string;
  location: string;
  description: string;
  slots: number;
  logoUrl?: string;
  bannerUrl?: string;
}) {
  try {
    await prisma.company.update({
      where: { id },
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        industry: data.industry.trim(),
        location: data.location.trim(),
        description: data.description.trim(),
        slots: data.slots,
        logoUrl: data.logoUrl,
        bannerUrl: data.bannerUrl,
      },
    });

    revalidatePath("/coordinator/companies");
    return { success: true };
  } catch (error) {
    console.error("Failed to update company:", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target;
        if (Array.isArray(target) && target.includes('email')) {
          throw new Error("This email address is already assigned to another company.");
        }
      }
    }

    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(message);
  }
}

export async function addCompany(data: {
  name: string;
  email: string;
  industry: string;
  location: string;
  description: string;
  slots: number;
  logoUrl?: string;
  bannerUrl?: string;
}) {
  try {
    await prisma.company.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        industry: data.industry.trim(),
        location: data.location.trim(),
        description: data.description.trim(),
        slots: data.slots,
        logoUrl: data.logoUrl,
        bannerUrl: data.bannerUrl,
        isVerified: true,
      },
    });

    revalidatePath("/coordinator/companies");
    revalidatePath("/partners");
    return { success: true };
  } catch (error) {
    console.error("Failed to add company:", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target;
        const modelName = error.meta?.modelName;
        
        // If it's a company model conflict on email
        if (Array.isArray(target) && target.includes('email')) {
          throw new Error("A company with this email address already exists in the registry.");
        }
        
        // Handle potential name conflict if it were unique, or other constraints
        throw new Error("A registration conflict occurred. Please check if the company email or name is already in use.");
      }
    }
    
    if (error instanceof Error && error.name === 'PrismaClientValidationError') {
      throw new Error("Database schema mismatch. Please restart your development server (npm run dev) to apply changes.");
    }

    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(message);
  }
}

export async function getPublicPartners() {
  return await prisma.company.findMany({
    where: { isVerified: true },
    orderBy: { joinedAt: "desc" },
  });
}
