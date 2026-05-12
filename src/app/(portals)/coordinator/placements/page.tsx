import { Suspense } from "react";
import { getPlacements } from "./actions";
import PlacementsClient from "./PlacementsClient";

export default async function CoordinatorPlacementsPage() {
  const placements = await getPlacements();

  return (
    <Suspense fallback={<PlacementsSkeleton />}>
      <PlacementsClient initialPlacements={placements} />
    </Suspense>
  );
}

function PlacementsSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 w-64 bg-muted rounded-lg" />
      <div className="h-96 bg-muted rounded-xl border border-border" />
    </div>
  );
}
