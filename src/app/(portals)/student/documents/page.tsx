import { getStudentDocuments } from "./actions";
import { StudentDocumentsShell } from "@/components/skeletons/StudentDocumentsShell";

export default async function StudentDocumentsPage() {
  const result = await getStudentDocuments();
  const data = result.success && result.data ? result.data : null;

  return <StudentDocumentsShell data={data} />;
}
