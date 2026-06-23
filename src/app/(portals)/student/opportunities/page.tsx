import { getSITOpportunities } from "./actions";
import { StudentOpportunitiesShell } from "@/components/skeletons/StudentOpportunitiesShell";
import { getStudentPlacementStatus } from "../actions";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { Suspense } from "react";

export default async function StudentOpportunitiesPage() {
  const [session, placement, result] = await Promise.all([
    auth(),
    getStudentPlacementStatus(),
    getSITOpportunities()
  ]);

  if (placement.isPlaced) {
    redirect("/student/dashboard");
  }

  // Check for CV compliance
  const studentData = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { documents: { select: { name: true } } }
  });
  const hasCV = studentData?.documents.some(d => d.name === "Student Resume / CV") ?? false;

  const data = result.success && result.data ? result.data : null;

  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Loading opportunities...</div>}>
      <StudentOpportunitiesShell initialData={data} hasCV={hasCV} />
    </Suspense>
  );
}
