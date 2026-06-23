"use client";

import { Skeleton } from "boneyard-js/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { 
  Search, 
  CheckCircle2,
  X,
  Loader2,
  Building2,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Info,
  Briefcase,
  Target,
  ListChecks,
  MapPin,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { applyForOpportunity, getOpportunityPosterUrl } from "@/app/(portals)/student/opportunities/actions";
import { SITOpportunity, OpportunityApplication } from "@/app/(portals)/student/opportunities/types";

export function StudentOpportunitiesShell({ 
  initialData, 
  hasCV 
}: { 
  initialData: SITOpportunity[] | null, 
  hasCV: boolean 
}) {
  const [postings, setPostings] = useState<SITOpportunity[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "ON_SITE" | "REMOTE" | "HYBRID">("ALL");
  const [applyingTo, setApplyingTo] = useState<SITOpportunity | null>(null);
  const [viewingDetails, setViewingDetails] = useState<SITOpportunity | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const deepLinkHandled = useRef(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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
      const alreadyApplied = target.applications.some((app: OpportunityApplication) => app.status !== "WITHDRAWN");
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

  const handleShowPoster = async (postingId: string) => {
    const result = await getOpportunityPosterUrl(postingId);
    if (result.success && result.url) {
      setSelectedPoster(result.url);
    }
  };

  const filteredPostings = postings.filter((p: SITOpportunity) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "ALL" || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-border">
              <div className="space-y-3">
                <div className="h-10 w-64 bg-muted rounded-lg animate-pulse" />
                <div className="h-4 w-96 bg-muted/50 rounded-lg animate-pulse" />
              </div>
            </div>

            <div className="h-14 bg-muted/20 border border-border/50 rounded-2xl animate-pulse" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-80 bg-muted/20 border border-border/50 rounded-2xl animate-pulse" />
               ))}
            </div>
          </div>
        }
      >
        <div className="space-y-10 max-w-7xl mx-auto pb-32">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-border/80">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/95 to-foreground/80">
                Industry Opportunities
              </h2>
              <p className="text-sm text-muted-foreground font-medium">
                Explore and apply for placements with our partner companies. Filter by sector or location to find the right fit for your SIT.
              </p>
            </div>
          </div>

          {/* Search & Quick Filters */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center w-full md:w-96 bg-muted/40 p-1 rounded-2xl border border-border/60">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                  <input
                    type="text"
                    placeholder="Search companies or positions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 h-11 w-full bg-transparent text-foreground text-sm font-medium outline-none"
                  />
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {(["ALL", "ON_SITE", "REMOTE", "HYBRID"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={cn(
                      "px-4 py-2 text-xs font-bold rounded-xl transition-all border cursor-pointer",
                      typeFilter === type
                        ? "bg-foreground text-background border-foreground shadow-sm"
                        : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {type === "ALL" ? "All Types" : type.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posting Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPostings.map((posting, idx) => {
              const applied = posting.applications.some((app: OpportunityApplication) => app.status !== "WITHDRAWN");
              return (
                <motion.div
                  key={posting.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="group bg-card border border-border/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 flex flex-col relative"
                >
                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Top Meta Info */}
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent text-primary border border-primary/10 rounded-xl flex items-center justify-center text-lg font-bold">
                          {posting.company.name[0]}
                        </div>
                        <div className="text-right">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border",
                            posting.type === "REMOTE" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                            posting.type === "HYBRID" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
                            posting.type === "ON_SITE" && "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                          )}>
                            {posting.type.replace("_", " ")}
                          </span>
                          <p className="text-[10px] font-medium text-muted-foreground mt-2 flex items-center justify-end gap-1">
                            <MapPin className="h-3 w-3 opacity-60" /> {posting.location}
                          </p>
                        </div>
                      </div>

                      {/* Title & Company */}
                      <div className="space-y-1">
                        <h3 className="text-lg font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {posting.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                          <Building2 className="h-3.5 w-3.5 opacity-60" /> {posting.company.name}
                        </div>
                      </div>

                      {/* Description Snippet */}
                      <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                        {posting.description}
                      </p>
                    </div>

                    {/* Skills/Tags & Grid Footer */}
                    <div className="space-y-4 pt-2">
                      {/* Tags */}
                      {posting.tags && posting.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {posting.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[9px] font-bold bg-muted text-muted-foreground/80 px-2 py-0.5 rounded border border-border/40">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="h-5" />
                      )}

                      {/* Buttons Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
                        <button 
                          onClick={() => setViewingDetails(posting)}
                          className="h-9 px-3 rounded-xl border border-border bg-background hover:bg-muted hover:border-primary/20 flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                        >
                          <Info className="h-3.5 w-3.5 text-primary" />
                          Details
                        </button>
                        {posting.posterUrl ? (
                          <button 
                            onClick={() => handleShowPoster(posting.id)}
                            className="h-9 px-3 rounded-xl border border-border bg-muted/30 hover:bg-muted hover:border-muted-foreground/20 flex items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                          >
                            <Activity className="h-3.5 w-3.5 text-primary" />
                            Poster
                          </button>
                        ) : (
                          <div className="h-9 px-3 rounded-xl border border-dashed border-border/40 flex items-center justify-center text-[9px] font-semibold text-muted-foreground/30 uppercase tracking-wider select-none">
                            No Poster
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="px-6 pb-6">
                    <button 
                      onClick={() => setApplyingTo(posting)}
                      disabled={applied}
                      className={cn(
                        "w-full h-11 flex items-center justify-center gap-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer",
                        applied 
                        ? "bg-muted text-muted-foreground/60 cursor-not-allowed border border-border/50" 
                        : "bg-foreground text-background hover:bg-foreground/90 shadow-sm active:scale-[0.98]"
                      )}
                    >
                      {applied ? (
                        <><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Applied</>
                      ) : (
                        <>Apply Now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {filteredPostings.length === 0 && postings.length > 0 && (
               <div className="col-span-full py-32 text-center rounded-xl border border-border bg-card shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                      <Activity className="h-8 w-8 text-muted-foreground/25" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">No results found</h3>
                    <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">Try adjusting your search terms or filters.</p>
                </div>
            )}
            
            {postings.length === 0 && (
                <div className="col-span-full py-32 text-center rounded-xl border border-border bg-card shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                      <Activity className="h-8 w-8 text-muted-foreground/25" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">No opportunities</h3>
                    <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">There are no postings right now.</p>
                </div>
            )}
          </div>
        </div>
      </Skeleton>
      
      {/* Full Post Details Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {viewingDetails && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="px-8 py-6 border-b border-border flex justify-between items-start bg-muted/10 sticky top-0 z-20">
                  <div className="flex gap-5 items-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary shadow-inner border border-primary/10">
                      {viewingDetails.company.name[0]}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-foreground leading-tight">{viewingDetails.title}</h3>
                      <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                        <Building2 className="h-4 w-4 opacity-60" /> {viewingDetails.company.name} 
                        <span className="mx-2 opacity-30">•</span>
                        <MapPin className="h-4 w-4 opacity-60" /> {viewingDetails.location}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setViewingDetails(null)}
                    className="h-10 w-10 rounded-xl hover:bg-muted flex items-center justify-center transition-all text-muted-foreground hover:text-foreground border border-transparent hover:border-border cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                  {/* Quick Specs */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-muted/30 rounded-2xl border border-border/50">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">Training Load</p>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        <p className="text-lg font-bold text-foreground">300 Hours</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">Placement Type</p>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <p className="text-lg font-bold text-foreground uppercase text-sm">{viewingDetails.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 hidden md:block">
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">Posted On</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <p className="text-lg font-bold text-foreground">{new Date(viewingDetails.postedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Info className="h-5 w-5" />
                      <h4 className="text-sm font-bold uppercase tracking-widest">About the Role</h4>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                      &quot;{viewingDetails.description}&quot;
                    </p>
                  </div>

                  {/* Requirements & Responsibilities Grid */}
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Target className="h-5 w-5" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">Responsibilities</h4>
                      </div>
                      <ul className="space-y-3">
                        {viewingDetails.responsibilities.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm font-medium text-muted-foreground leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-primary">
                        <ListChecks className="h-5 w-5" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">Requirements</h4>
                      </div>
                      <ul className="space-y-3">
                        {viewingDetails.requirements.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm font-medium text-muted-foreground leading-relaxed">
                            <CheckCircle2 className="h-4 w-4 text-primary/40 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-8 bg-muted/10 border-t border-border flex items-center justify-between gap-6">
                  <button 
                    onClick={() => setViewingDetails(null)}
                    className="h-12 px-8 rounded-xl border border-border font-bold text-sm hover:bg-muted transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      const alreadyApplied = viewingDetails.applications.some((app: OpportunityApplication) => app.status !== "WITHDRAWN");
                      if (!alreadyApplied) {
                        setApplyingTo(viewingDetails);
                        setViewingDetails(null);
                      }
                    }}
                    disabled={viewingDetails.applications.some((app: OpportunityApplication) => app.status !== "WITHDRAWN")}
                    className={cn(
                      "flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer",
                      viewingDetails.applications.some((app: OpportunityApplication) => app.status !== "WITHDRAWN")
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20"
                    )}
                  >
                    {viewingDetails.applications.some((app: OpportunityApplication) => app.status !== "WITHDRAWN") ? (
                      <><CheckCircle2 className="h-4 w-4" /> Already Applied</>
                    ) : (
                      <>Apply for this Position <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Application Modal */}
      {mounted && applyingTo && createPortal(
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in transition-all">
          <div className="relative w-full max-w-md bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            {isSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-foreground">Application Submitted</h3>
                  <p className="text-xs text-muted-foreground">
                    Your application has been sent to {applyingTo.company.name}.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-foreground">Confirm Application</h3>
                    <p className="text-xs text-muted-foreground">
                      Apply for <span className="font-semibold text-foreground">{applyingTo.title}</span> at {applyingTo.company.name}
                    </p>
                  </div>
                  <button 
                    onClick={() => setApplyingTo(null)}
                    className="text-muted-foreground/60 hover:text-foreground transition-colors p-1 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="space-y-4">
                  <div className="bg-muted/50 border rounded-lg p-3 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requirements:</span>
                      <span className="font-semibold">300 Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-semibold uppercase">{applyingTo.type.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {!hasCV ? (
                    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 space-y-2">
                      <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                        Resume (CV) Missing
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-normal">
                        You need to upload your Student Resume / CV before applying. Please go to the documents page to upload it.
                      </p>
                      <Link 
                        href="/student/documents"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400 hover:underline"
                      >
                        Go to Documents <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground leading-normal">
                      Your profile, academic record, and resume will be shared with the company for evaluation.
                    </p>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="flex gap-3 justify-end pt-2 border-t">
                  <button
                    onClick={() => setApplyingTo(null)}
                    className="px-4 h-9 rounded-lg border border-border text-xs font-bold hover:bg-muted transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleApply(applyingTo.id)}
                    disabled={isSubmitting || !hasCV}
                    className={cn(
                      "px-4 h-9 rounded-lg text-xs font-bold text-white bg-primary hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                      (isSubmitting || !hasCV) && "opacity-50 cursor-not-allowed pointer-events-none"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Poster Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedPoster && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPoster(null)}
              className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
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
                  className="fixed top-8 right-8 h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all hover:scale-110 active:scale-95 z-[210] border border-primary/20 cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
