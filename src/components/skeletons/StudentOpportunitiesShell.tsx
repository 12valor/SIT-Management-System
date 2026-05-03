"use client";

import { Skeleton } from "boneyard-js/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Search, 
  CheckCircle2,
  X,
  Send,
  Loader2,
  Building2,
  Zap,
  ArrowUpRight,
  Activity,
  Sparkles,
  SlidersHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { applyForOpportunity } from "@/app/(portals)/student/opportunities/actions";
import { SITOpportunity } from "@/app/(portals)/student/opportunities/types";

export function StudentOpportunitiesShell({ initialData }: { initialData: SITOpportunity[] | null }) {
  const [postings, setPostings] = useState<SITOpportunity[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [applyingTo, setApplyingTo] = useState<SITOpportunity | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialData) setPostings(initialData);
  }, [initialData]);

  const handleApply = async (postingId: string) => {
    setIsSubmitting(true);
    const result = await applyForOpportunity(postingId);
    if (result.success) {
      setIsSuccess(true);
      // Optimistic update
      setPostings(prev => prev.map(p => 
        p.id === postingId ? { ...p, applications: [{ id: "temp", studentId: "temp", opportunityId: postingId, status: "PENDING", appliedAt: new Date() }] } : p
      ));
      setTimeout(() => {
        setIsSuccess(false);
        setApplyingTo(null);
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

  return (
    <Skeleton 
      name="student-opportunities" 
      loading={!initialData}
      animate="shimmer"
      stagger={80}
      transition={300}
      snapshotConfig={{
        excludeSelectors: ["svg", "[data-no-skeleton]"],
        excludeTags: ["nav", "footer"],
      }}
      fallback={
        <div className="space-y-12 max-w-7xl mx-auto pb-24">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
            <div className="space-y-4">
              <div className="h-8 w-64 bg-muted rounded-lg animate-pulse" />
              <div className="h-4 w-96 bg-muted/50 rounded-lg animate-pulse" />
            </div>
            <div className="h-11 w-80 bg-muted rounded-lg animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="h-64 bg-muted/30 rounded-xl animate-pulse" />
             ))}
          </div>
        </div>
      }
    >
      <div className="space-y-12 max-w-7xl mx-auto pb-24 animate-in-fade">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Career Opportunities</h2>
            <p className="text-sm text-muted-foreground font-medium">
              Explore and apply for industrial placements at TUP-V partner companies.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
              <input
                type="text"
                placeholder="Search partner companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 w-full rounded-lg border border-border bg-card text-foreground text-sm focus:ring-2 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm"
              />
            </div>
            <button className="h-11 px-4 rounded-lg bg-card border border-border text-muted-foreground hover:bg-muted transition-colors flex items-center justify-center shadow-sm">
               <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Posting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPostings.map((posting) => {
            const applied = posting.applications.length > 0;
            return (
              <div key={posting.id} className="group bg-card p-6 rounded-xl border border-border shadow-sm hover:border-primary/30 transition-all flex flex-col">
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center text-lg font-bold text-muted-foreground/40 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                       {posting.company.name[0]}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground border border-border">
                         {posting.location}
                       </span>
                       <div className="flex items-center gap-1.5 px-2 py-0.5 bg-muted rounded-md border border-border">
                          <Zap className="h-3 w-3 text-muted-foreground/40" />
                          <span className="text-[10px] font-bold text-muted-foreground/40 uppercase">{posting.type}</span>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-1 mb-6 flex-1">
                    <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{posting.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                       <Building2 className="h-4 w-4 text-muted-foreground/30" /> {posting.company.name}
                    </div>
                 </div>

                 <div className="flex items-center justify-between border-t border-border pt-4 mb-4 relative z-10">
                    <div className="space-y-0.5">
                       <p className="text-[10px] font-bold uppercase text-muted-foreground/50">Duration</p>
                       <p className="text-base font-bold text-foreground">{posting.requiredHours} <span className="text-[10px] text-muted-foreground/40 font-medium tracking-tight">HRS</span></p>
                    </div>
                    {posting.posterUrl && (
                      <button 
                        onClick={() => setSelectedPoster(posting.posterUrl)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 border border-primary/10"
                      >
                        Visual Poster
                      </button>
                    )}
                 </div>

                  {(posting.responsibilities?.length > 0 || posting.requirements?.length > 0) && (
                    <div className="space-y-4 mb-6 pt-4 border-t border-border">
                      {posting.responsibilities?.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-[9px] font-black uppercase tracking-widest text-primary/70">Strategic Role</p>
                          <ul className="space-y-1.5">
                            {posting.responsibilities.slice(0, 3).map((r, i) => (
                              <li key={i} className="flex gap-2 text-[10px] text-muted-foreground leading-tight">
                                <span className="text-primary">•</span> {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {posting.requirements?.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Prerequisites</p>
                          <ul className="space-y-1.5">
                            {posting.requirements.slice(0, 3).map((r, i) => (
                              <li key={i} className="flex gap-2 text-[10px] text-muted-foreground leading-tight">
                                <span className="text-muted-foreground/40">•</span> {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                 <button 
                  onClick={() => setApplyingTo(posting)}
                  disabled={applied}
                  className={cn(
                    "w-full h-11 rounded-lg flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all",
                    applied 
                    ? "bg-muted text-muted-foreground/40 border border-border cursor-not-allowed" 
                    : "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/10 active:scale-95"
                  )}
                 >
                  {applied ? (
                    <><CheckCircle2 className="h-4 w-4" /> Applied</>
                  ) : (
                    <>Apply Now <ArrowUpRight className="h-4 w-4" /></>
                  )}
                 </button>
              </div>
            );
          })}

          {filteredPostings.length === 0 && postings.length > 0 && (
             <div className="col-span-full py-32 text-center rounded-xl border border-border bg-card shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                    <Activity className="h-8 w-8 text-muted-foreground/20" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">No results found</h3>
                  <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">Try adjusting your search terms or filters.</p>
              </div>
          )}
          
          {postings.length === 0 && (
              <div className="col-span-full py-32 text-center rounded-xl border border-border bg-card shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                    <Activity className="h-8 w-8 text-muted-foreground/20" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">No opportunities</h3>
                  <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">There are no postings right now.</p>
              </div>
          )}
        </div>

        {/* Application Modal */}
        {applyingTo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm animate-in fade-in transition-all">
            <div className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              {isSuccess ? (
                <div className="p-16 text-center">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Application Transmitted</h3>
                  <p className="text-muted-foreground font-medium">Your industrial candidacy has been forwarded to {applyingTo.company.name}. Check your dashboard for status updates.</p>
                </div>
              ) : (
                <div>
                  <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-muted/30">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground">Confirm Application</h3>
                      <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-primary" /> Review your industrial transmission request
                      </p>
                    </div>
                    <button 
                      onClick={() => setApplyingTo(null)}
                      className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground/40 hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-8 space-y-8">
                     <div className="p-5 rounded-xl bg-primary/5 border border-primary/10 text-primary flex items-start gap-4">
                        <div className="p-2.5 bg-card rounded-lg shadow-sm border border-border">
                           <Sparkles className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold">Standard Disclosure</p>
                          <p className="text-[11px] font-medium opacity-80 leading-relaxed uppercase tracking-tight">
                            By confirming, your verified SIT manifest, academic records, and professional details will be shared with the industrial partner for review.
                          </p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-8 py-4 px-2">
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold uppercase text-muted-foreground/60">Position</p>
                           <p className="text-lg font-bold text-foreground">{applyingTo.title}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold uppercase text-muted-foreground/60">Requirement</p>
                           <p className="text-lg font-bold text-foreground">{applyingTo.requiredHours} Training Hours</p>
                        </div>
                     </div>

                     <button
                      onClick={() => handleApply(applyingTo.id)}
                      disabled={isSubmitting}
                      className="w-full flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white uppercase tracking-wider shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all disabled:opacity-50"
                     >
                       {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Finalize Application <Send className="ml-2 h-4 w-4" /></>}
                     </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Poster Modal */}
        <AnimatePresence>
          {selectedPoster && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPoster(null)}
              className="fixed inset-0 z-[200] bg-background/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image 
                  src={selectedPoster} 
                  alt="Job Poster" 
                  width={800}
                  height={1200}
                  className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-xl border border-white/10"
                  unoptimized
                />
                
                <button 
                  onClick={() => setSelectedPoster(null)}
                  className="fixed top-8 right-8 h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary transition-all hover:scale-110 active:scale-95 z-[210] border border-primary/20"
                >
                  <X className="h-6 w-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Skeleton>
  );
}
