"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Building2, 
  X, 
  Globe, 
  Facebook, 
  Instagram, 
  Image as ImageIcon,
  BadgeCheck,
  ClipboardCheck,
  User,
  Calendar,
  Bookmark,
  Link as LinkIcon,
  Send,
  ExternalLink,
  Tag
} from "lucide-react";

import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

type Placement = {
  id: string;
  title: string;
  description: string;
  requiredHours: number;
  location: string;
  type: 'ON_SITE' | 'REMOTE' | 'HYBRID';
  tags: string[];
  requirements: string[];
  responsibilities: string[];
  posterUrl: string | null;
  postedAt: Date;
  company: {
    name: string;
    logoUrl: string | null;
    industry: string;
    location: string | null;
    description: string | null;
    websiteUrl?: string | null;
    facebookUrl?: string | null;
    linkedinUrl?: string | null;
    twitterUrl?: string | null;
    instagramUrl?: string | null;
  };
};

function PlacementCard({ 
  post, 
  onShowPoster,
  isSaved,
  onToggleSave
}: { 
  post: Placement, 
  onShowPoster: (url: string) => void,
  isSaved: boolean,
  onToggleSave: (id: string) => void
}) {

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="group bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-500"
    >
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-white/5">
        {/* Left Column: Core Job Details */}
        <div className="flex-1 p-5 md:p-10 space-y-5">
          {/* Header Section */}
          <div className="flex gap-4 sm:gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-sm">
                {post.company.logoUrl ? (
                  <div className="relative w-full h-full p-2">
                    <Image 
                      src={post.company.logoUrl} 
                      alt={post.company.name} 
                      fill 
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <Building2 className="w-6 h-6 sm:w-10 sm:h-10 text-slate-400" strokeWidth={1.5} />
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-3xl font-bold text-slate-950 dark:text-white leading-tight tracking-tight mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">{post.company.name}</span>
                    <BadgeCheck className="h-4 w-4 text-white fill-[#7A0012]" />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                      {post.location}
                    </div>
                    <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                      {post.type.replace('_', '-')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed font-normal max-w-3xl">
            {post.description}
          </p>

          <div className="h-px bg-slate-100 dark:bg-white/5 w-full" />

          {/* Responsibilities & Qualifications */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                  <ClipboardCheck className="h-5 w-5 sm:h-6 sm:w-6 text-[#7A0012]" strokeWidth={1.5} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">Responsibilities</h4>
              </div>
              <div className="pl-6 sm:pl-12">
                <ul className="space-y-2.5">
                  {post.responsibilities.map((res, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7A0012] mt-2 shrink-0 opacity-80" />
                      <span className="text-sm sm:text-[15px] font-light text-slate-700 dark:text-slate-300 leading-relaxed">{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-[#7A0012]" strokeWidth={1.5} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">Qualifications</h4>
              </div>
              <div className="pl-6 sm:pl-12">
                <ul className="space-y-2.5">
                  {post.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7A0012] mt-2 shrink-0 opacity-80" />
                      <span className="text-sm sm:text-[15px] font-light text-slate-700 dark:text-slate-300 leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Metadata Bar Grounded - Skills restored to full width */}
          <div className="py-4 border-t border-slate-100 dark:border-white/5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                  <Tag className="h-5 w-5 sm:h-6 sm:w-6 text-[#7A0012]" strokeWidth={1.5} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">Skills</h4>
              </div>
              <div className="pl-6 sm:pl-12">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-slate-50 dark:bg-white/5 text-xs sm:text-[15px] font-light text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-white/10 rounded-full hover:border-[#7A0012]/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Institutional Sidebar */}
        <div className="w-full lg:w-80 p-5 sm:p-6 bg-slate-50/20 dark:bg-white/[0.01] flex flex-col dark:divide-white/5">
          <div className="space-y-4 flex-1">
            {/* Status Section */}
            <div className="flex gap-2.5 items-center">
               <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0">
                 <Send className="h-4.5 w-4.5 text-[#7A0012]" />
               </div>
               <div>
                 <h4 className="text-sm font-bold text-foreground leading-tight">Actively hiring</h4>
                 <p className="text-[11px] font-light text-muted-foreground leading-tight">Be one of the first applicants.</p>
               </div>
            </div>

            <div className="h-px bg-border w-full" />

            {/* Quick Facts */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:space-y-3 lg:gap-0">
                {[
                  { icon: Clock, label: `${post.requiredHours}H requirement`, sub: "Estimated commitment" },
                  { icon: Building2, label: "Work setup", sub: post.type.replace('_', '-') },
                  { icon: MapPin, label: "Location", sub: post.location },
                  { icon: Calendar, label: "Posted", sub: format(new Date(post.postedAt), 'MMMM dd') },
                ].map((fact, idx) => (
                  <div key={idx} className="flex gap-2.5 items-center">
                    <div className="w-8 h-8 rounded-lg bg-slate-100/50 dark:bg-white/5 flex items-center justify-center shrink-0">
                      <fact.icon className="h-4.5 w-4.5 text-slate-700 dark:text-slate-300" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-[13px] font-bold text-slate-950 dark:text-white leading-tight mb-0.5 truncate">{fact.label}</h5>
                      <p className="text-[11px] font-light text-slate-600 dark:text-slate-400 leading-tight truncate">{fact.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {post.posterUrl && (
                <button 
                  onClick={() => onShowPoster(post.posterUrl!)}
                  className="w-full py-2.5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-xl text-xs font-bold text-[#7A0012] flex items-center justify-center gap-2 hover:bg-red-100 transition-all mt-1"
                >
                  <ImageIcon className="h-4 w-4" />
                  View Visual Poster
                </button>
              )}
            </div>

            <div className="h-px bg-slate-100 dark:bg-white/10 w-full" />

            {/* Institutional Profile restored */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-slate-950 uppercase tracking-[0.2em]">Company profile</h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:space-y-4 lg:gap-0">
                 {[
                   { icon: Building2, label: "Industry", value: post.company.industry },
                   { icon: MapPin, label: "Headquarters", value: post.company.location?.split('\n').filter(Boolean).join(', ') },
                   { icon: Globe, label: "Registry Web", value: post.company.websiteUrl ? post.company.websiteUrl.replace(/^https?:\/\//, '') : "visit-site.com", isLink: true, url: post.company.websiteUrl },
                 ].map((info, idx) => (
                   <div key={idx} className="flex gap-2.5 items-center">
                     <div className="w-8 h-8 rounded-lg bg-slate-100/50 dark:bg-white/5 flex items-center justify-center shrink-0">
                       <info.icon className="h-4.5 w-4.5 text-slate-700 dark:text-slate-300" strokeWidth={1.5} />
                     </div>
                     <div className="min-w-0 flex-1">
                       <p className="text-[10px] font-bold text-slate-950 dark:text-slate-200 uppercase tracking-widest leading-none mb-1.5">{info.label}</p>
                       {info.isLink ? (
                         <a href={info.url || "#"} target="_blank" rel="noopener noreferrer" className="text-[13px] font-light text-[#7A0012] flex items-center gap-1 truncate transition-colors hover:opacity-80">
                           {info.value}
                           <ExternalLink className="h-3 w-3 shrink-0" />
                         </a>
                       ) : (
                         <p className="text-[13px] font-light text-slate-700 dark:text-slate-300 truncate tracking-tight">{info.value}</p>
                       )}
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50/30 dark:bg-white/[0.01] border-t border-slate-200/60 dark:border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onToggleSave(post.id)}
              className={cn(
                "h-12 w-12 rounded-xl border flex items-center justify-center transition-all active:scale-90 shrink-0",
                isSaved 
                  ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-[#7A0012]" 
                  : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:border-slate-300"
              )}
            >
              <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />
            </button>

            <div className="flex items-center gap-3 ml-2 sm:ml-4">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 hidden sm:inline">Share:</span>
              <div className="flex items-center gap-2">
                {[
                  { icon: LinkIcon, action: () => navigator.clipboard.writeText(window.location.origin + '/placements?id=' + post.id) },
                  { icon: Facebook, action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/placements?id=' + post.id)}`, '_blank') },
                  { icon: Instagram, action: () => {
                    navigator.clipboard.writeText(window.location.origin + '/placements?id=' + post.id);
                    alert("Link copied for Instagram.");
                  }}
                ].map((s, i) => (
                  <button 
                    key={i}
                    onClick={s.action}
                    className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#7A0012] hover:border-[#7A0012] transition-all"
                  >
                    <s.icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full sm:w-auto">
          <a 
            href={`/login/student?redirect=${encodeURIComponent('/student/opportunities?apply=' + post.id)}`} 
            className="group/btn relative w-full sm:w-64 h-12 bg-[#7A0012] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-3 overflow-hidden transition-all active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest">
              APPLY NOW
              <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-slate-950 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function PlacementsList({ initialPostings }: { initialPostings: Placement[] }) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const toggleSave = (id: string) => {
    setSavedJobIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const postings = initialPostings as Placement[];

  const filteredPostings = postings.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || post.type === filterType;
    const matchesSaved = !showSavedOnly || savedJobIds.has(post.id);
    return matchesSearch && matchesType && matchesSaved;
  });

  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-28 sm:pt-48 pb-12 sm:pb-24 px-4 sm:px-6 transition-colors duration-300">
      <motion.div 
        className="container mx-auto max-w-6xl"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Archival Header */}
        <motion.header className="mb-8 sm:mb-16 border-b border-slate-200 dark:border-white/10 pb-8 sm:pb-16" variants={fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-primary/40" />
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-[10px]">
              SIT STRATEGIC OFFICE • DEPLOYMENT REGISTRY
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-slate-900 dark:text-white mb-4 sm:mb-8 leading-tight">
            Approved Industrial Placements
          </h1>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 font-serif leading-relaxed max-w-3xl italic">
            Official registry of active training opportunities. Opportunities listed are verified by the Institutional Partnership Committee. To proceed with an application, authenticate via the Student Portal.
          </p>
        </motion.header>

        {/* Controls Overlay Card */}
        <motion.section 
          className="mb-8 sm:mb-12 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 shadow-sm"
          variants={fadeInUp}
        >
          <div className="flex flex-col space-y-4">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Explore Opportunities
            </label>
            
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#7A0012] transition-colors" />
                <input 
                  type="text"
                  placeholder="Search by role, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7A0012]/5 focus:border-[#7A0012]/50 transition-all shadow-none"
                />
              </div>

              {/* Action Group */}
              <div className="flex items-center gap-3 w-full lg:w-auto min-w-0">
                <button 
                  onClick={() => setShowSavedOnly(!showSavedOnly)}
                  className={cn(
                    "h-[52px] w-[52px] shrink-0 flex items-center justify-center rounded-xl border transition-all active:scale-95",
                    showSavedOnly 
                      ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-[#7A0012]" 
                      : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 hover:border-slate-300"
                  )}
                >
                  <Bookmark className={cn("h-5 w-5", showSavedOnly && "fill-current")} />
                </button>

                <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-1 hidden lg:block" />

                <div className="flex items-center gap-1.5 bg-slate-50/50 dark:bg-white/5 p-1.5 rounded-xl border border-slate-200 dark:border-white/10 overflow-x-auto no-scrollbar scrollbar-none flex-1 lg:flex-initial">
                  {['ALL', 'ON_SITE', 'HYBRID', 'REMOTE'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={cn(
                        "px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg whitespace-nowrap transition-all active:scale-95",
                        filterType === type 
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm" 
                          : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-white/10"
                      )}
                    >
                      {type.replace('_', '-')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Listings */}
        <motion.section variants={fadeInUp} className="min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredPostings.length > 0 ? (
              <div className="space-y-10">
                {filteredPostings.map((post) => (
                  <PlacementCard 
                    key={post.id} 
                    post={post} 
                    onShowPoster={setSelectedPoster}
                    isSaved={savedJobIds.has(post.id)}
                    onToggleSave={toggleSave}
                  />
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center border border-dashed border-slate-300 dark:border-white/10 rounded-sm bg-slate-50 dark:bg-white/[0.01]"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-white/5 mb-6 text-slate-400">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-serif font-medium text-slate-900 dark:text-white mb-2">No Placements Found</h3>
                <p className="text-slate-500 font-serif max-w-md mx-auto">
                  There are no active industrial placements matching your current query parameters in the registry.
                </p>
                <button 
                  onClick={() => { setSearchTerm(""); setFilterType("ALL"); }}
                  className="mt-8 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
        
        {/* Institutional Footer */}
        <motion.footer 
          className="mt-32 pt-16 border-t border-slate-900/10 dark:border-white/10"
          variants={fadeInUp}
        >
          <div className="grid md:grid-cols-2 gap-12 text-sm text-slate-500 dark:text-slate-400 font-serif">
            <div>
              <h5 className="text-slate-900 dark:text-white font-medium mb-4 uppercase tracking-widest text-[10px]">Registry Protocol</h5>
              <p className="max-w-md leading-relaxed text-xs">
                All placements listed are vetted by the TUPV Strategic Office. Students must formalize their application through the designated Student Portal. Direct contact with partners without portal authorization is prohibited.
              </p>
            </div>
          </div>
        </motion.footer>

        {/* Poster Modal */}
        <AnimatePresence>
          {selectedPoster && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPoster(null)}
              className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image 
                  src={selectedPoster} 
                  alt="Job Poster" 
                  width={800}
                  height={1200}
                  className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm border border-white/10"
                  unoptimized
                />
                
                <button 
                  onClick={() => setSelectedPoster(null)}
                  className="fixed top-6 right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 z-[210] border border-white/20"
                >
                  <X className="h-6 w-6" />
                </button>

                <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-[9px] font-bold uppercase tracking-[0.3em] pointer-events-none">
                  Registry Document View
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

export default function PlacementsContent({ initialPostings }: { initialPostings: Placement[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafaf9] dark:bg-background pt-48 flex items-center justify-center font-serif italic text-slate-400">Initializing Registry Terminal...</div>}>
      <PlacementsList initialPostings={initialPostings} />
    </Suspense>
  );
}
