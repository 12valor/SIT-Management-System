"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Briefcase, 
  Filter, 
  CheckCircle2,
  X,
  Send,
  Loader2,
  Building2,
  Zap,
  ArrowUpRight,
  Activity,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getSITOpportunities, applyForOpportunity } from "./actions";
import { SITOpportunity } from "./types";

export default function OpportunitiesPage() {
  const [postings, setPostings] = useState<SITOpportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [applyingTo, setApplyingTo] = useState<SITOpportunity | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    const result = await getSITOpportunities();
    if (result.success && result.data) {
      setPostings(result.data);
    }
    setIsLoading(false);
  }

  const handleApply = async (postingId: string) => {
    setIsSubmitting(true);
    const result = await applyForOpportunity(postingId);
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setApplyingTo(null);
        loadData();
      }, 2000);
    } else {
      alert("Error: " + result.error);
    }
    setIsSubmitting(false);
  };

  const filteredPostings = postings.filter((p: SITOpportunity) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.company.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (isLoading && postings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Scanning Global Opportunities...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 animate-in-fade">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
             <Briefcase className="h-4 w-4" />
             <span className="text-[10px] font-black uppercase tracking-widest">Industry Stream</span>
          </div>
          <h2 className="text-6xl font-black tracking-tighter leading-none italic uppercase">Career <span className="text-primary">Postings</span></h2>
          <p className="text-muted-foreground font-medium text-lg">Acquire elite industrial placements within the TUP-V ecosystem.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Filter industrial partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-6 h-16 w-full rounded-[1.5rem] border border-border bg-card shadow-sm outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-xs font-black uppercase tracking-widest transition-all"
            />
          </div>
          <button className="h-16 w-16 rounded-[1.5rem] bg-primary text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
             <Filter className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Posting Meta Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPostings.map((posting) => {
          const applied = posting.applications.length > 0;
          return (
            <div key={posting.id} className="group p-10 rounded-[3rem] bg-card border border-border/60 hover:border-primary/30 transition-all hover:shadow-4xl hover:shadow-primary/5 relative overflow-hidden flex flex-col">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] rounded-full" />
              
               <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-muted flex items-center justify-center text-2xl font-black text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all transform group-hover:scale-110 shadow-sm border border-border/40">
                     {posting.company.name[0]}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     <span className={cn(
                       "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
                       posting.location.toLowerCase().includes('remote') ? "bg-primary/5 text-primary border-primary/20" : "bg-primary/10 text-primary border-primary/20"
                     )}>
                       {posting.location}
                     </span>
                     <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-lg border border-border/40">
                        <Zap className="h-3 w-3 text-primary fill-primary" />
                        <span className="text-[10px] font-black tracking-tighter text-muted-foreground uppercase">{posting.type}</span>
                     </div>
                  </div>
               </div>

               <div className="space-y-2 mb-10 relative z-10 flex-1">
                  <h3 className="text-2xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors uppercase italic">{posting.title}</h3>
                  <p className="text-sm font-black text-muted-foreground uppercase tracking-widest leading-none flex items-center gap-2">
                     <Building2 className="h-4 w-4" /> {posting.company.name}
                  </p>
               </div>

               <div className="flex items-center gap-10 border-y border-border/40 py-8 mb-10 relative z-10">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Term Required</p>
                     <p className="text-lg font-black tracking-tighter">{posting.requiredHours} <span className="text-[10px] text-muted-foreground font-bold">HRS</span></p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Open Slots</p>
                     <p className="text-lg font-black tracking-tighter">05 <span className="text-[10px] text-muted-foreground font-bold">INT</span></p>
                  </div>
               </div>

               <button 
                onClick={() => setApplyingTo(posting)}
                disabled={applied}
                className={cn(
                  "w-full py-5 rounded-[1.5rem] flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative z-10",
                  applied 
                  ? "bg-primary/10 text-primary border border-primary/20 opacity-60 cursor-not-allowed" 
                  : "bg-primary text-primary-foreground shadow-3xl shadow-primary/20 hover:scale-[1.03] active:scale-95 hover:shadow-primary/40"
                )}
               >
                {applied ? (
                  <><CheckCircle2 className="h-5 w-5" /> Transmission Complete</>
                ) : (
                  <>Apply for Posting <ArrowUpRight className="h-5 w-5" /></>
                )}
               </button>
            </div>
          );
        })}

        {filteredPostings.length === 0 && (
           <div className="col-span-full py-48 text-center rounded-[4rem] border-2 border-dashed border-border/40 bg-muted/40 opacity-40">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-8">
                  <Activity className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-3xl font-black mb-3 tracking-tight">Zero Results Manifested</h3>
                <p className="text-base font-medium max-w-sm mx-auto text-muted-foreground leading-relaxed italic italic">Your search criteria did not match any active industrial opportunities. Try expanding your parameters.</p>
            </div>
        )}
      </div>

      {/* Application Modal */}
      {applyingTo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl animate-in-fade" onClick={() => !isSuccess && setApplyingTo(null)} />
          <div className="relative w-full max-w-[42rem] bg-card border border-border/60 rounded-[3.5rem] shadow-4xl overflow-hidden animate-in-bounce">
            {isSuccess ? (
              <div className="p-20 text-center animate-in-fade">
                <div className="w-32 h-32 bg-primary/10 text-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary/20 ring-8 ring-primary/5">
                  <CheckCircle2 className="h-16 w-16" />
                </div>
                <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase italic">Success.</h3>
                <p className="text-muted-foreground text-lg font-medium italic">Your industrial candidacy has been transmitted to {applyingTo.company.name}. Access your dashboard for status updates.</p>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="p-10 md:p-14 border-b border-border/50 flex justify-between items-center bg-muted/30">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                       <Zap className="h-5 w-5 text-primary" />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Transmission Request</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter italic uppercase">Confirm <span className="text-primary">Application</span></h3>
                  </div>
                  <button 
                    onClick={() => setApplyingTo(null)}
                    className="h-14 w-14 rounded-2xl bg-background border border-border/60 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all group"
                  >
                    <X className="h-6 w-6 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
                <div className="p-10 md:p-14 space-y-10">
                   <div className="p-8 rounded-[2.5rem] bg-primary text-primary-foreground shadow-3xl shadow-primary/20 relative overflow-hidden group/alert">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full group-hover/alert:scale-150 transition-transform duration-1000" />
                      <div className="relative z-10 flex items-start gap-6">
                         <div className="p-4 bg-white/10 rounded-2xl">
                            <Sparkles className="h-8 w-8 text-white" />
                         </div>
                         <div className="space-y-2">
                           <p className="text-xl font-black tracking-tight leading-none">Security clearance granted.</p>
                           <p className="text-sm font-medium text-white leading-relaxed italic opacity-80">
                             By finalizing this transmission, your verified SIT manifest, academic records, and professional details will be securely shared with {applyingTo.company.name} for executive review.
                           </p>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-10 border-b border-border/40 pb-10">
                      <div className="space-y-2">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Position Matrix</p>
                         <p className="text-2xl font-black tracking-tighter uppercase italic text-foreground">{applyingTo.title}</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Module Requirement</p>
                         <p className="text-2xl font-black tracking-tighter uppercase italic text-foreground">{applyingTo.requiredHours} Industrial Hours</p>
                      </div>
                   </div>

                   <button
                    onClick={() => handleApply(applyingTo.id)}
                    disabled={isSubmitting}
                    className="w-full flex h-20 items-center justify-center rounded-[2rem] bg-primary px-8 text-sm font-black text-primary-foreground uppercase tracking-[0.3em] shadow-3xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all group disabled:opacity-30"
                   >
                     {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : <>Finalize Transmission <Send className="ml-4 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
