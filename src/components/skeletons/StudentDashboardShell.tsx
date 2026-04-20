"use client";

import { Skeleton } from "boneyard-js/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Greeting } from "@/app/student/dashboard/Greeting";

// ─── Types (mirroring server action return) ─────────────────────────────────
interface Application {
  id: string;
  status: string;
  appliedAt: string;
  postingTitle: string;
  companyName: string;
}

interface StudentDashboardData {
  totalHours: number;
  totalLogs: number;
  approvedLogs: number;
  applications: Application[];
  hiredPlacement: { title: string; company: string; location: string | null } | null;
}

interface Props {
  data: StudentDashboardData | null;
  userName?: string;
}

// ─── Shell Component ─────────────────────────────────────────────────────────
export function StudentDashboardShell({ data, userName }: Props) {
  const hoursPct = data ? Math.min(Math.round((data.totalHours / 300) * 100), 100) : 0;

  return (
    <Skeleton
      name="student-dashboard"
      loading={!data}
      animate="shimmer"
      stagger={80}
      transition={300}
      snapshotConfig={{
        excludeSelectors: ["svg", "[data-no-skeleton]"],
        excludeTags: ["nav", "footer"],
      }}
      fallback={
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-48 bg-slate-200 rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-slate-100 rounded-xl border border-slate-200" />
            ))}
          </div>
          <div className="h-64 bg-slate-100 rounded-xl border border-slate-200" />
        </div>
      }
    >
      <div className="flex-1 space-y-8">
        {/* 1. Header Greeting */}
        <div>
          <Greeting name={userName?.split(" ")[0] || "Student"} />
          <p className="text-sm text-slate-500 font-medium mt-1">
            Here&apos;s your SIT progress for A.Y. 2025-2026
          </p>
        </div>

        {/* 2. Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-4">SIT hours</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900">{data?.totalHours ?? 0} / 300</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">hours logged</p>
            </div>
            <Link href="/student/logbook" className="text-xs font-bold text-[#007bff] hover:underline mt-4">
              View logbook
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 mb-4">Applications</p>
            <span className="text-2xl font-bold text-slate-900">{data?.applications.length ?? 0}</span>
            <p className="text-xs text-slate-400 mt-1">
              {!data?.applications.length ? "No active applications" : "Active submissions"}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 mb-4">Verified logs</p>
            <span className="text-2xl font-bold text-slate-900">{data?.approvedLogs ?? 0}</span>
            <p className="text-xs text-slate-400 mt-1">Pending adviser approval</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 mb-4">Placement status</p>
            <span className={cn("text-2xl font-bold", data?.hiredPlacement ? "text-emerald-600" : "text-slate-900")}>
              {data?.hiredPlacement ? "Hired" : "Open"}
            </span>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", data?.hiredPlacement ? "bg-emerald-500" : "bg-amber-500")} />
              {data?.hiredPlacement ? "Deployed to Company" : "Not yet deployed"}
            </p>
          </div>
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Application History */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Application history</h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {data?.applications.length ?? 0} records
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center py-20 px-6 text-center">
              {!data?.applications.length ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                    <svg className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
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
                        app.status === "ACCEPTED" ? "bg-emerald-50 text-emerald-600" :
                        app.status === "REJECTED" ? "bg-red-50 text-red-600" :
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

          {/* Progress & Quick Links */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800">SIT progress</h3>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xl font-bold text-slate-900">{data?.totalHours ?? 0} / 300 hours</span>
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
              <p className="text-[10px] text-slate-400 font-medium text-center">Last entry: —</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Quick links</h3>
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
                    <svg className="h-3 w-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
