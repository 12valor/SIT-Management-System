"use client";

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

  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">Auditing Program Milestone Status...</p>
      </div>
    );
  }

  const { totalHours, hourGoal, hasEvaluation, evaluationData, documentsUploaded, totalRequiredDocs, isFullyComplete, studentName, studentCourse } = data;
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
    <div className="space-y-10 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 pt-10 animate-in-fade">
        <div className={cn(
          "w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl transition-all duration-1000",
          isFullyComplete ? "bg-primary text-primary-foreground animate-bounce shadow-primary/40" : "bg-muted text-muted-foreground"
        )}>
           {isFullyComplete ? <Award className="h-12 w-12" /> : <Trophy className="h-12 w-12" />}
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gradient uppercase">Program Completion</h1>
        <p className="text-muted-foreground font-bold max-w-lg mx-auto leading-relaxed">
          The final audit of your Supervised Industrial Training (SIT) requirements. All metrics are synchronized with university standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
        {/* Requirement 1: Hours */}
        <div className="bg-card border border-border rounded-[3rem] p-10 shadow-2xl shadow-primary/5 relative overflow-hidden group border-b-8 border-b-primary transition-all hover:-translate-y-2">
           <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all">
              <Clock className="h-32 w-32" />
           </div>
           <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Requirement 01</span>
                {isHoursComplete && <CheckCircle2 className="h-6 w-6 text-primary" />}
              </div>
              <h3 className="text-3xl font-black text-foreground">Industrial Hours</h3>
              <div className="space-y-6">
                 <div className="flex items-end justify-between">
                    <div className="text-6xl font-black text-foreground leading-none tracking-tighter">{totalHours}<span className="text-xl text-muted-foreground font-medium ml-1">/{hourGoal}</span></div>
                    <span className="text-xs font-black uppercase tracking-widest text-primary">{Math.round((totalHours/hourGoal)*100)}%</span>
                 </div>
                 <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-1000", "bg-primary")} 
                      style={{ width: `${Math.min((totalHours/hourGoal)*100, 100)}%` }} 
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Requirement 2: Documentation */}
        <div className="bg-card border border-border rounded-[3rem] p-10 shadow-2xl shadow-primary/5 relative overflow-hidden group border-b-8 border-b-primary transition-all hover:-translate-y-2">
           <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all">
              <FileUp className="h-32 w-32" />
           </div>
           <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Requirement 02</span>
                {isDocsComplete && <CheckCircle2 className="h-6 w-6 text-primary" />}
              </div>
              <h3 className="text-3xl font-black text-foreground">Mandatory Docs</h3>
              <div className="space-y-6">
                 <div className="flex items-end justify-between">
                    <div className="text-6xl font-black text-foreground leading-none tracking-tighter">{documentsUploaded}<span className="text-xl text-muted-foreground font-medium ml-1">/{totalRequiredDocs}</span></div>
                    <span className="text-xs font-black uppercase tracking-widest text-primary">{Math.round((documentsUploaded/totalRequiredDocs)*100)}%</span>
                 </div>
                 <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-1000", "bg-primary")} 
                      style={{ width: `${Math.min((documentsUploaded/totalRequiredDocs)*100, 100)}%` }} 
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Requirement 3: Evaluation */}
        <div className="bg-card border border-border rounded-[3rem] p-10 shadow-2xl shadow-primary/5 relative overflow-hidden group border-b-8 border-b-primary transition-all hover:-translate-y-2">
           <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all">
              <Star className="h-32 w-32" />
           </div>
           <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Requirement 03</span>
                {hasEvaluation && <CheckCircle2 className="h-6 w-6 text-primary" />}
              </div>
              <h3 className="text-3xl font-black text-foreground">Performance</h3>
              
              {hasEvaluation && evaluationData ? (
                <div className="space-y-6">
                   <div className="flex items-center gap-4 p-5 rounded-2xl bg-muted/50 border border-border">
                      <div className="h-14 w-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-black">
                         {evaluationData.overallGrade.toFixed(1)}
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Final Score</p>
                         <div className="flex text-primary">
                            {Array.from({length: 5}).map((_, i) => (
                              <Star key={i} className={cn("h-4 w-4", i < Math.round(evaluationData.overallGrade) ? "fill-primary" : "fill-none")} />
                            ))}
                         </div>
                      </div>
                   </div>
                   <div className="text-xs font-bold text-muted-foreground leading-relaxed line-clamp-2">
                      &quot;{evaluationData.comments}&quot;
                   </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-2 space-y-3">
                   <AlertCircle className="h-10 w-10 text-muted/30 animate-pulse" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Awaiting Assessment</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Completion Dashboard / Certificate Section */}
      {isFullyComplete ? (
        <div className="p-10 md:p-16 rounded-[4rem] bg-foreground text-background shadow-3xl shadow-primary/20 relative overflow-hidden group animate-in-fade-slow">
           <div className="absolute top-[-100%] left-[-20%] w-[60%] h-[300%] bg-primary/20 blur-[120px] skew-x-12 animate-pulse" />
           <div className="relative z-10 grid md:grid-cols-3 items-center gap-12">
              <div className="md:col-span-2 space-y-8 text-center md:text-left">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/30">
                    <ShieldCheck className="h-4 w-4" /> Official SIT Graduation Verified
                 </div>
                 <h2 className="text-5xl font-black tracking-tight leading-tight">Elite Status Achieved, {session?.user?.name?.split(' ')[0]}!</h2>
                 <p className="text-muted-foreground font-bold text-lg leading-relaxed max-w-xl">
                   You have successfully fulfilled all industrial protocols. Your final performance is permanently archived under <span className="text-foreground font-black">{evaluationData?.companyName}</span>.
                 </p>
                 <div className="flex flex-wrap items-center gap-8 justify-center md:justify-start">
                    <div className="flex items-center gap-3">
                       <Building2 className="h-5 w-5 text-primary" />
                       <span className="text-xs font-black uppercase tracking-widest">{evaluationData?.companyName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Calendar className="h-5 w-5 text-primary" />
                       <span className="text-xs font-black uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                    </div>
                 </div>
              </div>
              <div className="flex justify-center">
                 <button 
                    onClick={handleDownloadCertificate}
                    className="group relative flex flex-col items-center gap-4 w-56 h-56 rounded-[3.5rem] bg-primary text-primary-foreground font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/50 hover:shadow-primary/70"
                 >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3.5rem]" />
                    <div className="flex-1 flex items-center justify-center pt-8">
                       <Download className="h-14 w-14 group-hover:-translate-y-2 transition-transform duration-500" />
                    </div>
                    <div className="pb-12 text-[10px] uppercase tracking-[0.2em]">Secure Export: PDF</div>
                 </button>
              </div>
           </div>
        </div>
      ) : (
        <div className="p-16 rounded-[4rem] bg-muted/50 border-2 border-dashed border-border text-center space-y-6">
           <Loader2 className="h-10 w-10 text-muted-foreground opacity-20 mx-auto" />
           <div className="space-y-2">
              <h3 className="text-2xl font-black text-muted-foreground uppercase tracking-tight">Industrial Verification Pending</h3>
              <p className="text-sm font-bold text-muted-foreground max-w-md mx-auto leading-relaxed">
                 Complete all requirements (Hours, Evaluations, and Documentation) to unlock your verified SIT Industrial Certificate.
              </p>
           </div>
        </div>
      )}
    </div>
  );
}
