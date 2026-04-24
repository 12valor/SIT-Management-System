"use client";

export function PartnersShell() {
  return (
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

        {/* Technical Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-8 rounded-[5px] space-y-8"
            >
              <div className="flex gap-6 items-start">
                <div className="w-20 h-20 shrink-0 rounded-[5px] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] animate-pulse" />
                <div className="space-y-3 flex-1 pt-1">
                  <div className="h-3 w-1/4 bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
                  <div className="h-8 w-3/4 bg-slate-100 dark:bg-white/5 rounded-none animate-pulse" />
                  <div className="h-3 w-1/3 bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
                </div>
              </div>
              <div className="space-y-3 pl-4 border-l-2 border-slate-100 dark:border-white/5">
                <div className="h-4 w-full bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
                <div className="h-4 w-5/6 bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
              </div>
              <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-end">
                <div className="flex gap-8">
                  <div className="space-y-2">
                    <div className="h-2 w-12 bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
                    <div className="h-6 w-20 bg-slate-100 dark:bg-white/5 rounded-none animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-12 bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
                    <div className="h-6 w-20 bg-slate-100 dark:bg-white/5 rounded-none animate-pulse" />
                  </div>
                </div>
                <div className="h-11 w-32 bg-slate-50 dark:bg-white/5 border border-slate-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
