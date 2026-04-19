"use client";

import { useState, useEffect } from "react";
import {
  Users, Building2, CheckCircle2, Award, Briefcase, Loader2, Clock, AlertCircle,
} from "lucide-react";
import { getCoordinatorStats } from "./actions";
import { CoordinatorStats, RecentPlacement } from "./types";


export default function CoordinatorDashboard() {
  const [stats, setStats]       = useState<CoordinatorStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCoordinatorStats().then((res) => {
      if (res.success && res.data) setStats(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center h-64 gap-3">
        <Loader2 className="h-5 w-5 text-primary animate-spin" />
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Loading...</span>
      </div>
    );
  }

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
    <div className="space-y-8 pb-12">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
            TUP-V SIT Coordinator Portal
          </p>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Program Overview</h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono text-muted-foreground">Placement Rate</p>
          <p className="text-2xl font-black font-mono tabular-nums text-primary">{placementRate}%</p>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="p-5 rounded-lg bg-card border border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground/40" />
            </div>
            <p className="text-3xl font-black font-mono tabular-nums text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Placements feed */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-widest text-foreground">Recent Placements</h2>
            <span className="text-[10px] font-mono text-muted-foreground">{stats.recentPlacements.length} records</span>
          </div>
          <div className="divide-y divide-border">
            {stats.recentPlacements.length === 0 ? (
              <div className="py-16 flex flex-col items-center gap-2 text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground/30" />
                <p className="text-xs font-mono text-muted-foreground">No placements confirmed yet.</p>
              </div>
            ) : (
              stats.recentPlacements.map((p: RecentPlacement) => (
                <div key={p.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-black text-primary">
                      {p.studentName?.[0] ?? "?"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground leading-tight">{p.studentName}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px] font-mono text-muted-foreground">
                        <span>{p.postingTitle}</span>
                        <span className="opacity-40">—</span>
                        <span>{p.companyName}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Company verification queue */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-muted/30">
              <h2 className="text-xs font-black uppercase tracking-widest text-foreground">MOU Pending</h2>
            </div>
            <div className="divide-y divide-border">
              {stats.pendingCompanies.length === 0 ? (
                <div className="py-10 flex flex-col items-center gap-2 text-center">
                  <CheckCircle2 className="h-7 w-7 text-primary/30" />
                  <p className="text-[10px] font-mono text-muted-foreground">All partners verified.</p>
                </div>
              ) : (
                stats.pendingCompanies.map((c) => (
                  <div key={c.id} className="px-5 py-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-foreground leading-tight">{c.name}</p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{c.industry}</p>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    </div>
                  </div>
                ))
              )}
            </div>
            {stats.pendingCompanies.length > 0 && (
              <div className="px-5 py-3 border-t border-border bg-muted/20">
                <a href="/coordinator/companies" className="text-[10px] font-mono text-primary hover:underline underline-offset-2 uppercase tracking-widest">
                  Manage Partners →
                </a>
              </div>
            )}
          </div>

          {/* Program status */}
          <div className="p-5 rounded-lg bg-primary text-primary-foreground border border-primary/80 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase tracking-widest opacity-70">Program Status</p>
              <Clock className="h-4 w-4 opacity-40" />
            </div>
            <div className="space-y-3">
              {[
                { label: "Verified Companies",   value: stats.verifiedCompanies, total: stats.totalCompanies },
                { label: "Placed Students",       value: stats.hiredStudents,     total: stats.totalStudents },
              ].map((row) => (
                <div key={row.label} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                    <span>{row.label}</span>
                    <span className="tabular-nums">{row.value}/{row.total}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${row.total > 0 ? Math.round((row.value / row.total) * 100) : 0}%` }}
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
