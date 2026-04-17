"use client";

import { useState } from "react";
import { useMockStore, SITPosting } from "@/store/mock-store";
import { 
  Search, 
  MapPin, 
  Clock, 
  Briefcase, 
  Filter, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X,
  Send
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function OpportunitiesPage() {
  const { postings, user, applyForSIT, applications } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [applyingTo, setApplyingTo] = useState<SITPosting | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredPostings = postings.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || p.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleApply = (posting: SITPosting) => {
    if (!user) return;
    applyForSIT(posting.id, user.email, user.name);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setApplyingTo(null);
    }, 2000);
  };

  const hasApplied = (postingId: string) => {
    return applications.some(a => a.postingId === postingId && a.studentEmail === user?.email);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Available Opportunities</h2>
          <p className="text-muted-foreground font-medium">Find the perfect SIT placement to kickstart your career.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search companies or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-11 w-full md:w-[300px] rounded-lg border border-border bg-card shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="relative">
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none pl-4 pr-10 h-11 rounded-lg border border-border bg-card shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer font-medium text-sm"
            >
              <option value="All">All Types</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPostings.map((posting) => {
          const applied = hasApplied(posting.id);
          return (
            <div key={posting.id} className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-black text-xl text-primary">
                   {posting.company[0]}
                </div>
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                  posting.type === 'Remote' ? "bg-indigo-500/10 text-indigo-600 border-indigo-200" :
                  posting.type === 'On-site' ? "bg-emerald-500/10 text-emerald-600 border-emerald-200" :
                  "bg-amber-500/10 text-amber-600 border-amber-200"
                )}>
                  {posting.type}
                </span>
              </div>

              <div className="space-y-1 mb-6">
                 <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{posting.title}</h3>
                 <p className="text-sm font-medium text-muted-foreground">{posting.company}</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground mb-6">
                 <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {posting.location}
                 </div>
                 <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {posting.requiredHours}h
                 </div>
              </div>

              <button 
                onClick={() => setApplyingTo(posting)}
                disabled={applied}
                className={cn(
                  "w-full h-11 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-all active:scale-95",
                  applied 
                  ? "bg-muted text-muted-foreground cursor-not-allowed" 
                  : "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30"
                )}
              >
                {applied ? (
                  <><CheckCircle2 className="h-4 w-4" /> Application Sent</>
                ) : (
                  <>Apply Now <ChevronRight className="h-4 w-4" /></>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Application Modal */}
      {applyingTo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isSuccess && setApplyingTo(null)} />
          <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {isSuccess ? (
              <div className="p-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 scale-110">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black mb-2">Application Sent!</h3>
                <p className="text-muted-foreground font-medium">Your profile has been shared with {applyingTo.company}. Good luck!</p>
              </div>
            ) : (
              <>
                <div className="p-8 border-b border-border/50 flex justify-between items-center bg-muted/30">
                  <div>
                    <h3 className="text-xl font-black">Confirm Application</h3>
                    <p className="text-sm text-muted-foreground font-medium">{applyingTo.title} at {applyingTo.company}</p>
                  </div>
                  <button 
                    onClick={() => setApplyingTo(null)}
                    className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-8 space-y-6">
                   <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm font-medium leading-relaxed">
                        By applying, your SIT progress and contact details will be shared with the employer for review.
                      </p>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-muted-foreground font-medium">Position:</span>
                         <span className="font-bold">{applyingTo.title}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-muted-foreground font-medium">Requirement:</span>
                         <span className="font-bold">{applyingTo.requiredHours} Hours</span>
                      </div>
                   </div>
                   <button
                    onClick={() => handleApply(applyingTo)}
                    className="w-full flex h-14 items-center justify-center rounded-xl bg-primary px-4 text-base font-black text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98]"
                   >
                    Submit Application <Send className="ml-2 h-5 w-5" />
                   </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
