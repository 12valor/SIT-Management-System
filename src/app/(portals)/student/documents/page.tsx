import { getStudentDocuments } from "./actions";
import { CredentialHub } from "@/components/student/CredentialHub";

export default async function StudentDocumentsPage() {
  const result = await getStudentDocuments();
  const data = result.success && result.data ? result.data : null;

  return <CredentialHub initialData={data} />;
}
