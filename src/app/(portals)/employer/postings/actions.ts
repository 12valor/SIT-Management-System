"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PlacementType, PostingStatus } from "@/generated/client";
import { requireEmployer } from "@/lib/auth-guards";

export async function getEmployerPostings() {
  const employer = await requireEmployer();

  const postings = await prisma.sITPosting.findMany({
    where: { employerId: employer.id },
    include: {
      _count: { select: { applications: true } },
      company: { select: { name: true } },
    },
    orderBy: { postedAt: "desc" },
  });

  return { 
    success: true, 
    data: postings.map(p => ({
      ...p,
      requirements: p.requirements || [],
      responsibilities: p.responsibilities || [],
      tags: p.tags || []
    }))
  };
}

export async function createSITPosting(formData: FormData) {
  const employer = await requireEmployer();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const type = (formData.get("type") as string).toUpperCase().replace("-", "_") as PlacementType;
  const requiredHours = parseInt(formData.get("requiredHours") as string) || 300;
  const tags = (formData.get("tags") as string || "").split(",").map(t => t.trim()).filter(Boolean);
  const requirements = (formData.get("requirements") as string || "").split("\n").map(t => t.trim()).filter(Boolean);
  const responsibilities = (formData.get("responsibilities") as string || "").split("\n").map(t => t.trim()).filter(Boolean);
  const posterUrl = formData.get("poster") as string | null;

  if (!title || !description || !location) {
    return { success: false, error: "Title, description, and location are required." };
  }

  if (!["ON_SITE", "REMOTE", "HYBRID"].includes(type)) {
    return { success: false, error: "Invalid placement type." };
  }

  if (requiredHours <= 0 || requiredHours > 1000) {
    return { success: false, error: "Required hours must be between 1 and 1000." };
  }

  await prisma.sITPosting.create({
    data: {
      title,
      description,
      location,
      type,
      requiredHours,
      tags,
      requirements,
      responsibilities,
      posterUrl,
      status: PostingStatus.OPEN,
      employerId: employer.id,
      companyId: employer.companyId,
    },
  });

  revalidatePath("/employer/postings");
  revalidatePath("/placements");
  return { success: true };
}

export async function togglePostingStatus(postingId: string, currentStatus: PostingStatus) {
  const employer = await requireEmployer();

  const newStatus = currentStatus === "OPEN" ? PostingStatus.CLOSED : PostingStatus.OPEN;

  await prisma.sITPosting.update({
    where: { id: postingId, employerId: employer.id },
    data: { status: newStatus },
  });

  revalidatePath("/employer/postings");
  revalidatePath("/placements");
  return { success: true };
}

export async function deleteSITPosting(postingId: string) {
  const employer = await requireEmployer();

  await prisma.sITPosting.delete({
    where: { id: postingId, employerId: employer.id },
  });

  revalidatePath("/employer/postings");
  revalidatePath("/placements");
  return { success: true };
}
