"use client";

import { useMockStore } from "@/store/mock-store";
import { 
  BarChart3, 
  Users, 
  ClipboardList, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar,
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmployerDashboard() {
  const { postings, applications, user } = useMockStore();

  const totalPostings = postings.length;
  const totalApplicants = applications.length;
  const pendingApplicants = applications.filter(a => a.status === 'Pending').length;

  const stats = [
    { 
      label: "Active Postings", 
      value: totalPostings.toString(), 
      icon: ClipboardList, 
      color: "text-blue-600",
      bg: "bg-blue-600/10",
      trend: "+2 this month" 
    },
    { 
      label: "Total Applicants", 
      value: totalApplicants.toString(), 
      icon: Users, 
      color: "text-indigo-600",
      bg: "bg-indigo-600/10",
      trend: "+12% vs last month" 
    },
    { 
      label: "Pending Review", 
      value: pendingApplicants.toString(), 
      icon: Clock, 
      color: "text-amber-600",
      bg: "bg-amber-600/10",
      trend: "High attention needed" 
    },
    { 
      label: "Success Hire", 
      value: applications.filter(a => a.status === 'Accepted').length.toString(), 
      icon: CheckCircle2, 
      color: "text-green-600",
      bg: "bg-green-600/10",
      trend: "+5 from last batch" 
    },
  ];

  const recentApps = applications.sort((a,b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Overview & Analytics</h1>
          <p className="text-muted-foreground font-medium">Monitoring your company's SIT engagement and talent pipeline.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="group p-6 rounded-2xl bg-card border border-border hover:border-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/5 relative overflow-hidden">
             <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/5 blur-[30px] rounded-full group-hover:scale-150 transition-transform" />
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", stat.bg)}>
              <stat.icon className={cn("h-6 w-6", stat.color)} />
            </div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="text-3xl font-black mb-1">{stat.value}</div>
            <p className="text-[11px] text-muted-foreground font-bold flex items-center gap-1">
               <ArrowUpRight className="h-3 w-3 text-green-500" />
               {stat.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Applicants */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Latest Applicants
            </h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">Manage All</button>
          </div>
          
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-border/50">
              {recentApps.length > 0 ? recentApps.map((app) => (
                <div key={app.id} className="p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold leading-none">
                      {app.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{app.studentName}</p>
                      <p className="text-[11px] font-medium text-muted-foreground">{postings.find(p => p.id === app.postingId)?.title || "Unknown Role"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Applied At</p>
                      <p className="text-[11px] font-bold">{new Date(app.appliedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                      app.status === 'Pending' ? "bg-amber-100 text-amber-600 border-amber-200" :
                      app.status === 'Accepted' ? "bg-green-100 text-green-600 border-green-200" :
                      "bg-red-100 text-red-600 border-red-200"
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
           <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Insights
            </h3>
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-2xl space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[100%] h-[100%] bg-blue-600/10 blur-[60px] rounded-full" />
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-blue-400" />
                     </div>
                     <span className="text-[10px] font-black uppercase bg-blue-600 px-2 py-0.5 rounded-full">Pro Tip</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed opacity-90">
                    Students are looking for "Remote" opportunities more than ever. Consider offering hybrid options to attract the best talent.
                  </p>
                  <button className="w-full py-3 rounded-xl bg-blue-600 text-sm font-bold shadow-lg shadow-blue-600/40 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                    Optimize Postings <ArrowUpRight className="h-4 w-4" />
                  </button>
               </div>
            </div>

            <div className="p-6 rounded-2xl border border-dashed border-border bg-card flex flex-col items-center justify-center text-center space-y-3 group cursor-pointer hover:border-blue-600/50 transition-colors">
               <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Plus className="h-5 w-5 text-muted-foreground group-hover:text-blue-600" />
               </div>
               <div>
                  <p className="text-sm font-bold">Need more talent?</p>
                  <p className="text-xs text-muted-foreground">Post another role to TUP-V</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
