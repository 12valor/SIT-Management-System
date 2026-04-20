
import { Loader2 } from "lucide-react";

export default function CoordinatorLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 pb-8 border-b border-slate-100">
        <div className="h-9 w-80 bg-slate-200 rounded-lg" />
        <div className="h-4 w-[35rem] bg-slate-100 rounded-md" />
      </div>

      <div className="space-y-8">
        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-3 w-28 bg-slate-100 rounded" />
                <div className="h-4 w-4 bg-slate-100 rounded" />
              </div>
              <div className="h-8 w-12 bg-slate-200 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Content Area Skeleton (Registry Table) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
              <div className="h-4 w-40 bg-slate-200 rounded" />
           </div>
           <div className="p-0">
              <div className="border-b border-slate-50 bg-slate-50/30 px-6 py-3 grid grid-cols-5 gap-4">
                 {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-3 w-16 bg-slate-100 rounded" />
                 ))}
              </div>
              <div className="p-0">
                 {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="px-6 py-4 border-b border-slate-50 last:border-0 grid grid-cols-5 gap-4 items-center">
                       <div className="space-y-1.5 flex-1">
                          <div className="h-4 w-32 bg-slate-200 rounded" />
                          <div className="h-2.5 w-24 bg-slate-100 rounded" />
                       </div>
                       <div className="h-3 w-24 bg-slate-100 rounded" />
                       <div className="h-3 w-24 bg-slate-100 rounded" />
                       <div className="h-3 w-20 bg-slate-100 rounded" />
                       <div className="flex justify-end">
                          <div className="h-6 w-16 bg-slate-100 rounded-md" />
                       </div>
                    </div>
                 ))}
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
