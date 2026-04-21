import { auth } from "@/auth";
import { getCompletionStatus } from "./actions";
import { StudentCompletionShell, CompletionData } from "@/components/skeletons/StudentCompletionShell";

export default async function StudentCompletionPage() {
  const [session, result] = await Promise.all([
    auth(),
    getCompletionStatus()
  ]);

  const data: CompletionData | null = result.success && result.data 
    ? result.data as CompletionData 
    : null;

  return (
    <StudentCompletionShell 
      data={data} 
      userName={session?.user?.name ?? undefined} 
    />
  );
}
