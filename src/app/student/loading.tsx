
import { Loader2 } from "lucide-react";

export default function StudentLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 pb-8 border-b border-slate-100">
        <div className="h-9 w-64 bg-slate-200 rounded-lg" />
        <div className="h-4 w-96 bg-slate-100 rounded-md" />
      </div>

      <div className="space-y-8">
        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-3 w-20 bg-slate-100 rounded" />
                <div className="h-4 w-4 bg-slate-100 rounded" />
              </div>
              <div className="h-8 w-24 bg-slate-200 rounded-lg" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             {/* Content Area Skeleton */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="h-6 w-48 bg-slate-100 rounded mb-8" />
                <div className="space-y-4">
                   {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-16 w-full bg-slate-50 rounded-lg border border-slate-100" />
                   ))}
                </div>
             </div>
          </div>
          <div className="space-y-8">
             {/* Sidebar Content Skeleton */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="h-6 w-32 bg-slate-100 rounded mb-4" />
                <div className="space-y-3">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 w-full bg-slate-50 rounded-lg" />
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Centered Spinner for additional visual feedback */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-[calc(50%+144px)]">
         <Loader2 className="h-8 w-8 text-[#800000] animate-spin opacity-20" />
      </div>
    </div>
  );
}
