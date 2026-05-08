import { getStudentDocuments } from "./actions";
import { CredentialHub } from "@/components/student/CredentialHub";
import { SITDocument } from "@prisma/client";

export default async function StudentDocumentsPage() {
  const result = await getStudentDocuments();
  const data = result.success && result.data ? (result.data as SITDocument[]) : null;

  return <CredentialHub initialData={data} />;
}
