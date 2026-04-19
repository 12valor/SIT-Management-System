"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Clock, Send, CheckCircle2, Briefcase, Loader2, AlertCircle, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStudentDashboardData } from "./actions";
import { StudentDashboardData, StudentApplication } from "./types";

const STATUS_STYLE: Record<string, string> = {
  PENDING:  "bg-amber-500/10 text-amber-600 border-amber-500/20",
  ACCEPTED: "bg-primary/10 text-primary border-primary/20",
  REJECTED: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [data, setData]       = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStudentDashboardData().then((res) => {
      if (res.success && res.data) setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-64 gap-3">
        <Loader2 className="h-5 w-5 text-primary animate-spin" />
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Loading...</span>
      </div>
    );
  }

  const hoursPct = Math.min(Math.round((data.totalHours / 300) * 100), 100);
  const firstName = session?.user?.name?.split(" ")[0] || "Student";

  const statCards = [
    { label: "SIT Hours",          value: `${data.totalHours}/300`,                icon: Clock },
    { label: "Applications",       value: data.applications.length,                 icon: Send },
    { label: "Verified Logs",      value: data.approvedLogs,                        icon: CheckCircle2 },
    { label: "Placement Status",   value: data.hiredPlacement ? "Active" : "Open",  icon: Briefcase },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Student Portal</p>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Hello, {firstName}</h1>
        </div>
        {/* Hours progress inline */}
        <div className="hidden sm:block text-right">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5">SIT Completion</p>
          <div className="flex items-center gap-3">
            <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${hoursPct}%` }} />
            </div>
            <span className="text-xs font-mono font-bold tabular-nums text-foreground">{hoursPct}%</span>
          </div>
        </div>
      </div>

      {/* Active placement banner */}
      {data.hiredPlacement && (
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shrink-0">
            {data.hiredPlacement.company[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-0.5">Active Placement</p>
            <p className="font-black text-foreground text-sm leading-tight truncate">{data.hiredPlacement.title}</p>
            <p className="text-xs text-muted-foreground">{data.hiredPlacement.company} · {data.hiredPlacement.location}</p>
          </div>
          <span className="shrink-0 text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
            Confirmed
          </span>
        </div>
      )}

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="p-5 rounded-lg bg-card border border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground/40" />
            </div>
            <p className="text-2xl font-black font-mono tabular-nums text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Applications table */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-widest text-foreground">Application History</h2>
            <span className="text-[10px] font-mono text-muted-foreground">{data.applications.length} records</span>
          </div>
          <div className="divide-y divide-border">
            {data.applications.length === 0 ? (
              <div className="py-16 flex flex-col items-center gap-2 text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground/30" />
                <p className="text-xs font-mono text-muted-foreground">No applications yet.</p>
                <a href="/student/opportunities" className="text-[10px] font-mono text-primary hover:underline underline-offset-2 uppercase tracking-widest mt-1">
                  Browse Opportunities →
                </a>
              </div>
            ) : (
              data.applications.slice(0, 6).map((app: StudentApplication) => (
                <div key={app.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-xs font-black text-muted-foreground shrink-0">
                      {app.companyName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground leading-tight">{app.postingTitle}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px] font-mono text-muted-foreground">
                        <Building2 className="h-3 w-3" /> {app.companyName}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="hidden sm:block text-[10px] font-mono text-muted-foreground">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </span>
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                      STATUS_STYLE[app.status] ?? "bg-muted text-muted-foreground border-border"
                    )}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hours progress card */}
        <div className="space-y-4">
          <div className="p-5 rounded-lg bg-primary text-primary-foreground border border-primary/80 space-y-5">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest opacity-70 mb-1">SIT Progress</p>
              <p className="text-4xl font-black font-mono tabular-nums">{data.totalHours}<span className="text-xl opacity-50 font-normal">/300</span></p>
              <p className="text-[10px] font-mono opacity-60 mt-1">Hours validated</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono opacity-70">
                <span>Completion</span>
                <span className="tabular-nums">{hoursPct}%</span>
              </div>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${hoursPct}%` }} />
              </div>
            </div>
            <a
              href="/student/logbook"
              className="block w-full h-9 rounded-md bg-white/10 hover:bg-white/20 text-[10px] font-black uppercase tracking-widest transition-colors text-center leading-9"
            >
              Update Logbook
            </a>
          </div>

          <div className="p-5 rounded-lg bg-card border border-border space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Quick Links</p>
            {[
              { label: "Browse Opportunities",  href: "/student/opportunities" },
              { label: "Upload Documents",      href: "/student/documents" },
              { label: "My Logbook",            href: "/student/logbook" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="flex items-center justify-between py-2 text-xs font-bold text-foreground hover:text-primary transition-colors border-b border-border last:border-0"
              >
                {l.label}
                <span className="text-muted-foreground text-xs">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
