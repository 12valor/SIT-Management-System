"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  Clock, 
  Send, 
  CheckCircle2, 
  Calendar,
  AlertCircle,
  Briefcase,
  ChevronRight,
  Loader2,
  Activity,
  Building2,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStudentDashboardData } from "./actions";
import { StudentDashboardData, StudentApplication } from "./types";

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await getStudentDashboardData();
      if (result.success && result.data) {
        setData(result.data);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs animate-pulse">
          {isLoading ? "Retrieving Academic Progress..." : "Industrial Data Unavailable"}
        </p>
      </div>
    );
  }

  const stats = [
    { 
      label: "SIT Training Hours", 
      value: `${data.totalHours} / 300`, 
      icon: Clock, 
      color: "text-indigo-600",
      bg: "bg-indigo-600/10",
      description: "Hours validated by supervisor" 
    },
    { 
      label: "Active Applications", 
      value: data.applications.length.toString(), 
      icon: Send, 
      color: "text-blue-600",
      bg: "bg-blue-600/10",
      description: "Industrial partner outreach" 
    },
    { 
      label: "Verified Logs", 
      value: data.approvedLogs.toString(), 
      icon: CheckCircle2, 
      color: "text-emerald-600",
      bg: "bg-emerald-600/10",
      description: "Entries officially confirmed" 
    },
    { 
      label: "Career Status", 
      value: data.hiredPlacement ? "Active Intern" : "Seeking Placement", 
      icon: Briefcase, 
      color: "text-amber-600",
      bg: "bg-amber-600/10",
      description: data.hiredPlacement ? data.hiredPlacement.company : "TUP-V Industry Outreach" 
    },
  ];

  const firstName = session?.user?.name?.split(' ')[0] || 'Trainee';

  return (
    <div className="space-y-12 pb-24 animate-in-fade">
      {/* Welcome Message */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
             <Activity className="h-4 w-4" />
             <span className="text-[10px] font-black uppercase tracking-widest">Student Portal</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none">
            Welcome back, <span className="text-indigo-600">{firstName}</span>.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Your TUP-V Supervised Industrial Training dashboard and progress manifest.</p>
        </div>
        <div className="flex items-center gap-4 px-6 py-4 rounded-[1.5rem] bg-card border border-border/60 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-md">
          <div className="p-2 bg-indigo-600 rounded-xl text-white">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Current Session</span>
            <span className="text-sm font-black whitespace-nowrap">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {data.hiredPlacement && (
        <div className="group p-10 rounded-[3rem] bg-slate-950 dark:bg-slate-900/40 text-white shadow-4xl relative overflow-hidden transition-all hover:scale-[1.005] border border-white/5">
           <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[200%] bg-indigo-600/15 blur-[120px] skew-x-12 rotate-[-15deg]" />
           <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
              <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-4xl font-black border border-white/10 shadow-3xl shadow-indigo-600/30 group-hover:rotate-6 transition-transform">
                {data.hiredPlacement.company[0]}
              </div>
              <div className="flex-1 text-center lg:text-left space-y-2">
                 <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-500/30">Active Placement</span>
                 </div>
                 <h3 className="text-3xl font-black tracking-tight leading-none">{data.hiredPlacement.title}</h3>
                 <p className="text-lg font-medium text-slate-400">{data.hiredPlacement.company} • {data.hiredPlacement.location}</p>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-3 rounded-[2rem] border border-white/10">
                 <button className="px-8 py-4 rounded-[1.5rem] bg-white/10 hover:bg-white/20 text-xs font-black uppercase tracking-widest transition-all">Role Insight</button>
                 <button className="px-8 py-4 rounded-[1.5rem] bg-indigo-600 text-white text-xs font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/40 transition-all hover:bg-indigo-700">Message HR</button>
              </div>
           </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="group p-8 rounded-[2.5rem] bg-card border border-border/60 hover:border-indigo-500/30 transition-all hover:shadow-4xl hover:shadow-indigo-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full" />
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-lg border border-white/10", stat.bg)}>
              <stat.icon className={cn("h-7 w-7", stat.color)} />
            </div>
            <div className="space-y-2">
               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
               <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</div>
               <p className="text-[10px] text-slate-500 font-bold italic opacity-80">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <h3 className="text-2xl font-black flex items-center gap-3 tracking-tight">
              <div className="p-2 bg-indigo-600 rounded-xl text-white">
                <Send className="h-6 w-6" />
              </div>
              Partner Outreach
            </h3>
            <button className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest flex items-center gap-1 group">
              Full Archive <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-6">
            {data.applications.length > 0 ? (
              data.applications.slice(0, 5).map((app: StudentApplication) => (
                <div key={app.id} className="group flex items-center justify-between p-8 rounded-[2.5rem] bg-card border border-border/60 hover:bg-slate-50 dark:hover:bg-indigo-500/5 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm border border-border/40">
                      {app.companyName[0]}
                    </div>
                    <div>
                      <p className="text-lg font-black tracking-tight leading-none mb-1.5">{app.postingTitle}</p>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3 w-3 text-slate-400" />
                        <p className="text-sm font-bold text-slate-500">{app.companyName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Application Date</p>
                      <p className="text-xs font-black text-slate-600 underline decoration-indigo-500/30 underline-offset-4">{new Date(app.appliedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
                      app.status === 'PENDING' ? "bg-amber-50 text-amber-600 border-amber-200" :
                      app.status === 'ACCEPTED' ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                      "bg-rose-50 text-rose-600 border-rose-200"
                    )}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-24 text-center rounded-[3rem] border-2 border-dashed border-border/60 bg-slate-50/50 opacity-40">
                <AlertCircle className="h-10 w-10 text-slate-300 mx-auto mb-6" />
                <p className="font-black text-slate-400 uppercase tracking-widest text-sm">No industrial applications recorded</p>
                <p className="text-xs text-slate-500 mt-2 font-medium italic">Begin your professional journey by exploring the opportunities portal.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Logbook View */}
        <div className="space-y-8">
           <h3 className="text-2xl font-black flex items-center gap-3 tracking-tight">
              <div className="p-2 bg-indigo-600 rounded-xl text-white">
                <Clock className="h-6 w-6" />
              </div>
              Term Progress
            </h3>
            <div className="p-10 rounded-[3rem] bg-indigo-600 text-white shadow-4xl shadow-indigo-600/40 space-y-8 relative overflow-hidden group/progress">
               <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/10 blur-[80px] rounded-full group-hover/progress:scale-125 transition-transform duration-1000" />
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/10 rounded-xl">
                       <TrendingUp className="h-6 w-6" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Readiness</p>
                 </div>
                 <h4 className="text-3xl font-black mb-6 leading-tight tracking-tight">Industrial Performance Report</h4>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span>Accumulated Hours</span>
                          <span>{Math.round((data.totalHours / 300) * 100)}%</span>
                       </div>
                       <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden border border-white/10 shadow-inner">
                          <div 
                            className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-1500" 
                            style={{ width: `${Math.min((data.totalHours / 300) * 100, 100)}%` }} 
                          />
                       </div>
                    </div>
                    <p className="text-sm font-bold opacity-80 leading-relaxed italic">
                      Current manifest: **{data.totalHours}** verified hours of total **300** SIT requirement module.
                    </p>
                    <button className="w-full py-5 rounded-[1.5rem] bg-white text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all hover:bg-slate-50">
                       Update Daily Time Record
                    </button>
                 </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
