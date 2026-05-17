import { Suspense } from "react";
import { getCoordinatorEvaluations } from "./actions";
import EvaluationsClient from "./EvaluationsClient";
import { Loader2 } from "lucide-react";

export default async function CoordinatorEvaluationsPage() {
  const result = await getCoordinatorEvaluations();
  const evaluations = result.success && result.evaluations ? result.evaluations : [];
  const pending = result.success && result.pending ? result.pending : [];

  return (
    <Suspense fallback={<EvaluationsSkeleton />}>
      <EvaluationsClient initialEvaluations={evaluations} initialPending={pending} />
    </Suspense>
  );
}

function EvaluationsSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex justify-between items-end pb-6 border-b">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-8 w-64 bg-muted rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-muted rounded-xl border border-border" />
        ))}
      </div>
      <div className="h-[400px] bg-muted rounded-xl border border-border flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/30" />
      </div>
    </div>
  );
}
