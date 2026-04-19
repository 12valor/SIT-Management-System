"use client";

import { useMockStore } from "@/store/mock-store";
import { 
  Users, 
  ClipboardList, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmployerDashboard() {
  const { postings, applications } = useMockStore();

  const totalPostings = postings.length;
  const totalApplicants = applications.length;
  const pendingApplicants = applications.filter(a => a.status === 'Pending').length;

  const stats = [
    { 
      label: "Active Postings", 
      value: totalPostings.toString(), 
      icon: ClipboardList, 
      color: "text-primary",
      bg: "bg-primary/10",
      trend: "Currently active" 
    },
    { 
      label: "Total Applicants", 
      value: totalApplicants.toString(), 
      icon: Users, 
      color: "text-primary",
      bg: "bg-primary/10",
      trend: "Total interest" 
    },
    { 
      label: "Pending Review", 
      value: pendingApplicants.toString(), 
      icon: Clock, 
      color: "text-primary",
      bg: "bg-primary/10",
      trend: "Awaiting action" 
    },
    { 
      label: "Success Hire", 
      value: applications.filter(a => a.status === 'Accepted').length.toString(), 
      icon: CheckCircle2, 
      color: "text-primary",
      bg: "bg-primary/10",
      trend: "Hired candidates" 
    },
  ];

  const recentApps = applications.sort((a,b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Overview & Analytics</h1>
          <p className="text-muted-foreground font-medium">Monitoring your company&apos;s SIT engagement and talent pipeline.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden">
             <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 blur-[30px] rounded-full group-hover:scale-150 transition-transform" />
            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
              <stat.icon className={cn("h-6 w-6", stat.color)} />
            </div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="text-3xl font-black mb-1 text-foreground">{stat.value}</div>
            <p className="text-[11px] text-muted-foreground font-bold flex items-center gap-1">
               <ArrowUpRight className="h-3 w-3 text-primary" />
               {stat.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Applicants */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-primary" />
              Latest Applicants
            </h3>
            <button className="text-xs font-bold text-primary hover:underline transition-all">Manage All</button>
          </div>
          
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="divide-y divide-border/50">
              {recentApps.length > 0 ? recentApps.map((app) => (
                <div key={app.id} className="p-5 flex items-center justify-between hover:bg-primary/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold leading-none shadow-sm transition-transform group-hover:scale-110">
                      {app.studentName?.split(' ').filter(Boolean).map(n => n[0]).join('') || '?'}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">{app.studentName || 'Unknown Student'}</p>
                      <p className="text-[11px] font-medium text-muted-foreground">{postings.find(p => p.id === app.postingId)?.title || "Unknown Role"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Applied At</p>
                      <p className="text-[11px] font-bold text-foreground">{new Date(app.appliedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm transition-all",
                      app.status === 'Pending' ? "bg-primary/5 text-primary border-primary/20" :
                      app.status === 'Accepted' ? "bg-primary/10 text-primary border-primary/20 font-bold" :
                      "bg-destructive/10 text-destructive border-destructive/20"
                    )}>
                      {app.status}
                    </span>
                  </div>
                </div>
              )) : (
                <div className="p-12 text-center text-muted-foreground font-medium text-sm">
                  No applicants yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Insights / Post New */}
        <div className="space-y-6">
           <h3 className="text-xl font-bold flex items-center gap-2 mb-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Insights
            </h3>
            <div className="p-6 rounded-xl bg-primary text-primary-foreground shadow-2xl space-y-6 relative overflow-hidden group/insight">
               <div className="absolute top-0 right-0 w-[100%] h-[100%] bg-white/10 blur-[60px] rounded-full transition-transform duration-1000 group-hover/insight:scale-125" />
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-white" />
                     </div>
                     <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-full border border-white/30">Pro Tip</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed opacity-90 text-white italic">
                    Students are looking for &quot;Remote&quot; opportunities more than ever. Consider offering hybrid options to attract the best talent.
                  </p>
                  <button className="w-full py-3 rounded-lg bg-white text-primary text-sm font-black shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                    Optimize Postings <ArrowUpRight className="h-4 w-4" />
                  </button>
               </div>
            </div>

            <div className="p-6 rounded-xl border border-dashed border-border bg-card flex flex-col items-center justify-center text-center space-y-3 group cursor-pointer hover:border-primary/50 transition-colors shadow-sm">
               <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors shadow-inner">
                  <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
               </div>
               <div>
                  <p className="text-sm font-bold text-foreground">Need more talent?</p>
                  <p className="text-xs text-muted-foreground">Post another role to TUP-V</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
