"use client";

import { Skeleton } from "boneyard-js/react";

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
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{label}</label>
        <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">{value || "—"} / 5</span>
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
                : "bg-card border-border text-muted-foreground/20 hover:border-amber-400 hover:text-amber-500"
            )}
          >
            <Star className={cn("h-6 w-6 transition-transform group-hover/star:scale-110", value >= star ? "fill-white" : "fill-none")} />
          </button>
        ))}
      </div>
    </div>
  );



  if (selectedStudentId) {
    const student = trainees.find(s => s.studentId === selectedStudentId);
    
    return (
      <div className="max-w-4xl mx-auto space-y-10 animate-in-fade pb-20">
        <button 
          onClick={() => setSelectedStudentId(null)}
          className="flex items-center gap-3 text-sm font-black text-muted-foreground/60 hover:text-primary transition-all uppercase tracking-widest group"
        >
          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Return to Hub
        </button>

        <div className="bg-card border border-border/60 rounded-[3rem] p-10 lg:p-14 shadow-3xl relative overflow-hidden group/form">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full" />
           <div className="relative z-10 space-y-12">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                 <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-4xl font-black text-primary-foreground shadow-2xl shadow-primary/30 ring-8 ring-primary/10">
                    {student?.studentName?.[0]}
                 </div>
                 <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tighter leading-none text-foreground">{student?.studentName}</h2>
                    <p className="text-muted-foreground/60 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mt-2">
                       <Award className="h-4 w-4 text-primary" /> Professional Performance Audit
                    </p>
                 </div>
              </div>

              {showSuccess ? (
                <div className="py-24 text-center space-y-6 animate-in-bounce">
                   <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-emerald-500/5">
                      <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                   </div>
                   <h3 className="text-3xl font-black text-emerald-500 tracking-tight">Assessment Finalized</h3>
                   <p className="text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">The trainee&apos;s SIT record has been updated with your professional industrial endorsement.</p>
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
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 flex items-center gap-3">
                        <div className="p-1.5 bg-muted rounded-lg">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        Executive Summary & Feedback
                      </label>
                      <textarea
                        required
                        placeholder="Provide detailed industrial feedback regarding the trainee&apos;s contributions, areas for growth, and overall performance during the SIT period..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="w-full h-40 p-6 rounded-[2rem] bg-muted/30 border border-border/60 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none text-base font-medium leading-relaxed shadow-sm text-foreground"
                      />
                   </div>

                   <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="space-y-1 text-center md:text-left">
                         <h4 className="font-black text-xl text-primary leading-tight tracking-tight">Industrial Endorsement</h4>
                         <p className="text-[10px] text-primary/60 font-bold uppercase tracking-widest mt-1">Recommend this trainee for future employment?</p>
                      </div>
                      <div className="flex bg-background/20 p-1.5 rounded-2xl border border-border backdrop-blur-md shadow-inner">
                         <button
                           type="button"
                           onClick={() => setRecommendForHire(true)}
                           className={cn(
                             "px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2",
                             recommendForHire ? "bg-primary text-primary-foreground shadow-xl shadow-primary/30" : "text-muted-foreground/60 hover:text-primary"
                           )}
                         >
                            <ThumbsUp className="h-4 w-4" /> POSITIVE
                         </button>
                         <button
                           type="button"
                           onClick={() => setRecommendForHire(false)}
                           className={cn(
                             "px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2",
                             !recommendForHire ? "bg-rose-600 text-white shadow-xl shadow-rose-600/30" : "text-muted-foreground/60 hover:text-rose-600"
                           )}
                         >
                            <ThumbsDown className="h-4 w-4" /> NEGATIVE
                         </button>
                      </div>
                   </div>

                   <button
                     disabled={isSubmitting || Object.values(ratings).some(v => v === 0)}
                     className="w-full py-6 rounded-[2rem] bg-primary text-primary-foreground font-black tracking-[0.2em] uppercase text-sm shadow-3xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-20 disabled:grayscale disabled:hover:scale-100 flex items-center justify-center gap-3"
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
    <Skeleton 
      name="employer-evaluations" 
      loading={isLoading && !selectedStudentId}
      fallback={
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin opacity-20" />
        </div>
      }
    >
    <div className="space-y-12 pb-24 animate-in-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-muted text-muted-foreground/60 border border-border shadow-sm">
             <Trophy className="h-3.5 w-3.5" />
             <span className="text-[10px] font-bold uppercase tracking-wider">Performance Hub</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Industrial Audit</h1>
          <p className="text-sm text-muted-foreground font-medium max-w-2xl">Evaluate and certify student performance based on their industrial training achievements and professional development.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainees.map((trainee) => {
          const hours = trainee.totalHours;
          const evaluation = trainee.evaluation;
          const isEligible = hours >= 280; 

          return (
            <div key={trainee.id} className="group bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex flex-col items-center text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-muted" />
               <div className="absolute top-0 left-0 h-1.5 bg-primary transition-all duration-1000 shadow-sm" style={{ width: `${Math.min((hours/300)*100, 100)}%` }} />

               <div className="mb-6 relative">
                  <div className="w-20 h-20 rounded-xl bg-muted border border-border flex items-center justify-center text-3xl font-bold text-muted-foreground/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all transform group-hover:scale-105 shadow-sm">
                    {trainee.studentName?.[0] || 'U'}
                  </div>
                  {evaluation && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-background">
                       <Award className="h-4 w-4" />
                    </div>
                  )}
               </div>

               <div className="mb-8 space-y-1">
                  <h3 className="text-lg font-bold text-foreground leading-tight">{trainee.studentName}</h3>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{trainee.studentEmail}</p>
               </div>

               <div className="w-full grid grid-cols-2 gap-4 mb-8 border-y border-border/50 py-6">
                  <div className="space-y-1 border-r border-border/50">
                     <p className="text-[9px] font-bold uppercase text-muted-foreground/60 tracking-wider">Validated Hours</p>
                     <p className="text-xl font-bold text-foreground flex items-center justify-center gap-1.5 tracking-tight">
                        {hours} <span className="text-[10px] text-muted-foreground/40 font-medium">/ 300</span>
                     </p>
                  </div>
                  <div className="space-y-1 flex flex-col items-center justify-center">
                     <p className="text-[9px] font-bold uppercase text-muted-foreground/60 tracking-wider">Status</p>
                     <span className={cn(
                        "text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shadow-sm mt-0.5",
                        evaluation 
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                          : (isEligible 
                              ? "bg-primary/10 text-primary border-primary/20 animate-pulse" 
                              : "bg-muted text-muted-foreground/40 border-border")
                     )}>
                        {evaluation ? "Certified" : (isEligible ? "Ready" : "Pending")}
                     </span>
                  </div>
               </div>

               {evaluation ? (
                 <div className="w-full space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-bold px-1 text-muted-foreground/60 uppercase tracking-widest">
                       <span>Audit Score</span>
                       <div className="flex gap-0.5 text-primary">
                          {Array.from({length: 5}).map((_, i) => (
                             <Star key={i} className={cn("h-3 w-3", i < Math.round(evaluation.overallGrade) ? "fill-current" : "fill-none")} />
                          ))}
                       </div>
                    </div>
                    <button disabled className="w-full h-11 rounded-lg bg-muted border border-border text-muted-foreground/40 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm">
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
                      ? "bg-primary text-primary-foreground shadow-primary/10 hover:bg-primary/90 active:scale-95" 
                      : "bg-muted text-muted-foreground/20 border border-border cursor-not-allowed opacity-60"
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
           <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-muted/30 border border-border border-dashed rounded-xl opacity-50">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-6 shadow-sm">
                <Star className="h-6 w-6 text-muted-foreground/20" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No Active Trainee Manifest</h3>
              <p className="text-xs font-medium max-w-xs text-muted-foreground/60 leading-relaxed">Evaluation protocols will activate once student hours are validated by the coordinator.</p>
           </div>
        )}
      </div>

      {/* Info Card */}
      <div className="p-10 lg:p-12 rounded-xl bg-foreground text-background shadow-xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[100px] rounded-full" />
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center lg:text-left">
               <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="p-3 bg-primary rounded-xl shadow-lg shadow-primary/20">
                    <Award className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Institutional Certification Policy</h3>
               </div>
               <p className="text-muted-foreground font-medium max-w-3xl leading-relaxed text-sm">
                 Industrial assessments are required for all students reaching the **280-hour milestone**. Your professional vetting directly impacts the synchronization of academic records and future placement eligibility.
               </p>
            </div>
            <div className="flex items-center gap-5 bg-background/5 p-6 rounded-xl border border-background/10 backdrop-blur-md min-w-[300px]">
               <div className="text-right flex-1 space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-primary">Technical Support</p>
                  <p className="text-xs font-bold text-muted-foreground">coordinator.sit@tupv.edu.ph</p>
               </div>
               <div className="w-11 h-11 rounded-lg bg-background/10 flex items-center justify-center border border-background/10">
                  <AlertCircle className="h-5 w-5 text-muted-foreground/40" />
               </div>
            </div>
         </div>
      </div>
    </div>
    </Skeleton>
  );
}
