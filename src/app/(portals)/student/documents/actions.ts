"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireStudent } from "@/lib/auth-guards";
import { REQUIRED_CREDENTIALS } from "@/app/(portals)/student/dashboard/types";

const allowedDocumentNames = new Set(REQUIRED_CREDENTIALS.map((credential) => credential.name));
const allowedDocumentTypes = new Set(["PDF", "IMAGE"]);

function isAllowedDocumentUrl(url?: string) {
  if (!url) return true;

  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && (parsed.hostname === "archive.sit.tupv.edu.ph" || parsed.hostname === "example.com");
  } catch {
    return false;
  }
}

export async function getStudentDocuments() {
  const student = await requireStudent();

  try {
    const documents = await prisma.sITDocument.findMany({
      where: { studentId: student.id },
      orderBy: { uploadedAt: "desc" },
    });

    return { success: true, data: documents };
  } catch (error: unknown) {
    console.error("Historical trace failure in fetching documents:", error);
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function uploadDocumentMetadata(data: {
  name: string;
  type: string;
  url?: string;
}) {
  const student = await requireStudent();

  try {
    if (!allowedDocumentNames.has(data.name)) {
      return { success: false, error: "Invalid document name." };
    }

    if (!allowedDocumentTypes.has(data.type)) {
      return { success: false, error: "Invalid document type." };
    }

    if (!isAllowedDocumentUrl(data.url)) {
      return { success: false, error: "Invalid document URL." };
    }

    const document = await prisma.sITDocument.create({
      data: {
        studentId: student.id,
        name: data.name,
        type: data.type,
        url: data.url || null,
      },
    });

    revalidatePath("/student/documents");
    revalidatePath("/student/dashboard");
    revalidatePath("/student/completion");
    
    return { success: true, data: document };
  } catch (error: unknown) {
    console.error("Industrial data persistence failure:", error);
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}

export async function deleteDocument(id: string) {
  const student = await requireStudent();

  try {
    // Ensure the document belongs to the student
    const doc = await prisma.sITDocument.findUnique({
      where: { id },
    });

    if (!doc || doc.studentId !== student.id) {
      return { success: false, error: "Document not found or access denied" };
    }

    await prisma.sITDocument.delete({
      where: { id },
    });

    revalidatePath("/student/documents");
    revalidatePath("/student/dashboard");
    revalidatePath("/student/completion");

    return { success: true };
  } catch (error: unknown) {
    console.error("Industrial record deletion failure:", error);
    const message = error instanceof Error ? error.message : "An unknown industrial error occurred";
    return { success: false, error: message };
  }
}
