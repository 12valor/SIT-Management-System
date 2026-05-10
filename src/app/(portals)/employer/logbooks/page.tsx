"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User as UserIcon, 
  MessageSquare,
  ClipboardCheck,
  MoreVertical,
  Search,
  Loader2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getEmployerStudentsLogs, updateLogStatus } from "./actions";
import { TraineeWithLogs } from "./types";
import { LogbookEntry } from "../../student/logbook/types";

export default function EmployerLogbookReviewPage() {
  const [trainees, setTrainees] = useState<TraineeWithLogs[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    const result = await getEmployerStudentsLogs();
    if (result.success && result.data) {
      setTrainees(result.data);
    }
    setIsLoading(false);
  }

  const handleStatusUpdate = async (entryId: string, status: 'APPROVED' | 'REJECTED', feedback?: string) => {
    setIsProcessing(entryId);
    const result = await updateLogStatus(entryId, status, feedback);
    if (result.success) {
      await loadData();
    } else {
      alert("Error: " + result.error);
    }
    setIsProcessing(null);
  };

  const selectedStudent = trainees.find(s => s.studentId === selectedStudentId);

  return (
    <Skeleton 
      name="employer-logbooks" 
      loading={isLoading && trainees.length === 0}
      fallback={
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin opacity-20" />
        </div>
      }
    >
    <div className="space-y-10 max-w-7xl mx-auto pb-24 animate-in-fade">
      {/* 1. Header Section - Refined Maroon Theme */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-border/60">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20">
             <ShieldCheck className="h-3.5 w-3.5" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Supervisor Terminal</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground flex items-baseline gap-3">
            Logbook <span className="text-primary italic">Verification</span>
          </h2>
          <p className="text-muted-foreground text-sm font-medium max-w-xl">
            Audit and certify industrial training logs for assigned trainees in real-time.
          </p>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-muted rounded-xl border border-border/40">
           <button className="px-5 py-2 rounded-lg bg-card shadow-sm text-[10px] font-bold uppercase tracking-wider text-foreground">Pending</button>
           <button className="px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 hover:text-foreground transition-all">Archived</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. Trainee Selection Sidebar */}
        <div className="lg:col-span-3 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Personnel Manifest</h3>
              <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full">{trainees.length}</span>
           </div>
           
           <div className="space-y-2">
              {trainees.map((trainee: TraineeWithLogs) => {
                const pendingCount = trainee.logs.filter((l: LogbookEntry) => l.status === 'PENDING').length;
                const isSelected = selectedStudentId === trainee.studentId;
                
                return (
                  <button
                    key={trainee.id}
                    onClick={() => setSelectedStudentId(trainee.studentId)}
                    className={cn(
                      "w-full flex items-center gap-3.5 p-4 rounded-2xl border transition-all text-left group",
                      isSelected 
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                        : "bg-card border-border/50 hover:border-primary/30 hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-transform group-hover:scale-105",
                      isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground/40"
                    )}>
                      {trainee.studentName?.[0] || "?"}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className={cn("font-bold text-xs tracking-tight truncate", isSelected ? "text-white" : "text-foreground")}>
                        {trainee.studentName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                         <div className={cn("w-1 h-1 rounded-full", pendingCount > 0 ? "bg-amber-400" : "bg-emerald-400")} />
                         <p className={cn("text-[9px] font-bold uppercase tracking-wider", isSelected ? "text-white/60" : "text-muted-foreground/50")}>
                           {pendingCount} Pending
                         </p>
                      </div>
                    </div>
                    {isSelected && <ArrowRight className="h-3.5 w-3.5 text-white/50" />}
                  </button>
                );
              })}

              {trainees.length === 0 && !isLoading && (
                <div className="p-10 text-center border-2 border-dashed border-border/40 rounded-3xl">
                   <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">No trainees assigned</p>
                </div>
              )}
           </div>
        </div>

        {/* 3. Logbook Content Area */}
        <div className="lg:col-span-9">
           {selectedStudentId ? (
             <div className="space-y-8 animate-in-fade">
                <div className="flex items-center justify-between bg-muted/30 p-6 rounded-3xl border border-border/40">
                   <div className="space-y-1">
                     <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Verification Stream</p>
                     <h3 className="text-2xl font-bold tracking-tight text-foreground">{selectedStudent?.studentName}</h3>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border/40 text-[10px] font-bold text-muted-foreground uppercase tracking-widest shadow-sm">
                         <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                         Entries: {selectedStudent?.logs.length}
                      </div>
                      <button className="h-10 w-10 rounded-xl bg-card border border-border/40 flex items-center justify-center hover:bg-muted transition-all text-muted-foreground/40 hover:text-primary">
                         <Filter className="h-4 w-4" />
                      </button>
                   </div>
                </div>

                <div className="space-y-4">
                   {selectedStudent && selectedStudent.logs.length > 0 ? (
                     selectedStudent.logs.map((entry: LogbookEntry) => (
                        <div key={entry.id} className="bg-card border border-border/50 rounded-3xl p-6 lg:p-8 transition-all hover:shadow-md hover:border-primary/20 group relative overflow-hidden">
                           <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                              <div className="flex items-start gap-6 flex-1">
                                 {/* Date Badge */}
                                 <div className="w-14 h-14 rounded-2xl bg-muted border border-border/40 flex flex-col items-center justify-center shrink-0 transition-colors group-hover:bg-primary group-hover:border-primary group-hover:text-white">
                                    <span className="text-[9px] font-bold uppercase leading-none mb-1 opacity-60">
                                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
                                    </span>
                                    <span className="text-xl font-bold leading-none">
                                      {new Date(entry.date).getDate()}
                                    </span>
                                 </div>

                                 <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                       <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-lg border border-border/40">
                                          <Clock className="h-3.5 w-3.5 text-primary" />
                                          <span className="text-xs font-bold text-foreground">{entry.hours} Hours</span>
                                       </div>
                                       <span className={cn(
                                          "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1.5",
                                          entry.status === 'PENDING' ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                                          entry.status === 'APPROVED' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                                          "bg-rose-500/10 text-rose-600 border-rose-500/20"
                                       )}>
                                          <div className={cn("w-1 h-1 rounded-full", entry.status === 'PENDING' ? "bg-amber-500" : entry.status === 'APPROVED' ? "bg-emerald-500" : "bg-rose-500")} />
                                          {entry.status}
                                       </span>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-muted/20 border-l-2 border-primary/40">
                                       <p className="text-sm text-foreground/80 font-medium leading-relaxed italic">
                                          &ldquo;{entry.tasks}&rdquo;
                                       </p>
                                    </div>
                                 </div>
                              </div>

                              <div className="flex md:flex-col items-center md:items-end gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-border/40">
                                 {entry.status === 'PENDING' ? (
                                   <div className="flex items-center gap-2 w-full md:w-auto">
                                      <button
                                        onClick={() => handleStatusUpdate(entry.id, 'APPROVED')}
                                        disabled={isProcessing === entry.id}
                                        className="flex-1 md:flex-none h-11 px-6 rounded-xl bg-primary text-white font-bold text-[11px] shadow-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-30"
                                      >
                                         {isProcessing === entry.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                                         Certify
                                      </button>
                                      <button
                                        onClick={() => handleStatusUpdate(entry.id, 'REJECTED', 'Log insufficient.')}
                                        disabled={isProcessing === entry.id}
                                        className="h-11 px-4 rounded-xl bg-muted border border-border/40 text-[11px] font-bold text-muted-foreground/60 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-30"
                                      >
                                         <XCircle className="h-3.5 w-3.5" />
                                         Reject
                                      </button>
                                   </div>
                                 ) : (
                                   <div className="flex flex-col items-end gap-3">
                                      {entry.feedback && (
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-muted-foreground/60 text-[9px] font-bold uppercase tracking-widest border border-border/40 max-w-[200px] truncate">
                                          <MessageSquare className="h-3 w-3" />
                                          {entry.feedback}
                                        </div>
                                      )}
                                      <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-muted border border-border/40 hover:bg-muted/80 transition-all text-muted-foreground/40">
                                         <MoreVertical className="h-4 w-4" />
                                      </button>
                                   </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     ))
                   ) : (
                     <div className="py-24 flex flex-col items-center justify-center text-center bg-muted/20 border-2 border-dashed border-border/40 rounded-[2.5rem]">
                        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
                           <ClipboardCheck className="h-8 w-8 text-muted-foreground/20" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-foreground/40">Audit Stream Empty</h3>
                        <p className="text-xs font-medium max-w-xs mx-auto text-muted-foreground/30 leading-relaxed">No logs have been submitted by this trainee yet.</p>
                     </div>
                   )}
                </div>
             </div>
           ) : (
             <div className="h-[60vh] flex flex-col items-center justify-center text-center bg-card border border-border/40 rounded-[3rem] p-12 shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mb-8 shadow-inner">
                   <UserIcon className="h-8 w-8 text-muted-foreground/20 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-foreground uppercase">
                  Initialize <span className="text-primary">Review</span>
                </h3>
                <p className="text-muted-foreground font-medium text-sm max-w-sm leading-relaxed">
                   Select a professional trainee from the manifest to commence industrial performance auditing and log certification.
                </p>
             </div>
           )}
        </div>
      </div>
    </div>
    </Skeleton>
  );
}
