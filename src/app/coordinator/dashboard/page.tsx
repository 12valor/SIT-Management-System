import { auth } from "@/auth";
import { 
  Users, 
  Building2, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  Clock, 
  AlertCircle,
  Calendar,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { getCoordinatorStats } from "./actions";
import { cn } from "@/lib/utils";

export default async function CoordinatorDashboardPage() {
  const session = await auth();
  const res = await getCoordinatorStats();
  
  if (!res.success || !res.data) {
    return (
      <div className="p-8 rounded-xl bg-red-50 border border-red-100 text-red-600">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Registry Error</h2>
        <p className="text-xs">Failed to load strategic program metrics.</p>
      </div>
    );
  }

  const { data: stats } = res;
  
  const placementRate = stats.totalStudents > 0
    ? Math.round((stats.hiredStudents / stats.totalStudents) * 100)
    : 0;

  const statCards = [
    { label: "Enrolled Students", value: stats.totalStudents,      icon: Users },
    { label: "Active Placements",  value: stats.hiredStudents,      icon: Briefcase },
    { label: "Hours Complete",     value: stats.graduationReady,    icon: Award },
    { label: "Industry Partners",  value: stats.totalCompanies,     icon: Building2 },
  ];

  return (
    <div className="flex-1 space-y-8 animate-in-fade">
      {/* 1. Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Program Control, {session?.user?.name?.split(" ")[0]}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            SIT Administrative Terminal · {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden md:flex flex-col items-end">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Placement Velocity</p>
              <p className="text-xl font-bold text-[#800000]">{placementRate}%</p>
           </div>
           <div className="h-10 w-px bg-slate-200 hidden md:block mx-2" />
           <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-lg border border-slate-200">
              <Calendar className="h-3.5 w-3.5" />
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
           </div>
        </div>
      </div>

      {/* 2. Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 mb-4">{s.label}</p>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">{s.value}</span>
              <s.icon className="h-5 w-5 text-slate-200" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left: Recent Placements */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Recent Placements</h3>
            <Link href="/coordinator/placements" className="text-[10px] font-bold text-[#800000] uppercase tracking-widest hover:underline">
              Audit all
            </Link>
          </div>

          <div className="divide-y divide-slate-50">
            {stats.recentPlacements.length === 0 ? (
              <div className="py-20 flex flex-col items-center gap-2 text-center text-slate-400">
                <AlertCircle className="h-8 w-8 opacity-20" />
                <p className="text-sm font-medium">No placement activity recorded in current cycle.</p>
              </div>
            ) : (
              stats.recentPlacements.map((p) => (
                <div key={p.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 font-bold uppercase">
                      {p.studentName?.[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{p.studentName}</p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {p.postingTitle} at <span className="text-slate-800 font-bold">{p.companyName}</span>
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Program Context */}
        <div className="space-y-6">
          {/* MOU Status Card */}
          <div className="bg-[#800000] p-6 rounded-xl shadow-lg shadow-red-900/10 text-white space-y-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-1">Critical Queue</p>
              <h3 className="text-lg font-bold">MOU Verification</h3>
            </div>
            
            <div className="space-y-3">
              {stats.pendingCompanies.length === 0 ? (
                <div className="flex items-center gap-3 py-2 opacity-80">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-xs font-medium">All partners verified</span>
                </div>
              ) : (
                stats.pendingCompanies.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-1 px-3 bg-white/10 rounded-lg">
                    <span className="text-[11px] font-bold truncate max-w-[120px]">{c.name}</span>
                    <span className="text-[10px] opacity-60 italic">{c.industry}</span>
                  </div>
                ))
              )}
            </div>
            
            <Link 
              href="/coordinator/companies" 
              className="flex h-11 w-full items-center justify-center rounded-lg bg-white text-[#800000] text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              Verify Partners
            </Link>
          </div>

          {/* Program Health Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 overflow-hidden relative">
             <div className="flex items-center justify-between mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Program Health</h4>
                <Award className="h-4 w-4 text-slate-200" />
             </div>
             
             <div className="space-y-5">
                {[
                  { label: "Company Network", value: stats.verifiedCompanies, total: stats.totalCompanies, color: "bg-[#800000]" },
                  { label: "Student Placement", value: stats.hiredStudents, total: stats.totalStudents, color: "bg-slate-800" }
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                      <span className="text-slate-400 font-medium">{item.label}</span>
                      <span className="text-slate-900">{item.value}/{item.total}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-1000", item.color)} 
                        style={{ width: `${item.total > 0 ? (item.value / item.total) * 100 : 0}%` }} 
                      />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
