import { Loader2 } from "lucide-react";
import { Skeleton, CardSkeleton, TableRowSkeleton } from "@/components/ui/skeleton";

export default function CoordinatorLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 pb-8 border-b border-slate-100 mb-8">
        <Skeleton className="h-9 w-80" />
        <Skeleton className="h-4 w-[35rem] opacity-50" />
      </div>

      <div className="space-y-8">
        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>

        {/* Content Area Skeleton (Registry Table) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
              <Skeleton className="h-4 w-40" />
           </div>
           <div className="p-0">
              <div className="border-b border-slate-50 bg-slate-50/30 px-6 py-3 grid grid-cols-5 gap-4">
                 {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-3 w-16" />
                 ))}
              </div>
              <div className="p-0">
                 {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="px-6 py-4 border-b border-slate-50 last:border-0 grid grid-cols-5 gap-4 items-center">
                       <div className="space-y-1.5 flex-1">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-28 opacity-50" />
                       </div>
                       <Skeleton className="h-4 w-24" />
                       <Skeleton className="h-4 w-24" />
                       <Skeleton className="h-4 w-20" />
                       <div className="flex justify-end">
                          <Skeleton className="h-7 w-20 rounded-lg" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Subtle Centered Feedback */}
      <div className="fixed bottom-12 right-12 flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-lg z-50">
         <Loader2 className="h-4 w-4 text-[#800000] animate-spin" />
         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Registry Analytics</span>
      </div>
    </div>
  );
}
