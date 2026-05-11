"use client";

import { Skeleton } from "boneyard-js/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { 
  Search, 
  CheckCircle2,
  X,
  Send,
  Loader2,
  Building2,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Sparkles,
  SlidersHorizontal,
  FileWarning
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { applyForOpportunity } from "@/app/(portals)/student/opportunities/actions";
import { SITOpportunity } from "@/app/(portals)/student/opportunities/types";

export function StudentOpportunitiesShell({ 
  initialData, 
  hasCV 
}: { 
  initialData: SITOpportunity[] | null, 
  hasCV: boolean 
}) {
  const [postings, setPostings] = useState<SITOpportunity[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [applyingTo, setApplyingTo] = useState<SITOpportunity | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const deepLinkHandled = useRef(false);

  useEffect(() => {
    if (initialData) setPostings(initialData);
  }, [initialData]);

  useEffect(() => {
    if (deepLinkHandled.current || postings.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const applyId = params.get("apply");
    if (!applyId) return;

    deepLinkHandled.current = true;

    const target = postings.find(p => p.id === applyId);
    if (target) {
      const alreadyApplied = target.applications.length > 0;
      if (!alreadyApplied) {
        setApplyingTo(target);
      }
    }

    window.history.replaceState({}, "", "/student/opportunities");
  }, [postings]);

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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-border">
            <div className="space-y-3">
              <div className="h-10 w-64 bg-muted rounded-lg animate-pulse" />
              <div className="h-4 w-96 bg-muted/50 rounded-lg animate-pulse" />
            </div>
            <div className="h-12 w-80 bg-muted rounded-2xl animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="h-72 bg-muted/30 rounded-2xl animate-pulse" />
             ))}
          </div>
        </div>
      }
    >
      <div className="space-y-12 max-w-7xl mx-auto pb-32">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-border">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Industry Opportunities
            </h2>
            <p className="text-sm text-muted-foreground font-medium">
              Explore and apply for placements with our partner companies. Filter by sector or location to find the right fit for your SIT.
            </p>
          </div>
          <div className="flex items-center w-full md:w-auto bg-muted/50 p-1 rounded-2xl border border-border">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search companies or positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 w-full bg-transparent text-foreground text-sm font-medium outline-none"
              />
            </div>
            <button className="h-12 px-5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-sm">
               <SlidersHorizontal className="h-4 w-4" />
               <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Posting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPostings.map((posting) => {
            const applied = posting.applications.length > 0;
            return (
              <div key={posting.id} className="group bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 flex flex-col relative">
                 <div className="p-8 space-y-8 flex-1">
                    <div className="flex justify-between items-start">
                       <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center text-xl font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          {posting.company.name[0]}
                       </div>
                       <div className="text-right">
                          <p className="text-xs font-semibold text-muted-foreground">{posting.location}</p>
                          <div className="flex items-center justify-end gap-1.5 mt-1.5">
                             <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{posting.type}</span>
                             </div>
                          </div>
                       </div>
                    </div>
 
                    <div className="space-y-2">
                       <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{posting.title}</h3>
                       <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <Building2 className="h-4 w-4 opacity-50" /> {posting.company.name}
                       </div>
                    </div>
 
                    <div className="flex items-center justify-between border-t border-border pt-6">
                       <div className="space-y-0.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Training Load</p>
                          <p className="text-xl font-bold text-foreground tabular-nums">{posting.requiredHours}<span className="text-xs ml-1 font-medium opacity-50">HRS</span></p>
                       </div>
                       {posting.posterUrl && (
                         <button 
                           onClick={() => setSelectedPoster(posting.posterUrl)}
                           className="h-10 px-4 rounded-xl border border-border bg-muted/30 hover:bg-muted hover:border-muted-foreground/20 flex items-center gap-2 text-xs font-bold transition-all"
                         >
                           <Activity className="h-4 w-4" />
                           View Poster
                         </button>
                       )}
                    </div>
                 </div>
 
                 <div className="px-8 pb-8">
                    <button 
                      onClick={() => setApplyingTo(posting)}
                      disabled={applied}
                      className={cn(
                        "w-full h-12 flex items-center justify-center gap-3 text-sm font-bold rounded-xl transition-all",
                        applied 
                        ? "bg-muted text-muted-foreground cursor-not-allowed" 
                        : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/10 hover:shadow-primary/20"
                      )}
                    >
                      {applied ? (
                        <><CheckCircle2 className="h-4 w-4" /> Already Applied</>
                      ) : (
                        <>Apply Now <ArrowRight className="h-4 w-4" /></>
                      )}
                    </button>
                 </div>
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
                  <h3 className="text-2xl font-bold text-foreground mb-2">Application Submitted</h3>
                  <p className="text-muted-foreground font-medium">Your application has been sent to {applyingTo.company.name}. You can track its status on your dashboard.</p>
                </div>
              ) : (
                <div>
                  <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-muted/30">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground">Confirm Application</h3>
                      <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-primary" /> Review your application details
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
                          <p className="text-xs font-medium opacity-80 leading-relaxed">
                            By confirming, your SIT profile, academic records, and professional details will be shared with the company for review.
                          </p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-8 py-4 px-2">
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider">Position</p>
                           <p className="text-lg font-bold text-foreground">{applyingTo.title}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider">Requirements</p>
                           <p className="text-lg font-bold text-foreground">{applyingTo.requiredHours} Hours</p>
                        </div>
                     </div>

                     {!hasCV ? (
                       <div className="p-6 rounded-xl bg-destructive/5 border border-destructive/10 flex flex-col items-center text-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                             <FileWarning className="h-6 w-6" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-sm font-bold text-destructive uppercase tracking-tight">Missing Resume</p>
                             <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                               Your resume (CV) is missing from your documents. Companies require this for their review process.
                             </p>
                          </div>
                          <Link 
                            href="/student/documents"
                            className="text-xs font-bold text-destructive hover:underline flex items-center gap-1.5"
                          >
                            Upload CV Now <ArrowUpRight className="h-3 w-3" />
                          </Link>
                       </div>
                     ) : (
                       <button
                        onClick={() => handleApply(applyingTo.id)}
                        disabled={isSubmitting}
                        className="w-full flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white uppercase tracking-wider shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all disabled:opacity-50"
                       >
                         {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Send Application <Send className="ml-2 h-4 w-4" /></>}
                       </button>
                     )}
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
