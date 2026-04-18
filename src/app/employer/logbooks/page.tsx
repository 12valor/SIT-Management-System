"use client";

import { useState } from "react";
import { useMockStore, LogbookEntry } from "@/store/mock-store";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  User as UserIcon, 
  ChevronRight,
  MessageSquare,
  ClipboardCheck,
  Calendar,
  MoreVertical,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmployerLogbookReviewPage() {
  const { applications, logbookEntries, updateLogbookStatus } = useMockStore();
  const [selectedStudentEmail, setSelectedStudentEmail] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Get hired students (Accepted status)
  const hiredStudents = applications.filter(a => a.status === 'Accepted');

  const getStudentEntries = (email: string) => {
    return logbookEntries.filter(e => e.studentEmail === email);
  };

  const handleStatusUpdate = async (entryId: string, status: LogbookEntry['status'], feedback?: string) => {
    setIsProcessing(entryId);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 800));
    updateLogbookStatus(entryId, status, feedback);
    setIsProcessing(null);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-gradient">Logbook Verification</h2>
          <p className="text-muted-foreground font-medium">Verify and approve student daily activities and hours.</p>
        </div>
        <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
           <button className="px-4 py-1.5 rounded-md bg-card shadow-sm text-xs font-bold transition-all">Pending Review</button>
           <button className="px-4 py-1.5 rounded-md text-xs font-bold text-muted-foreground hover:text-foreground transition-all">All History</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Hired Students */}
        <div className="lg:col-span-1 space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Trainees</h3>
              <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full">{hiredStudents.length}</span>
           </div>
           
           <div className="space-y-2">
              {hiredStudents.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedStudentEmail(app.studentEmail)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                    selectedStudentEmail === app.studentEmail 
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                      : "bg-card border-border hover:border-primary/50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ring-2 ring-white/10",
                    selectedStudentEmail === app.studentEmail ? "bg-white/20" : "bg-muted text-muted-foreground"
                  )}>
                    {app.studentName[0]}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-sm truncate">{app.studentName}</p>
                    <p className={cn(
                      "text-[10px] font-medium truncate",
                      selectedStudentEmail === app.studentEmail ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {getStudentEntries(app.studentEmail).filter(e => e.status === 'Pending').length} Pending Logs
                    </p>
                  </div>
                  <ChevronRight className={cn("h-4 w-4 shrink-0", selectedStudentEmail === app.studentEmail ? "opacity-100" : "opacity-30")} />
                </button>
              ))}

              {hiredStudents.length === 0 && (
                <div className="p-10 text-center border-2 border-dashed border-border rounded-xl">
                   <p className="text-xs font-bold text-muted-foreground/60 italic">No hired students yet</p>
                </div>
              )}
           </div>
        </div>

        {/* Main Content: Logbook Entries */}
        <div className="lg:col-span-3">
           {selectedStudentEmail ? (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-bold flex items-center gap-2">
                      <ClipboardCheck className="h-5 w-5 text-primary" />
                      Activities for {hiredStudents.find(s => s.studentEmail === selectedStudentEmail)?.studentName}
                   </h3>
                   <div className="flex items-center gap-3">
                      <button className="h-9 px-4 rounded-lg bg-card border border-border text-xs font-bold hover:bg-muted transition-colors flex items-center gap-2">
                         <Filter className="h-3.5 w-3.5" /> Filter
                      </button>
                   </div>
                </div>

                <div className="space-y-4">
                   {getStudentEntries(selectedStudentEmail).length > 0 ? (
                     getStudentEntries(selectedStudentEmail)
                      .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((entry) => (
                        <div key={entry.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all group">
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start gap-4 flex-1">
                                 <div className="w-12 h-12 rounded-xl bg-muted/50 border border-border flex flex-col items-center justify-center shrink-0">
                                    <span className="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1">
                                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
                                    </span>
                                    <span className="text-lg font-black leading-none">
                                      {new Date(entry.date).getDate()}
                                    </span>
                                 </div>
                                 <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                       <span className="text-lg font-bold">{entry.hours} Hours</span>
                                       <span className={cn(
                                          "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                          entry.status === 'Pending' ? "bg-amber-100 text-amber-600 border-amber-200" :
                                          entry.status === 'Approved' ? "bg-green-100 text-green-600 border-green-200" :
                                          "bg-red-100 text-red-600 border-red-200"
                                       )}>
                                          {entry.status}
                                       </span>
                                    </div>
                                    <p className="text-sm text-foreground/80 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-4 py-1">
                                       "{entry.tasks}"
                                    </p>
                                 </div>
                              </div>

                              <div className="flex items-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-border/50">
                                 {entry.status === 'Pending' ? (
                                   <>
                                      <button
                                        onClick={() => handleStatusUpdate(entry.id, 'Approved')}
                                        disabled={isProcessing === entry.id}
                                        className="flex-1 md:flex-none h-10 px-6 rounded-lg bg-green-600 text-white font-black text-xs shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                                      >
                                         {isProcessing === entry.id ? <Clock className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                                         Approve
                                      </button>
                                      <button
                                        onClick={() => handleStatusUpdate(entry.id, 'Rejected', 'Insufficient task description')}
                                        disabled={isProcessing === entry.id}
                                        className="h-10 px-4 rounded-lg bg-card border border-border text-xs font-bold hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all flex items-center justify-center gap-2"
                                      >
                                         <XCircle className="h-3.5 w-3.5" />
                                         Reject
                                      </button>
                                   </>
                                 ) : (
                                   <div className="flex items-center gap-2">
                                      {entry.feedback && (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-[11px] font-medium">
                                          <MessageSquare className="h-3 w-3" />
                                          {entry.feedback}
                                        </div>
                                      )}
                                      <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                                         <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                      </button>
                                   </div>
                                 )}
                              </div>
                           </div>
                        </div>
                      ))
                   ) : (
                     <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                        <ClipboardCheck className="h-12 w-12 mb-4 text-muted-foreground" />
                        <p className="font-bold">No entries to review for this student</p>
                        <p className="text-xs">Entries will appear here once the student starts logging their hours.</p>
                     </div>
                   )}
                </div>
             </div>
           ) : (
             <div className="h-[60vh] flex flex-col items-center justify-center text-center bg-card border border-dashed border-border rounded-3xl p-12">
                <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                   <UserIcon className="h-10 w-10 text-primary/30" />
                </div>
                <h3 className="text-2xl font-black mb-2">Select a Trainee</h3>
                <p className="text-muted-foreground text-sm max-w-xs font-medium">
                   Select a student from the left sidebar to start reviewing their digital logbooks and industrial performance.
                </p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
