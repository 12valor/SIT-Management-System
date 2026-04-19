"use client";

import { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User as UserIcon, 
  MessageSquare,
  ClipboardCheck,
  MoreVertical,
  Filter,
  Loader2,
  ShieldCheck,
  Zap,
  ArrowRight
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

  if (isLoading && trainees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Accessing Personnel Manifest...</p>
      </div>
    );
  }

  const selectedStudent = trainees.find(s => s.studentId === selectedStudentId);

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 animate-in-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
             <ShieldCheck className="h-4 w-4" />
             <span className="text-[10px] font-black uppercase tracking-widest">Supervisor Oversight</span>
          </div>
          <h2 className="text-6xl font-black tracking-tighter leading-none italic uppercase">Logbook <span className="text-blue-600">Verification</span></h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Industrial certification and daily activity auditing for SIT trainees.</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
           <button className="px-6 py-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-lg text-[10px] font-black uppercase tracking-widest transition-all">Pending Matrix</button>
           <button className="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">Audit Archive</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Left Sidebar: Trainee Manifest */}
        <div className="lg:col-span-1 space-y-6">
           <div className="flex items-center justify-between px-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Personnel</h3>
              <div className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-black">{trainees.length}</div>
           </div>
           
           <div className="space-y-3">
              {trainees.map((trainee: TraineeWithLogs) => {
                const pendingCount = trainee.logs.filter((l: LogbookEntry) => l.status === 'PENDING').length;
                return (
                  <button
                    key={trainee.id}
                    onClick={() => setSelectedStudentId(trainee.studentId)}
                    className={cn(
                      "w-full flex items-center gap-4 p-5 rounded-[2rem] border transition-all text-left relative overflow-hidden group",
                      selectedStudentId === trainee.studentId 
                        ? "bg-slate-950 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-500 shadow-2xl shadow-blue-600/20" 
                        : "bg-card border-border/60 hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/5"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm ring-4 ring-white/5 shadow-2xl transition-transform group-hover:rotate-3",
                      selectedStudentId === trainee.studentId ? "bg-white/10" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                    )}>
                      {trainee.studentName?.[0] || "?"}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-black text-sm tracking-tight truncate uppercase italic">{trainee.studentName}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <div className={cn("w-1.5 h-1.5 rounded-full", pendingCount > 0 ? "bg-amber-500 animate-pulse" : "bg-emerald-500")} />
                         <p className={cn(
                           "text-[9px] font-black uppercase tracking-widest",
                           selectedStudentId === trainee.studentId ? "text-blue-200" : "text-slate-400"
                         )}>
                           {pendingCount} Pending Entries
                         </p>
                      </div>
                    </div>
                    {selectedStudentId === trainee.studentId && <ArrowRight className="h-4 w-4 text-white opacity-40 shrink-0" />}
                  </button>
                );
              })}

              {trainees.length === 0 && (
                <div className="p-14 text-center border-2 border-dashed border-border/60 rounded-[3rem] opacity-40">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">No assigned trainees detected in current manifest.</p>
                </div>
              )}
           </div>
        </div>

        {/* Main Content: Logbook Review Matrix */}
        <div className="lg:col-span-3">
           {selectedStudentId ? (
             <div className="space-y-10 animate-in-fade">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
                   <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Verification Stream</p>
                     <h3 className="text-3xl font-black flex items-center gap-4 tracking-tighter italic uppercase text-slate-900 dark:text-white">
                        {selectedStudent?.studentName}
                     </h3>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="px-5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-border/60 flex items-center gap-3">
                         <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Logs: {selectedStudent?.logs.length}</span>
                      </div>
                      <button className="h-12 w-12 rounded-xl bg-white dark:bg-slate-800 border border-border/60 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
                         <Filter className="h-5 w-5 text-slate-400" />
                      </button>
                   </div>
                </div>

                <div className="space-y-6">
                   {selectedStudent && selectedStudent.logs.length > 0 ? (
                     selectedStudent.logs.map((entry: LogbookEntry) => (
                        <div key={entry.id} className="bg-card border border-border/60 rounded-[2.5rem] p-8 lg:p-10 shadow-3xl hover:shadow-4xl transition-all group overflow-hidden relative">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[80px] rounded-full" />
                           <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 relative z-10">
                              <div className="flex items-start gap-8 flex-1">
                                 <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800/50 border border-border/40 flex flex-col items-center justify-center shrink-0 group-hover:bg-blue-600 transition-all group-hover:border-blue-500 group-hover:scale-105 shadow-sm">
                                    <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-blue-100 leading-none mb-1">
                                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
                                    </span>
                                    <span className="text-2xl font-black leading-none group-hover:text-white">
                                      {new Date(entry.date).getDate()}
                                    </span>
                                 </div>
                                 <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                       <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 rounded-lg border border-border/40 shadow-sm">
                                          <Clock className="h-4 w-4 text-blue-600" />
                                          <span className="text-sm font-black tracking-tighter text-slate-900 dark:text-white uppercase">{entry.hours} Hours</span>
                                       </div>
                                       <span className={cn(
                                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-2",
                                          entry.status === 'PENDING' ? "bg-amber-50 text-amber-600 border-amber-200" :
                                          entry.status === 'APPROVED' ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                                          "bg-rose-50 text-rose-600 border-rose-200"
                                       )}>
                                          <div className={cn("w-1.5 h-1.5 rounded-full", entry.status === 'PENDING' ? "bg-amber-500" : entry.status === 'APPROVED' ? "bg-emerald-500" : "bg-rose-500")} />
                                          {entry.status}
                                       </span>
                                    </div>
                                    <div className="p-6 rounded-[1.5rem] bg-slate-50/50 dark:bg-slate-800/30 border-l-4 border-blue-600 shadow-inner">
                                       <p className="text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                                          &quot;{entry.tasks}&quot;
                                       </p>
                                    </div>
                                 </div>
                              </div>

                              <div className="flex flex-col items-end gap-3 shrink-0 pt-6 md:pt-0 border-t md:border-t-0 border-border/40">
                                 {entry.status === 'PENDING' ? (
                                   <div className="flex items-center gap-3 w-full md:w-auto">
                                      <button
                                        onClick={() => handleStatusUpdate(entry.id, 'APPROVED')}
                                        disabled={isProcessing === entry.id}
                                        className="flex-1 md:flex-none h-14 px-8 rounded-2xl bg-slate-950 dark:bg-blue-600 text-white font-black text-xs shadow-2xl shadow-blue-600/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest disabled:opacity-30"
                                      >
                                         {isProcessing === entry.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                                         Certify
                                      </button>
                                      <button
                                        onClick={() => handleStatusUpdate(entry.id, 'REJECTED', 'Industrial manifest is insufficient or unclear.')}
                                        disabled={isProcessing === entry.id}
                                        className="h-14 px-6 rounded-2xl bg-white dark:bg-slate-800 border border-border/60 text-[10px] font-black hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-30"
                                      >
                                         <XCircle className="h-4 w-4" />
                                         Reject
                                      </button>
                                   </div>
                                 ) : (
                                   <div className="flex flex-col items-end gap-3">
                                      {entry.feedback && (
                                        <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest border border-border/40">
                                          <MessageSquare className="h-3.5 w-3.5" />
                                          {entry.feedback}
                                        </div>
                                      )}
                                      <button className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-border/40 hover:bg-slate-900 hover:text-white transition-all group/btn shadow-sm">
                                         <MoreVertical className="h-5 w-5 text-slate-400 group-hover/btn:text-white" />
                                      </button>
                                   </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     ))
                   ) : (
                     <div className="py-40 flex flex-col items-center justify-center text-center bg-card border-2 border-dashed border-border/40 rounded-[3rem] opacity-40">
                        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-8">
                           <ClipboardCheck className="h-10 w-10 text-slate-300" />
                        </div>
                        <h3 className="text-3xl font-black mb-3 tracking-tight">Audit Stream Empty</h3>
                        <p className="text-base font-medium max-w-sm mx-auto text-slate-500 leading-relaxed italic italic">No active manifest entries detected for this trainee. Real-time logging will populate this module.</p>
                     </div>
                   )}
                </div>
             </div>
           ) : (
             <div className="h-[70vh] flex flex-col items-center justify-center text-center bg-card border border-border/60 rounded-[4rem] p-20 shadow-4xl relative overflow-hidden group">
                <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[200%] bg-blue-600/5 blur-[120px] skew-x-12 rotate-12" />
                <div className="w-28 h-28 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center mb-10 shadow-3xl ring-8 ring-blue-600/5">
                   <UserIcon className="h-12 w-12 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase italic">Initialize <span className="text-blue-600">Review</span></h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-sm font-medium leading-relaxed italic">
                   Select a professional trainee from the manifest manifest to commence industrial performance auditing.
                </p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
