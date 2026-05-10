"use client";

import { Skeleton } from "boneyard-js/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Greeting } from "@/app/(portals)/student/dashboard/Greeting";
import { Lock } from "lucide-react";

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
      <div className="flex-1 space-y-8">
        {/* 1. Header Greeting */}
        <div>
          <Greeting name={userName?.split(" ")[0] || "Student"} />
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Here&apos;s your SIT progress for A.Y. 2025-2026
          </p>
        </div>

        {/* 2. Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-4">SIT hours</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">{data?.totalHours ?? 0} / 300</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">hours logged</p>
            </div>
            <Link href="/student/logbook" className="text-xs font-bold text-primary hover:underline mt-4">
              View logbook
            </Link>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <p className="text-xs font-medium text-muted-foreground mb-4">Applications</p>
            <span className="text-2xl font-bold text-foreground">{data?.applications.length ?? 0}</span>
            <p className="text-xs text-muted-foreground mt-1">
              {!data?.applications.length ? "No active applications" : "Active submissions"}
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <p className="text-xs font-medium text-muted-foreground mb-4">Verified logs</p>
            <span className="text-2xl font-bold text-foreground">{data?.approvedLogs ?? 0}</span>
            <p className="text-xs text-muted-foreground mt-1">Pending adviser approval</p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <p className="text-xs font-medium text-muted-foreground mb-4">Placement status</p>
            <span className={cn("text-2xl font-bold", data?.hiredPlacement ? "text-emerald-600" : "text-foreground")}>
              {data?.hiredPlacement ? "Hired" : "Open"}
            </span>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", data?.hiredPlacement ? "bg-primary" : "bg-primary/30")} />
              {data?.hiredPlacement ? "Deployed to Company" : "Not yet deployed"}
            </p>
          </div>
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Application History */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Application history</h3>
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                {data?.applications.length ?? 0} records
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center py-20 px-6 text-center">
              {!data?.applications.length ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-muted border border-border flex items-center justify-center mb-6">
                    <svg className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground font-medium max-w-xs leading-relaxed">
                    {data?.hiredPlacement 
                      ? "You are currently deployed. Your application phase is complete."
                      : "You haven't applied to any companies yet. Browse industry partners and submit your first application."
                    }
                  </p>
                  {data?.hiredPlacement ? (
                    <div className="inline-flex h-10 items-center justify-center px-6 rounded-lg bg-muted text-muted-foreground/40 text-xs font-bold border border-border cursor-not-allowed gap-2 mt-6">
                      <Lock className="h-3.5 w-3.5" />
                      Opportunities Locked
                    </div>
                  ) : (
                    <Link
                      href="/student/opportunities"
                      className="inline-flex h-10 items-center justify-center px-6 rounded-lg bg-primary text-white text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all font-heading mt-6"
                    >
                      Browse opportunities
                    </Link>
                  )}
                </>
              ) : (
                <div className="w-full divide-y divide-border">
                  {data.applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="py-4 flex items-center justify-between text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-foreground font-bold">
                          {app.companyName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{app.postingTitle}</p>
                          <p className="text-[11px] text-muted-foreground font-medium">{app.companyName}</p>
                        </div>
                      </div>
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        app.status === "ACCEPTED" ? "bg-primary text-white" :
                        app.status === "REJECTED" ? "bg-red-50 text-red-600 border border-red-100" :
                        "bg-primary/10 text-primary"
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
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-foreground">SIT progress</h3>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xl font-bold text-foreground">{data?.totalHours ?? 0} / 300 hours</span>
                  <span className="text-xs font-bold text-muted-foreground">{hoursPct}% complete</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${hoursPct}%` }}
                  />
                </div>
              </div>
              <Link
                href="/student/logbook"
                className="flex h-11 w-full items-center justify-center rounded-lg bg-primary text-white text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all mt-4 font-heading"
              >
                Update logbook
              </Link>
              <p className="text-xs font-bold text-muted-foreground/50">Last entry: —</p>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Quick links</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { label: "Browse opportunities", href: "/student/opportunities", isLocked: !!data?.hiredPlacement },
                  { label: "Browse industry partners", href: "/partners" },
                  { label: "Upload documents", href: "/student/documents" },
                  { label: "Request MOA", href: "#" },
                ].map((link) => {
                  if (link.isLocked) {
                    return (
                      <div
                        key={link.label}
                        className="flex items-center justify-between px-6 py-3.5 text-xs font-medium text-muted-foreground/30 bg-muted/10 cursor-not-allowed"
                      >
                        <span className="flex items-center gap-2">
                          {link.label}
                          <Lock className="h-3 w-3" />
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter opacity-40">Locked</span>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center justify-between px-6 py-3.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                    >
                      {link.label}
                      <svg className="h-3 w-3 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
