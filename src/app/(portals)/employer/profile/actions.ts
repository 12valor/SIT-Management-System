"use server";

import prisma from "@/lib/prisma";
import { requireEmployer } from "@/lib/auth-guards";
import { revalidatePath } from "next/cache";

function cleanText(value: FormDataEntryValue | null, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

export async function getEmployerProfile() {
  const employer = await requireEmployer();

  return prisma.company.findUnique({
    where: { id: employer.companyId },
    select: {
      name: true,
      industry: true,
      location: true,
      description: true,
      slots: true,
      logoUrl: true,
      bannerUrl: true,
      isVerified: true,
    },
  });
}

export async function updateEmployerProfile(formData: FormData) {
  const employer = await requireEmployer();
  const slots = Number(formData.get("slots") || 0);

  await prisma.company.update({
    where: { id: employer.companyId },
    data: {
      name: cleanText(formData.get("name"), 120),
      industry: cleanText(formData.get("industry"), 120),
      location: cleanText(formData.get("location"), 160),
      description: cleanText(formData.get("description"), 1500),
      slots: Number.isFinite(slots) && slots >= 0 ? Math.floor(slots) : 0,
      logoUrl: cleanText(formData.get("logoUrl"), 2000) || null,
      bannerUrl: cleanText(formData.get("bannerUrl"), 2000) || null,
    },
  });

  revalidatePath("/employer/profile");
  revalidatePath("/employer/dashboard");
  revalidatePath("/placements");
}
