"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ClipboardList, Users, Clock, CheckCircle2, Loader2, Calendar } from "lucide-react";
import { getEmployerDashboardData } from "./actions";
import { cn } from "@/lib/utils";
import { ApplicationStatus } from "@prisma/client";

type DashboardData = {
  totalPostings: number;
  totalApplicants: number;
  pendingApplicants: number;
  hiredCount: number;
  recentApplications: {
    id: string;
    status: ApplicationStatus;
    appliedAt: Date;
    student: { name: string | null; email: string | null; course: string | null };
    posting: { title: string };
  }[];
};

const STATUS_STYLE: Record<string, string> = {
  PENDING:  "bg-amber-500/10 text-amber-600 border-amber-500/20",
  ACCEPTED: "bg-primary/10 text-primary border-primary/20",
  REJECTED: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function EmployerDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEmployerDashboardData().then((res) => {
      if (res.success && res.data) setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3">
        <Loader2 className="h-5 w-5 text-primary animate-spin" />
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Loading...</span>
      </div>
    );
  }

  const statCards = [
    { label: "Active Postings",   value: data?.totalPostings   ?? 0, icon: ClipboardList },
    { label: "Total Applicants",  value: data?.totalApplicants ?? 0, icon: Users },
    { label: "Pending Review",    value: data?.pendingApplicants ?? 0, icon: Clock },
    { label: "Confirmed Hires",   value: data?.hiredCount      ?? 0, icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
            {session?.user?.name} — Employer Portal
          </p>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Overview</h1>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground bg-muted px-3 py-2 rounded-md border border-border">
          <Calendar className="h-3.5 w-3.5" />
          {new Date().toLocaleDateString("en-PH", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="p-5 rounded-lg bg-card border border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground/40" />
            </div>
            <p className="text-3xl font-black font-mono text-foreground tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Applicants table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-muted/30">
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground">Recent Applicants</h2>
          <span className="text-[10px] font-mono text-muted-foreground">{data?.recentApplications?.length ?? 0} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Student</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Course</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Role Applied</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Date</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!data?.recentApplications?.length ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-xs text-muted-foreground font-mono">
                    No applicants yet. Create a posting to start receiving applications.
                  </td>
                </tr>
              ) : (
                data.recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-foreground text-sm leading-tight">{app.student.name ?? "—"}</p>
                      <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{app.student.email ?? "—"}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className="text-xs font-medium text-muted-foreground">{app.student.course ?? "N/A"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-bold text-foreground">{app.posting.title}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-mono text-muted-foreground">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                        STATUS_STYLE[app.status] ?? "bg-muted text-muted-foreground border-border"
                      )}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
