"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useEffect } from "react";
import { 
  User as UserIcon, 
  MoreVertical,
  Loader2,
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

  // Filter and rejection states
  const [statusFilter, setStatusFilter] = useState<'PENDING' | 'APPROVED' | 'ALL'>('PENDING');
  const [rejectingEntryId, setRejectingEntryId] = useState<string | null>(null);
  const [rejectionFeedback, setRejectionFeedback] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    const result = await getEmployerStudentsLogs();
    if (result.success && result.data) {
      setTrainees(result.data);
      // Auto-select the first student if none selected yet
      if (result.data.length > 0 && !selectedStudentId) {
        setSelectedStudentId(result.data[0].studentId);
      }
    }
    setIsLoading(false);
  }

  const handleStatusUpdate = async (entryId: string, status: 'APPROVED' | 'REJECTED', feedback?: string) => {
    setIsProcessing(entryId);
    const result = await updateLogStatus(entryId, status, feedback);
    if (result.success) {
      await loadData();
    } else {
      alert("Error updating status: " + result.error);
    }
    setIsProcessing(null);
  };

  const selectedStudent = trainees.find(s => s.studentId === selectedStudentId);

  // Filter logs for the selected student
  const filteredLogs = selectedStudent?.logs.filter((entry: LogbookEntry) => {
    if (statusFilter === 'ALL') return true;
    return entry.status === statusFilter;
  }) || [];

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
      <div className="space-y-8 max-w-7xl mx-auto pb-24">
        {/* 1. Header Section - Editorial & Archival style */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/80">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Supervisor Portal</span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              Trainee Logbooks
            </h2>
            <p className="text-muted-foreground text-xs font-medium">
              Review, verify, and monitor daily industrial tasks and recorded hours.
            </p>
          </div>
          
          {/* Custom functional status segmented filter */}
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg border border-border/60 self-start md:self-auto">
            <button 
              onClick={() => setStatusFilter('PENDING')}
              className={cn(
                "px-3.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                statusFilter === 'PENDING' 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              To Review
            </button>
            <button 
              onClick={() => setStatusFilter('APPROVED')}
              className={cn(
                "px-3.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                statusFilter === 'APPROVED' 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Approved
            </button>
            <button 
              onClick={() => setStatusFilter('ALL')}
              className={cn(
                "px-3.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                statusFilter === 'ALL' 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All Logs
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 2. Trainee Selection Sidebar - Restrained style */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Trainees List</h3>
              <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full">{trainees.length}</span>
            </div>
            
            <div className="space-y-1.5">
              {trainees.map((trainee: TraineeWithLogs) => {
                const pendingCount = trainee.logs.filter((l: LogbookEntry) => l.status === 'PENDING').length;
                const isSelected = selectedStudentId === trainee.studentId;
                
                return (
                  <button
                    key={trainee.id}
                    onClick={() => {
                      setSelectedStudentId(trainee.studentId);
                      setRejectingEntryId(null); // Clear active rejection prompt
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left group relative",
                      isSelected 
                        ? "bg-primary/5 text-primary border-primary/40 shadow-sm" 
                        : "bg-card border-border/60 hover:border-primary/20 hover:bg-muted/40"
                    )}
                  >
                    {/* Visual left highlight line */}
                    {isSelected && (
                      <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-primary rounded-r-md" />
                    )}

                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[11px] transition-colors shrink-0",
                      isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground/50"
                    )}>
                      {trainee.studentName?.[0] || "?"}
                    </div>

                    <div className="flex-1 overflow-hidden pr-2">
                      <p className="font-semibold text-xs text-foreground truncate group-hover:text-primary transition-colors">
                        {trainee.studentName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={cn("w-1.5 h-1.5 rounded-full", pendingCount > 0 ? "bg-amber-500" : "bg-emerald-500")} />
                        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60">
                          {pendingCount} new logs
                        </p>
                      </div>
                    </div>

                    {isSelected && <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0 opacity-80" />}
                  </button>
                );
              })}

              {trainees.length === 0 && !isLoading && (
                <div className="p-8 text-center border border-dashed border-border/50 rounded-xl">
                  <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">No trainees assigned</p>
                </div>
              )}
            </div>
          </div>

          {/* 3. Logbook Content Area - Clean Document Style */}
          <div className="lg:col-span-9">
            {selectedStudentId ? (
              <div className="space-y-5">
                {/* Active Student Header Bar */}
                <div className="flex items-center justify-between bg-muted/20 p-4 rounded-xl border border-border/60">
                  <h3 className="text-base font-bold text-foreground font-heading">{selectedStudent?.studentName}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-card rounded-md border border-border/40 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                      Logs count: {selectedStudent?.logs.length}
                    </div>
                    <button className="h-7 w-7 rounded-md bg-card border border-border/40 flex items-center justify-center hover:bg-muted transition-all text-muted-foreground/50 hover:text-primary">
                      <Filter className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Logs Listing */}
                <div className="space-y-4">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((entry: LogbookEntry) => {
                      const isRejecting = rejectingEntryId === entry.id;

                      return (
                        <div key={entry.id} className="bg-card border border-border/60 rounded-xl p-5 transition-all hover:bg-muted/10 relative overflow-hidden group">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="flex items-start gap-4 flex-1">
                              {/* Structured Date Block */}
                              <div className="w-12 h-12 rounded-lg bg-muted/60 border border-border/40 flex flex-col items-center justify-center shrink-0">
                                <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-wider leading-none mb-0.5">
                                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                                <span className="text-lg font-bold text-foreground leading-none">
                                  {new Date(entry.date).getDate()}
                                </span>
                              </div>

                              <div className="space-y-2 flex-1">
                                {/* Details Meta Information */}
                                <div className="flex items-center gap-2">
                                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-muted rounded border border-border/40 text-[10px] font-bold text-foreground font-mono">
                                    {entry.hours} hours
                                  </div>
                                  <span className={cn(
                                    "px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border",
                                    entry.status === 'PENDING' ? "bg-amber-500/5 text-amber-700 border-amber-500/20" :
                                    entry.status === 'APPROVED' ? "bg-emerald-500/5 text-emerald-700 border-emerald-500/20" :
                                    "bg-rose-500/5 text-rose-700 border-rose-500/20"
                                  )}>
                                    {entry.status}
                                  </span>
                                </div>

                                {/* Clean Italic Task Details */}
                                <div className="text-sm text-foreground/90 font-serif italic leading-relaxed py-1 pr-4">
                                  {entry.tasks}
                                </div>

                                {/* Feedback Block (Visible if saved or submitted) */}
                                {entry.feedback && (
                                  <div className="text-[11px] font-medium text-rose-700/80 bg-rose-50/50 border border-rose-100/50 rounded px-2.5 py-1 mt-1.5 max-w-2xl">
                                    <span className="font-bold">Revision requested:</span> &ldquo;{entry.feedback}&rdquo;
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Action Operations */}
                            <div className="shrink-0 flex items-center md:items-start md:flex-col gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-border/40">
                              {entry.status === 'PENDING' ? (
                                isRejecting ? (
                                  <div className="flex flex-col gap-2 w-full min-w-[220px] max-w-sm">
                                    <input 
                                      type="text" 
                                      value={rejectionFeedback} 
                                      onChange={(e) => setRejectionFeedback(e.target.value)} 
                                      placeholder="Revision notes (optional)" 
                                      className="w-full text-xs px-2.5 py-1.5 rounded border border-border bg-background focus:ring-1 focus:ring-primary/20 outline-none font-medium"
                                      required
                                    />
                                    <div className="flex items-center gap-1.5">
                                      <button
                                        onClick={() => {
                                          handleStatusUpdate(entry.id, 'REJECTED', rejectionFeedback || 'Revisions required.');
                                          setRejectingEntryId(null);
                                        }}
                                        disabled={isProcessing === entry.id}
                                        className="flex-1 py-1.5 px-3 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] uppercase tracking-wider transition-colors disabled:opacity-50"
                                      >
                                        Confirm Reject
                                      </button>
                                      <button
                                        onClick={() => {
                                          setRejectingEntryId(null);
                                          setRejectionFeedback('');
                                        }}
                                        className="py-1.5 px-2.5 rounded bg-muted hover:bg-muted/80 text-foreground font-bold text-[10px] uppercase tracking-wider transition-colors"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 w-full md:w-auto">
                                    <button
                                      onClick={() => handleStatusUpdate(entry.id, 'APPROVED')}
                                      disabled={isProcessing === entry.id}
                                      className="h-8 px-4 rounded bg-primary hover:bg-primary/95 text-white font-bold text-[10px] uppercase tracking-wider transition-colors disabled:opacity-50"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => {
                                        setRejectingEntryId(entry.id);
                                        setRejectionFeedback('');
                                      }}
                                      disabled={isProcessing === entry.id}
                                      className="h-8 px-3 rounded bg-muted border border-border text-[10px] font-bold text-muted-foreground hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors uppercase tracking-wider disabled:opacity-50"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                )
                              ) : (
                                <button className="h-8 w-8 flex items-center justify-center rounded bg-muted border border-border/40 text-muted-foreground/40 hover:bg-muted hover:text-foreground transition-all">
                                  <MoreVertical className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-16 flex flex-col items-center justify-center text-center bg-muted/10 border border-dashed border-border/50 rounded-xl">
                      <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                        No logs matching &ldquo;{statusFilter.toLowerCase()}&rdquo; status
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[40vh] flex flex-col items-center justify-center text-center bg-muted/10 border border-dashed border-border/60 rounded-xl p-8 animate-in-fade">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 border border-border/40">
                  <UserIcon className="h-5 w-5 text-muted-foreground/50" />
                </div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1.5 font-heading">
                  Select a Student
                </h4>
                <p className="text-muted-foreground text-xs max-w-xs leading-relaxed font-medium">
                  Choose a trainee from the list on the left to start verifying and approving their daily logs.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
