"use client";

import { Skeleton } from "boneyard-js/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Greeting } from "@/app/(portals)/student/dashboard/Greeting";
import { Lock, ArrowUpRight, LayoutDashboard, Clock, FileCheck, Building2, CheckCircle2 } from "lucide-react";
import { ComplianceCard } from "@/components/student/ComplianceCard";
import { StudentDashboardData } from "@/app/(portals)/student/dashboard/types";
import { WithdrawButton } from "@/app/(portals)/student/dashboard/WithdrawButton";

interface Props {
  data: StudentDashboardData | null;
  userName?: string;
}

export function StudentDashboardShell({ data, userName }: Props) {
  const targetHours = 300;
  const currentHours = data ? data.totalHours : 0;
  const hoursPct = data ? Math.min(Math.round((currentHours / targetHours) * 100), 100) : 0;

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
          <div className="h-8 w-48 bg-muted rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-muted rounded-xl border border-border" />
            ))}
          </div>
          <div className="h-64 bg-muted rounded-xl border border-border" />
        </div>
      }
    >
      <div className="flex-1 space-y-10">
        {/* 1. Simplified Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b">
          <div className="space-y-1">
            <Greeting name={userName?.split(" ")[0] || "Student"} />
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage your industrial training and applications.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10">
            <LayoutDashboard className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Student Portal</span>
          </div>
        </div>

        {/* 2. Simplified Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-white/[0.02] border rounded-xl p-6 shadow-sm hover:border-primary/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">SIT Hours</p>
              <Clock className="h-4 w-4 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">{currentHours}</span>
              <span className="text-xs font-medium text-slate-400">/ {targetHours}</span>
            </div>
            <Link href="/student/logbook" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
              View Logbook <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
 
          <div className="bg-white dark:bg-white/[0.02] border rounded-xl p-6 shadow-sm hover:border-primary/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applications</p>
              <FileCheck className="h-4 w-4 text-slate-400" />
            </div>
            <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">{data?.applications.length ?? 0}</span>
            <p className="text-xs font-medium text-slate-500 mt-1">Active Submissions</p>
          </div>
 
          <div className="bg-white dark:bg-white/[0.02] border rounded-xl p-6 shadow-sm hover:border-primary/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified</p>
              <CheckCircle2 className="h-4 w-4 text-slate-400" />
            </div>
            <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">{data?.approvedLogs ?? 0}</span>
            <p className="text-xs font-medium text-slate-500 mt-1">Approved Records</p>
          </div>
 
          <div className="bg-white dark:bg-white/[0.02] border rounded-xl p-6 shadow-sm hover:border-primary/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</p>
              <Building2 className="h-4 w-4 text-slate-400" />
            </div>
            <div className="flex items-center gap-2">
              <div className={cn("h-2 w-2 rounded-full", data?.hiredPlacement ? "bg-emerald-500 animate-pulse" : "bg-slate-200 dark:bg-white/10")} />
              <span className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                {data?.hiredPlacement ? "Hired" : "Open"}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1">Industrial Phase</p>
          </div>
        </div>

        {/* 3. Simplified Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-white/[0.02] rounded-xl border shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Application History</h3>
              <span className="text-xs font-medium text-slate-400">
                {data?.applications.length ?? 0} Applications
              </span>
            </div>

            {!data?.applications.length ? (
              <div className="flex-1 flex flex-col justify-center items-center py-16 px-6 text-center">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 border flex items-center justify-center mx-auto">
                    <Building2 className="h-5 w-5 text-slate-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">No applications yet</p>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                      {data?.hiredPlacement 
                        ? "You are currently deployed. Application phase is complete."
                        : "Browse industry partners and submit your first application to get started."
                      }
                    </p>
                  </div>
                  {data?.hiredPlacement ? (
                    <div className="inline-flex h-9 items-center justify-center px-4 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 text-[10px] font-bold border border-dashed cursor-not-allowed gap-2">
                      <Lock className="h-3 w-3" />
                      Locked
                    </div>
                  ) : (
                    <Link
                      href="/student/opportunities"
                      className="inline-flex h-9 items-center justify-center px-6 rounded-lg bg-primary text-white text-xs font-bold hover:opacity-90 transition-all shadow-sm"
                    >
                      Browse opportunities
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 p-6 flex flex-col justify-start">
                <div className="w-full divide-y divide-slate-100 dark:divide-white/5">
                  {data.applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left group">
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white font-bold text-sm shadow-sm transition-colors group-hover:border-primary/20">
                          {app.companyName[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate">
                            {app.postingTitle}
                          </p>
                          <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                            {app.companyName}
                          </p>
                        </div>
                      </div>
                      <div className="flex sm:block shrink-0">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider whitespace-nowrap inline-block",
                            app.status === "ACCEPTED" ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20" :
                            app.status === "REJECTED" ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400" :
                            app.status === "WITHDRAWN" ? "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400" :
                            "bg-primary/10 text-primary"
                          )}>
                            {app.status}
                          </span>
                          {app.status === "PENDING" && (
                            <WithdrawButton applicationId={app.id} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {data && <ComplianceCard documents={data.documents} />}

            <div className="bg-white dark:bg-white/[0.02] p-6 rounded-xl border shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Training Progress</h3>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">{currentHours} / {targetHours}</span>
                  <span className="text-xs font-bold text-slate-500">{hoursPct}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${hoursPct}%` }}
                  />
                </div>
              </div>
              <Link
                href="/student/logbook"
                className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-white text-xs font-bold hover:opacity-90 transition-all shadow-sm"
              >
                Log daily hours
              </Link>
            </div>

            <div className="bg-white dark:bg-white/[0.02] rounded-xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Quick Actions</h3>
              </div>
              <div className="divide-y">
                {[
                  { label: "Browse Opportunities", href: "/student/opportunities", isLocked: !!data?.hiredPlacement },
                  { label: "Browse Partners", href: "/partners" },
                  { label: "Manage Documents", href: "/student/documents" },
                  { label: "Request Certification", href: "/student/completion" },
                ].map((link) => {
                  if (link.isLocked) {
                    return (
                      <div
                        key={link.label}
                        className="flex items-center justify-between px-6 py-3.5 text-xs font-medium text-slate-300 dark:text-white/20 bg-slate-50/50 dark:bg-transparent cursor-not-allowed"
                      >
                        <span className="flex items-center gap-2">
                          {link.label}
                          <Lock className="h-3 w-3" />
                        </span>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center justify-between px-6 py-3.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-30" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
