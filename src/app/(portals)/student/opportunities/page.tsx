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

  // Check for mandatory document compliance
  const studentData = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { documents: { select: { name: true, status: true } } }
  });
  const verifiedDocs = studentData?.documents.filter(doc => doc.status === "VERIFIED").map(doc => doc.name) || [];
  const { MANDATORY_DOC_NAMES } = await import("@/lib/constants");
  const missingDocs = MANDATORY_DOC_NAMES.filter(name => !verifiedDocs.includes(name));
  const isEligible = missingDocs.length === 0;

  const data = result.success && result.data ? result.data : null;

  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Loading opportunities...</div>}>
      <StudentOpportunitiesShell initialData={data} isEligible={isEligible} missingDocs={missingDocs} />
    </Suspense>
  );
}
