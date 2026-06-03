import prisma from "@/lib/prisma";

export async function pushNotification(data: {
  userId: string;
  title: string;
  message: string;
  type: "LOGBOOK" | "APPLICATION" | "SYSTEM" | "EVALUATION";
  link?: string;
}) {
  try {
    await prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        link: data.link,
      },
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Industrial notification dispatch failure:", error);
    return { success: false };
  }
}
