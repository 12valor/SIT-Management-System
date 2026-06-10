import { auth } from "@/auth";
import { getStudentLogbook } from "./actions";
import { LogbookClient } from "./LogbookClient";
import { LogbookData } from "./types";

export default async function LogbookPage() {
  const [session, result] = await Promise.all([
    auth(),
    getStudentLogbook()
  ]);

  const initialData: LogbookData = result.success && result.data 
    ? result.data 
    : { entries: [], totalApprovedHours: 0, hasPlacement: false, targetHours: 300 };

  return (
    <LogbookClient 
      initialData={initialData} 
      studentName={session?.user?.name ?? undefined} 
    />
  );
}
