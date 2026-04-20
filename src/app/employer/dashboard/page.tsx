import { auth } from "@/auth";
import { 
  ClipboardList, 
  Users, 
  Clock, 
  CheckCircle2, 
  Calendar,
  Building2,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { getEmployerDashboardData } from "./actions";
import { cn } from "@/lib/utils";

export default async function EmployerDashboardPage() {
  const session = await auth();
  const res = await getEmployerDashboardData();
  
  if (!res.success || !res.data) {
    return (
      <div className="p-8 rounded-xl bg-red-50 border border-red-100 text-red-600">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-2">System Error</h2>
        <p className="text-xs">Failed to load industrial partner metrics.</p>
      </div>
    );
  }

  const { data } = res;

  const statCards = [
    { label: "Active Postings",   value: data.totalPostings,   icon: ClipboardList },
    { label: "Total Applicants",  value: data.totalApplicants,  icon: Users },
    { label: "Pending Review",    value: data.pendingApplicants, icon: Clock },
    { label: "Confirmed Hires",   value: data.hiredCount,      icon: CheckCircle2 },
  ];

  return (
    <div className="flex-1 space-y-8 animate-in-fade">
      {/* 1. Header Greeting Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Overview, {session?.user?.name?.split(" ")[0]}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Industrial Partnership Hub · {new Date().getFullYear()}
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-lg border border-slate-200">
           <Calendar className="h-3.5 w-3.5" />
           {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
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
        
        {/* Left: Recent Applicants */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Recent Applicants</h3>
            <Link href="/employer/applicants" className="text-[10px] font-bold text-[#800000] uppercase tracking-widest hover:underline">
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="divide-y divide-slate-50">
                {data.recentApplications.length === 0 ? (
                  <tr>
                    <td className="px-6 py-20 text-center text-sm text-slate-400 font-medium">
                      No active applicants found in current cycle.
                    </td>
                  </tr>
                ) : (
                  data.recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 font-bold uppercase">
                            {app.student.name?.[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{app.student.name}</p>
                            <p className="text-[11px] text-slate-500 font-medium">{app.posting.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">{app.student.course}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          app.status === 'ACCEPTED' ? "bg-emerald-50 text-emerald-600" :
                          app.status === 'REJECTED' ? "bg-red-50 text-red-600" :
                          "bg-amber-50 text-amber-600"
                        )}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Insights & Actions */}
        <div className="space-y-6">
          <div className="bg-[#800000] p-6 rounded-xl shadow-lg shadow-red-900/10 text-white space-y-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-1">Company Health</p>
              <h3 className="text-lg font-bold">Industry Engagement</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="opacity-70">Recruitment Rate</span>
                  <span>{data.totalApplicants > 0 ? Math.round((data.hiredCount / data.totalApplicants) * 100) : 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${data.totalApplicants > 0 ? (data.hiredCount / data.totalApplicants) * 100 : 0}%` }} />
                </div>
              </div>
            </div>
            <Link 
              href="/employer/postings" 
              className="flex h-11 w-full items-center justify-center rounded-lg bg-white text-[#800000] text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              Manage Postings
            </Link>
          </div>

          {/* Quick Support Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                   <Building2 className="h-5 w-5" />
                </div>
                <div>
                   <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Partner Support</h4>
                   <p className="text-[10px] text-slate-400 font-medium">SIT Coordinator Terminal</p>
                </div>
             </div>
             <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                For administrative assistance regarding MOA/MOU processing, please contact the TUP-V SIT Office.
             </p>
             <Link href="#" className="text-xs font-bold text-[#800000] hover:underline flex items-center gap-1">
                Contact Desk <ChevronRight className="h-3 w-3" />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
