"use client";

import { Skeleton } from "boneyard-js/react";

import { useState, useEffect } from "react";
import { 
  Search, 
  Briefcase, 
  Activity,
  Sparkles,
  SlidersHorizontal
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

  return (
    <Skeleton 
      name="student-opportunities" 
      loading={isLoading && postings.length === 0}
      fallback={
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="h-10 w-10 text-[#800000] animate-spin opacity-20" />
        </div>
      }
    >
      <div className="space-y-12 max-w-7xl mx-auto pb-24 animate-in-fade">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">Career Opportunities</h2>
            <p className="text-sm text-slate-500 font-medium">
              Explore and apply for industrial placements at TUP-V partner companies.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search partner companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 w-full rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] outline-none transition-all shadow-sm"
              />
            </div>
            <button className="h-11 px-4 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center shadow-sm">
               <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Posting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPostings.map((posting) => {
            const applied = posting.applications.length > 0;
            return (
              <div key={posting.id} className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-[#800000]/30 transition-all flex flex-col">
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-lg font-bold text-slate-400 group-hover:bg-[#fff1f1] group-hover:text-[#800000] transition-colors">
                       {posting.company.name[0]}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 border border-slate-100">
                         {posting.location}
                       </span>
                       <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100">
                          <Zap className="h-3 w-3 text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{posting.type}</span>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-1 mb-6 flex-1">
                    <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-[#800000] transition-colors">{posting.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                       <Building2 className="h-4 w-4 text-slate-300" /> {posting.company.name}
                    </div>
                 </div>

                 <div className="flex items-center justify-between border-t border-slate-50 pt-4 mb-6 relative z-10">
                    <div className="space-y-0.5">
                       <p className="text-[10px] font-bold uppercase text-slate-400">Duration</p>
                       <p className="text-base font-bold text-slate-700">{posting.requiredHours} <span className="text-[10px] text-slate-400 font-medium tracking-tight">HRS</span></p>
                    </div>
                    <div className="space-y-0.5 text-right">
                       <p className="text-[10px] font-bold uppercase text-slate-400">Slots</p>
                       <p className="text-base font-bold text-slate-700">05 <span className="text-[10px] text-slate-400 font-medium tracking-tight">INT</span></p>
                    </div>
                 </div>

                 <button 
                  onClick={() => setApplyingTo(posting)}
                  disabled={applied}
                  className={cn(
                    "w-full h-11 rounded-lg flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all",
                    applied 
                    ? "bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed" 
                    : "bg-[#800000] text-white hover:bg-red-900 shadow-md shadow-red-900/10 active:scale-95"
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

          {filteredPostings.length === 0 && (
             <div className="col-span-full py-32 text-center rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6">
                    <Activity className="h-8 w-8 text-slate-200" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">No results found</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto">Try adjusting your search terms or filters.</p>
              </div>
          )}
        </div>

        {/* Application Modal */}
        {applyingTo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in transition-all">
            <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              {isSuccess ? (
                <div className="p-16 text-center">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Transmitted</h3>
                  <p className="text-slate-500 font-medium">Your industrial candidacy has been forwarded to {applyingTo.company.name}. Check your dashboard for status updates.</p>
                </div>
              ) : (
                <div>
                  <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900">Confirm Application</h3>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-[#800000]" /> Review your industrial transmission request
                      </p>
                    </div>
                    <button 
                      onClick={() => setApplyingTo(null)}
                      className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-8 space-y-8">
                     <div className="p-5 rounded-xl bg-[#fff1f1] border border-[#800000]/10 text-[#800000] flex items-start gap-4">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm">
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
                           <p className="text-[10px] font-bold uppercase text-slate-400">Position</p>
                           <p className="text-lg font-bold text-slate-900">{applyingTo.title}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold uppercase text-slate-400">Requirement</p>
                           <p className="text-lg font-bold text-slate-900">{applyingTo.requiredHours} Training Hours</p>
                        </div>
                     </div>

                     <button
                      onClick={() => handleApply(applyingTo.id)}
                      disabled={isSubmitting}
                      className="w-full flex h-12 items-center justify-center rounded-xl bg-[#800000] text-sm font-bold text-white uppercase tracking-wider shadow-lg shadow-red-900/10 hover:bg-red-900 transition-all disabled:opacity-50"
                     >
                       {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Finalize Application <Send className="ml-2 h-4 w-4" /></>}
                     </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Skeleton>
  );
}
