"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireCoordinator } from "@/lib/auth-guards";

export async function getPendingRegistrations() {
  await requireCoordinator();

  const [users, companies] = await Promise.all([
    prisma.user.findMany({
      where: { 
        isApproved: false,
        NOT: { email: "student@tupv.edu.ph" }
      },
      include: { company: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.company.findMany({
      where: { 
        isVerified: false,
        NOT: { email: "tidal.drift@partner.v1" }
      },
      orderBy: { joinedAt: "desc" },
    }),
  ]);

  return { users, companies };
}

export async function approveUser(userId: string) {
  await requireCoordinator();

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true },
    });
    revalidatePath("/coordinator/registrations");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to approve user." };
  }
}

export async function rejectUser(userId: string) {
  await requireCoordinator();

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        role: true, 
        companyId: true, 
        company: {
          select: { isVerified: true }
        } 
      }
    });

    if (user?.role === "EMPLOYER" && user.companyId && !user.company?.isVerified) {
      // Check if any other users are associated with this company
      const otherUsers = await prisma.user.count({
        where: { 
          companyId: user.companyId,
          id: { not: userId }
        }
      });

      // If no other users, delete the company too
      if (otherUsers === 0) {
        await prisma.$transaction([
          prisma.user.delete({ where: { id: userId } }),
          prisma.company.delete({ where: { id: user.companyId } })
        ]);
      } else {
        await prisma.user.delete({ where: { id: userId } });
      }
    } else {
      await prisma.user.delete({
        where: { id: userId },
      });
    }

    revalidatePath("/coordinator/registrations");
    revalidatePath("/coordinator/companies");
    return { success: true };
  } catch (error) {
    console.error("Reject user error:", error);
    return { success: false, error: "Failed to reject user." };
  }
}

export async function verifyCompany(companyId: string) {
  await requireCoordinator();

  try {
    await prisma.company.update({
      where: { id: companyId },
      data: { isVerified: true },
    });
    revalidatePath("/coordinator/registrations");
    revalidatePath("/coordinator/companies");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to verify company." };
  }
}

export async function verifyPartnership(userId: string, companyId: string) {
  await requireCoordinator();

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { isApproved: true },
      }),
      prisma.company.update({
        where: { id: companyId },
        data: { isVerified: true },
      }),
    ]);
    revalidatePath("/coordinator/registrations");
    revalidatePath("/coordinator/companies");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to verify partnership." };
  }
}
