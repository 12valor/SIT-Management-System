"use client";

import { useState } from "react";
import { useMockStore, SITEvaluation } from "@/store/mock-store";
import { 
  Star, 
  CheckCircle2, 
  User as UserIcon, 
  ChevronRight, 
  ArrowLeft,
  Trophy,
  Activity,
  Award,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmployerEvaluationsPage() {
  const { user, applications, logbookEntries, evaluations, submitEvaluation } = useMockStore();
  const [selectedStudentEmail, setSelectedStudentEmail] = useState<string | null>(null);
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

  // Get hired students
  const hiredStudents = applications.filter(a => a.status === 'Accepted');

  const getStudentHours = (email: string) => {
    return logbookEntries
      .filter(e => e.studentEmail === email && e.status === 'Approved')
      .reduce((acc, curr) => acc + curr.hours, 0);
  };

  const getStudentEvaluation = (email: string) => {
    return evaluations.find(e => e.studentEmail === email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentEmail) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    submitEvaluation({
      studentEmail: selectedStudentEmail,
      supervisorName: user?.name || "Supervisor",
      companyName: user?.company || "Tech Partner",
      technicalSkills: ratings.technicalSkills,
      professionalism: ratings.professionalism,
      punctuality: ratings.punctuality,
      qualityOfWork: ratings.qualityOfWork,
      comments,
      recommendForHire
    });

    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset after success
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedStudentEmail(null);
      setRatings({ technicalSkills: 0, professionalism: 0, punctuality: 0, qualityOfWork: 0 });
      setComments("");
    }, 2000);
  };

  const RatingInput = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-black uppercase tracking-widest text-slate-500">{label}</label>
        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{value}/5</span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={cn(
              "flex-1 h-12 rounded-xl flex items-center justify-center transition-all border shadow-sm",
              value >= star 
                ? "bg-amber-500 border-amber-500 text-white scale-105" 
                : "bg-card border-border text-slate-400 hover:border-amber-200"
            )}
          >
            <Star className={cn("h-5 w-5", value >= star ? "fill-white" : "fill-none")} />
          </button>
        ))}
      </div>
    </div>
  );

  if (selectedStudentEmail) {
    const studentName = hiredStudents.find(s => s.studentEmail === selectedStudentEmail)?.studentName;
    
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in-fade">
        <button 
          onClick={() => setSelectedStudentEmail(null)}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Trainee List
        </button>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
           <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl font-black text-primary border border-primary/20">
                    {studentName?.[0]}
                 </div>
                 <div>
                    <h2 className="text-3xl font-black tracking-tight">{studentName}</h2>
                    <p className="text-slate-500 font-medium italic">Performance Assessment Rubric</p>
                 </div>
              </div>

              {showSuccess ? (
                <div className="py-20 text-center space-y-4 animate-in-bounce">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                   </div>
                   <h3 className="text-2xl font-black text-green-600 tracking-tight">Evaluation Submitted!</h3>
                   <p className="text-slate-500 font-medium">Your feedback has been recorded and the trainee&apos;s SIT record is being updated.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                   <div className="grid md:grid-cols-2 gap-8">
                      <RatingInput 
                        label="Technical Skills" 
                        value={ratings.technicalSkills} 
                        onChange={(v) => setRatings({...ratings, technicalSkills: v})} 
                      />
                      <RatingInput 
                        label="Professionalism" 
                        value={ratings.professionalism} 
                        onChange={(v) => setRatings({...ratings, professionalism: v})} 
                      />
                      <RatingInput 
                        label="Punctuality" 
                        value={ratings.punctuality} 
                        onChange={(v) => setRatings({...ratings, punctuality: v})} 
                      />
                      <RatingInput 
                        label="Quality of Work" 
                        value={ratings.qualityOfWork} 
                        onChange={(v) => setRatings({...ratings, qualityOfWork: v})} 
                      />
                   </div>

                   <div className="space-y-4">
                      <label className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Supervisor Comments
                      </label>
                      <textarea
                        required
                        placeholder="Provide detailed feedback on the trainee&apos;s industrial performance..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="w-full h-32 p-4 rounded-2xl bg-muted/30 border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-sm font-medium leading-relaxed"
                      />
                   </div>

                   <div className="p-6 rounded-2xl bg-muted/20 border border-border flex items-center justify-between">
                      <div className="space-y-1">
                         <h4 className="font-black text-slate-900 leading-none">Recommend for Hiring?</h4>
                         <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">Industrial Endorsement</p>
                      </div>
                      <div className="flex bg-card p-1 rounded-xl border border-border shadow-sm">
                         <button
                           type="button"
                           onClick={() => setRecommendForHire(true)}
                           className={cn(
                             "px-5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2",
                             recommendForHire ? "bg-green-600 text-white shadow-lg shadow-green-600/20" : "text-slate-400 hover:text-slate-900"
                           )}
                         >
                            <ThumbsUp className="h-4 w-4" /> YES
                         </button>
                         <button
                           type="button"
                           onClick={() => setRecommendForHire(false)}
                           className={cn(
                             "px-5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2",
                             !recommendForHire ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "text-slate-400 hover:text-slate-900"
                           )}
                         >
                            <ThumbsDown className="h-4 w-4" /> NO
                         </button>
                      </div>
                   </div>

                   <button
                     disabled={isSubmitting || Object.values(ratings).some(v => v === 0)}
                     className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-black tracking-widest uppercase text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
                   >
                     {isSubmitting ? "Processing Assessment..." : "Submit Final Evaluation"}
                   </button>
                </form>
              )}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight text-gradient">Performance Hub</h2>
          <p className="text-muted-foreground font-medium">Finalize SIT requirements by evaluating your active trainees.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hiredStudents.map((app) => {
          const hours = getStudentHours(app.studentEmail);
          const evaluation = getStudentEvaluation(app.studentEmail);
          const isEligible = hours >= 280; // Allow eval if near completion

          return (
            <div key={app.id} className="group p-8 rounded-[2rem] bg-card border border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden flex flex-col items-center text-center">
               <div className="absolute top-0 left-0 w-full h-2 bg-slate-100" />
               <div className="absolute top-0 left-0 h-2 bg-primary transition-all duration-1000" style={{ width: `${Math.min((hours/300)*100, 100)}%` }} />

               <div className="mb-6 relative">
                  <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center text-3xl font-black text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    {app.studentName[0]}
                  </div>
                  {evaluation && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-emerald-500/10">
                       <Award className="h-5 w-5" />
                    </div>
                  )}
               </div>

               <div className="mb-8 space-y-1">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">{app.studentName}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{app.studentEmail}</p>
               </div>

               <div className="w-full grid grid-cols-2 gap-4 mb-8 border-y border-border/50 py-6">
                  <div className="space-y-1 border-r border-border/50">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Total Hours</p>
                     <p className="text-xl font-black flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4 text-primary" /> {hours}
                     </p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Program Status</p>
                     <p className={cn(
                        "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full inline-block",
                        evaluation ? "bg-emerald-100 text-emerald-600" : (isEligible ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-400")
                     )}>
                        {evaluation ? "Evaluated" : (isEligible ? "Ready for Eval" : "In Progress")}
                     </p>
                  </div>
               </div>

               {evaluation ? (
                 <div className="w-full space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold px-1">
                       <span className="text-slate-400 uppercase tracking-widest">Final Rating</span>
                       <div className="flex text-amber-500">
                          {Array.from({length: 5}).map((_, i) => (
                            <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(evaluation.overallGrade) ? "fill-amber-500" : "fill-none")} />
                          ))}
                       </div>
                    </div>
                    <button disabled className="w-full py-3.5 rounded-xl bg-muted/50 text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                       <CheckCircle2 className="h-4 w-4" /> Assessment Finalized
                    </button>
                 </div>
               ) : (
                 <button 
                   disabled={!isEligible}
                   onClick={() => setSelectedStudentEmail(app.studentEmail)}
                   className={cn(
                    "w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2",
                    isEligible 
                      ? "bg-primary text-primary-foreground shadow-primary/20 hover:scale-105 active:scale-95" 
                      : "bg-muted text-slate-400 cursor-not-allowed"
                   )}
                 >
                    {isEligible ? <Trophy className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                    {isEligible ? "Start Evaluation" : "Progress Insufficient"}
                 </button>
               )}
            </div>
          );
        })}

        {hiredStudents.length === 0 && (
           <div className="col-span-full py-40 flex flex-col items-center justify-center text-center bg-card border-2 border-dashed border-border rounded-[3rem] opacity-50">
              <UserIcon className="h-16 w-16 mb-6 text-muted-foreground" />
              <h3 className="text-2xl font-black mb-2">No Active Trainees</h3>
              <p className="text-sm font-medium max-w-xs">You must hire and coordinate with students before evaluating their industrial performance.</p>
           </div>
        )}
      </div>

      {/* Info Card */}
      <div className="p-10 rounded-[3rem] bg-slate-900 dark:bg-slate-900/50 text-white shadow-3xl relative overflow-hidden group">
         <div className="absolute top-[-50%] right-[-10%] w-[40%] h-[200%] bg-primary/10 blur-[100px] skew-x-12 group-hover:translate-x-10 transition-transform duration-1000" />
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4">
               <h3 className="text-3xl font-extrabold flex items-center gap-3">
                  <Award className="h-8 w-8 text-primary" />
                  Industrial Assessment Policy
               </h3>
               <p className="text-slate-400 font-medium max-w-2xl leading-relaxed">
                  Evaluations should be completed once the student reaches **280-300 hours**. This assessment is mandatory for TUP-V students to receive their SIT Certificate of Completion. Your honest feedback helps shape their professional career.
               </p>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
               <div className="text-right">
                  <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Department Support</p>
                  <p className="text-sm font-bold">coordinator.sit@tupv.edu.ph</p>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-slate-300" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
