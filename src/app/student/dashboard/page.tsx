import { auth } from "@/auth";
import { 
  Clock, 
  Send, 
  CheckCircle2, 
  Briefcase, 
  AlertCircle,
  Building2,
  FolderOpen
} from "lucide-react";
import Link from "next/link";
import { getStudentDashboardData } from "./actions";
import { cn } from "@/lib/utils";

// Greeting Component (Simple Client Component to handle local time)
import { Greeting } from "./Greeting";

export default async function StudentDashboardPage() {
  const session = await auth();
  const res = await getStudentDashboardData();
  
  if (!res.success || !res.data) {
    return (
      <div className="p-8 rounded-xl bg-red-50 border border-red-100 text-red-600">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-2">System Error</h2>
        <p className="text-xs">{res.error || "Failed to load industrial data matrix."}</p>
      </div>
    );
  }

  const { data } = res;
  const hoursPct = Math.min(Math.round((data.totalHours / 300) * 100), 100);

  return (
    <div className="flex-1 space-y-8 animate-in-fade">
      {/* 1. Header Greeting Section */}
      <div>
        <Greeting name={session?.user?.name?.split(" ")[0] || "Student"} />
        <p className="text-sm text-slate-500 font-medium mt-1">
          Here&apos;s your SIT progress for A.Y. 2025-2026
        </p>
      </div>

      {/* 2. Top Metric Cards Row (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* SIT Hours Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-4">SIT hours</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">{data.totalHours} / 300</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">hours logged</p>
          </div>
          <Link href="/student/logbook" className="text-xs font-bold text-[#007bff] hover:underline mt-4">
            View logbook
          </Link>
        </div>

        {/* Applications Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-4">Applications</p>
          <span className="text-2xl font-bold text-slate-900">{data.applications.length}</span>
          <p className="text-xs text-slate-400 mt-1">
            {data.applications.length === 0 ? "No active applications" : "Active submissions"}
          </p>
        </div>

        {/* Verified Logs Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-4">Verified logs</p>
          <span className="text-2xl font-bold text-slate-900">{data.approvedLogs}</span>
          <p className="text-xs text-slate-400 mt-1">Pending adviser approval</p>
        </div>

        {/* Placement Status Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-4">Placement status</p>
          <span className={cn(
            "text-2xl font-bold",
            data.hiredPlacement ? "text-emerald-600" : "text-slate-900"
          )}>
            {data.hiredPlacement ? "Hired" : "Open"}
          </span>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <span className={cn("h-2 w-2 rounded-full", data.hiredPlacement ? "bg-emerald-500" : "bg-amber-500")} />
            {data.hiredPlacement ? "Deployed to Company" : "Not yet deployed"}
          </p>
        </div>
      </div>

      {/* 3. Main Content Grid (2 Columns) */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left: Application History */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Application history</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {data.applications.length} records
            </span>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center py-20 px-6 text-center">
            {data.applications.length === 0 ? (
              <>
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                  <FolderOpen className="h-6 w-6 text-slate-300" />
                </div>
                <p className="text-sm text-slate-500 mb-6 font-medium">
                  You haven&apos;t applied to any companies yet.<br />
                  Browse industry partners and submit your first application.
                </p>
                <Link 
                  href="/student/opportunities" 
                  className="inline-flex h-10 items-center justify-center px-6 rounded-lg bg-[#007bff] text-white text-xs font-bold hover:bg-[#0069d9] transition-colors"
                >
                  Browse opportunities
                </Link>
              </>
            ) : (
              <div className="w-full divide-y divide-slate-50">
                {data.applications.slice(0, 5).map((app) => (
                  <div key={app.id} className="py-4 flex items-center justify-between text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 font-bold">
                        {app.companyName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{app.postingTitle}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{app.companyName}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      app.status === 'ACCEPTED' ? "bg-emerald-50 text-emerald-600" :
                      app.status === 'REJECTED' ? "bg-red-50 text-red-600" :
                      "bg-amber-50 text-amber-600"
                    )}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Progress & Links */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800">SIT progress</h3>
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xl font-bold text-slate-900">{data.totalHours} / 300 hours</span>
                <span className="text-xs font-bold text-slate-400">{hoursPct}% complete</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-300 rounded-full transition-all duration-1000" 
                  style={{ width: `${hoursPct}%` }} 
                />
              </div>
            </div>
            <Link 
              href="/student/logbook" 
              className="flex h-11 w-full items-center justify-center rounded-lg bg-[#800000] text-white text-xs font-bold hover:bg-red-900 transition-colors mt-4"
            >
              Update logbook
            </Link>
            <p className="text-[10px] text-slate-400 font-medium text-center">
              Last entry: —
            </p>
          </div>

          {/* Quick Links Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest text-[10px]">Quick links</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { label: "Browse opportunities", href: "/student/opportunities" },
                { label: "Upload documents", href: "/student/documents" },
                { label: "Request MOA", href: "#" },
              ].map((link) => (
                <Link 
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between px-6 py-3.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
                >
                  {link.label}
                  <ChevronRight className="h-3 w-3 text-slate-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Component (Optional/Manual) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="h-12 px-6 rounded-full bg-slate-800 text-white shadow-xl shadow-slate-900/20 text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all">
          Open
        </button>
      </div>
    </div>
  );
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
