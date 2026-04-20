"use client";

import { useState, useEffect } from "react";
import { 
  Star, 
  CheckCircle2, 
  ArrowLeft,
  Trophy,
  Activity,
  Award,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  AlertCircle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getEmployerTrainees, submitTraineeEvaluation } from "./actions";
import { Trainee } from "./types";

export default function EmployerEvaluationsPage() {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form State
  const [ratings, setRatings] = useState({
    technicalSkills: 0,
    professionalism: 0,
    punctuality: 0,
    qualityOfWork: 0
  });
  const [comments, setComments] = useState("");
  const [recommendForHire, setRecommendForHire] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    const result = await getEmployerTrainees();
    if (result.success && result.data) {
      setTrainees(result.data);
    }
    setIsLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    setIsSubmitting(true);
    const result = await submitTraineeEvaluation({
      studentId: selectedStudentId,
      technicalSkills: ratings.technicalSkills,
      professionalism: ratings.professionalism,
      punctuality: ratings.punctuality,
      qualityOfWork: ratings.qualityOfWork,
      comments,
      recommendForHire
    });

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedStudentId(null);
        setRatings({ technicalSkills: 0, professionalism: 0, punctuality: 0, qualityOfWork: 0 });
        setComments("");
        loadData(); // Refresh list
      }, 2000);
    } else {
      alert("Error: " + result.error);
    }
    setIsSubmitting(false);
  };

  const RatingInput = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-end px-1">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</label>
        <span className="text-xs font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 px-3 py-1 rounded-lg border border-indigo-100 dark:border-indigo-800/50">{value || "—"} / 5</span>
      </div>
      <div className="flex gap-2.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={cn(
              "flex-1 h-14 rounded-2xl flex items-center justify-center transition-all border shadow-sm group/star",
              value >= star 
                ? "bg-amber-500 border-amber-600 text-white scale-105 shadow-lg shadow-amber-500/20" 
                : "bg-card border-border text-slate-300 hover:border-amber-400 hover:text-amber-500"
            )}
          >
            <Star className={cn("h-6 w-6 transition-transform group-hover/star:scale-110", value >= star ? "fill-white" : "fill-none")} />
          </button>
        ))}
      </div>
    </div>
  );

  if (isLoading && !selectedStudentId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Synchronizing Trainee Records...</p>
      </div>
    );
  }

  if (selectedStudentId) {
    const student = trainees.find(s => s.studentId === selectedStudentId);
    
    return (
      <div className="max-w-4xl mx-auto space-y-10 animate-in-fade pb-20">
        <button 
          onClick={() => setSelectedStudentId(null)}
          className="flex items-center gap-3 text-sm font-black text-slate-500 hover:text-indigo-600 transition-all uppercase tracking-widest group"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Return to Hub
        </button>

        <div className="bg-card border border-border/60 rounded-[3rem] p-10 lg:p-14 shadow-3xl relative overflow-hidden group/form">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full" />
           <div className="relative z-10 space-y-12">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                 <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-indigo-600/30 ring-8 ring-indigo-500/10">
                    {student?.studentName?.[0]}
                 </div>
                 <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tighter leading-none">{student?.studentName}</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mt-2">
                       <Award className="h-4 w-4 text-indigo-500" /> Professional Performance Audit
                    </p>
                 </div>
              </div>

              {showSuccess ? (
                <div className="py-24 text-center space-y-6 animate-in-bounce">
                   <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-emerald-500/10">
                      <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                   </div>
                   <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">Assessment Finalized</h3>
                   <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">The trainee&apos;s SIT record has been updated with your professional industrial endorsement.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                   <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                      <RatingInput 
                        label="Technical Aptitude" 
                        value={ratings.technicalSkills} 
                        onChange={(v) => setRatings({...ratings, technicalSkills: v})} 
                      />
                      <RatingInput 
                        label="Professional Ethos" 
                        value={ratings.professionalism} 
                        onChange={(v) => setRatings({...ratings, professionalism: v})} 
                      />
                      <RatingInput 
                        label="Operational Punctuality" 
                        value={ratings.punctuality} 
                        onChange={(v) => setRatings({...ratings, punctuality: v})} 
                      />
                      <RatingInput 
                        label="Executive Quality of Work" 
                        value={ratings.qualityOfWork} 
                        onChange={(v) => setRatings({...ratings, qualityOfWork: v})} 
                      />
                   </div>

                   <div className="space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                        <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                          <MessageSquare className="h-4 w-4 text-indigo-500" />
                        </div>
                        Executive Summary & Feedback
                      </label>
                      <textarea
                        required
                        placeholder="Provide detailed industrial feedback regarding the trainee&apos;s contributions, areas for growth, and overall performance during the SIT period..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="w-full h-40 p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-border/60 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none text-base font-medium leading-relaxed shadow-sm"
                      />
                   </div>

                   <div className="p-8 rounded-[2.5rem] bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="space-y-1 text-center md:text-left">
                         <h4 className="font-black text-xl text-indigo-900 dark:text-indigo-100 leading-tight tracking-tight">Industrial Endorsement</h4>
                         <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest mt-1">Recommend this trainee for future employment?</p>
                      </div>
                      <div className="flex bg-white/40 dark:bg-black/20 p-1.5 rounded-2xl border border-indigo-200 dark:border-indigo-800 backdrop-blur-md shadow-inner">
                         <button
                           type="button"
                           onClick={() => setRecommendForHire(true)}
                           className={cn(
                             "px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2",
                             recommendForHire ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/30" : "text-slate-500 hover:text-indigo-600"
                           )}
                         >
                            <ThumbsUp className="h-4 w-4" /> POSITIVE
                         </button>
                         <button
                           type="button"
                           onClick={() => setRecommendForHire(false)}
                           className={cn(
                             "px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2",
                             !recommendForHire ? "bg-rose-600 text-white shadow-xl shadow-rose-600/30" : "text-slate-500 hover:text-rose-600"
                           )}
                         >
                            <ThumbsDown className="h-4 w-4" /> NEGATIVE
                         </button>
                      </div>
                   </div>

                   <button
                     disabled={isSubmitting || Object.values(ratings).some(v => v === 0)}
                     className="w-full py-6 rounded-[2rem] bg-slate-900 dark:bg-indigo-600 text-white font-black tracking-[0.2em] uppercase text-sm shadow-3xl shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-20 disabled:grayscale disabled:hover:scale-100 flex items-center justify-center gap-3"
                   >
                     {isSubmitting ? (
                       <>
                         <Loader2 className="h-5 w-5 animate-spin" />
                         Processing Assessment...
                       </>
                     ) : "Commit Final Evaluation"}
                   </button>
                </form>
              )}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24 animate-in-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-50 text-slate-500 border border-slate-100 shadow-sm">
             <Trophy className="h-3.5 w-3.5" />
             <span className="text-[10px] font-bold uppercase tracking-wider">Performance Hub</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Industrial Audit</h1>
          <p className="text-sm text-slate-500 font-medium max-w-2xl">Evaluate and certify student performance based on their industrial training achievements and professional development.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainees.map((trainee) => {
          const hours = trainee.totalHours;
          const evaluation = trainee.evaluation;
          const isEligible = hours >= 280; 

          return (
            <div key={trainee.id} className="group bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-[#800000]/20 transition-all flex flex-col items-center text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50" />
               <div className="absolute top-0 left-0 h-1.5 bg-[#800000] transition-all duration-1000 shadow-sm" style={{ width: `${Math.min((hours/300)*100, 100)}%` }} />

               <div className="mb-6 relative">
                  <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl font-bold text-slate-300 group-hover:bg-[#800000] group-hover:text-white transition-all transform group-hover:scale-105 shadow-sm">
                    {trainee.studentName?.[0] || 'U'}
                  </div>
                  {evaluation && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                       <Award className="h-4 w-4" />
                    </div>
                  )}
               </div>

               <div className="mb-8 space-y-1">
                  <h3 className="text-lg font-bold text-slate-800 leading-tight">{trainee.studentName}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{trainee.studentEmail}</p>
               </div>

               <div className="w-full grid grid-cols-2 gap-4 mb-8 border-y border-slate-50 py-6">
                  <div className="space-y-1 border-r border-slate-100">
                     <p className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Validated Hours</p>
                     <p className="text-xl font-bold text-slate-800 flex items-center justify-center gap-1.5 tracking-tight">
                        {hours} <span className="text-[10px] text-slate-300 font-medium">/ 300</span>
                     </p>
                  </div>
                  <div className="space-y-1 flex flex-col items-center justify-center">
                     <p className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Status</p>
                     <span className={cn(
                        "text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shadow-sm mt-0.5",
                        evaluation 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                          : (isEligible 
                              ? "bg-[#800000]/5 text-[#800000] border-[#800000]/10 animate-pulse" 
                              : "bg-slate-50 text-slate-400 border-slate-100")
                     )}>
                        {evaluation ? "Certified" : (isEligible ? "Ready" : "Pending")}
                     </span>
                  </div>
               </div>

               {evaluation ? (
                 <div className="w-full space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-bold px-1 text-slate-400 uppercase tracking-widest">
                       <span>Audit Score</span>
                       <div className="flex gap-0.5 text-[#800000]">
                          {Array.from({length: 5}).map((_, i) => (
                             <Star key={i} className={cn("h-3 w-3", i < Math.round(evaluation.overallGrade) ? "fill-[#800000]" : "fill-none")} />
                          ))}
                       </div>
                    </div>
                    <button disabled className="w-full h-11 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm">
                       <CheckCircle2 className="h-3.5 w-3.5 opacity-40" /> Record Finalized
                    </button>
                 </div>
               ) : (
                 <button 
                   disabled={!isEligible}
                   onClick={() => setSelectedStudentId(trainee.studentId)}
                   className={cn(
                    "w-full h-11 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2",
                    isEligible 
                      ? "bg-[#800000] text-white shadow-red-900/10 hover:bg-red-900 active:scale-95" 
                      : "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed opacity-60"
                   )}
                 >
                    {isEligible ? <Activity className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    {isEligible ? "Enter Final Assessment" : "Hours Incomplete"}
                 </button>
               )}
            </div>
          );
        })}

        {trainees.length === 0 && (
           <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-slate-50/50 border border-slate-200 border-dashed rounded-xl opacity-50">
              <div className="w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                <Star className="h-6 w-6 text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Active Trainee Manifest</h3>
              <p className="text-xs font-medium max-w-xs text-slate-400 leading-relaxed">Evaluation protocols will activate once student hours are validated by the coordinator.</p>
           </div>
        )}
      </div>

      {/* Info Card */}
      <div className="p-10 lg:p-12 rounded-xl bg-slate-900 text-white shadow-xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-80 h-80 bg-[#800000]/10 blur-[100px] rounded-full" />
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center lg:text-left">
               <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="p-3 bg-[#800000] rounded-xl shadow-lg shadow-red-900/20">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Institutional Certification Policy</h3>
               </div>
               <p className="text-slate-400 font-medium max-w-3xl leading-relaxed text-sm">
                 Industrial assessments are required for all students reaching the **280-hour milestone**. Your professional vetting directly impacts the synchronization of academic records and future placement eligibility.
               </p>
            </div>
            <div className="flex items-center gap-5 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md min-w-[300px]">
               <div className="text-right flex-1 space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#800000]">Technical Support</p>
                  <p className="text-xs font-bold text-slate-200">coordinator.sit@tupv.edu.ph</p>
               </div>
               <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                  <AlertCircle className="h-5 w-5 text-slate-400" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
