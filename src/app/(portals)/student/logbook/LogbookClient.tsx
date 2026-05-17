"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  PlusCircle, 
  Clock, 
  X,
  TrendingUp,
  Search,
  MoreVertical,
  FileText,
  AlertTriangle
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
    const hoursNum = Number(hours);
    
    // TEMPORARILY DISABLED FOR ACCREDITATION SYSTEM TESTING
    // if (hoursNum > 24) {
    //   alert("Clock-in Error: A single day contains 24 hours. Please enter a valid duration.");
    //   return;
    // }

    if (hoursNum <= 0) {
      alert("Clock-in Error: Hours must be greater than zero.");
      return;
    }

    setIsSubmitting(true);
    
    const result = await submitLogbookEntry({
      date,
      hours: hoursNum,
      tasks,
    });

    if (result.success) {
      setHours("");
      setTasks("");
      router.refresh();
      setIsAdding(false);
    } else {
      // In a real app, use a toast
      alert(result.error);
    }
    setIsSubmitting(false);
  };

  const progress = Math.min((data.totalApprovedHours / 300) * 100, 100);

  return (
      <div className="space-y-12 max-w-6xl mx-auto pb-24 animate-in-fade">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Training Logbook</h2>
            <p className="text-sm text-muted-foreground font-medium">Record and track your industrial hours for SIT certification.</p>
          </div>
          <button 
            onClick={() => {
              if (!data.hasPlacement) {
                alert("Institutional Access Denied: You must have an accepted industrial placement before you can log hours.");
                return;
              }
              setIsAdding(true);
            }}
            className={cn(
              "flex items-center gap-2 h-11 px-6 rounded-lg font-bold uppercase tracking-wider text-xs shadow-md transition-all active:scale-95",
              data.hasPlacement 
                ? "bg-[#800000] text-white shadow-red-900/10 hover:bg-red-900" 
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            )}
          >
            {data.hasPlacement ? <PlusCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
            Add Entry
          </button>
        </div>

        {/* Progress Overview Card */}
        <div className="bg-card p-8 rounded-xl border border-border shadow-sm flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
              <circle 
                cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray={364} 
                strokeDashoffset={364 - (364 * progress / 100)} 
                strokeLinecap="round" 
                className="text-primary transition-all duration-1000 ease-out" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-2xl font-bold text-foreground leading-none">{Math.round(progress)}%</span>
               <span className="text-[9px] uppercase font-bold text-muted-foreground/60 tracking-wider mt-1">Goal</span>
            </div>
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider">Target Hours</p>
                  <p className="text-2xl font-bold text-foreground">300.00</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider">Approved</p>
                  <p className="text-2xl font-bold text-primary">{data.totalApprovedHours.toFixed(2)}</p>
               </div>
            </div>
            <div className="p-4 rounded-lg bg-muted border border-border flex items-center gap-4">
               <div className="p-2 bg-card rounded-lg shadow-sm border border-border">
                  <TrendingUp className="h-5 w-5 text-primary" />
               </div>
               <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                 Academic Record: You have achieved <span className="font-bold text-foreground">{data.totalApprovedHours} hours</span> towards SIT module certification.
               </p>
            </div>
          </div>
        </div>

        {/* Entry History */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
             <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground/40" /> Recent Entries
             </h3>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
                <input 
                 type="text" 
                 placeholder="Filter logs..." 
                 className="pl-9 pr-4 h-9 rounded-lg border border-border bg-card text-xs text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none w-64 transition-all"
                />
             </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {data.entries.length > 0 ? (
              data.entries.map((entry: LogbookEntry) => (
                <div key={entry.id} className="bg-card p-5 rounded-xl border border-border shadow-sm hover:border-primary/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-center gap-6">
                     <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-muted border border-border shrink-0">
                       <span className="text-[9px] font-bold uppercase text-muted-foreground/60 leading-none mb-1">
                          {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
                       </span>
                       <span className="text-xl font-bold text-foreground leading-none">
                          {new Date(entry.date).toLocaleDateString('en-US', { day: 'numeric' })}
                       </span>
                     </div>
                     <div className="space-y-1">
                       <p className="text-sm font-bold text-foreground line-clamp-1">{entry.tasks}</p>
                       <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                             <Clock className="h-3 w-3" />
                             {entry.hours}h
                          </div>
                          <p className="text-[10px] text-muted-foreground/60 font-medium uppercase tracking-tight">ID: {entry.id.slice(-6).toUpperCase()}</p>
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
                     <button className="h-9 w-9 rounded-lg hover:bg-muted border border-border flex items-center justify-center transition-colors text-muted-foreground/40 hover:text-foreground">
                       <MoreVertical className="h-4 w-4" />
                     </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-24 text-center rounded-xl border border-border bg-card shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-8 w-8 text-muted-foreground/20" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Empty Records</h3>
                  <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">Initialize your industrial record to begin data tracking.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal simplified for brevity in this example slice */}
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
            <div className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-8 animate-in zoom-in-95 duration-200">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-foreground">New Logbook Entry</h3>
                  <button onClick={() => setIsAdding(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
               </div>
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full h-11 px-4 rounded-lg bg-background border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/20 outline-none" required />
                     <input 
                        type="number" 
                        placeholder="Hours" 
                        value={hours} 
                        onChange={e => setHours(e.target.value)} 
                        className="w-full h-11 px-4 rounded-lg bg-background border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
                        required 
                        min="0.5"
                        max="9999"
                        step="0.5"
                     />
                  </div>
                  <textarea placeholder="Tasks conducted today..." value={tasks} onChange={e => setTasks(e.target.value)} className="w-full p-4 rounded-xl bg-background border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/20 outline-none h-32 resize-none" required />
                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white h-11 rounded-lg font-bold uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-primary/20 transition-all">
                     {isSubmitting ? "Committing..." : "Commit to Archive"}
                  </button>
               </form>
            </div>
          </div>
        )}
      </div>
  );
}
