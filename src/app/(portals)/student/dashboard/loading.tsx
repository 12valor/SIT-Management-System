import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col pt-10">
      <div className="flex items-center gap-3 animate-pulse">
        <div className="h-8 w-64 bg-slate-200 rounded-lg" />
      </div>
      
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
      
      <div className="mt-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-[400px] bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
        <div className="space-y-6">
           <div className="h-48 bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
           <div className="h-64 bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
