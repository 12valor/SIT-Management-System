"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireEmployer } from "@/lib/auth-guards";

function normalizeUrl(value?: string | null) {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function getCompanyPresence() {
  try {
    const employer = await requireEmployer();

    const company = await prisma.company.findUnique({
      where: { id: employer.companyId },
      select: {
        name: true,
        websiteUrl: true,
        facebookUrl: true,
        linkedinUrl: true,
        twitterUrl: true,
        instagramUrl: true,
      },
    });

    return { success: true, data: company, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return { success: false, data: null, error: message };
  }
}

export async function updateCompanyPresence(data: {
  websiteUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
}) {
  try {
    const employer = await requireEmployer();

    await prisma.company.update({
      where: { id: employer.companyId },
      data: {
        websiteUrl: normalizeUrl(data.websiteUrl),
        facebookUrl: normalizeUrl(data.facebookUrl),
        linkedinUrl: normalizeUrl(data.linkedinUrl),
        twitterUrl: normalizeUrl(data.twitterUrl),
        instagramUrl: normalizeUrl(data.instagramUrl),
      },
    });
    revalidatePath("/employer/presence");
    return { success: true };
  } catch (error) {
    console.error("Failed to update company presence:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
