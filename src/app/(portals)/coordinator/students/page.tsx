import { Suspense } from "react";
import { getStudentManifest } from "./actions";
import StudentManifestClient from "./StudentManifestClient";

export default function CoordinatorStudentsPage() {
  return (
    <Suspense fallback={<StudentManifestSkeleton />}>
      <StudentManifestContent />
    </Suspense>
  );
}

async function StudentManifestContent() {
  const students = await getStudentManifest();
  return <StudentManifestClient initialStudents={students} />;
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
