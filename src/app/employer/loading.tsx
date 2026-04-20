
import { Loader2 } from "lucide-react";

export default function EmployerLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 pb-8 border-b border-slate-100">
        <div className="h-9 w-72 bg-slate-200 rounded-lg" />
        <div className="h-4 w-[30rem] bg-slate-100 rounded-md" />
      </div>

      <div className="space-y-8">
        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-3 w-24 bg-slate-100 rounded" />
                <div className="h-4 w-4 bg-slate-100 rounded" />
              </div>
              <div className="h-8 w-16 bg-slate-200 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Content Area Skeleton (Simplified Table/List) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <div className="h-4 w-32 bg-slate-200 rounded" />
              <div className="h-8 w-24 bg-slate-200 rounded-lg" />
           </div>
           <div className="p-6 space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                 <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-slate-100" />
                       <div className="space-y-2">
                          <div className="h-4 w-48 bg-slate-200 rounded" />
                          <div className="h-3 w-32 bg-slate-100 rounded" />
                       </div>
                    </div>
                    <div className="h-4 w-20 bg-slate-200 rounded" />
                 </div>
              ))}
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
