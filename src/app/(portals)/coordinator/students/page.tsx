"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useEffect, useCallback } from "react";
import { Search, Download, ExternalLink, Loader2, Users } from "lucide-react";
import { getStudentManifest } from "./actions";
import { cn } from "@/lib/utils";

type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
  totalHours: number;
  progress: number;
  status: "HIRED" | "SEEKING";
  company: string;
  role: string;
  joinedAt: Date;
};

export default function CoordinatorStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const load = useCallback(async () => {
    const res = await getStudentManifest();
    setStudents(res as Student[]);
    setIsLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hiredCount = students.filter((s) => s.status === "HIRED").length;
  const completedCount = students.filter((s) => s.progress >= 100).length;

  return (
    <Skeleton 
      name="coordinator-students" 
      loading={isLoading}
      fallback={
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-muted rounded-lg" />
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-muted rounded-xl border border-border" />
            ))}
          </div>
          <div className="h-96 bg-muted rounded-xl border border-border" />
        </div>
      }
    >
      <div className="flex-1 space-y-12">
        {/* 1. Header Section */}
        <div className="pb-6 border-b border-border/50 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground uppercase tracking-tight">
              Student Manifest
            </h2>
            <p className="text-sm text-foreground/80 mt-1">
              Registry of SIT candidates and their current industrial status
            </p>
          </div>
          <div className="text-[10px] font-semibold text-foreground/70 bg-muted px-2 py-0.5 rounded border border-border/50 uppercase tracking-wider">
            {students.length} Candidates Enrolled
          </div>
        </div>

        {/* 2. Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Total Population", value: students.length },
            { label: "Active Placement", value: hiredCount },
            { label: "Hours Complete",   value: completedCount },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-2">
              <p className="text-[10px] font-semibold uppercase text-foreground/50 tracking-wider">{s.label}</p>
              <p className="text-3xl font-semibold text-foreground tracking-tight">{s.value}</p>
            </div>
          ))}
        </div>

        {/* 3. Table & Toolbar Section */}
        <div className="space-y-6 pb-24">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Registry Records</h3>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30" />
                <input
                  type="text"
                  placeholder="Filter manifest..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 h-9 rounded-lg border border-border bg-card text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                />
              </div>
              <button className="h-9 px-4 rounded-lg bg-card border border-border flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-foreground/60 hover:text-foreground hover:border-primary/30 transition-all shadow-sm">
                <Download className="h-3.5 w-3.5" /> Export
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Student Information</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left hidden lg:table-cell">Academic Program</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Status</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left hidden md:table-cell">Host Company</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Progression</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filtered.length === 0 && !isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-32 text-center">
                        <p className="text-xs font-semibold text-foreground/30 uppercase tracking-widest">
                          {students.length === 0 ? "Empty Registry" : "No results found"}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s) => (
                      <tr key={s.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-foreground tracking-tight leading-none">{s.name}</p>
                          <p className="text-[10px] text-foreground/50 font-medium mt-1">{s.email}</p>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className="text-xs text-foreground/70 font-medium">{s.course}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider border shadow-sm",
                            s.status === "HIRED"
                              ? "bg-primary/5 text-primary border-primary/10"
                              : "bg-muted text-foreground/60 border-border/50"
                          )}>
                            <div className={cn("w-1 h-1 rounded-full", s.status === "HIRED" ? "bg-primary" : "bg-foreground/40")} />
                            {s.status === "HIRED" ? "Interning" : "Seeking"}
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="text-xs font-medium text-foreground/70">{s.company || "N/A"}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1.5 max-w-[140px]">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-semibold text-foreground tabular-nums">
                                {s.totalHours.toFixed(0)}<span className="text-foreground/30 font-medium"> / 300h</span>
                              </span>
                              <span className="text-[9px] font-semibold text-foreground/40">{Math.round(s.progress)}%</span>
                            </div>
                            <div className="h-1 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                              <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${s.progress}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-card text-foreground/30 hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-border/40 bg-muted/20 flex items-center justify-between">
              <p className="text-[9px] font-medium text-foreground/40 uppercase tracking-widest">
                Manifest Records: {filtered.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
