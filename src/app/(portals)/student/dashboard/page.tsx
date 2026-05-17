import { auth } from "@/auth";
import { getStudentDashboardData } from "./actions";
import { StudentDashboardShell } from "@/components/skeletons/StudentDashboardShell";

export default async function StudentDashboardPage() {
  const [session, res] = await Promise.all([
    auth(),
    getStudentDashboardData()
  ]);

  // Pass null if fetch failed so shell renders fallback skeleton
  const data = res?.success && res?.data ? res.data : null;

  return (
    <StudentDashboardShell
      data={data}
      userName={session?.user?.name ?? undefined}
    />
  );
}
