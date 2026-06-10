"use client";

import { useMemo, useState } from "react";
import { Search, Download, ExternalLink, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  image: string | null;
};

interface StudentManifestClientProps {
  initialStudents: Student[];
}

export default function StudentManifestClient({ initialStudents }: StudentManifestClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const students = initialStudents;

  const normalizedSearch = searchQuery.toLowerCase();

  const filtered = useMemo(
    () =>
      students.filter((s) =>
        s.name.toLowerCase().includes(normalizedSearch) ||
        s.email.toLowerCase().includes(normalizedSearch) ||
        s.course.toLowerCase().includes(normalizedSearch)
      ),
    [students, normalizedSearch]
  );

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Course", "Status", "Company", "Role", "Total Hours", "Progress (%)"];
    const rows = filtered.map(s => [
      s.name,
      s.email,
      s.course,
      s.status,
      s.company,
      s.role,
      s.totalHours,
      s.progress.toFixed(2)
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `student_manifest_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { hiredCount, completedCount } = useMemo(
    () => ({
      hiredCount: students.filter((s) => s.status === "HIRED").length,
      completedCount: students.filter((s) => s.progress >= 100).length,
    }),
    [students]
  );

  return (
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
            <button 
              onClick={exportToCSV}
              className="h-9 px-4 rounded-lg bg-card border border-border flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-foreground/60 hover:text-foreground hover:border-primary/30 transition-all shadow-sm"
            >
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
                {filtered.length === 0 ? (
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
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-muted border border-border overflow-hidden relative shrink-0">
                            {s.image ? (
                              <Image 
                                src={s.image} 
                                alt={s.name} 
                                fill 
                                className="object-cover" 
                                unoptimized 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-foreground/20">
                                <UserIcon className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground tracking-tight leading-none">{s.name}</p>
                            <p className="text-[10px] text-foreground/50 font-medium mt-1">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-xs text-foreground/70 font-medium">{s.course}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider border shadow-sm",
                          s.progress >= 100
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                            : s.status === "HIRED"
                              ? "bg-primary/5 text-primary border-primary/10"
                              : "bg-muted text-foreground/60 border-border/50"
                        )}>
                          <div className={cn(
                            "w-1 h-1 rounded-full", 
                            s.progress >= 100
                              ? "bg-emerald-500"
                              : s.status === "HIRED" ? "bg-primary" : "bg-foreground/40"
                          )} />
                          {s.progress >= 100 ? "Completed" : s.status === "HIRED" ? "Interning" : "Seeking"}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-xs font-medium text-foreground/70">{s.company || "—"}</span>
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
                        <button 
                          onClick={() => router.push(`/coordinator/students/${s.id}`)}
                          className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-card text-foreground/30 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                        >
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
  );
}
