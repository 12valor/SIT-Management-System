"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useEffect } from "react";
import { Loader2, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getEmployerStudentsLogs, updateLogStatus } from "./actions";
import { TraineeWithLogs } from "./types";
import { LogbookEntry } from "../../student/logbook/types";

export default function EmployerLogbookReviewPage() {
  const [trainees, setTrainees] = useState<TraineeWithLogs[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simple state filters
  const [statusFilter, setStatusFilter] = useState<'PENDING' | 'APPROVED' | 'ALL'>('PENDING');
  const [rejectingEntryId, setRejectingEntryId] = useState<string | null>(null);
  const [rejectionFeedback, setRejectionFeedback] = useState<string>('');

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData() {
    setIsLoading(true);
    const result = await getEmployerStudentsLogs();
    if (result.success && result.data) {
      setTrainees(result.data);
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
      alert("Error: " + result.error);
    }
    setIsProcessing(null);
  };

  const selectedStudent = trainees.find(s => s.studentId === selectedStudentId);

  const filteredLogs = selectedStudent?.logs.filter((entry: LogbookEntry) => {
    if (statusFilter === 'ALL') return true;
    return entry.status === statusFilter;
  }) || [];

  return (
    <Skeleton 
      name="employer-logbooks" 
      loading={isLoading && trainees.length === 0}
      fallback={
        <div className="flex flex-col items-center justify-center h-[50vh] gap-3">
          <Loader2 className="h-6 w-6 text-primary animate-spin opacity-40" />
          <span className="text-xs text-muted-foreground font-medium">Loading records...</span>
        </div>
      }
    >
      <div className="space-y-6 max-w-7xl mx-auto pb-24">
        {/* 1. Header Section - Clean and Institutional */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-4 border-b border-border">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground font-heading">
              Logbook Verification
            </h1>
            <p className="text-muted-foreground text-xs mt-0.5">
              Review and verify daily industrial tasks and hours recorded by assigned trainees.
            </p>
          </div>

          {/* Simple flat text tabs */}
          <div className="flex items-center gap-5 text-xs">
            <button 
              onClick={() => setStatusFilter('PENDING')}
              className={cn(
                "pb-1 font-semibold transition-colors border-b-2 border-transparent",
                statusFilter === 'PENDING' ? "text-primary border-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              To Review
            </button>
            <button 
              onClick={() => setStatusFilter('APPROVED')}
              className={cn(
                "pb-1 font-semibold transition-colors border-b-2 border-transparent",
                statusFilter === 'APPROVED' ? "text-primary border-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Verified
            </button>
            <button 
              onClick={() => setStatusFilter('ALL')}
              className={cn(
                "pb-1 font-semibold transition-colors border-b-2 border-transparent",
                statusFilter === 'ALL' ? "text-primary border-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              All Entries
            </button>
          </div>
        </div>

        {/* 2. Structured Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar - Minimal Tree-Like Link List */}
          <div className="lg:col-span-3 space-y-4 lg:border-r lg:border-border/50 lg:pr-6 min-h-[300px]">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">
                Assigned Students
              </h3>
              <div className="mt-2.5 space-y-0.5">
                {trainees.map((trainee: TraineeWithLogs) => {
                  const pendingCount = trainee.logs.filter((l: LogbookEntry) => l.status === 'PENDING').length;
                  const isSelected = selectedStudentId === trainee.studentId;
                  
                  return (
                    <button
                      key={trainee.id}
                      onClick={() => {
                        setSelectedStudentId(trainee.studentId);
                        setRejectingEntryId(null);
                      }}
                      className={cn(
                        "w-full text-left py-2 px-3 text-xs rounded transition-colors flex items-center justify-between",
                        isSelected 
                          ? "bg-muted text-foreground font-semibold" 
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      )}
                    >
                      <span>{trainee.studentName}</span>
                      {pendingCount > 0 && (
                        <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm">
                          {pendingCount}
                        </span>
                      )}
                    </button>
                  );
                })}

                {trainees.length === 0 && !isLoading && (
                  <div className="py-8 text-center border border-dashed border-border/40 rounded">
                    <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-wider">No assigned trainees</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main List Column */}
          <div className="lg:col-span-9 space-y-6">
            {selectedStudentId ? (
              <div className="space-y-4">
                {/* Minimal title row */}
                <div className="flex items-baseline justify-between border-b border-border/40 pb-2">
                  <h2 className="text-sm font-bold text-foreground">
                    {selectedStudent?.studentName}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Total recorded hours: <span className="font-mono font-semibold text-foreground">{selectedStudent?.logs.reduce((sum, l) => sum + l.hours, 0)} hrs</span>
                  </span>
                </div>

                {/* Flat list instead of cards */}
                <div className="divide-y divide-border/40">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((entry: LogbookEntry) => {
                      const isRejecting = rejectingEntryId === entry.id;
                      const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      });

                      return (
                        <div key={entry.id} className="py-4 first:pt-0">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-1.5 flex-1 pr-6">
                              {/* Metadata indicators */}
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="font-semibold text-foreground">{formattedDate}</span>
                                <span>•</span>
                                <span className="font-mono text-foreground font-semibold">{entry.hours.toFixed(1)} hrs</span>
                                <span>•</span>
                                <span className={cn(
                                  "text-[10px] font-bold uppercase tracking-wider",
                                  entry.status === 'PENDING' ? "text-amber-600" :
                                  entry.status === 'APPROVED' ? "text-emerald-600" : "text-rose-600"
                                )}>
                                  {entry.status}
                                </span>
                              </div>

                              {/* Task details */}
                              <div className="text-xs text-foreground/80 leading-relaxed font-medium">
                                {entry.tasks}
                              </div>

                              {/* Feedback comments */}
                              {entry.feedback && (
                                <div className="text-xs text-rose-700 bg-rose-50/40 border border-rose-100/50 rounded px-2 py-1.5 mt-1.5">
                                  <span className="font-semibold">Feedback request:</span> &ldquo;{entry.feedback}&rdquo;
                                </div>
                              )}
                            </div>

                            {/* Verification triggers */}
                            <div className="shrink-0 flex items-center gap-3 self-start md:self-auto min-h-[28px]">
                              {entry.status === 'PENDING' ? (
                                isRejecting ? (
                                  <div className="flex items-center gap-2">
                                    <input 
                                      type="text" 
                                      value={rejectionFeedback} 
                                      onChange={(e) => setRejectionFeedback(e.target.value)} 
                                      placeholder="Feedback (optional)" 
                                      className="text-xs px-2.5 py-1 rounded border border-border bg-background outline-none font-medium focus:ring-1 focus:ring-primary/10 w-44"
                                      required
                                    />
                                    <button
                                      onClick={() => {
                                        handleStatusUpdate(entry.id, 'REJECTED', rejectionFeedback || 'Revisions required.');
                                        setRejectingEntryId(null);
                                      }}
                                      disabled={isProcessing === entry.id}
                                      className="text-[10px] font-bold text-rose-600 hover:underline disabled:opacity-50"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() => {
                                        setRejectingEntryId(null);
                                        setRejectionFeedback('');
                                      }}
                                      className="text-[10px] font-bold text-muted-foreground hover:underline"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-3 text-xs">
                                    <button
                                      onClick={() => handleStatusUpdate(entry.id, 'APPROVED')}
                                      disabled={isProcessing === entry.id}
                                      className="text-primary hover:underline font-bold disabled:opacity-50"
                                    >
                                      Verify
                                    </button>
                                    <button
                                      onClick={() => {
                                        setRejectingEntryId(entry.id);
                                        setRejectionFeedback('');
                                      }}
                                      disabled={isProcessing === entry.id}
                                      className="text-rose-600 hover:underline font-bold disabled:opacity-50"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                )
                              ) : (
                                <span className="text-[10px] text-muted-foreground/60 font-semibold uppercase tracking-wider select-none">
                                  {entry.status.toLowerCase()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-12 text-center bg-muted/5 border border-dashed border-border/40 rounded">
                      <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest">
                        No {statusFilter.toLowerCase()} entries found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[30vh] flex flex-col items-center justify-center text-center bg-muted/5 border border-dashed border-border/40 rounded p-6">
                <UserIcon className="h-5 w-5 text-muted-foreground/30 mb-2" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Select a Trainee
                </h4>
                <p className="text-muted-foreground text-xs max-w-xs leading-relaxed">
                  Choose a student from the sidebar list to inspect their logged training records.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
