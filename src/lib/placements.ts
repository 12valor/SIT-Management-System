import prisma from "@/lib/prisma";

export async function getOrCreateActivePlacement(studentId: string) {
  const activePlacement = await prisma.sITPlacement.findFirst({
    where: { studentId, status: "ACTIVE" },
    include: {
      posting: { include: { company: true } },
      application: true,
      company: true,
    },
    orderBy: { startedAt: "desc" },
  });

  if (activePlacement) return activePlacement;

  const acceptedApplication = await prisma.application.findFirst({
    where: { studentId, status: "ACCEPTED" },
    include: {
      posting: { include: { company: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  if (!acceptedApplication) return null;

  return prisma.sITPlacement.create({
    data: {
      applicationId: acceptedApplication.id,
      studentId,
      postingId: acceptedApplication.postingId,
      companyId: acceptedApplication.posting.companyId,
    },
    include: {
      posting: { include: { company: true } },
      application: true,
      company: true,
    },
  });
}

export async function getActivePlacementForCompany(studentId: string, companyId: string) {
  return prisma.sITPlacement.findFirst({
    where: { studentId, companyId, status: "ACTIVE" },
    include: {
      posting: { include: { company: true } },
      application: true,
      company: true,
    },
    orderBy: { startedAt: "desc" },
  });
}
