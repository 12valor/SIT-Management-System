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
      {/* 1. Header Section - Simplified */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-border/60">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20">
             <ShieldCheck className="h-3.5 w-3.5" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Supervisor Dashboard</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Logbook <span className="text-primary">Review</span>
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            Check and approve student daily logs.
          </p>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-muted rounded-xl border border-border/40">
           <button className="px-5 py-2 rounded-lg bg-card shadow-sm text-[10px] font-bold uppercase tracking-wider text-foreground">To Review</button>
           <button className="px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 hover:text-foreground transition-all">Approved</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. Trainee Selection Sidebar - Simplified */}
        <div className="lg:col-span-3 space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Your Students</h3>
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
                           {pendingCount} New
                         </p>
                      </div>
                    </div>
                    {isSelected && <ArrowRight className="h-3.5 w-3.5 text-white/50" />}
                  </button>
                );
              })}

              {trainees.length === 0 && !isLoading && (
                <div className="p-8 text-center border border-dashed border-border/40 rounded-2xl">
                   <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">No students assigned</p>
                </div>
              )}
           </div>
        </div>

        {/* 3. Logbook Content Area - Simplified */}
        <div className="lg:col-span-9">
           {selectedStudentId ? (
             <div className="space-y-6 animate-in-fade">
                <div className="flex items-center justify-between bg-muted/30 p-5 rounded-2xl border border-border/40">
                   <h3 className="text-xl font-bold tracking-tight text-foreground">{selectedStudent?.studentName}</h3>
                   <div className="flex items-center gap-2">
                      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border border-border/40 text-[9px] font-bold text-muted-foreground uppercase tracking-widest shadow-sm">
                         Logs: {selectedStudent?.logs.length}
                      </div>
                      <button className="h-9 w-9 rounded-lg bg-card border border-border/40 flex items-center justify-center hover:bg-muted transition-all text-muted-foreground/40 hover:text-primary">
                         <Filter className="h-3.5 w-3.5" />
                      </button>
                   </div>
                </div>

                <div className="space-y-4">
                   {selectedStudent && selectedStudent.logs.length > 0 ? (
                     selectedStudent.logs.map((entry: LogbookEntry) => (
                        <div key={entry.id} className="bg-card border border-border/50 rounded-2xl p-5 lg:p-6 transition-all hover:border-primary/20 group relative overflow-hidden">
                           <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                              <div className="flex items-start gap-5 flex-1">
                                 {/* Date */}
                                 <div className="w-12 h-12 rounded-xl bg-muted border border-border/40 flex flex-col items-center justify-center shrink-0 transition-colors group-hover:bg-primary group-hover:border-primary group-hover:text-white">
                                    <span className="text-[8px] font-bold uppercase leading-none mb-0.5 opacity-60">
                                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
                                    </span>
                                    <span className="text-lg font-bold leading-none">
                                      {new Date(entry.date).getDate()}
                                    </span>
                                 </div>

                                 <div className="space-y-3 flex-1">
                                    <div className="flex items-center gap-3">
                                       <div className="flex items-center gap-1.5 px-2 py-0.5 bg-muted/50 rounded-md border border-border/40 text-[10px] font-bold text-foreground">
                                          <Clock className="h-3 w-3 text-primary" />
                                          {entry.hours}h
                                       </div>
                                       <span className={cn(
                                          "px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider border flex items-center gap-1.5",
                                          entry.status === 'PENDING' ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                                          entry.status === 'APPROVED' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                                          "bg-rose-500/10 text-rose-600 border-rose-500/20"
                                       )}>
                                          {entry.status}
                                       </span>
                                    </div>

                                    <div className="p-4 rounded-xl bg-muted/20 border-l-2 border-primary/40">
                                       <p className="text-sm text-foreground/80 font-medium leading-relaxed italic">
                                          &ldquo;{entry.tasks}&rdquo;
                                       </p>
                                    </div>
                                 </div>
                              </div>

                              <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-border/40">
                                 {entry.status === 'PENDING' ? (
                                   <div className="flex items-center gap-2 w-full md:w-auto">
                                      <button
                                        onClick={() => handleStatusUpdate(entry.id, 'APPROVED')}
                                        disabled={isProcessing === entry.id}
                                        className="flex-1 md:flex-none h-10 px-5 rounded-lg bg-primary text-white font-bold text-[10px] uppercase tracking-wider disabled:opacity-30"
                                      >
                                         Approve
                                      </button>
                                      <button
                                        onClick={() => handleStatusUpdate(entry.id, 'REJECTED', 'Log insufficient.')}
                                        disabled={isProcessing === entry.id}
                                        className="h-10 px-4 rounded-lg bg-muted border border-border/40 text-[10px] font-bold text-muted-foreground/60 hover:bg-rose-500 hover:text-white transition-all uppercase tracking-wider disabled:opacity-30"
                                      >
                                         Reject
                                      </button>
                                   </div>
                                 ) : (
                                   <div className="flex flex-col items-end gap-2">
                                      {entry.feedback && (
                                        <div className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground/60 text-[8px] font-bold uppercase border border-border/40">
                                          {entry.feedback}
                                        </div>
                                      )}
                                      <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-muted border border-border/40 text-muted-foreground/40">
                                         <MoreVertical className="h-3.5 w-3.5" />
                                      </button>
                                   </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     ))
                   ) : (
                     <div className="py-20 flex flex-col items-center justify-center text-center bg-muted/10 border-2 border-dashed border-border/30 rounded-2xl">
                        <h3 className="text-sm font-bold text-foreground/30">No logs yet</h3>
                     </div>
                   )}
                </div>
             </div>
           ) : (
             <div className="h-[50vh] flex flex-col items-center justify-center text-center bg-card border border-border/40 rounded-3xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
                   <UserIcon className="h-6 w-6 text-muted-foreground/20" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground uppercase">
                  Select a student
                </h3>
                <p className="text-muted-foreground font-medium text-xs max-w-xs leading-relaxed">
                   Choose a student from the list to start reviewing their logs.
                </p>
             </div>
           )}
        </div>
      </div>
    </div>
    </Skeleton>
  );
}
