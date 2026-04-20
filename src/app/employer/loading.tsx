import { Loader2 } from "lucide-react";
import { Skeleton, CardSkeleton, TableRowSkeleton } from "@/components/ui/skeleton";

export default function EmployerLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 pb-8 border-b border-slate-100 mb-8">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-4 w-[30rem] opacity-50" />
      </div>

      <div className="space-y-8">
        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>

        {/* Content Area Skeleton (Simplified Table/List) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-24 rounded-lg" />
           </div>
           <div className="p-6 space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                 <TableRowSkeleton key={i} />
              ))}
           </div>
        </div>
      </div>

      {/* Subtle Centered Feedback */}
      <div className="fixed bottom-12 right-12 flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-lg z-50">
         <Loader2 className="h-4 w-4 text-[#800000] animate-spin" />
         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Industry Sync</span>
      </div>
    </div>
  );
}
