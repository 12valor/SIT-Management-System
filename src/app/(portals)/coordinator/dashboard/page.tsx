import { getCoordinatorStats } from "./actions";
import { CoordinatorDashboardShell } from "@/components/skeletons/CoordinatorDashboardShell";
export const dynamic = "force-dynamic";

export default async function CoordinatorDashboardPage() {
  const res = await getCoordinatorStats();

  // Pass null if fetch failed so shell renders fallback skeleton
  const data = res.success && res.data ? res.data : null;

  return (
    <CoordinatorDashboardShell
      data={data}
      userName={data?.userName ?? undefined}
    />
  );
}
