import { Suspense } from "react";
import { getStudentManifest } from "./actions";
import StudentManifestClient from "./StudentManifestClient";

export default async function CoordinatorStudentsPage() {
  const students = await getStudentManifest();

  return (
    <Suspense fallback={<StudentManifestSkeleton />}>
      <StudentManifestClient initialStudents={students} />
    </Suspense>
  );
}

function StudentManifestSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 w-64 bg-muted rounded-lg" />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-muted rounded-xl border border-border" />
        ))}
      </div>
      <div className="h-96 bg-muted rounded-xl border border-border" />
    </div>
  );
}
