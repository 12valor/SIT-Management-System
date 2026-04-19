"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const unreadCount = await prisma.notification.count({
      where: { 
        userId: session.user.id,
        isRead: false
      }
    });

    return { success: true, data: { notifications, unreadCount } };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Notification hub error";
    return { success: false, error: message };
  }
}

export async function markAsRead(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    await prisma.notification.update({
      where: { id, userId: session.user.id },
      data: { isRead: true },
    });

    revalidatePath("/"); // Revalidate all layouts
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Notification update error";
    return { success: false, error: message };
  }
}

export async function markAllAsRead() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  try {
    await prisma.notification.updateMany({
      where: { userId: session.user.id, isRead: false },
      data: { isRead: true },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Notification update error";
    return { success: false, error: message };
  }
}

/**
 * Internal helper to create a notification (Server-side ONLY)
 */
export async function pushNotification(data: {
  userId: string;
  title: string;
  message: string;
  type: 'LOGBOOK' | 'APPLICATION' | 'SYSTEM' | 'EVALUATION';
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
    
    // We don't revalidatePath here because this is called during other actions
    // which will handle their own revalidation.
    return { success: true };
  } catch (error: unknown) {
    console.error("Industrial notification dispatch failure:", error);
    return { success: false };
  }
}
