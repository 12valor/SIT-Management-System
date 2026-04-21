"use client";

import { Skeleton } from "boneyard-js/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Calendar, CheckCircle2, Award } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface RecentPlacement {
  id: string;
  studentName: string | null;
  studentEmail: string | null;
  postingTitle: string;
  companyName: string;
}

interface PendingCompany {
  id: string;
  name: string;
  industry: string | null;
  joinedAt: string;
}

interface CoordinatorDashboardData {
  totalStudents: number;
  hiredStudents: number;
  totalCompanies: number;
  verifiedCompanies: number;
  graduationReady: number;
  recentPlacements: RecentPlacement[];
  pendingCompanies: PendingCompany[];
}

interface Props {
  data: CoordinatorDashboardData | null;
  userName?: string;
}

// ─── Shell Component ─────────────────────────────────────────────────────────
export function CoordinatorDashboardShell({ data, userName }: Props) {
  const placementRate = data && data.totalStudents > 0
    ? Math.round((data.hiredStudents / data.totalStudents) * 100)
    : 0;

  const statCards = data ? [
    { label: "Enrolled Students", value: data.totalStudents },
    { label: "Active Placements", value: data.hiredStudents },
    { label: "Hours Complete",    value: data.graduationReady },
    { label: "Industry Partners", value: data.totalCompanies },
  ] : [];

  return (
    <Skeleton
      name="coordinator-dashboard"
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
          <div className="h-8 w-64 bg-muted rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-muted rounded-xl border border-border" />
            ))}
          </div>
          <div className="h-96 bg-muted rounded-xl border border-border" />
        </div>
      }
    >
      <div className="flex-1 space-y-8">
        {/* 1. Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Program Control, {userName?.split(" ")[0]}
            </h2>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              SIT Administrative Terminal · {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Placement Velocity</p>
              <p className="text-xl font-bold text-primary">{placementRate}%</p>
            </div>
            <div className="h-10 w-px bg-border hidden md:block mx-2" />
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest bg-card px-4 py-2 rounded-lg border border-border">
              <Calendar className="h-3.5 w-3.5" data-no-skeleton />
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </div>
          </div>
        </div>

        {/* 2. Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <div key={s.label} className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <p className="text-xs font-medium text-muted-foreground mb-4">{s.label}</p>
              <span className="text-2xl font-bold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Placements */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Recent Placements</h3>
              <Link href="/coordinator/placements" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">
                Audit all
              </Link>
            </div>

            <div className="divide-y divide-border">
              {!data?.recentPlacements.length ? (
                <div className="py-20 flex flex-col items-center gap-2 text-center text-muted-foreground">
                  <p className="text-sm font-medium">No placement activity recorded in current cycle.</p>
                </div>
              ) : (
                data.recentPlacements.map((p) => (
                  <div key={p.id} className="px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-foreground font-bold uppercase">
                        {p.studentName?.[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{p.studentName}</p>
                        <p className="text-[11px] text-muted-foreground font-medium">
                          {p.postingTitle} at <span className="text-foreground font-bold">{p.companyName}</span>
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active</span>
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
                {!data?.pendingCompanies.length ? (
                  <div className="flex items-center gap-3 py-2 opacity-80">
                    <CheckCircle2 className="h-5 w-5" data-no-skeleton />
                    <span className="text-xs font-medium">All partners verified</span>
                  </div>
                ) : (
                  data.pendingCompanies.map((c) => (
                    <div key={c.id} className="flex items-center justify-between py-1 px-3 bg-white/10 rounded-lg">
                      <span className="text-[11px] font-bold truncate max-w-[120px]">{c.name}</span>
                      <span className="text-[10px] opacity-60 italic">{c.industry}</span>
                    </div>
                  ))
                )}
              </div>

              <Link
                href="/coordinator/companies"
                className="flex h-11 w-full items-center justify-center rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors"
                >
                Verify Partners
              </Link>
            </div>

            {/* Program Health Card */}
            <div className="bg-card border-border shadow-sm p-6 overflow-hidden relative rounded-xl border">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-widest">Program Health</h4>
                <Award className="h-4 w-4 text-muted-foreground/30" data-no-skeleton />
              </div>

              <div className="space-y-5">
                {[
                  { label: "Company Network",   value: data?.verifiedCompanies ?? 0, total: data?.totalCompanies ?? 0,  color: "bg-primary" },
                  { label: "Student Placement", value: data?.hiredStudents ?? 0,      total: data?.totalStudents ?? 0,   color: "bg-foreground" },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                      <span className="text-muted-foreground font-medium">{item.label}</span>
                      <span className="text-foreground">{item.value}/{item.total}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
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
    </Skeleton>
  );
}
