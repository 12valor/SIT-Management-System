"use client";

import { Skeleton } from "boneyard-js/react";

import { useState, useEffect } from "react";
import { 
  Trophy, 
  CheckCircle2, 
  Award, 
  Download, 
  Clock, 
  Star, 
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  Loader2,
  FileUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getCompletionStatus } from "./actions";
import { useSession } from "next-auth/react";
import { generateSITCertificate } from "@/lib/pdf-generator";

interface CompletionData {
  totalHours: number;
  hourGoal: number;
  hasEvaluation: boolean;
  evaluationData: {
    overallGrade: number;
    comments: string;
    companyName: string;
  } | null;
  documentsUploaded: number;
  totalRequiredDocs: number;
  isFullyComplete: boolean;
  studentName: string;
  studentCourse: string;
}

export default function StudentCompletionPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<CompletionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await getCompletionStatus();
      if (result.success && result.data) {
        setData(result.data as CompletionData);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const safeData = data || {
    totalHours: 0,
    hourGoal: 300,
    hasEvaluation: false,
    evaluationData: null,
    documentsUploaded: 0,
    totalRequiredDocs: 3,
    isFullyComplete: false,
    studentName: 'Student Name',
    studentCourse: 'Course'
  };

  const { totalHours, hourGoal, hasEvaluation, evaluationData, documentsUploaded, totalRequiredDocs, isFullyComplete, studentName, studentCourse } = safeData;
  const isHoursComplete = totalHours >= hourGoal;
  const isDocsComplete = documentsUploaded >= totalRequiredDocs;

  const handleDownloadCertificate = () => {
    if (!isFullyComplete || !evaluationData) return;
    
    generateSITCertificate({
       studentName: studentName,
       course: studentCourse,
       companyName: evaluationData.companyName,
       totalHours: totalHours,
       grade: evaluationData.overallGrade,
       date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
       certificateId: `SIT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    });
  };

  return (
    <Skeleton 
      name="student-completion" 
      loading={isLoading || !data}
      fallback={
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="h-10 w-10 text-[#800000] animate-spin opacity-20" />
        </div>
      }
    >
    <div className="space-y-10 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2 py-12">
        <div className={cn(
          "w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md transition-all duration-1000",
          isFullyComplete ? "bg-[#800000] text-white animate-bounce shadow-red-900/20" : "bg-slate-50 text-slate-300 border border-slate-100"
        )}>
           {isFullyComplete ? <Award className="h-10 w-10" /> : <Trophy className="h-10 w-10" />}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Program Completion Status</h1>
        <p className="text-sm text-slate-500 font-medium max-w-lg mx-auto">
          Final audit of your industrial training requirements synchronized with academic standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Requirement 1: Hours */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm relative overflow-hidden group">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#800000]">Phase 01</span>
                {isHoursComplete && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
              </div>
              <h3 className="text-xl font-bold text-slate-800">Industrial Hours</h3>
              <div className="space-y-4">
                 <div className="flex items-end justify-between">
                    <div className="text-4xl font-bold text-slate-800 tracking-tight">{totalHours}<span className="text-sm text-slate-400 font-medium ml-1">/{hourGoal}</span></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{Math.round((totalHours/hourGoal)*100)}%</span>
                 </div>
                 <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div 
                      className={cn("h-full transition-all duration-1000", "bg-[#800000]")} 
                      style={{ width: `${Math.min((totalHours/hourGoal)*100, 100)}%` }} 
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Requirement 2: Documentation */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm relative overflow-hidden group">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#800000]">Phase 02</span>
                {isDocsComplete && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
              </div>
              <h3 className="text-xl font-bold text-slate-800">Documentation</h3>
              <div className="space-y-4">
                 <div className="flex items-end justify-between">
                    <div className="text-4xl font-bold text-slate-800 tracking-tight">{documentsUploaded}<span className="text-sm text-slate-400 font-medium ml-1">/{totalRequiredDocs}</span></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{Math.round((documentsUploaded/totalRequiredDocs)*100)}%</span>
                 </div>
                 <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div 
                      className={cn("h-full transition-all duration-1000", "bg-[#800000]")} 
                      style={{ width: `${Math.min((documentsUploaded/totalRequiredDocs)*100, 100)}%` }} 
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Requirement 3: Evaluation */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm relative overflow-hidden group">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#800000]">Phase 03</span>
                {hasEvaluation && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
              </div>
              <h3 className="text-xl font-bold text-slate-800">Performance</h3>
              
              {hasEvaluation && evaluationData ? (
                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="h-12 w-12 rounded-lg bg-[#800000] text-white flex items-center justify-center text-xl font-bold shadow-sm">
                         {evaluationData.overallGrade.toFixed(1)}
                      </div>
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Final Score</p>
                         <div className="flex gap-0.5 text-[#800000]">
                            {Array.from({length: 5}).map((_, i) => (
                              <Star key={i} className={cn("h-3 w-3", i < Math.round(evaluationData.overallGrade) ? "fill-[#800000]" : "fill-none")} />
                            ))}
                         </div>
                      </div>
                   </div>
                   <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic line-clamp-2">
                      &quot;{evaluationData.comments}&quot;
                   </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-2 space-y-3">
                   <AlertCircle className="h-8 w-8 text-slate-200 animate-pulse" />
                   <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Awaiting Assessment</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Completion Dashboard / Certificate Section */}
      {isFullyComplete ? (
        <div className="p-10 md:p-12 rounded-xl bg-slate-900 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group animate-in slide-in-from-bottom-5">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#800000]/10 blur-[80px] rounded-full" />
           <div className="relative z-10 grid md:grid-cols-3 items-center gap-10">
              <div className="md:col-span-2 space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                    <ShieldCheck className="h-3.5 w-3.5" /> Program Requirements Fulfilled
                 </div>
                 <h2 className="text-3xl font-bold tracking-tight">Industrial Excellence Achieved</h2>
                 <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-xl">
                   Congratulations, {session?.user?.name?.split(' ')[0]}. You have successfully synchronized all industrial records. Your final performance is permanently archived under <span className="text-white font-bold">{evaluationData?.companyName}</span>.
                 </p>
                 <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2.5">
                       <Building2 className="h-4 w-4 text-[#800000]" />
                       <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">{evaluationData?.companyName}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                       <Calendar className="h-4 w-4 text-[#800000]" />
                       <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                    </div>
                 </div>
              </div>
              <div className="flex justify-center md:justify-end">
                 <button 
                    onClick={handleDownloadCertificate}
                    className="group relative flex flex-col items-center gap-3 w-40 h-40 rounded-2xl bg-[#800000] text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-900/40"
                 >
                    <div className="flex-1 flex items-center justify-center pt-6">
                       <Download className="h-10 w-10 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <div className="pb-8 text-[9px] uppercase tracking-widest font-bold opacity-80">Export PDF</div>
                 </button>
              </div>
           </div>
        </div>
      ) : (
        <div className="p-12 rounded-xl bg-slate-50 border border-slate-200 border-dashed text-center space-y-4">
           <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center mx-auto">
             <Loader2 className="h-6 w-6 text-slate-200" />
           </div>
           <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-700 uppercase tracking-tight">Audit in Progress</h3>
              <p className="text-xs font-medium text-slate-400 max-w-sm mx-auto leading-relaxed">
                 Coordinate your remaining manifests (Hours, Evaluation, Docs) to unlock your verified SIT Certificate.
              </p>
           </div>
        </div>
      )}
    </div>
    </Skeleton>
  );
}
