"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Building2, 
  CheckCircle2, 
  TrendingUp, 
  Briefcase, 
  ArrowUpRight, 
  MoreHorizontal, 
  Award, 
  Loader2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getCoordinatorStats } from "./actions";
import { CoordinatorStats, RecentPlacement } from "./types";

export default function CoordinatorDashboard() {
  const [stats, setStats] = useState<CoordinatorStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const result = await getCoordinatorStats();
      if (result.success && result.data) {
        setStats(result.data);
      }
      setIsLoading(false);
    }
    loadStats();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">
          {isLoading ? "Synchronizing Ecosystem Data..." : "Industrial Data Unavailable"}
        </p>
      </div>
    );
  }

  const statCards = [
    { 
      label: "Active Students", 
      value: stats.totalStudents.toString(), 
      icon: Users, 
      color: "text-primary",
      bg: "bg-primary/10",
      trend: "+12% vs last sem",
      description: "Enrolled in SIT module" 
    },
    { 
      label: "Hired Trainees", 
      value: stats.hiredStudents.toString(), 
      icon: CheckCircle2, 
      color: "text-primary",
      bg: "bg-primary/10",
      trend: `${Math.round((stats.hiredStudents / stats.totalStudents) * 100) || 0}% Placement`,
      description: "Positions finalized" 
    },
    { 
      label: "Graduation Ready", 
      value: stats.graduationReady.toString(), 
      icon: Award, 
      color: "text-primary",
      bg: "bg-primary/10",
      trend: "MOU Requirements Met",
      description: "Hours & Assessment Complete" 
    },
    { 
      label: "Industry Partners", 
      value: stats.totalCompanies.toString(), 
      icon: Building2, 
      color: "text-primary",
      bg: "bg-primary/10",
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
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                System Administrator
              </span>
           </div>
           <h1 className="text-5xl font-black tracking-tighter text-foreground leading-tight">
             Ecosystem <span className="text-primary">Analytics</span>
           </h1>
           <p className="text-muted-foreground font-medium mt-2 max-w-xl leading-relaxed">
             Real-time overview of the TUP-V Supervised Industrial Training program, monitoring student progress and partner engagement.
           </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden lg:flex -space-x-3 overflow-hidden p-1">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-12 w-12 rounded-2xl border-2 border-background bg-muted flex items-center justify-center text-xs font-black text-muted-foreground shadow-sm">
                   {String.fromCharCode(64+i)}
                </div>
              ))}
              <div className="h-12 w-12 rounded-2xl border-2 border-background bg-primary flex items-center justify-center text-xs font-black text-primary-foreground shadow-xl shadow-primary/20">
                 +Stats
              </div>
           </div>
           <button className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-2xl shadow-primary/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">
              Generate Audit Report <ArrowUpRight className="h-5 w-5" />
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="group p-8 rounded-[2.5rem] bg-card border border-border/50 hover:border-primary/30 transition-all hover:shadow-3xl hover:shadow-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full" />
            <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 shadow-lg border border-border/10", stat.bg)}>
              <stat.icon className={cn("h-8 w-8", stat.color)} />
            </div>
            <div className="space-y-2">
               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
               <div className="text-4xl font-black text-foreground tracking-tight">{stat.value}</div>
               <div className="flex items-center gap-2 pt-4">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary/10 text-primary">
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
              <h3 className="text-2xl font-black flex items-center gap-3 text-foreground tracking-tight">
                <div className="p-2 rounded-xl bg-primary">
                  <Briefcase className="h-6 w-6 text-primary-foreground" />
                </div>
                Industrial Placements
              </h3>
              <button className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest flex items-center gap-1 group">
                Full Database <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
           
           <div className="bg-card border border-border rounded-[3rem] overflow-hidden shadow-sm">
              <div className="divide-y divide-border">
                {stats.recentPlacements.map((app: RecentPlacement) => (
                  <div key={app.id} className="p-8 flex items-center justify-between hover:bg-muted/50 transition-all group">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-muted flex items-center justify-center text-2xl font-black text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-sm">
                           {app.studentName?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="text-lg font-black text-foreground tracking-tight">{app.studentName || 'Unknown Student'}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-1.5">
                             <span className="text-xs font-bold text-muted-foreground">Interning as</span>
                             <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-lg uppercase tracking-widest">{app.postingTitle}</span>
                             <span className="text-xs font-bold text-muted-foreground">at</span>
                             <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-lg uppercase tracking-widest">{app.companyName}</span>
                          </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <button className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-background transition-all border border-transparent hover:border-border">
                           <MoreHorizontal className="h-5 w-5" />
                        </button>
                     </div>
                  </div>
                ))}

                {stats.recentPlacements.length === 0 && (
                   <div className="p-24 text-center">
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                        <Loader2 className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <p className="font-black text-muted-foreground uppercase tracking-widest text-sm">No active placements registered</p>
                      <p className="text-xs text-muted-foreground mt-2">Hiring records will appear here once finalized.</p>
                   </div>
                )}
              </div>
              <div className="p-6 bg-muted/30 border-t border-border text-center">
                 <button className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-all">
                   Sync Audit Log Records
                 </button>
              </div>
           </div>
        </div>

        {/* Company Verification Queue */}
        <div className="space-y-8">
           <h3 className="text-2xl font-black flex items-center gap-3 text-foreground tracking-tight">
              <div className="p-2 rounded-xl bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              Partner Queue
           </h3>
           <div className="space-y-6">
              {stats.pendingCompanies.map((company) => (
                <div key={company.id} className="p-8 rounded-[2.5rem] bg-card border border-border shadow-xl relative overflow-hidden group hover:border-primary/50 transition-all">
                   <div className="absolute top-0 right-0 w-3 h-full bg-primary" />
                   <div className="flex items-start justify-between mb-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                           <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none">MOU Pending</p>
                        </div>
                        <h4 className="font-black text-xl text-foreground tracking-tight">{company.name}</h4>
                        <p className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 italic">
                          Sector: <span className="text-foreground not-italic font-black text-[10px] uppercase tracking-widest">{company.industry}</span>
                        </p>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-xl font-black text-muted-foreground border border-border/50">
                        {company.name[0]}
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <button className="h-11 rounded-2xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all">Verify MOU</button>
                      <button className="h-11 rounded-2xl bg-muted text-muted-foreground text-[10px] font-black uppercase tracking-widest hover:bg-muted/80 transition-all">Defer</button>
                   </div>
                </div>
              ))}

              {stats.pendingCompanies.length === 0 && (
                <div className="p-20 rounded-[3rem] border-2 border-dashed border-border flex flex-col items-center justify-center text-center opacity-50 bg-muted/20">
                   <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">All Partners Verified</p>
                </div>
              )}
           </div>

           {/* Quick Stats Mini-Card */}
           <div className="p-10 rounded-[3rem] bg-primary text-primary-foreground shadow-3xl shadow-primary/40 space-y-6 relative overflow-hidden group">
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


