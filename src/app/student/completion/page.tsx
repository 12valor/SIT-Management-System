"use client";

import { useMockStore } from "@/store/mock-store";
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
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentCompletionPage() {
  const { user, logbookEntries, evaluations } = useMockStore();

  const totalHours = logbookEntries
    .filter(e => e.studentEmail === user?.email && e.status === 'Approved')
    .reduce((acc, curr) => acc + curr.hours, 0);

  const evaluation = evaluations.find(e => e.studentEmail === user?.email);
  const hourGoal = 300;
  const isHoursComplete = totalHours >= hourGoal;
  const isFullyComplete = isHoursComplete && !!evaluation;

  return (
    <div className="space-y-10 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 pt-10">
        <div className={cn(
          "w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transition-all duration-700",
          isFullyComplete ? "bg-emerald-600 text-white animate-bounce" : "bg-muted text-slate-400"
        )}>
           {isFullyComplete ? <Award className="h-10 w-10" /> : <Trophy className="h-10 w-10" />}
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gradient">Program Completion</h1>
        <p className="text-slate-500 font-medium max-w-md mx-auto">
          Track your course requirements and final industrial assessment status.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Requirement 1: Hours */}
        <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <Clock className="h-32 w-32" />
           </div>
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Requirement 01</span>
                {isHoursComplete && <CheckCircle2 className="h-6 w-6 text-green-500" />}
              </div>
              <h3 className="text-2xl font-black">Hour Requirement</h3>
              <div className="space-y-4 pt-4">
                 <div className="flex items-end justify-between">
                    <div className="text-5xl font-black text-slate-900 leading-none">{totalHours}<span className="text-xl text-slate-400 font-medium">/300</span></div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">{Math.round((totalHours/300)*100)}% Complete</span>
                 </div>
                 <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-1000", isHoursComplete ? "bg-green-500" : "bg-primary")} 
                      style={{ width: `${Math.min((totalHours/300)*100, 100)}%` }} 
                    />
                 </div>
              </div>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                You have accumulated {totalHours} total industrial hours validated by your supervisor. 
                {isHoursComplete ? " You have exceeded the 300-hour SIT requirement." : " Continue logging your daily activities to reach the goal."}
              </p>
           </div>
        </div>

        {/* Requirement 2: Evaluation */}
        <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <FileText className="h-32 w-32" />
           </div>
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Requirement 02</span>
                {evaluation && <CheckCircle2 className="h-6 w-6 text-green-500" />}
              </div>
              <h3 className="text-2xl font-black">Industrial Evaluation</h3>
              
              {evaluation ? (
                <div className="space-y-6 pt-4">
                   <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/20">
                      <div className="h-12 w-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl font-black">
                         {evaluation.overallGrade.toFixed(1)}
                      </div>
                      <div>
                         <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Final Grade</p>
                         <div className="flex text-amber-500 mt-1">
                            {Array.from({length: 5}).map((_, i) => (
                              <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(evaluation.overallGrade) ? "fill-amber-500" : "fill-none")} />
                            ))}
                         </div>
                      </div>
                   </div>
                   <div className="p-5 rounded-2xl bg-muted/30 border border-border italic text-sm font-medium text-slate-600 leading-relaxed">
                      &quot;{evaluation.comments}&quot;
                   </div>
                </div>
              ) : (
                <div className="py-10 text-center space-y-4">
                   <AlertCircle className="h-10 w-10 text-amber-500 mx-auto" />
                   <div className="space-y-1">
                      <p className="font-black text-slate-900">Awaiting Assessment</p>
                      <p className="text-xs font-bold text-slate-500 max-w-[180px] mx-auto">Your supervisor hasn&apos;t submitted your final performance evaluation yet.</p>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Completion Dashboard / Certificate Section */}
      {isFullyComplete ? (
        <div className="p-10 rounded-[3rem] bg-slate-900 text-white shadow-3xl relative overflow-hidden group animate-in-fade">
           <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[200%] bg-primary/20 blur-[100px] skew-x-12 animate-pulse" />
           <div className="relative z-10 grid md:grid-cols-3 items-center gap-10">
              <div className="md:col-span-2 space-y-6 text-center md:text-left">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                    <ShieldCheck className="h-3 w-3" /> SIT Official Completion
                 </div>
                 <h2 className="text-4xl font-black tracking-tight leading-tight">Congratulations, {user?.name?.split(' ')[0]}!</h2>
                 <p className="text-slate-400 font-medium leading-relaxed max-w-xl">
                   You have successfully fulfilled all requirements for the Supervised Industrial Training (SIT). 
                   Your final performance is verified by <span className="text-white font-black">{evaluation?.companyName}</span>.
                 </p>
                 <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                       <Building2 className="h-4 w-4 text-primary" />
                       <span className="text-xs font-bold">{evaluation?.companyName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Calendar className="h-4 w-4 text-primary" />
                       <span className="text-xs font-bold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                    </div>
                 </div>
              </div>
              <div className="flex justify-center">
                 <button className="group relative flex flex-col items-center gap-3 w-48 h-48 rounded-[2.5rem] bg-primary text-white font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                    <div className="flex-1 flex items-center justify-center">
                       <Download className="h-10 w-10 animate-bounce" />
                    </div>
                    <div className="pb-8 text-[10px] uppercase tracking-widest">Download Certificate</div>
                 </button>
              </div>
           </div>
        </div>
      ) : (
        <div className="p-10 rounded-[3rem] bg-muted/30 border border-border text-center space-y-4">
           <AlertCircle className="h-8 w-8 text-slate-300 mx-auto" />
           <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-400">Final Verification Pending</h3>
              <p className="text-sm font-medium text-slate-500 max-w-sm mx-auto">
                 Finish your 300 hours and obtain your supervisor&apos;s final assessment to unlock your SIT Certificate of Completion.
              </p>
           </div>
        </div>
      )}
    </div>
  );
}
