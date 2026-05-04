"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Building2, 
  Filter, 
  X, 
  Globe, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Image as ImageIcon,
  CheckCircle2,
  ClipboardCheck,
  User,
  Calendar,
  Bookmark,
  Link as LinkIcon,
  MoreHorizontal,
  Flag,
  Send,
  Users,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
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
    description: string | null;
    websiteUrl?: string | null;
    facebookUrl?: string | null;
    linkedinUrl?: string | null;
    twitterUrl?: string | null;
    instagramUrl?: string | null;
  };
};

function PlacementCard({ post, onShowPoster }: { post: Placement, onShowPoster: (url: string) => void }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="group bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500"
    >
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-white/5">
        {/* Left Column: Core Job Details */}
        <div className="flex-1 p-6 md:p-10 space-y-8">
          {/* Header Section */}
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-sm">
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
                  <Building2 className="w-10 h-10 text-slate-300" strokeWidth={1.5} />
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-medium text-slate-700 dark:text-slate-300">{post.company.name}</span>
                    <CheckCircle2 className="h-4 w-4 text-[#008A44] fill-[#008A44]/10" />
                  </div>
                  <div className="flex items-center gap-4 text-sm font-normal text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {post.location}
                    </div>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-slate-400" />
                      {post.type.replace('_', '-')}
                    </div>
                  </div>
                </div>
                <span className="shrink-0 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-[#008A44] text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-100 dark:border-emerald-500/20">
                  {format(new Date(post.postedAt), 'MMM dd')}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed font-normal max-w-3xl">
            {post.description}
          </p>

          <div className="h-px bg-slate-100 dark:bg-white/5 w-full" />

          {/* Responsibilities & Qualifications */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                  <ClipboardCheck className="h-4 w-4 text-[#008A44]" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Responsibilities</h4>
              </div>
              <ul className="space-y-3">
                {post.responsibilities.slice(0, 3).map((res, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="text-[#008A44] font-bold mt-1.5 w-1.5 h-1.5 rounded-full bg-[#008A44] shrink-0" />
                    {res}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-[#008A44]" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Qualifications</h4>
              </div>
              <ul className="space-y-3">
                {post.requirements.slice(0, 3).map((req, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="text-emerald-300 dark:text-emerald-500 font-bold mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Metadata Bar */}
          <div className="bg-white dark:bg-white/5 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-6 border border-slate-100 dark:border-white/10 shadow-sm">
            <div className="flex items-center gap-5 pr-8 border-r border-slate-100 dark:border-white/10">
               <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                 <Calendar className="h-6 w-6 text-[#008A44]" />
               </div>
               <div>
                 <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Compensation</p>
                 <p className="text-base font-bold text-slate-900 dark:text-white">Internship / OJT</p>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 flex-1">
              <span className="text-sm font-medium text-slate-400 mr-2">Skills</span>
              {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-full text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
                  {tag}
                </span>
              ))}
              {post.posterUrl && (
                <button 
                  onClick={() => onShowPoster(post.posterUrl!)}
                  className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-full text-xs font-bold text-[#008A44] tracking-tight hover:bg-emerald-100 transition-all"
                >
                  Visual Poster
                </button>
              )}
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="flex flex-wrap items-center justify-between pt-6 gap-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={cn(
                  "w-12 h-12 rounded-xl border transition-all flex items-center justify-center",
                  isSaved 
                    ? "bg-emerald-50 text-[#008A44] border-[#008A44]/20" 
                    : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:border-emerald-500/50"
                )}
              >
                <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />
              </button>

              <div className="flex items-center gap-4 ml-6">
                <span className="text-sm font-medium text-slate-400">Share:</span>
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
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-[#008A44] hover:border-[#008A44] transition-all"
                    >
                      <s.icon className="h-4 w-4" />
                    </button>
                  ))}
                  <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-sm font-bold text-[#008A44] hover:opacity-80 transition-all">
               Report job
               <Flag className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Institutional Sidebar */}
        <div className="w-full lg:w-80 p-8 bg-slate-50/20 dark:bg-white/[0.01] flex flex-col border-l border-slate-100 dark:border-white/5">
          <div className="space-y-8 flex-1">
            {/* Status Section */}
            <div className="flex gap-4 items-center">
               <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                 <Send className="h-5 w-5 text-[#008A44]" />
               </div>
               <div>
                 <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Actively hiring</h4>
                 <p className="text-xs text-slate-500 leading-tight">Be one of the first applicants.</p>
               </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-white/10 w-full" />

            {/* Quick Facts */}
            <div className="space-y-6">
              {[
                { icon: Clock, label: `${post.requiredHours}H requirement`, sub: "Estimated commitment" },
                { icon: Building2, label: "Work setup", sub: post.type.replace('_', '-') },
                { icon: MapPin, label: "Location", sub: post.location },
                { icon: Calendar, label: "Posted", sub: format(new Date(post.postedAt), 'MMMM dd') },
              ].map((fact, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
                    <fact.icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">{fact.label}</h5>
                    <p className="text-xs text-slate-500">{fact.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link 
            href={`/login/student?redirect=/student/opportunities/${post.id}`} 
            className="group/btn relative w-full h-14 bg-[#008A44] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-3 overflow-hidden transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20 mt-10"
          >
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest">
              APPLY NOW
              <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-[#006833] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function PlacementsContent({ initialPostings }: { initialPostings: Placement[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  const postings = initialPostings as Placement[];

  const filteredPostings = postings.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || post.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-48 pb-24 px-6 transition-colors duration-300">
      <motion.div 
        className="container mx-auto max-w-6xl"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Archival Header */}
        <motion.header className="mb-16 border-b border-slate-200 dark:border-white/10 pb-16" variants={fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-primary/40" />
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-[10px]">
              SIT STRATEGIC OFFICE • DEPLOYMENT REGISTRY
            </span>
          </div>
          <h1 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-8 leading-tight">
            Approved Industrial Placements
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-serif leading-relaxed max-w-3xl italic">
            Official registry of active training opportunities. Opportunities listed are verified by the Institutional Partnership Committee. To proceed with an application, authenticate via the Student Portal.
          </p>
        </motion.header>

        {/* Controls */}
        <motion.section className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-end" variants={fadeInUp}>
          <div className="w-full md:w-96">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
              Explore Opportunities
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="Search by role, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 rounded-sm py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <Filter className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
            {['ALL', 'ON_SITE', 'HYBRID', 'REMOTE'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm whitespace-nowrap transition-all active:scale-95 ${
                  filterType === type 
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                    : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-slate-400"
                }`}
              >
                {type.replace('_', '-')}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Listings */}
        <motion.section variants={fadeInUp} className="min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredPostings.length > 0 ? (
              <div className="space-y-10">
                {filteredPostings.map((post) => (
                  <PlacementCard key={post.id} post={post} onShowPoster={setSelectedPoster} />
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
