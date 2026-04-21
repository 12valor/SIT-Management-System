import { getStudentProfile } from "./actions";
import { StudentProfileShell, ProfileData } from "@/components/skeletons/StudentProfileShell";

export default async function StudentProfilePage() {
  const result = await getStudentProfile();
  const data = result as ProfileData;

  return <StudentProfileShell initialData={data} />;
}
