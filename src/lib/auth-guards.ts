import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import type { UserRole } from "@prisma/client";

type AuthorizedUser = {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  isApproved: boolean;
  companyId: string | null;
};

export async function requireRole(...roles: UserRole[]): Promise<AuthorizedUser> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isApproved: true,
      companyId: true,
    },
  });

  if (!user || !roles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  if (user.role !== "COORDINATOR" && !user.isApproved) {
    throw new Error("Account approval required");
  }

  return user;
}

export async function requireCoordinator() {
  return requireRole("COORDINATOR");
}

export async function requireEmployer() {
  const user = await requireRole("EMPLOYER");

  if (!user.companyId) {
    throw new Error("Employer account is not linked to a company");
  }

  return user as AuthorizedUser & { companyId: string };
}

export async function requireStudent() {
  return requireRole("STUDENT");
}
