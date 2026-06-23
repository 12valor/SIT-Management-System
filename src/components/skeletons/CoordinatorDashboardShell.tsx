"use client";

import dynamic from "next/dynamic";
import { useState, useTransition, useEffect } from "react";
import { Skeleton } from "boneyard-js/react";
import { getPlacementTrend } from "@/app/(portals)/coordinator/dashboard/actions";
import { cn } from "@/lib/utils";

const ProgramMomentumChart = dynamic(
  () => import("./CoordinatorDashboardCharts").then((mod) => mod.ProgramMomentumChart),
  {
    ssr: false,
    loading: () => <div className="h-full w-full rounded-lg bg-muted/40 animate-pulse" />,
  }
);

const IndustryDistributionChart = dynamic(
  () => import("./CoordinatorDashboardCharts").then((mod) => mod.IndustryDistributionChart),
  {
    ssr: false,
    loading: () => <div className="h-full w-full rounded-lg bg-muted/40 animate-pulse" />,
  }
);

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

interface TrendData {
  month: string;
  students: number;
  placements: number;
}

interface IndustryStat {
  name: string;
  count: number;
  subIndustries?: string[];
}

interface CoordinatorDashboardData {
  totalStudents: number;
  hiredStudents: number;
  totalCompanies: number;
  verifiedCompanies: number;
  graduationReady: number;
  pendingLogbooks: number;
  userName?: string | null;
  topHiringCompanies: { name: string; count: number }[];
  recentPlacements: RecentPlacement[];
  pendingCompanies: PendingCompany[];
  placementTrend?: TrendData[];
  industryStats?: IndustryStat[];
}

interface Props {
  data: CoordinatorDashboardData | null;
  userName?: string;
}

// ─── Shell Component ─────────────────────────────────────────────────────────
export function CoordinatorDashboardShell({ data, userName }: Props) {
  const [timeframe, setTimeframe] = useState<'monthly' | 'weekly' | 'daily'>('monthly');
  const [trendData, setTrendData] = useState<TrendData[]>(data?.placementTrend ?? []);
  const [isPending, startTransition] = useTransition();

  const placementRate = data && data.totalStudents > 0
    ? Math.round((data.hiredStudents / data.totalStudents) * 100)
    : 0;

  useEffect(() => {
    if (data?.placementTrend) {
      setTrendData(data.placementTrend);
    }
  }, [data?.placementTrend]);

  const handleTimeframeChange = (newTimeframe: 'monthly' | 'weekly' | 'daily') => {
    setTimeframe(newTimeframe);
    startTransition(async () => {
      const res = await getPlacementTrend(newTimeframe);
      if (res.success && res.data) {
        setTrendData(res.data);
      }
    });
  };

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
          <div className="grid grid-cols-2 gap-6">
            <div className="h-44 bg-muted rounded-xl border border-border" />
            <div className="h-44 bg-muted rounded-xl border border-border" />
          </div>
          <div className="h-64 bg-muted rounded-xl border border-border" />
          <div className="h-96 bg-muted rounded-xl border border-border" />
        </div>
      }
    >
      <div className="flex-1 space-y-12">
        {/* 1. Header Section */}
        <div className="pb-8 border-b border-border/40">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Program Control, {userName?.split(" ")[0]}
          </h2>
          <p className="text-base text-foreground/60 mt-2 font-medium">
            Administrative overview for {new Date().getFullYear()}
          </p>
        </div>

        {/* 2. Split Card View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Students Card */}
          <div className="group relative overflow-hidden bg-card border border-border/40 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 space-y-8">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-150 duration-700" />
            <h3 className="text-sm font-medium text-foreground/80 border-b border-border/40 pb-3 relative z-10">Students</h3>
            
            <div className="grid grid-cols-3 gap-8 relative z-10">
              <div className="space-y-1">
                <p className="text-xs text-foreground/60 font-medium">Enrolled</p>
                <p className="text-4xl font-semibold text-foreground tracking-tighter">{data?.totalStudents ?? 0}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-foreground/60 font-medium">Grad Ready</p>
                <p className="text-4xl font-semibold text-foreground tracking-tighter">{data?.graduationReady ?? 0}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-foreground/60 font-medium">Pending Logbooks</p>
                <p className="text-4xl font-semibold text-primary tracking-tighter">{data?.pendingLogbooks ?? 0}</p>
              </div>
            </div>

          </div>

          {/* Employers Card */}
          <div className="group relative overflow-hidden bg-card border border-border/40 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 space-y-8">
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-foreground/5 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-150 duration-700" />
            <h3 className="text-sm font-medium text-foreground/80 border-b border-border/40 pb-3 relative z-10">Employers</h3>
            
            <div className="grid grid-cols-2 gap-8 relative z-10">
              <div className="space-y-1">
                <p className="text-xs text-foreground/60 font-medium">Industry partners</p>
                <p className="text-4xl font-semibold text-foreground tracking-tighter">{data?.totalCompanies ?? 0}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-foreground/60 font-medium">Pending review</p>
                <p className="text-4xl font-semibold text-foreground tracking-tighter">{data?.pendingCompanies.length ?? 0}</p>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Chart */}
          <div className="lg:col-span-2 bg-card border border-border/40 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 space-y-6">
            <div className="flex items-center justify-between border-b border-border/40 pb-5">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground/80">Program Momentum</h3>
                <p className="text-[11px] font-medium text-foreground/50 uppercase tracking-wider">
                  {timeframe === 'monthly' ? '6-Month' : timeframe === 'weekly' ? '8-Week' : '14-Day'} Enrollment vs Placement
                </p>
              </div>

              {/* Timeframe Filter */}
              <div className="flex items-center bg-muted/40 p-1 rounded-xl border border-border/40">
                {(['monthly', 'weekly', 'daily'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTimeframeChange(t)}
                    disabled={isPending}
                    className={cn(
                      "px-4 py-1.5 text-xs font-medium rounded-lg transition-all duration-300",
                      timeframe === t 
                        ? "bg-background text-foreground shadow-sm ring-1 ring-border/50" 
                        : "text-foreground/50 hover:text-foreground/80"
                    )}
                  >
                    {t === 'monthly' ? 'Mo' : t === 'weekly' ? 'Wk' : 'Dy'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={cn("h-[240px] w-full transition-opacity duration-300", isPending && "opacity-50")}>
              <ProgramMomentumChart data={trendData} />
            </div>
          </div>

          {/* Industry Distribution */}
          <div className="bg-card border border-border/40 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 space-y-6">
            <div className="flex items-center justify-between border-b border-border/40 pb-5">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground/80">Industrial Reach</h3>
                <p className="text-[11px] font-medium text-foreground/50 uppercase tracking-wider">Top Sectors</p>
              </div>
            </div>
            <div className="h-[240px] w-full">
              <IndustryDistributionChart data={data?.industryStats} />
            </div>
          </div>
        </div>

        {/* 4. Bottom Grid: History & Partners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Placement History */}
          <div className="bg-card border border-border/40 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 space-y-6">
            <div className="flex items-center justify-between border-b border-border/40 pb-5">
              <h3 className="text-sm font-medium text-foreground/80">Placement History</h3>
              <div className="text-xs font-medium text-foreground/60 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/40">
                Placement rate: <span className="font-bold text-foreground">{placementRate}%</span>
              </div>
            </div>

            <div className="divide-y divide-border/40">
              {!data?.recentPlacements.length ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-foreground/50 italic">No recent placement activity recorded.</p>
                </div>
              ) : (
                data.recentPlacements.map((p) => (
                  <div key={p.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0 hover:bg-muted/20 -mx-4 px-4 rounded-xl transition-colors duration-200">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{p.studentName}</p>
                      <p className="text-xs text-foreground/60 font-medium">
                        {p.postingTitle} at <span className="font-semibold text-foreground">{p.companyName}</span>
                      </p>
                    </div>
                    <div className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                      Active
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Hiring Partners */}
          <div className="bg-card border border-border/40 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 space-y-6">
            <div className="flex items-center justify-between border-b border-border/40 pb-5">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground/80">Top Hiring Partners</h3>
                <p className="text-[11px] font-medium text-foreground/50 uppercase tracking-wider">By Placement Volume</p>
              </div>
            </div>

            <div className="space-y-4">
              {!data?.topHiringCompanies.length ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-foreground/50 italic">No hiring data available yet.</p>
                </div>
              ) : (
                data.topHiringCompanies.map((company, idx) => (
                  <div key={idx} className="flex items-center justify-between group p-2 -mx-2 hover:bg-muted/20 rounded-xl transition-colors duration-200">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center text-xs font-bold text-foreground/60 border border-border/40 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 shadow-sm">
                        {idx + 1}
                      </div>
                      <p className="text-sm font-semibold text-foreground">{company.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 bg-muted/50 rounded-full overflow-hidden border border-border/40">
                        <div 
                          className="h-full bg-primary transition-all duration-1000" 
                          style={{ 
                            width: `${(company.count / data.topHiringCompanies[0].count) * 100}%`,
                            opacity: 1 - (idx * 0.15)
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground w-4 text-right">{company.count}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
