"use client";

import { Skeleton } from "boneyard-js/react";

import { useState, useEffect, useCallback } from "react";
import { Search, Download, ExternalLink, Loader2 } from "lucide-react";
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
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="h-10 w-10 text-[#800000] animate-spin opacity-20" />
        </div>
      }
    >
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Student Manifest</h1>
          <p className="text-sm text-muted-foreground font-medium">Registry of SIT candidates and their current industrial status.</p>
        </div>
        <div className="h-10 px-4 flex items-center bg-card rounded-lg border border-border shadow-sm text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
          {students.length} Candidates Enrolled
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Population", value: students.length },
          { label: "Active Placement", value: hiredCount },
          { label: "Hours Complete",   value: completedCount },
        ].map((s) => (
          <div key={s.label} className="bg-card p-5 rounded-xl border border-border shadow-sm">
            <p className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <input
            type="text"
            placeholder="Filter by name, email, or program..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-11 rounded-xl border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
          />
        </div>
        <button className="h-11 px-6 rounded-xl bg-card border border-border flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-foreground hover:border-muted-foreground/40 transition-all shadow-sm">
          <Download className="h-4 w-4" /> Export CSV Manifest
        </button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left">Student Information</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left hidden lg:table-cell">Academic Program</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left hidden md:table-cell">Host Company</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left">Progression</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={6} className="py-32 text-center">
                    <p className="text-sm text-muted-foreground/40 font-bold uppercase tracking-widest">
                      {students.length === 0 ? "Empty Registry" : "No results for query"}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-foreground leading-tight">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground/60 font-medium mt-0.5">{s.email}</p>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground font-medium">{s.course}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border shadow-sm",
                        s.status === "HIRED"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      )}>
                        <div className={cn("w-1 h-1 rounded-full", s.status === "HIRED" ? "bg-emerald-500" : "bg-amber-500")} />
                        {s.status === "HIRED" ? "Interning" : "Seeking"}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs font-bold text-muted-foreground">{s.company || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1.5 max-w-[140px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-foreground tabular-nums">
                            {s.totalHours.toFixed(0)}<span className="text-muted-foreground/30 font-medium"> / 300h</span>
                          </span>
                          <span className="text-[9px] font-bold text-muted-foreground/40">{Math.round(s.progress)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border/60">
                          <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${s.progress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground/40 hover:text-primary hover:border-primary transition-all shadow-sm">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-border/40 bg-muted/20 flex items-center justify-between">
          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-wider">
            Displaying {filtered.length} Manifest Records
          </p>
        </div>
      </div>
    </div>
    </Skeleton>
  );
}
