"use client";

import { useMockStore } from "@/store/mock-store";
import { MapPin, Building2, User as UserIcon, AlertCircle } from "lucide-react";

export default function CoordinatorPlacementsPage() {
  const { applications, postings } = useMockStore();
  const hired = applications.filter(a => a.status === 'Accepted');

  return (
    <div className="space-y-8 animate-in-fade">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-black text-slate-900 dark:text-white">Active Placements</h1>
         <div className="px-4 py-2 rounded-xl bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest">
            {hired.length} Students Hired
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hired.map((app) => {
          const posting = postings.find(p => p.id === app.postingId);
          return (
            <div key={app.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-indigo-600">
                    {app.studentName[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white">{app.studentName}</h4>
                    <p className="text-[10px] font-bold text-slate-400">{app.studentEmail}</p>
                  </div>
               </div>
               <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                     <Building2 className="h-4 w-4 text-indigo-500" />
                     {posting?.company || "Partner Company"}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                     <MapPin className="h-4 w-4 text-indigo-500" />
                     {posting?.location || "On-site"}
                  </div>
               </div>
            </div>
          );
        })}
        {hired.length === 0 && (
          <div className="col-span-full py-20 text-center opacity-40">
            <AlertCircle className="h-10 w-10 mx-auto mb-4" />
            <p className="font-black uppercase tracking-widest">No active placements registered</p>
          </div>
        )}
      </div>
    </div>
  );
}
