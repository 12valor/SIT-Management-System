"use client";

import { useMockStore } from "@/store/mock-store";
import { 
  Clock, 
  Send, 
  CheckCircle2, 
  Calendar,
  AlertCircle,
  TrendingUp,
  FileText,
  Building2,
  Timer,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentDashboard() {
  const { user, applications, logbookEntries, postings } = useMockStore();

  const studentApplications = applications.filter(a => a.studentEmail === user?.email);
  const pendingApps = studentApplications.filter(a => a.status === 'Pending').length;
  const acceptedApps = studentApplications.filter(a => a.status === 'Accepted').length;
  
  const totalHours = logbookEntries
    .filter(e => e.studentEmail === user?.email && e.status === 'Approved')
    .reduce((acc, curr) => acc + curr.hours, 0);

  const stats = [
    { 
      label: "SIT Hours", 
      value: `${totalHours}/300`, 
      icon: Clock, 
      color: "text-blue-600",
      bg: "bg-blue-600/10",
      description: "Hours completed & approved" 
    },
    { 
      label: "Applications", 
      value: studentApplications.length.toString(), 
      icon: Send, 
      color: "text-primary",
      bg: "bg-primary/10",
      description: `${pendingApps} pending response` 
    },
    { 
      label: "Approved Logs", 
      value: logbookEntries.filter(e => e.status === 'Approved').length.toString(), 
      icon: CheckCircle2, 
      color: "text-green-600",
      bg: "bg-green-600/10",
      description: "Validated SIT entries" 
    },
    { 
      label: "Recent Activity", 
      value: "Daily", 
      icon: TrendingUp, 
      color: "text-amber-600",
      bg: "bg-amber-600/10",
      description: "Active SIT participation" 
    },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Message */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">How's your day, {user?.name?.split(' ')[0] || 'Student'}?</h1>
          <p className="text-muted-foreground font-medium">Keep track of your training progress and applications.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border shadow-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
              <stat.icon className={cn("h-6 w-6", stat.color)} />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
            <div className="text-2xl font-black mb-1">{stat.value}</div>
            <p className="text-xs text-muted-foreground font-medium">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Applications
            </h3>
            <button className="text-sm font-bold text-primary hover:underline">View all</button>
          </div>
          
          <div className="space-y-3">
            {studentApplications.length > 0 ? (
              studentApplications.slice(0, 5).map((app) => {
                const posting = postings.find(p => p.id === app.postingId);
                return (
                  <div key={app.id} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-bold text-lg">
                        {posting?.company[0]}
                      </div>
                      <div>
                        <p className="font-bold">{posting?.title}</p>
                        <p className="text-xs font-medium text-muted-foreground">{posting?.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-muted-foreground">Applied on</p>
                        <p className="text-xs font-semibold">{new Date(app.appliedAt).toLocaleDateString()}</p>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                        app.status === 'Pending' ? "bg-amber-500/10 text-amber-600 border-amber-200" :
                        app.status === 'Accepted' ? "bg-green-500/10 text-green-600 border-green-200" :
                        "bg-destructive/10 text-destructive border-destructive/20"
                      )}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-card/50">
                <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="font-bold">No applications yet</p>
                <p className="text-sm text-muted-foreground">Start applying for SIT positions to see them here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Logbook View */}
        <div className="space-y-4">
           <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-primary" />
              Quick Logbook
            </h3>
            <div className="p-6 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 space-y-4 relative overflow-hidden group">
               <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-white/10 blur-[50px] rounded-full group-hover:scale-110 transition-transform" />
               <div className="relative z-10">
                 <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-1">Today's Progress</p>
                 <h4 className="text-xl font-black mb-4">Update your logbook</h4>
                 <div className="space-y-4">
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-white transition-all duration-500" 
                         style={{ width: `${Math.min((totalHours / 300) * 100, 100)}%` }} 
                       />
                    </div>
                    <p className="text-xs font-medium opacity-90">
                      You have completed {totalHours}/300 hours of your SIT required module.
                    </p>
                    <button className="w-full py-2.5 rounded-xl bg-white text-primary text-sm font-bold shadow-sm hover:scale-[1.02] active:scale-95 transition-all">
                       Submit Daily Entry
                    </button>
                 </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
