"use client";

import { Skeleton } from "boneyard-js/react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";

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

          </div>
        </div>

        {/* 3. Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Chart */}
          <div className="lg:col-span-2 bg-card border border-border p-8 rounded-xl shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-semibold text-foreground">Program Momentum</h3>
              <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">6-Month Enrollment vs Placement</p>
            </div>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.placementTrend}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--foreground)" opacity={0.1} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: 'var(--foreground)', opacity: 0.7 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: 'var(--foreground)', opacity: 0.7 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)', 
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: 'var(--foreground)'
                    }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="students" 
                    stroke="var(--primary)" 
                    fillOpacity={0.1} 
                    fill="var(--primary)" 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="placements" 
                    stroke="var(--foreground)" 
                    fillOpacity={0} 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    opacity={0.4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Industry Distribution */}
          <div className="bg-card border border-border p-8 rounded-xl shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-semibold text-foreground">Industrial Reach</h3>
              <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Top Sectors</p>
            </div>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.industryStats} layout="vertical" margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--foreground)" opacity={0.1} />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: 'var(--foreground)', fontWeight: 'bold', opacity: 0.8 }}
                    width={80}
                  />
                  <Tooltip 
                    cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as IndustryStat;
                        return (
                          <div className="bg-background border border-border p-3 rounded-xl shadow-xl min-w-[120px]">
                            <p className="text-xs font-bold text-foreground mb-1">{data.name}</p>
                            <p className="text-[10px] text-foreground/70">Partners: <span className="text-foreground font-medium">{data.count}</span></p>
                            {data.name === 'Other' && data.subIndustries && data.subIndustries.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-border">
                                <p className="text-[9px] font-mono uppercase text-foreground/40 mb-1">Includes:</p>
                                <div className="flex flex-wrap gap-1">
                                  {data.subIndustries.map((si, i) => (
                                    <span key={i} className="text-[9px] px-1.5 py-0.5 bg-muted rounded text-foreground/80">
                                      {si}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                    {data?.industryStats?.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? 'var(--primary)' : 'var(--foreground)'} 
                        fillOpacity={index === 0 ? 1 : 0.4 - (index * 0.05)} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 4. Placement History Card */}
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
