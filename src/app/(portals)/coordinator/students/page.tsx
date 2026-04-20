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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Student Manifest</h1>
          <p className="text-sm text-slate-500 font-medium">Registry of SIT candidates and their current industrial status.</p>
        </div>
        <div className="h-10 px-4 flex items-center bg-white rounded-lg border border-slate-200 shadow-sm text-[11px] font-bold uppercase tracking-wider text-slate-400">
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
          <div key={s.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
          <input
            type="text"
            placeholder="Filter by name, email, or program..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-11 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] transition-all shadow-sm"
          />
        </div>
        <button className="h-11 px-6 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all shadow-sm">
          <Download className="h-4 w-4" /> Export CSV Manifest
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left">Student Information</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left hidden lg:table-cell">Academic Program</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left hidden md:table-cell">Host Company</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left">Progression</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-24 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#800000] mx-auto opacity-20" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-32 text-center">
                    <p className="text-sm text-slate-300 font-bold uppercase tracking-widest">
                      {students.length === 0 ? "Empty Registry" : "No results for query"}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 leading-tight">{s.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{s.email}</p>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-xs text-slate-500 font-medium">{s.course}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border shadow-sm",
                        s.status === "HIRED"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      )}>
                        <div className={cn("w-1 h-1 rounded-full", s.status === "HIRED" ? "bg-emerald-500" : "bg-amber-500")} />
                        {s.status === "HIRED" ? "Interning" : "Seeking"}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs font-bold text-slate-700">{s.company || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1.5 max-w-[140px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-slate-700 tabular-nums">
                            {s.totalHours.toFixed(0)}<span className="text-slate-300 font-medium"> / 300h</span>
                          </span>
                          <span className="text-[9px] font-bold text-slate-400">{Math.round(s.progress)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                          <div className="h-full bg-[#800000] rounded-full transition-all duration-700" style={{ width: `${s.progress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-[#800000] hover:border-[#800000] transition-all shadow-sm">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Displaying {filtered.length} Manifest Records
          </p>
        </div>
      </div>
    </div>
  );
}
