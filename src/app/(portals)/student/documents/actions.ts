"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getStudentDocuments() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const documents = await prisma.sITDocument.findMany({
      where: { studentId: session.user.id },
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
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const document = await prisma.sITDocument.create({
      data: {
        studentId: session.user.id,
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
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    // Ensure the document belongs to the student
    const doc = await prisma.sITDocument.findUnique({
      where: { id },
    });

    if (!doc || doc.studentId !== session.user.id) {
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
