"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { PlacementType, PostingStatus } from "@/generated/client";

export async function getEmployerPostings() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, data: null };

  const postings = await prisma.sITPosting.findMany({
    where: { employerId: session.user.id },
    include: {
      _count: { select: { applications: true } },
      company: { select: { name: true } },
    },
    orderBy: { postedAt: "desc" },
  });

  return { success: true, data: postings };
}

export async function createSITPosting(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { companyId: true },
  });

  if (!user?.companyId) {
    return { success: false, error: "Your account is not linked to a company." };
  }

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
      employerId: session.user.id,
      companyId: user.companyId,
    },
  });

  revalidatePath("/employer/postings");
  revalidatePath("/placements");
  return { success: true };
}

export async function togglePostingStatus(postingId: string, currentStatus: PostingStatus) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const newStatus = currentStatus === "OPEN" ? PostingStatus.CLOSED : PostingStatus.OPEN;

  await prisma.sITPosting.update({
    where: { id: postingId, employerId: session.user.id },
    data: { status: newStatus },
  });

  revalidatePath("/employer/postings");
  revalidatePath("/placements");
  return { success: true };
}

export async function deleteSITPosting(postingId: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  await prisma.sITPosting.delete({
    where: { id: postingId, employerId: session.user.id },
  });

  revalidatePath("/employer/postings");
  revalidatePath("/placements");
  return { success: true };
}
