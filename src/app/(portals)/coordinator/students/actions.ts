"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireCoordinator } from "@/lib/auth-guards";

export async function getStudentManifest() {
  await requireCoordinator();

  const students = await prisma.user.findMany({
    where: { role: "STUDENT", isApproved: true },
    select: {
      id: true,
      name: true,
      email: true,
      course: true,
      createdAt: true,
      image: true,
      logbookEntries: {
        where: { status: "APPROVED" },
        select: { hours: true },
      },
      placements: {
        where: { status: "ACTIVE" },
        select: {
          posting: {
            select: {
              title: true,
              requiredHours: true,
              company: { select: { name: true } },
            },
          },
        },
        orderBy: { startedAt: "desc" },
        take: 1,
      },
      applications: {
        select: {
          status: true,
          posting: {
            select: {
              title: true,
              requiredHours: true,
              company: { select: { name: true } },
            },
          },
        },
        orderBy: { appliedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return students.map((student) => {
    const totalHours = student.logbookEntries.reduce((acc, entry) => acc + entry.hours, 0);
    const activePlacement = student.placements[0];
    const latestApplication = student.applications[0];
    const placementPosting =
      activePlacement?.posting ??
      (latestApplication?.status === "ACCEPTED" ? latestApplication.posting : null);
    const requiredHours = placementPosting?.requiredHours ?? 300;
    const isHired = !!placementPosting;

    return {
      id: student.id,
      name: student.name || "Unknown",
      email: student.email || "",
      course: student.course || "N/A",
      totalHours,
      requiredHours,
      progress: Math.min((totalHours / requiredHours) * 100, 100),
      status: (isHired ? "HIRED" : "SEEKING") as "HIRED" | "SEEKING",
      company: placementPosting?.company?.name || "N/A",
      role: placementPosting?.title || "N/A",
      joinedAt: student.createdAt,
      image: student.image,
    };
  });
}

export async function updateStudentImage(userId: string, imageData: string) {
  await requireCoordinator();

  await prisma.user.update({
    where: { id: userId },
    data: { image: imageData },
  });
  revalidatePath(`/coordinator/students/${userId}`);
  revalidatePath("/coordinator/students");
}

export async function updateStudentDocumentStatus(
  documentId: string,
  status: "VERIFIED" | "REJECTED",
  formData?: FormData
) {
  const coordinator = await requireCoordinator();
  const feedback = String(formData?.get("feedback") || "").trim();

  const document = await prisma.sITDocument.update({
    where: { id: documentId },
    data: {
      status,
      feedback: status === "REJECTED" ? feedback || "Please upload a clearer or valid document." : null,
      reviewedAt: new Date(),
      reviewedById: coordinator.id,
    },
    select: { studentId: true },
  });

  revalidatePath(`/coordinator/students/${document.studentId}`);
  revalidatePath("/coordinator/students");
  revalidatePath("/student/documents");
  revalidatePath("/student/completion");
}
