import { Suspense } from "react";
import { getPendingRegistrations } from "./actions";
import RegistrationsClient from "./RegistrationsClient";

export default async function CoordinatorRegistrationsPage() {
  const data = await getPendingRegistrations();

  return (
    <Suspense fallback={<RegistrationsSkeleton />}>
      <RegistrationsClient initialData={data as any} />
    </Suspense>
  );
}

function RegistrationsSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 w-64 bg-muted rounded-lg" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-48 bg-muted rounded-xl border border-border" />
        <div className="h-48 bg-muted rounded-xl border border-border" />
      </div>
      <div className="h-96 bg-muted rounded-xl border border-border" />
    </div>
  );
}
