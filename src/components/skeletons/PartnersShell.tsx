"use client";

import { Skeleton } from "boneyard-js/react";

export function PartnersShell() {
  return (
    <Skeleton 
      name="partners-page" 
      loading={true}
      animate="shimmer"
      stagger={60}
      transition={400}
      snapshotConfig={{
        excludeSelectors: ["nav", "footer"],
      }}
      fallback={
        <div className="min-h-screen bg-white dark:bg-[#050505] pt-40 pb-32">
          <div className="container mx-auto px-6 max-w-6xl">
            {/* Header Skeleton */}
            <div className="mb-16 border-b border-slate-100 dark:border-white/5 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="space-y-4">
                <div className="h-10 w-64 bg-slate-100 dark:bg-white/5 rounded-lg animate-pulse" />
                <div className="h-4 w-full max-w-md bg-slate-50 dark:bg-white/5 rounded-lg animate-pulse" />
                <div className="h-4 w-3/4 max-w-sm bg-slate-50 dark:bg-white/5 rounded-lg animate-pulse" />
              </div>
              <div className="h-12 w-full md:w-80 bg-slate-50 dark:bg-white/5 rounded-xl animate-pulse" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i}
                  className="bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 p-8 rounded-3xl space-y-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 animate-pulse" />
                    <div className="h-6 w-16 bg-slate-50 dark:bg-white/5 rounded-md animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 w-3/4 bg-slate-100 dark:bg-white/5 rounded-lg animate-pulse" />
                    <div className="h-4 w-1/2 bg-slate-50 dark:bg-white/5 rounded-lg animate-pulse" />
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="h-4 w-1/3 bg-slate-50 dark:bg-white/5 rounded-lg animate-pulse" />
                    <div className="h-4 w-1/4 bg-slate-50 dark:bg-white/5 rounded-lg animate-pulse" />
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 flex justify-between items-center">
                    <div className="h-3 w-12 bg-slate-50 dark:bg-white/5 rounded-lg animate-pulse" />
                    <div className="h-4 w-20 bg-slate-50 dark:bg-white/5 rounded-lg animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div />
    </Skeleton>
  );
}
