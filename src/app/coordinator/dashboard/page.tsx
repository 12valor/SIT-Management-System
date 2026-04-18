"use client";

import { useMockStore } from "@/store/mock-store";
import { 
  Users, 
  Building2, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  FileText,
  Briefcase,
  ChevronRight,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoordinatorDashboard() {
  const { applications, logbookEntries, companies, postings, evaluations } = useMockStore();

  // Aggregate stats from mock data
  const totalStudents = new Set(applications.map(a => a.studentEmail)).size || 124;
  const hiredStudents = applications.filter(a => a.status === 'Accepted').length || 45;
  const totalPartnerCompanies = companies.length || 12;
  const verifiedCompanies = companies.filter(c => c.isVerified).length || 8;

  // New Graduation Logic
  const graduationReady = Array.from(new Set(applications.map(a => a.studentEmail))).filter(email => {
    const hours = logbookEntries
      .filter(e => e.studentEmail === email && e.status === 'Approved')
      .reduce((acc, curr) => acc + curr.hours, 0);
    const hasEval = evaluations.some(ev => ev.studentEmail === email);
    return hours >= 300 && hasEval;
  }).length;

  const stats = [
    { 
      label: "Active Students", 
      value: totalStudents.toString(), 
      icon: Users, 
      color: "text-indigo-600",
      bg: "bg-indigo-600/10",
      trend: "+12% vs last sem",
      description: "Enrolled in SIT module" 
    },
    { 
      label: "Hired Trainees", 
      value: hiredStudents.toString(), 
      icon: CheckCircle2, 
      color: "text-emerald-600",
      bg: "bg-emerald-600/10",
      trend: "85% Placement rate",
      description: "Positions finalized" 
    },
    { 
      label: "Graduation Ready", 
      value: graduationReady.toString(), 
      icon: Award, 
      color: "text-amber-600",
      bg: "bg-amber-600/10",
      trend: "MOU Requirements Met",
      description: "Hours & Assessment Complete" 
    },
    { 
      label: "Industry Partners", 
      value: totalPartnerCompanies.toString(), 
      icon: Building2, 
      color: "text-violet-600",
      bg: "bg-violet-600/10",
      trend: `${verifiedCompanies} Verified`,
      description: "Active MOU companies" 
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">System Analytics</h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Real-time overview of the TUP-V SIT program ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex -space-x-3 overflow-hidden p-1">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 flex items-center justify-center text-[10px] font-black">
                   {String.fromCharCode(64+i)}
                </div>
              ))}
              <div className="h-10 w-10 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white">
                 +20
              </div>
           </div>
           <button className="h-11 px-6 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2">
              Generate Report <ArrowUpRight className="h-4 w-4" />
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/5">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-sm", stat.bg)}>
              <stat.icon className={cn("h-7 w-7", stat.color)} />
            </div>
            <div className="space-y-1">
               <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
               <div className="text-3xl font-black text-slate-900 dark:text-white leading-tight">{stat.value}</div>
               <div className="flex items-center gap-1.5 pt-2">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">{stat.trend}</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Placement Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white">
                <Briefcase className="h-5 w-5 text-indigo-600" />
                Recent Placements
              </h3>
              <button className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">Auditing Control</button>
           </div>
           
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {applications.filter(a => a.status === 'Accepted').slice(0, 5).map((app) => {
                  const posting = postings.find(p => p.id === app.postingId);
                  return (
                    <div key={app.id} className="p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl font-black text-slate-400 group-hover:text-indigo-600 transition-colors">
                            {app.studentName[0]}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 dark:text-white">{app.studentName}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                               <span className="text-[10px] font-bold text-slate-500">Hired as</span>
                               <span className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">{posting?.title || "SIT Intern"}</span>
                               <span className="text-[10px] font-bold text-slate-500">at</span>
                               <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">{posting?.company || "Tech Partner"}</span>
                            </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                             <MoreHorizontal className="h-5 w-5 text-slate-400" />
                          </button>
                       </div>
                    </div>
                  );
                })}

                {applications.filter(a => a.status === 'Accepted').length === 0 && (
                   <div className="p-12 text-center">
                      <AlertCircle className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                      <p className="font-bold text-slate-500">No active placements yet</p>
                   </div>
                )}
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                 <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors">View All Application Records</button>
              </div>
           </div>
        </div>

        {/* Company Verification Queue */}
        <div className="space-y-6">
           <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white">
              <Building2 className="h-5 w-5 text-indigo-600" />
              Partner Queue
           </h3>
           <div className="space-y-4">
              {companies.filter(c => !c.isVerified).map(company => (
                <div key={company.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-2 h-full bg-amber-500" />
                   <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none">Pending Verification</p>
                        <h4 className="font-black text-lg text-slate-900 dark:text-white">{company.name}</h4>
                        <p className="text-xs font-bold text-slate-500">{company.industry}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400">
                        {company.name[0]}
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">Verify MOU</button>
                      <button className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Reject</button>
                   </div>
                </div>
              ))}

              {companies.filter(c => !c.isVerified).length === 0 && (
                <div className="p-10 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center opacity-40">
                   <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-3" />
                   <p className="text-xs font-black uppercase tracking-widest">All Companies Verified</p>
                </div>
              )}
           </div>

           {/* Quick Stats Mini-Card */}
           <div className="p-6 rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 space-y-4 relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/10 blur-[60px] rounded-full group-hover:scale-125 transition-transform" />
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Efficiency Audit</span>
                 </div>
                 <h4 className="text-2xl font-black mb-1">94.2%</h4>
                 <p className="text-xs font-bold opacity-80 leading-relaxed max-w-[180px]">
                    Average logbook review speed by supervisors this month.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
