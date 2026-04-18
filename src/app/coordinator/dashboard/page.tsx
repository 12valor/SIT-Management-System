"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Building2, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle,
  Briefcase,
  ArrowUpRight,
  MoreHorizontal,
  Award,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getCoordinatorStats } from "./actions";

export default function CoordinatorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const result = await getCoordinatorStats();
      if (result.success) {
        setStats(result.data);
      }
      setIsLoading(false);
    }
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Synchronizing Ecosystem Data...</p>
      </div>
    );
  }

  const statCards = [
    { 
      label: "Active Students", 
      value: stats.totalStudents.toString(), 
      icon: Users, 
      color: "text-indigo-600",
      bg: "bg-indigo-600/10",
      trend: "+12% vs last sem",
      description: "Enrolled in SIT module" 
    },
    { 
      label: "Hired Trainees", 
      value: stats.hiredStudents.toString(), 
      icon: CheckCircle2, 
      color: "text-emerald-600",
      bg: "bg-emerald-600/10",
      trend: `${Math.round((stats.hiredStudents / stats.totalStudents) * 100) || 0}% Placement`,
      description: "Positions finalized" 
    },
    { 
      label: "Graduation Ready", 
      value: stats.graduationReady.toString(), 
      icon: Award, 
      color: "text-amber-600",
      bg: "bg-amber-600/10",
      trend: "MOU Requirements Met",
      description: "Hours & Assessment Complete" 
    },
    { 
      label: "Industry Partners", 
      value: stats.totalCompanies.toString(), 
      icon: Building2, 
      color: "text-violet-600",
      bg: "bg-violet-600/10",
      trend: `${stats.verifiedCompanies} Verified`,
      description: "Active MOU companies" 
    },
  ];

  return (
    <div className="space-y-12 pb-20 animate-in-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                System Administrator
              </span>
           </div>
           <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
             Ecosystem <span className="text-indigo-600">Analytics</span>
           </h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 max-w-xl leading-relaxed">
             Real-time overview of the TUP-V Supervised Industrial Training program, monitoring student progress and partner engagement.
           </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden lg:flex -space-x-3 overflow-hidden p-1">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-12 w-12 rounded-2xl border-2 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black text-slate-400 shadow-sm">
                   {String.fromCharCode(64+i)}
                </div>
              ))}
              <div className="h-12 w-12 rounded-2xl border-2 border-white dark:border-slate-950 bg-indigo-600 flex items-center justify-center text-xs font-black text-white shadow-xl shadow-indigo-600/20">
                 +Stats
              </div>
           </div>
           <button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-indigo-600 text-white font-black text-sm shadow-2xl shadow-indigo-600/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">
              Generate Audit Report <ArrowUpRight className="h-5 w-5" />
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="group p-8 rounded-[2.5rem] bg-card border border-border/50 hover:border-indigo-500/30 transition-all hover:shadow-3xl hover:shadow-indigo-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full" />
            <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 shadow-lg border border-white/10", stat.bg)}>
              <stat.icon className={cn("h-8 w-8", stat.color)} />
            </div>
            <div className="space-y-2">
               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
               <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</div>
               <div className="flex items-center gap-2 pt-4">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-[10px] font-black uppercase">{stat.trend}</span>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Placement Activity Feed */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center justify-between border-b border-border pb-6">
              <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900 dark:text-white tracking-tight">
                <div className="p-2 rounded-xl bg-indigo-600">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                Industrial Placements
              </h3>
              <button className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest flex items-center gap-1 group">
                Full Database <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
           
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {stats.recentPlacements.map((app: any) => (
                  <div key={app.id} className="p-8 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-indigo-500/5 transition-all group">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                          {app.studentName[0]}
                        </div>
                        <div>
                          <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{app.studentName}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-1.5">
                             <span className="text-xs font-bold text-slate-500">Interning as</span>
                             <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-lg uppercase tracking-widest">{app.postingTitle}</span>
                             <span className="text-xs font-bold text-slate-500">at</span>
                             <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-lg uppercase tracking-widest">{app.companyName}</span>
                          </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <button className="h-10 w-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 transition-all border border-transparent hover:border-slate-200">
                           <MoreHorizontal className="h-5 w-5" />
                        </button>
                     </div>
                  </div>
                ))}

                {stats.recentPlacements.length === 0 && (
                   <div className="p-24 text-center">
                      <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="h-10 w-10 text-slate-300" />
                      </div>
                      <p className="font-black text-slate-400 uppercase tracking-widest text-sm">No active placements registered</p>
                      <p className="text-xs text-slate-500 mt-2">Hiring records will appear here once finalized.</p>
                   </div>
                )}
              </div>
              <div className="p-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 text-center">
                 <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-all">
                   Sync Audit Log Records
                 </button>
              </div>
           </div>
        </div>

        {/* Company Verification Queue */}
        <div className="space-y-8">
           <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900 dark:text-white tracking-tight">
              <div className="p-2 rounded-xl bg-indigo-600">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              Partner Queue
           </h3>
           <div className="space-y-6">
              {stats.pendingCompanies.map((company: any) => (
                <div key={company.id} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group hover:border-amber-500/50 transition-all">
                   <div className="absolute top-0 right-0 w-3 h-full bg-amber-500" />
                   <div className="flex items-start justify-between mb-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                           <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] leading-none">MOU Pending</p>
                        </div>
                        <h4 className="font-black text-xl text-slate-900 dark:text-white tracking-tight">{company.name}</h4>
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 italic">
                          Sector: <span className="text-slate-900 dark:text-slate-300 not-italic font-black text-[10px] uppercase tracking-widest">{company.industry}</span>
                        </p>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl font-black text-slate-400 border border-slate-200/50">
                        {company.name[0]}
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <button className="h-11 rounded-2xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all">Verify MOU</button>
                      <button className="h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Defer</button>
                   </div>
                </div>
              ))}

              {stats.pendingCompanies.length === 0 && (
                <div className="p-20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center opacity-50 bg-slate-50/50">
                   <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">All Partners Verified</p>
                </div>
              )}
           </div>

           {/* Quick Stats Mini-Card */}
           <div className="p-10 rounded-[3rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 space-y-6 relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/10 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational KPI</span>
                 </div>
                 <h4 className="text-5xl font-black mb-2 tracking-tighter">94.2%</h4>
                 <p className="text-xs font-bold opacity-80 leading-relaxed max-w-[220px]">
                    Average industrial logbook validation speed across all partner departments.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

import { ChevronRight as ChevronRightIcon } from "lucide-react";
function ChevronRight(props: any) { return <ChevronRightIcon {...props} />; }

