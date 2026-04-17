"use client";

import { useState } from "react";
import { useMockStore, LogbookEntry } from "@/store/mock-store";
import { 
  Plus, 
  Clock, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Timer, 
  AlertCircle,
  FileText,
  Search,
  MoreVertical,
  X,
  PlusCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LogbookPage() {
  const { user, logbookEntries, addLogbookEntry } = useMockStore();
  const [isAdding, setIsAdding] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState("");
  const [tasks, setTasks] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const studentEntries = logbookEntries.filter(e => e.studentEmail === user?.email);
  const totalApprovedHours = studentEntries
    .filter(e => e.status === 'Approved')
    .reduce((acc, curr) => acc + curr.hours, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    addLogbookEntry({
      studentEmail: user.email,
      date,
      hours: Number(hours),
      tasks,
    });

    setIsLoading(false);
    setIsAdding(false);
    setHours("");
    setTasks("");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Virtual Logbook</h2>
          <p className="text-muted-foreground font-medium">Record and track your daily industrial training activities.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
        >
          <PlusCircle className="h-5 w-5" />
          New Daily Entry
        </button>
      </div>

      {/* Progress Overview */}
      <div className="p-8 rounded-3xl bg-card border border-border shadow-sm flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-card to-muted/30">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted/50"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={364.42}
              strokeDashoffset={364.42 - (364.42 * (totalApprovedHours / 300))}
              strokeLinecap="round"
              className="text-primary transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black">{Math.round((totalApprovedHours / 300) * 100)}%</span>
            <span className="text-[10px] uppercase font-bold text-muted-foreground">Complete</span>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Target Hours</p>
              <p className="text-xl font-black">300h</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Approved</p>
              <p className="text-xl font-black text-green-600">{totalApprovedHours}h</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Remaining</p>
              <p className="text-xl font-black text-primary">{300 - totalApprovedHours}h</p>
            </div>
          </div>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            You've completed {totalApprovedHours} hours out of the 300 required for your SIT module. 
            Ensure all entries are verified by your supervisor.
          </p>
        </div>
      </div>

      {/* Entry History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            Recent Entries
          </h3>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <input 
              type="text" 
              placeholder="Filter by task..." 
              className="pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-xs font-medium focus:ring-2 focus:ring-primary/20 outline-none w-48 transition-all"
             />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Hours</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground line-clamp-1">Tasks & Activities</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {studentEntries.length > 0 ? (
                  studentEntries.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry) => (
                    <tr key={entry.id} className="hover:bg-muted/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-bold">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-black">{entry.hours}h</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground/80 font-medium max-w-xs">{entry.tasks}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                          entry.status === 'Pending' ? "bg-amber-500/10 text-amber-600 border-amber-200" :
                          entry.status === 'Approved' ? "bg-green-500/10 text-green-600 border-green-200" :
                          "bg-destructive/10 text-destructive border-destructive/20"
                        )}>
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right pr-6">
                        <button className="h-8 w-8 rounded-lg hover:bg-muted inline-flex items-center justify-center transition-colors">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                       <div className="flex flex-col items-center">
                          <AlertCircle className="h-10 w-10 text-muted-foreground/30 mb-3" />
                          <p className="font-bold text-muted-foreground">No logbook entries found</p>
                          <p className="text-xs text-muted-foreground">Click 'New Daily Entry' to record your first day.</p>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Entry Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
          <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border/50 flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Submit Daily Entry
              </h3>
              <button 
                onClick={() => setIsAdding(false)}
                className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Date</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 h-11 rounded-xl border border-border bg-muted/30 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Hours</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="number" 
                        step="0.5"
                        placeholder="e.g. 8"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="w-full pl-10 pr-4 h-11 rounded-xl border border-border bg-muted/30 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Activity Description</label>
                  <textarea 
                    placeholder="Describe your tasks and accomplishments today..."
                    value={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                    className="w-full p-4 h-32 rounded-xl border border-border bg-muted/30 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all resize-none"
                    required
                  />
                </div>
              </div>
              <div className="p-6 bg-muted/30 border-t border-border/50">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
                >
                  {isLoading ? (
                    <Clock className="h-5 w-5 animate-spin" />
                  ) : (
                    <>Submit Entry <CheckCircle2 className="ml-2 h-4 w-4" /></>
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
