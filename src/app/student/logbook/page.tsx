"use client";

import { useState, useEffect } from "react";
import { 
  PlusCircle, 
  Clock, 
  Calendar as CalendarIcon, 
  Timer, 
  FileText,
  Search,
  MoreVertical,
  X,
  Loader2,
  TrendingUp,
  Zap,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStudentLogbook, submitLogbookEntry } from "./actions";
import { LogbookData, LogbookEntry } from "./types";

export default function LogbookPage() {
  const [data, setData] = useState<LogbookData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState("");
  const [tasks, setTasks] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    const result = await getStudentLogbook();
    if (result.success && result.data) {
      setData(result.data);
    }
    setIsLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await submitLogbookEntry({
      date,
      hours: Number(hours),
      tasks,
    });

    if (result.success) {
      setIsAdding(false);
      setHours("");
      setTasks("");
      loadData();
    } else {
      alert("Error: " + result.error);
    }
    setIsSubmitting(false);
  };

  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-black uppercase tracking-widest text-xs animate-pulse">
          {isLoading ? "Synchronizing Archive Records..." : "Logbook Data Unavailable"}
        </p>
      </div>
    );
  }

  const progress = Math.min((data.totalApprovedHours / 300) * 100, 100);

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-24 animate-in-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
             <ShieldCheck className="h-4 w-4" />
             <span className="text-[10px] font-black uppercase tracking-widest">Compliance Registry</span>
          </div>
          <h2 className="text-6xl font-black tracking-tighter leading-none uppercase">Virtual <span className="text-primary">Archive</span></h2>
          <p className="text-muted-foreground font-medium text-lg">Official documentation for your Supervised Industrial Training manifest.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-primary text-primary-foreground font-black tracking-widest uppercase text-xs shadow-3xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all group"
        >
          <PlusCircle className="h-5 w-5 group-hover:rotate-90 transition-transform" />
          Append New Entry
        </button>
      </div>

      {/* Progress Overview Card */}
      <div className="group p-10 lg:p-14 rounded-[3.5rem] bg-card border border-border/60 shadow-4xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
         
         {/* Radial Progress */}
         <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
               <circle cx="96" cy="96" r="86" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/50" />
               <circle 
                 cx="96" cy="96" r="86" stroke="currentColor" strokeWidth="12" fill="transparent" 
                 strokeDasharray={540} 
                 strokeDashoffset={540 - (540 * progress / 100)} 
                 strokeLinecap="round" 
                 className="text-primary transition-all duration-2000 ease-out shadow-[0_0_20px_rgba(128,0,0,0.4)]" 
               />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-4xl font-black tracking-tighter text-foreground leading-none">{Math.round(progress)}%</span>
               <span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em] mt-2">Manifested</span>
            </div>
         </div>

         <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-14">
               <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.3em] leading-none mb-3">Modular Target</p>
                  <p className="text-3xl font-black tracking-tighter">300.00<span className="text-xs text-muted-foreground ml-1">HRS</span></p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.3em] leading-none mb-3">Validated Credit</p>
                  <p className="text-3xl font-black tracking-tighter text-primary">{data.totalApprovedHours.toFixed(2)}<span className="text-xs text-muted-foreground ml-1">HRS</span></p>
               </div>
               <div className="space-y-1 col-span-2 md:col-span-1">
                  <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.3em] leading-none mb-3">Deficit Requirement</p>
                  <p className="text-3xl font-black tracking-tighter text-primary">{Math.max(300 - data.totalApprovedHours, 0).toFixed(2)}<span className="text-xs text-muted-foreground ml-1">HRS</span></p>
               </div>
            </div>
            <div className="p-6 rounded-[1.5rem] bg-muted/50 border border-border flex items-center gap-5">
               <div className="p-3 bg-primary rounded-xl shadow-lg shadow-primary/20">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
               </div>
               <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                 Academic status: Your manifest is currently at <span className="font-black text-foreground underline decoration-primary/30 underline-offset-4">{data.totalApprovedHours} validated hours</span>. Compliance protocol requires a minimum of 300 for SIT module certification.
               </p>
            </div>
         </div>
      </div>

      {/* Entry History */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
          <h3 className="text-2xl font-black flex items-center gap-4 tracking-tight uppercase">
            <div className="p-2 bg-primary rounded-lg text-primary-foreground">
              <Timer className="h-6 w-6" />
            </div>
            Historical Manifest
          </h3>
          <div className="relative group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
             <input 
              type="text" 
              placeholder="Filter operational logs..." 
              className="pl-12 pr-6 py-4 rounded-[1.5rem] border border-border bg-card text-xs font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none w-full md:w-80 transition-all shadow-sm"
             />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {data.entries.length > 0 ? (
            data.entries.map((entry: LogbookEntry) => (
              <div key={entry.id} className="group flex flex-col md:flex-row md:items-center justify-between p-8 rounded-[2.5rem] bg-card border border-border/60 hover:bg-primary/5 transition-all relative overflow-hidden">
                <div className="flex items-center gap-8 relative z-10">
                   <div className="flex flex-col items-center justify-center w-20 h-20 rounded-[1.5rem] bg-muted border border-border/40 group-hover:bg-primary transition-all group-hover:border-primary group-hover:scale-105">
                     <span className="text-[10px] font-black uppercase text-muted-foreground group-hover:text-primary-foreground leading-none mb-1">
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
                     </span>
                     <span className="text-3xl font-black text-foreground group-hover:text-primary-foreground leading-none">
                        {new Date(entry.date).toLocaleDateString('en-US', { day: 'numeric' })}
                     </span>
                   </div>
                   <div className="space-y-2">
                     <p className="text-lg font-black tracking-tight text-foreground leading-none">{entry.tasks.slice(0, 60)}{entry.tasks.length > 60 ? '...' : ''}</p>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-background rounded-lg border border-border/40 shadow-sm">
                           <Clock className="h-3.5 w-3.5 text-primary" />
                           <span className="text-xs font-black tracking-tighter text-foreground">{entry.hours} Hours Logged</span>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{entry.tasks.length} Characters recorded</p>
                     </div>
                   </div>
                </div>
                
                <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-10 relative z-10">
                   <div className="flex flex-col items-end gap-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Status Protocol</p>
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-2",
                        entry.status === 'PENDING' ? "bg-primary/5 text-primary border-primary/20" :
                        entry.status === 'APPROVED' ? "bg-primary/10 text-primary border-primary/20 font-bold" :
                        "bg-destructive/10 text-destructive border-destructive/20"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", 
                           entry.status === 'PENDING' ? "bg-primary animate-pulse" : 
                           entry.status === 'APPROVED' ? "bg-primary" : "bg-destructive")} 
                        />
                        {entry.status}
                      </span>
                   </div>
                   <button className="h-12 w-12 rounded-2xl bg-muted border border-border/40 flex items-center justify-center transition-all hover:bg-primary hover:text-primary-foreground group/btn">
                     <MoreVertical className="h-5 w-5 text-muted-foreground group-hover/btn:text-primary-foreground" />
                   </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-40 text-center rounded-[4rem] border-2 border-dashed border-border/40 bg-muted/40 opacity-40">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-8">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-3xl font-black mb-3 tracking-tight">Empty Manifest</h3>
                <p className="text-base font-medium max-w-sm mx-auto text-muted-foreground leading-relaxed">No operational entries detected. Initialize your SIT record to begin data tracking.</p>
            </div>
          )}
        </div>
      </div>

      {/* Entry Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl animate-in-fade" onClick={() => setIsAdding(false)} />
          <div className="relative w-full max-w-[42rem] bg-card border border-border/60 rounded-[3rem] shadow-4xl overflow-hidden animate-in-bounce">
            <div className="p-10 md:p-14 border-b border-border/50 flex justify-between items-center relative z-10">
              <div className="space-y-2">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg text-primary-foreground">
                       <Zap className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Protocol Initialization</span>
                 </div>
                 <h3 className="text-4xl font-black tracking-tighter uppercase">Submit <span className="text-primary">Entry</span></h3>
              </div>
              <button 
                onClick={() => setIsAdding(false)}
                className="h-14 w-14 rounded-2xl bg-muted hover:bg-destructive hover:text-white flex items-center justify-center transition-all shadow-inner group"
              >
                <X className="h-6 w-6 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-10 md:p-14 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Manifest Date</label>
                    <div className="relative group/field">
                      <CalendarIcon className="absolute left-5 top-5 h-5 w-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-14 pr-6 h-16 rounded-[1.5rem] border border-border bg-muted/30 focus:bg-card focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-sm font-black transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Duration (Hours)</label>
                    <div className="relative group/field">
                      <Clock className="absolute left-5 top-5 h-5 w-5 text-muted-foreground group-focus-within/field:text-primary transition-colors" />
                      <input 
                        type="number" 
                        step="0.5"
                        placeholder="e.g. 8.0"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="w-full pl-14 pr-6 h-16 rounded-[1.5rem] border border-border bg-muted/30 focus:bg-card focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-sm font-black transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Operational Activity Summary</label>
                  <textarea 
                    placeholder="Provide a professional summary of your tasks, industrial contributions, and daily accomplishments..."
                    value={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                    className="w-full p-8 h-48 rounded-[2rem] border border-border bg-muted/30 focus:bg-card focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-base font-medium leading-relaxed transition-all resize-none shadow-sm"
                    required
                  />
                </div>
              </div>
              
              <div className="p-10 md:p-14 bg-muted/30 border-t border-border/50">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex h-20 items-center justify-center rounded-[2rem] bg-primary px-8 text-sm font-black text-primary-foreground uppercase tracking-[0.3em] shadow-3xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-30 disabled:grayscale"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>Commit Entry to Archive <ChevronRight className="ml-3 h-5 w-5" /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
