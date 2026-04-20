import { Loader2 } from "lucide-react";
import { Skeleton, CardSkeleton } from "@/components/ui/skeleton";

export default function StudentLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 pb-8 border-b border-slate-100 mb-8">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-96 opacity-50" />
      </div>

      <div className="space-y-8">
        {/* Identity Strip Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
          <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32 opacity-50" />
          </div>
          <Skeleton className="h-8 w-32 rounded-lg" />
        </div>

        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             {/* Content Area Skeleton */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                   <Skeleton className="h-4 w-32" />
                </div>
                <div className="p-6 space-y-6">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-3">
                         <div className="flex justify-between">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-5 w-20" />
                         </div>
                         <Skeleton className="h-16 w-full rounded-lg" />
                      </div>
                   ))}
                </div>
             </div>
          </div>
          <div className="space-y-8">
             {/* Sidebar Content Skeleton */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
                <Skeleton className="h-5 w-32" />
                <div className="space-y-4">
                   {[1, 2].map((i) => (
                      <div key={i} className="flex gap-4">
                         <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                         <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-3 w-2/3" />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Subtle Centered Feedback */}
      <div className="fixed bottom-12 right-12 flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-lg z-50">
         <Loader2 className="h-4 w-4 text-[#800000] animate-spin" />
         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Syncing Environment</span>
      </div>
    </div>
  );
}
