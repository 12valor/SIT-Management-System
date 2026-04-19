"use client";

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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Registry</p>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Student Manifest</h1>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground bg-muted px-3 py-1.5 rounded-md border border-border">
          {students.length} enrolled
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Enrolled",    value: students.length },
          { label: "Currently Hired",   value: hiredCount },
          { label: "Hours Complete",    value: completedCount },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-lg bg-card border border-border">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-black font-mono tabular-nums text-foreground mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 h-9 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <button className="h-9 px-4 rounded-md border border-border bg-card flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:bg-muted transition-colors">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left">
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Student</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden lg:table-cell">Course</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden md:table-cell">Company</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Hours</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-xs text-muted-foreground font-mono">
                    {students.length === 0 ? "No approved students registered yet." : "No results for your search."}
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-foreground text-sm leading-tight">{s.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{s.email}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">{s.course}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                        s.status === "HIRED"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-muted text-muted-foreground border-border"
                      )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", s.status === "HIRED" ? "bg-primary" : "bg-muted-foreground/50")} />
                        {s.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-xs font-medium text-foreground">{s.company}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="space-y-1 max-w-[120px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-bold text-foreground tabular-nums">
                            {s.totalHours.toFixed(0)}<span className="text-muted-foreground font-normal">/300</span>
                          </span>
                          <span className="text-[9px] font-mono text-muted-foreground">{Math.round(s.progress)}%</span>
                        </div>
                        <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${s.progress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="h-7 w-7 inline-flex items-center justify-center rounded border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
          <p className="text-[10px] font-mono text-muted-foreground">
            Showing {filtered.length} of {students.length} records
          </p>
        </div>
      </div>
    </div>
  );
}
