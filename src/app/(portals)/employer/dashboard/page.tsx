import { auth } from "@/auth";
import { getEmployerDashboardData } from "./actions";
import { EmployerDashboardShell } from "@/components/skeletons/EmployerDashboardShell";

export default async function EmployerDashboardPage() {
  const [session, res] = await Promise.all([
    auth(),
    getEmployerDashboardData()
  ]);

  // Pass null if fetch failed so shell renders fallback skeleton
  const data = res.success && res.data ? res.data : null;

  return (
    <EmployerDashboardShell
      data={data}
      userName={session?.user?.name ?? undefined}
    />
  );
}
