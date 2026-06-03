import { Suspense } from "react";
import { getPendingRegistrations } from "./actions";
import RegistrationsClient from "./RegistrationsClient";

export default function CoordinatorRegistrationsPage() {
  return (
    <Suspense fallback={<RegistrationsSkeleton />}>
      <RegistrationsContent />
    </Suspense>
  );
}

async function RegistrationsContent() {
  const data = await getPendingRegistrations();
  return <RegistrationsClient initialData={data} />;
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
