import { getSITOpportunities } from "./actions";
import { StudentOpportunitiesShell } from "@/components/skeletons/StudentOpportunitiesShell";
import { getStudentPlacementStatus } from "../actions";
import { redirect } from "next/navigation";

export default async function StudentOpportunitiesPage() {
  const [placement, result] = await Promise.all([
    getStudentPlacementStatus(),
    getSITOpportunities()
  ]);

  if (placement.isPlaced) {
    redirect("/student/dashboard");
  }

  const data = result.success && result.data ? result.data : null;

  return <StudentOpportunitiesShell initialData={data} />;
}
