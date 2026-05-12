import { Suspense } from "react";
import { getCompanies } from "./actions";
import CompaniesClient from "./CompaniesClient";

export default async function CoordinatorCompaniesPage() {
  const companies = await getCompanies();

  return (
    <Suspense fallback={<CompaniesSkeleton />}>
      <CompaniesClient initialCompanies={companies as any} />
    </Suspense>
  );
}

function CompaniesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 bg-muted rounded-lg" />
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-muted rounded-xl border border-border" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-96 bg-muted rounded-xl border border-border" />
        ))}
      </div>
    </div>
  );
}
