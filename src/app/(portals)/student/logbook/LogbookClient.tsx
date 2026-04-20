"use client";

import { Skeleton } from "boneyard-js/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  PlusCircle, 
  Clock, 
  X,
  TrendingUp,
  Search,
  MoreVertical,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { submitLogbookEntry } from "./actions";
import { LogbookData, LogbookEntry } from "./types";

interface LogbookClientProps {
  initialData: LogbookData;
  studentName?: string;
}

export function LogbookClient({ initialData }: LogbookClientProps) {
  const router = useRouter();
  const [data] = useState<LogbookData>(initialData);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState("");
  const [tasks, setTasks] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await submitLogbookEntry({
      date,
      hours: Number(hours),
      tasks,
    });

    if (result.success) {
      setHours("");
      setTasks("");
      router.refresh();
      setIsAdding(false);
    } else {
      alert("Error: " + result.error);
    }
    setIsSubmitting(false);
  };

  const progress = Math.min((data.totalApprovedHours / 300) * 100, 100);

  return (
    <Skeleton name="student-logbook" loading={false}>
      <div className="space-y-12 max-w-6xl mx-auto pb-24 animate-in-fade">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">Training Logbook</h2>
            <p className="text-sm text-slate-500 font-medium">Record and track your industrial hours for SIT certification.</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 h-11 px-6 rounded-lg bg-[#800000] text-white font-bold uppercase tracking-wider text-xs shadow-md shadow-red-900/10 hover:bg-red-900 transition-all active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            Add Entry
          </button>
        </div>

        {/* Progress Overview Card */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
              <circle 
                cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray={364} 
                strokeDashoffset={364 - (364 * progress / 100)} 
                strokeLinecap="round" 
                className="text-[#800000] transition-all duration-1000 ease-out" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-2xl font-bold text-slate-800 leading-none">{Math.round(progress)}%</span>
               <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mt-1">Goal</span>
            </div>
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Target Hours</p>
                  <p className="text-2xl font-bold text-slate-800">300.00</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Approved</p>
                  <p className="text-2xl font-bold text-[#800000]">{data.totalApprovedHours.toFixed(2)}</p>
               </div>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-4">
               <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                  <TrendingUp className="h-5 w-5 text-[#800000]" />
               </div>
               <p className="text-xs text-slate-500 font-medium leading-relaxed">
                 Academic Record: You have achieved <span className="font-bold text-slate-800">{data.totalApprovedHours} hours</span> towards SIT module certification.
               </p>
            </div>
          </div>
        </div>

        {/* Entry History */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
             <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-300" /> Recent Entries
             </h3>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input 
                 type="text" 
                 placeholder="Filter logs..." 
                 className="pl-9 pr-4 h-9 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] outline-none w-64 transition-all"
                />
             </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {data.entries.length > 0 ? (
              data.entries.map((entry: LogbookEntry) => (
                <div key={entry.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-[#800000]/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                     <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                       <span className="text-[9px] font-bold uppercase text-slate-400 leading-none mb-1">
                          {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
                       </span>
                       <span className="text-xl font-bold text-slate-700 leading-none">
                          {new Date(entry.date).toLocaleDateString('en-US', { day: 'numeric' })}
                       </span>
                     </div>
                     <div className="space-y-1">
                       <p className="text-sm font-bold text-slate-800 line-clamp-1">{entry.tasks}</p>
                       <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-[#800000] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                             <Clock className="h-3 w-3" />
                             {entry.hours}h
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">ID: {entry.id.slice(-6).toUpperCase()}</p>
                       </div>
                     </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                     <div className="flex flex-col items-end">
                        <span className={cn(
                          "px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border shadow-sm flex items-center gap-1.5",
                          entry.status === 'PENDING' ? "bg-amber-50 text-amber-600 border-amber-100" :
                          entry.status === 'APPROVED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          "bg-red-50 text-red-600 border-red-100"
                        )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", 
                             entry.status === 'PENDING' ? "bg-amber-400 animate-pulse" : 
                             entry.status === 'APPROVED' ? "bg-emerald-500" : "bg-red-500")} 
                          />
                          {entry.status}
                        </span>
                     </div>
                     <button className="h-9 w-9 rounded-lg hover:bg-slate-50 border border-slate-200 flex items-center justify-center transition-colors text-slate-400 hover:text-slate-600">
                       <MoreVertical className="h-4 w-4" />
                     </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-24 text-center rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-8 w-8 text-slate-200" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Empty Records</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto">Initialize your industrial record to begin data tracking.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal simplified for brevity in this example slice */}
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-8 animate-in zoom-in-95 duration-200">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-900">New Logbook Entry</h3>
                  <button onClick={() => setIsAdding(false)}><X className="h-4 w-4" /></button>
               </div>
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2 rounded text-slate-900 bg-white" required />
                     <input type="number" placeholder="Hours" value={hours} onChange={e => setHours(e.target.value)} className="border p-2 rounded text-slate-900 bg-white" required />
                  </div>
                  <textarea placeholder="Tasks" value={tasks} onChange={e => setTasks(e.target.value)} className="w-full border p-2 rounded h-32 text-slate-900 bg-white" required />
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#800000] text-white p-3 rounded font-bold uppercase tracking-widest text-xs">
                     {isSubmitting ? "Committing..." : "Commit to Archive"}
                  </button>
               </form>
            </div>
          </div>
        )}
      </div>
    </Skeleton>
  );
}
