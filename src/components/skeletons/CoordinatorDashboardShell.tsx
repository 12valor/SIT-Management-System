"use client";

import { Skeleton } from "boneyard-js/react";
import Link from "next/link";

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
      <div className="flex-1 space-y-12">
        {/* 1. Header Section */}
        <div className="pb-6 border-b border-border/50">
          <h2 className="text-xl font-semibold text-foreground">
            Program Control, {userName?.split(" ")[0]}
          </h2>
          <p className="text-sm text-foreground/80 mt-1">
            Administrative overview for {new Date().getFullYear()}
          </p>
        </div>

        {/* 2. Split Card View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Students Card */}
          <div className="bg-card border border-border p-8 rounded-xl shadow-sm space-y-8">
            <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">Students</h3>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-foreground/70 mb-1">Enrolled students</p>
                <p className="text-3xl font-semibold text-foreground tracking-tight">{data?.totalStudents ?? 0}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/70 mb-1">Hours complete</p>
                <p className="text-3xl font-semibold text-foreground tracking-tight">{data?.graduationReady ?? 0}</p>
              </div>
            </div>

            <Link href="/coordinator/students" className="text-xs font-medium text-foreground hover:underline inline-flex items-center gap-2">
              View student manifest <span>→</span>
            </Link>
          </div>

          {/* Employers Card */}
          <div className="bg-card border border-border p-8 rounded-xl shadow-sm space-y-8">
            <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">Employers</h3>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-foreground/70 mb-1">Industry partners</p>
                <p className="text-3xl font-semibold text-foreground tracking-tight">{data?.totalCompanies ?? 0}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/70 mb-1">Pending review</p>
                <p className="text-3xl font-semibold text-foreground tracking-tight">{data?.pendingCompanies.length ?? 0}</p>
              </div>
            </div>

            <Link href="/coordinator/companies" className="text-xs font-medium text-foreground hover:underline inline-flex items-center gap-2">
              View partner registrations <span>→</span>
            </Link>
          </div>
        </div>

        {/* 3. Placement History Card */}
        <div className="bg-card border border-border p-8 rounded-xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-sm font-semibold text-foreground">Placement History</h3>
            <div className="text-xs text-foreground/80">
              Placement rate: <span className="font-semibold text-foreground">{placementRate}%</span>
            </div>
          </div>

          <div className="divide-y divide-border">
            {!data?.recentPlacements.length ? (
              <div className="py-12 text-center">
                <p className="text-sm text-foreground/50 italic">No recent placement activity recorded.</p>
              </div>
            ) : (
              data.recentPlacements.map((p) => (
                <div key={p.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">{p.studentName}</p>
                    <p className="text-xs text-foreground/70">
                      {p.postingTitle} at <span className="font-medium text-foreground">{p.companyName}</span>
                    </p>
                  </div>
                  <div className="text-[10px] font-semibold text-foreground/70 bg-muted px-2 py-0.5 rounded border border-border/50">
                    Active
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
