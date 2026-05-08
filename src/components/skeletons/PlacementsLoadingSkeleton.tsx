"use client";

import React from "react";
import { motion } from "framer-motion";

export function PlacementsLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-48 pb-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Skeleton */}
        <div className="mb-16 border-b border-slate-200 dark:border-white/10 pb-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-slate-200" />
            <div className="h-3 w-48 bg-slate-200 animate-pulse rounded" />
          </div>
          <div className="h-12 w-2/3 bg-slate-200 animate-pulse rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-100 animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-slate-100 animate-pulse rounded" />
          </div>
        </div>

        {/* Controls Skeleton */}
        <div className="mb-12 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col space-y-4">
            <div className="h-3 w-32 bg-slate-100 animate-pulse rounded" />
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="h-12 flex-1 w-full bg-slate-50 animate-pulse rounded-xl" />
              <div className="flex items-center gap-3">
                <div className="h-[52px] w-[52px] bg-slate-50 animate-pulse rounded-xl" />
                <div className="h-8 w-px bg-slate-200 hidden lg:block" />
                <div className="h-[52px] w-64 bg-slate-50 animate-pulse rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Card Skeletons */}
        <div className="space-y-10">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-white/5">
                <div className="flex-1 p-6 md:p-10 space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 animate-pulse shrink-0" />
                    <div className="flex-1 space-y-4">
                      <div className="h-8 w-1/2 bg-slate-200 animate-pulse rounded" />
                      <div className="h-4 w-1/4 bg-slate-100 animate-pulse rounded" />
                      <div className="flex gap-4">
                        <div className="h-4 w-24 bg-slate-50 animate-pulse rounded" />
                        <div className="h-4 w-24 bg-slate-50 animate-pulse rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-50 animate-pulse rounded" />
                    <div className="h-4 w-5/6 bg-slate-50 animate-pulse rounded" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-10 pt-4">
                    <div className="space-y-4">
                      <div className="h-6 w-32 bg-slate-100 animate-pulse rounded" />
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-slate-50 animate-pulse rounded" />
                        <div className="h-3 w-full bg-slate-50 animate-pulse rounded" />
                        <div className="h-3 w-2/3 bg-slate-50 animate-pulse rounded" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-6 w-32 bg-slate-100 animate-pulse rounded" />
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-slate-50 animate-pulse rounded" />
                        <div className="h-3 w-full bg-slate-50 animate-pulse rounded" />
                        <div className="h-3 w-2/3 bg-slate-50 animate-pulse rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-80 p-8 bg-slate-50/20 space-y-8">
                  <div className="space-y-4">
                    <div className="h-4 w-24 bg-slate-200 animate-pulse rounded" />
                    <div className="h-10 w-full bg-slate-100 animate-pulse rounded-xl" />
                  </div>
                  <div className="space-y-4 pt-4">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="flex gap-3 items-center">
                        <div className="h-10 w-10 bg-slate-100 animate-pulse rounded-full" />
                        <div className="space-y-1">
                          <div className="h-3 w-24 bg-slate-200 animate-pulse rounded" />
                          <div className="h-2 w-16 bg-slate-100 animate-pulse rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
