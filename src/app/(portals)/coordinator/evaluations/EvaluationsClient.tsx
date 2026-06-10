"use client";

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { 
  Search, 
  Download, 
  ExternalLink, 
  Star, 
  Award, 
  Building2, 
  User as UserIcon, 
  ThumbsUp, 
  ThumbsDown, 
  Calendar, 
  Clock, 
  X,
  FileCheck,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Evaluation {
  id: string;
  supervisorName: string;
  companyName: string;
  technicalSkills: number;
  professionalism: number;
  punctuality: number;
  qualityOfWork: number;
  overallGrade: number;
  comments: string;
  recommendForHire: boolean;
  submittedAt: Date | string;
  studentId: string;
  studentName: string;
  studentEmail: string | null;
  course: string;
  image: string | null;
  totalHours: number;
}

interface PendingEvaluation {
  studentId: string;
  studentName: string;
  studentEmail: string | null;
  course: string;
  companyName: string;
  totalHours: number;
  requiredHours: number;
}

interface EvaluationsClientProps {
  initialEvaluations: Evaluation[];
  initialPending: PendingEvaluation[];
}

export default function EvaluationsClient({ initialEvaluations, initialPending }: EvaluationsClientProps) {
  const [activeTab, setActiveTab] = useState<"certified" | "pending">("certified");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const normalizedSearch = searchQuery.toLowerCase();

  const filteredEvaluations = useMemo(
    () =>
      initialEvaluations.filter((ev) =>
        ev.studentName.toLowerCase().includes(normalizedSearch) ||
        (ev.studentEmail && ev.studentEmail.toLowerCase().includes(normalizedSearch)) ||
        ev.companyName.toLowerCase().includes(normalizedSearch) ||
        ev.course.toLowerCase().includes(normalizedSearch)
      ),
    [initialEvaluations, normalizedSearch]
  );

  const filteredPending = useMemo(
    () =>
      initialPending.filter((p) =>
        p.studentName.toLowerCase().includes(normalizedSearch) ||
        (p.studentEmail && p.studentEmail.toLowerCase().includes(normalizedSearch)) ||
        p.companyName.toLowerCase().includes(normalizedSearch) ||
        p.course.toLowerCase().includes(normalizedSearch)
      ),
    [initialPending, normalizedSearch]
  );

  // Statistics calculation
  const { totalEvaluationsCount, avgGrade, positiveHireRecommendation } = useMemo(() => {
    const total = initialEvaluations.length;
    return {
      totalEvaluationsCount: total,
      avgGrade:
        total > 0
          ? initialEvaluations.reduce((sum, ev) => sum + ev.overallGrade, 0) / total
          : 0,
      positiveHireRecommendation:
        total > 0
          ? (initialEvaluations.filter((ev) => ev.recommendForHire).length / total) * 100
          : 0,
    };
  }, [initialEvaluations]);
  const totalAwaitingCount = initialPending.length;

  const exportEvaluationsToCSV = () => {
    const headers = [
      "Student Name", 
      "Email", 
      "Course", 
      "Company", 
      "Supervisor", 
      "Technical Skills", 
      "Professionalism", 
      "Punctuality", 
      "Quality of Work", 
      "Overall Score", 
      "Recommend For Hire", 
      "Submitted Date"
    ];
    const rows = filteredEvaluations.map(ev => [
      ev.studentName,
      ev.studentEmail || "N/A",
      ev.course,
      ev.companyName,
      ev.supervisorName,
      ev.technicalSkills,
      ev.professionalism,
      ev.punctuality,
      ev.qualityOfWork,
      ev.overallGrade.toFixed(2),
      ev.recommendForHire ? "YES" : "NO",
      new Date(ev.submittedAt).toLocaleDateString()
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `employer_evaluations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getMetricStars = (grade: number) => {
    const stars = [];
    const rounded = Math.round(grade);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={cn(
            "h-3.5 w-3.5 shrink-0", 
            i <= rounded 
              ? "text-amber-500 fill-amber-500" 
              : "text-slate-200 dark:text-white/10"
          )} 
        />
      );
    }
    return stars;
  };

  const ratingLabels = [
    { key: "technicalSkills" as const, label: "Technical Aptitude" },
    { key: "professionalism" as const, label: "Professional Ethos" },
    { key: "punctuality" as const, label: "Operational Punctuality" },
    { key: "qualityOfWork" as const, label: "Quality of Execution" }
  ];

  return (
    <div className="flex-1 space-y-12">
      {/* 1. Header Section */}
      <div className="pb-6 border-b border-border/50 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground uppercase tracking-tight">
            Employer Evaluations
          </h2>
          <p className="text-sm text-foreground/80 mt-1">
            Performance audits, technical feedback, and supervisor competency ratings for student trainees.
          </p>
        </div>
        <div className="text-[10px] font-semibold text-foreground/70 bg-muted px-2 py-0.5 rounded border border-border/50 uppercase tracking-wider">
          {totalEvaluationsCount} Endorsements Submitted
        </div>
      </div>

      {/* 2. Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: "Evaluated Candidates", 
            value: totalEvaluationsCount, 
            desc: "Unique verified audits",
            icon: FileCheck,
            color: "text-emerald-500 bg-emerald-500/10"
          },
          { 
            label: "Average Grade", 
            value: `${avgGrade > 0 ? avgGrade.toFixed(2) : "0.00"} / 5.0`, 
            desc: "Industrial skill rating average",
            icon: TrendingUp,
            color: "text-amber-500 bg-amber-500/10"
          },
          { 
            label: "Endorsement Rate", 
            value: `${positiveHireRecommendation.toFixed(0)}%`, 
            desc: "Highly recommended for hire",
            icon: ThumbsUp,
            color: "text-primary bg-primary/10"
          },
          { 
            label: "Awaiting Review", 
            value: totalAwaitingCount, 
            desc: "Placed trainees to evaluate",
            icon: Clock,
            color: "text-slate-500 bg-slate-500/10"
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-card border border-border p-6 rounded-xl shadow-sm flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase text-foreground/50 tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
                <p className="text-[10px] text-foreground/40 font-medium">{stat.desc}</p>
              </div>
              <div className={cn("p-3 rounded-lg shrink-0", stat.color)}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Toolbar & Tabs */}
      <div className="space-y-6 pb-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border pb-4">
          {/* Custom Tabs */}
          <div className="flex bg-muted p-1 rounded-lg border border-border/50">
            <button
              onClick={() => { setActiveTab("certified"); setSearchQuery(""); }}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all",
                activeTab === "certified"
                  ? "bg-card text-foreground shadow-sm font-bold"
                  : "text-foreground/50 hover:text-foreground"
              )}
            >
              Certified Reviews ({filteredEvaluations.length})
            </button>
            <button
              onClick={() => { setActiveTab("pending"); setSearchQuery(""); }}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all",
                activeTab === "pending"
                  ? "bg-card text-foreground shadow-sm font-bold"
                  : "text-foreground/50 hover:text-foreground"
              )}
            >
              Awaiting Review ({filteredPending.length})
            </button>
          </div>

          {/* Search and Action Bar */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30" />
              <input
                type="text"
                placeholder={activeTab === "certified" ? "Search evaluations..." : "Search placements..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 h-9 rounded-lg border border-border bg-card text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
              />
            </div>
            {activeTab === "certified" && (
              <button 
                onClick={exportEvaluationsToCSV}
                className="h-9 px-4 rounded-lg bg-card border border-border flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-foreground/60 hover:text-foreground hover:border-primary/30 transition-all shadow-sm shrink-0"
              >
                <Download className="h-3.5 w-3.5" /> Export
              </button>
            )}
          </div>
        </div>

        {/* 4. Tab Contents */}
        {activeTab === "certified" ? (
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Student Profile</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Placement Details</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Supervisor</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Overall Score</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Rec. Hire</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left hidden lg:table-cell">Date Submitted</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredEvaluations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-24 text-center">
                        <p className="text-xs font-semibold text-foreground/30 uppercase tracking-widest">
                          No Submitted Evaluations Found
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredEvaluations.map((ev) => (
                      <tr key={ev.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-muted border border-border overflow-hidden relative shrink-0">
                              {ev.image ? (
                                <Image 
                                  src={ev.image} 
                                  alt={ev.studentName} 
                                  fill 
                                  className="object-cover" 
                                  unoptimized 
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-foreground/20">
                                  <UserIcon className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground tracking-tight leading-none">{ev.studentName}</p>
                              <p className="text-[10px] text-foreground/50 font-medium mt-1">{ev.course}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-0.5">
                            <p className="text-xs font-semibold text-foreground">{ev.companyName}</p>
                            <p className="text-[10px] text-foreground/40 font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3 inline" /> {ev.totalHours} hrs approved
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-foreground/80">{ev.supervisorName}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-foreground">{ev.overallGrade.toFixed(2)}</span>
                            <div className="flex gap-0.5">
                              {getMetricStars(ev.overallGrade)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase border shadow-sm",
                            ev.recommendForHire 
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                              : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                          )}>
                            {ev.recommendForHire ? <ThumbsUp className="h-3 w-3" /> : <ThumbsDown className="h-3 w-3" />}
                            {ev.recommendForHire ? "YES" : "NO"}
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className="text-xs text-foreground/50 font-medium">
                            {new Date(ev.submittedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => setSelectedEvaluation(ev)}
                            className="h-8 px-3 inline-flex items-center justify-center rounded-lg border border-border bg-card text-foreground/60 text-[10px] font-bold uppercase tracking-wider hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all shadow-sm"
                          >
                            Verify Details
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
                Certified Records: {filteredEvaluations.length}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Student Profile</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Academic Program</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Assigned Company</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Logbook Progress</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Requirement Check</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredPending.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-24 text-center">
                        <p className="text-xs font-semibold text-foreground/30 uppercase tracking-widest">
                          No Pending Evaluations Awaiting Review
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredPending.map((p) => {
                      const requiredHours = p.requiredHours || 300;
                      const progressPct = Math.min((p.totalHours / requiredHours) * 100, 100);
                      const isComplete = p.totalHours >= (requiredHours - 20);

                      return (
                        <tr key={p.studentId} className="hover:bg-muted/30 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-lg bg-muted border border-border overflow-hidden relative shrink-0">
                                <div className="w-full h-full flex items-center justify-center text-foreground/20">
                                  <UserIcon className="h-4 w-4" />
                                </div>
                              </div>
                              <div>
                                <p className="font-semibold text-foreground tracking-tight leading-none">{p.studentName}</p>
                                <p className="text-[10px] text-foreground/50 font-medium mt-1">{p.studentEmail}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs text-foreground/70 font-medium">{p.course}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-semibold text-foreground">{p.companyName}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1.5 max-w-[140px]">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-semibold text-foreground tabular-nums">
                                  {p.totalHours} <span className="text-foreground/30 font-medium">/ {p.requiredHours || 300}h</span>
                                </span>
                                <span className="text-[9px] font-semibold text-foreground/40">{Math.round(progressPct)}%</span>
                              </div>
                              <div className="h-1 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                                <div 
                                  className={cn("h-full rounded-full transition-all duration-700", isComplete ? "bg-emerald-500" : "bg-primary")} 
                                  style={{ width: `${progressPct}%` }} 
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase border shadow-sm",
                              isComplete 
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                                : "bg-slate-100 text-slate-400 border-slate-200 dark:bg-white/5 dark:text-slate-400 dark:border-white/10"
                            )}>
                              {isComplete ? <FileCheck className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                              {isComplete ? "Hours Ready" : "Hours Incomplete"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => router.push(`/coordinator/students/${p.studentId}`)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border bg-card text-foreground/30 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                              title="Inspect Candidate Profile"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-border/40 bg-muted/20 flex items-center justify-between">
              <p className="text-[9px] font-medium text-foreground/40 uppercase tracking-widest">
                Awaiting Records: {filteredPending.length}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 5. Portal Details Modal */}
      {mounted && selectedEvaluation && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay Background - SOLID dark color, NO blurred filters to align with strict rules */}
          <div 
            className="fixed inset-0 bg-black/60 transition-opacity duration-300"
            onClick={() => setSelectedEvaluation(null)}
          />

          {/* Modal Container */}
          <div className="relative bg-card border border-border/80 w-full max-w-2xl rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in-fade">
            {/* Header */}
            <div className="px-6 py-5 border-b border-border/50 flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Industrial Evaluation Review</h3>
                  <p className="text-[10px] text-foreground/50 font-medium">Submitted by {selectedEvaluation.supervisorName}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEvaluation(null)}
                className="p-1.5 rounded-lg text-foreground/40 hover:text-foreground hover:bg-muted transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Student Overview */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-card border border-border flex items-center justify-center text-lg font-bold text-foreground/30 relative overflow-hidden shrink-0 shadow-sm">
                  {selectedEvaluation.image ? (
                    <Image 
                      src={selectedEvaluation.image} 
                      alt={selectedEvaluation.studentName} 
                      fill 
                      className="object-cover" 
                      unoptimized 
                    />
                  ) : (
                    selectedEvaluation.studentName[0]
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-foreground truncate">{selectedEvaluation.studentName}</h4>
                  <p className="text-[10px] text-foreground/50 font-medium mt-0.5">{selectedEvaluation.studentEmail}</p>
                  <p className="text-[9px] font-bold text-primary uppercase tracking-wider mt-1">{selectedEvaluation.course}</p>
                </div>
                <div className="ml-auto shrink-0 text-right border-l border-border pl-4 space-y-0.5">
                  <p className="text-[9px] font-bold uppercase text-foreground/50 tracking-wider">Logged Hours</p>
                  <p className="text-sm font-bold text-foreground">{selectedEvaluation.totalHours} hrs</p>
                </div>
              </div>

              {/* Company Context */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border/60 bg-card space-y-1">
                  <span className="text-[9px] font-bold uppercase text-foreground/40 tracking-wider flex items-center gap-1.5">
                    <Building2 className="h-3 w-3" /> Host Industry
                  </span>
                  <p className="text-xs font-bold text-foreground leading-tight">{selectedEvaluation.companyName}</p>
                </div>
                <div className="p-4 rounded-xl border border-border/60 bg-card space-y-1">
                  <span className="text-[9px] font-bold uppercase text-foreground/40 tracking-wider flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" /> Submission Date
                  </span>
                  <p className="text-xs font-bold text-foreground leading-tight">
                    {new Date(selectedEvaluation.submittedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold uppercase text-foreground/50 tracking-widest border-b border-border pb-2">Scoring Matrix Breakdown</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ratingLabels.map((dimension) => {
                    const score = selectedEvaluation[dimension.key];
                    return (
                      <div key={dimension.key} className="p-3 bg-muted/20 border border-border/40 rounded-lg space-y-2">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] font-bold text-foreground/60 leading-none">{dimension.label}</span>
                          <span className="text-xs font-bold text-primary">{score} / 5</span>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <div 
                              key={idx}
                              className={cn(
                                "h-1.5 flex-1 rounded-full",
                                idx < score 
                                  ? (score >= 4 ? "bg-emerald-500" : score >= 3 ? "bg-amber-500" : "bg-rose-500") 
                                  : "bg-slate-100 dark:bg-white/5"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Supervisor Comments */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-bold uppercase text-foreground/50 tracking-widest border-b border-border pb-2">Executive Remarks & Notes</h5>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-border/80 text-xs text-foreground/80 leading-relaxed font-medium whitespace-pre-line">
                  {selectedEvaluation.comments || "No comments submitted."}
                </div>
              </div>

              {/* Industrial Recommendation */}
              <div className={cn(
                "p-4 rounded-xl border flex items-center justify-between gap-4",
                selectedEvaluation.recommendForHire 
                  ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-400" 
                  : "bg-rose-500/5 border-rose-500/20 text-rose-700 dark:text-rose-400"
              )}>
                <div className="space-y-0.5">
                  <h6 className="font-bold text-xs">Industrial Career Recommendation</h6>
                  <p className="text-[9px] opacity-75 font-semibold uppercase tracking-wider">Is this candidate recommended for future corporate hiring?</p>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm border",
                  selectedEvaluation.recommendForHire 
                    ? "bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20" 
                    : "bg-rose-600 text-white border-rose-700 shadow-rose-600/20"
                )}>
                  {selectedEvaluation.recommendForHire ? <ThumbsUp className="h-3.5 w-3.5" /> : <ThumbsDown className="h-3.5 w-3.5" />}
                  {selectedEvaluation.recommendForHire ? "Approved" : "Not Recommended"}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border/50 flex items-center justify-end gap-3 bg-muted/10 shrink-0">
              <button 
                onClick={() => setSelectedEvaluation(null)}
                className="h-9 px-4 rounded-lg bg-card border border-border text-[10px] font-bold uppercase tracking-wider text-foreground hover:bg-muted transition-all"
              >
                Close Review
              </button>
              <button 
                onClick={() => router.push(`/coordinator/students/${selectedEvaluation.studentId}`)}
                className="h-9 px-4 rounded-lg bg-primary text-white text-[10px] font-bold uppercase tracking-wider hover:opacity-90 shadow-sm transition-all"
              >
                Go to Candidate Profile
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
