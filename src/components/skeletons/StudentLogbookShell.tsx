"use client";

import { Skeleton } from "boneyard-js/react";

export function StudentLogbookShell() {
  return (
    <Skeleton 
      name="student-logbook" 
      loading={true}
      animate="shimmer"
      stagger={80}
      transition={300}
      snapshotConfig={{
        excludeSelectors: ["svg", "[data-no-skeleton]"],
        excludeTags: ["nav", "footer"],
      }}
      fallback={
        <div className="space-y-12 max-w-6xl mx-auto pb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
             <div className="space-y-4">
               <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse" />
               <div className="h-4 w-96 bg-slate-100 rounded-lg animate-pulse" />
             </div>
             <div className="h-11 w-32 bg-slate-200 rounded-lg animate-pulse" />
          </div>

          <div className="h-48 bg-slate-100 rounded-xl animate-pulse" />

          <div className="space-y-6">
             <div className="h-6 w-48 bg-slate-200 rounded-lg animate-pulse" />
             {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />
             ))}
          </div>
        </div>
      }
    >
      <div />
    </Skeleton>
  );
}
