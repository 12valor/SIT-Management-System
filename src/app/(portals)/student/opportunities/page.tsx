import { getSITOpportunities } from "./actions";
import { StudentOpportunitiesShell } from "@/components/skeletons/StudentOpportunitiesShell";

export default async function StudentOpportunitiesPage() {
  const result = await getSITOpportunities();
  const data = result.success && result.data ? result.data : null;

  return <StudentOpportunitiesShell initialData={data} />;
}
