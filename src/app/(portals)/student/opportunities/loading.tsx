import { StudentOpportunitiesShell } from "@/components/skeletons/StudentOpportunitiesShell";
import { Suspense } from "react";

export default function OpportunitiesLoading() {
  return (
    <Suspense>
      <StudentOpportunitiesShell initialData={null} isEligible={false} missingDocs={[]} />
    </Suspense>
  );
}
