import { auth } from "@/auth";
import { getCoordinatorStats } from "./actions";
import { CoordinatorDashboardShell } from "@/components/skeletons/CoordinatorDashboardShell";

export default async function CoordinatorDashboardPage() {
  const [session, res] = await Promise.all([
    auth(),
    getCoordinatorStats()
  ]);

  // Pass null if fetch failed so shell renders fallback skeleton
  const data = res.success && res.data ? res.data : null;

  return (
    <CoordinatorDashboardShell
      data={data}
      userName={session?.user?.name ?? undefined}
    />
  );
}
