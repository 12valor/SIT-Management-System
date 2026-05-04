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
      className="group bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-white/5">
        {/* Left Column: Core Job Details */}
        <div className="flex-1 p-6 md:p-8 space-y-6">
          {/* Header Section */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-sm">
                {post.company.logoUrl ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={post.company.logoUrl} 
                      alt={post.company.name} 
                      fill 
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <Building2 className="w-10 h-10 text-slate-300" strokeWidth={1.5} />
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                  {post.title}
                </h3>
                <span className="shrink-0 px-2 py-1 bg-primary/5 dark:bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-md border border-primary/10">
                  {format(new Date(post.postedAt), 'MMM dd')}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-slate-900 dark:text-white uppercase tracking-wider font-bold">
                  {post.company.name}
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 fill-blue-500/10" />
                </div>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-serif">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {post.location}
                </div>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-serif">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  {post.type.replace('_', '-')}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-serif max-w-2xl italic">
            {post.description}
          </p>

          <div className="h-px bg-slate-100 dark:bg-white/5 w-full" />

          {/* Responsibilities & Qualifications */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-primary/60" />
                <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Strategic Responsibilities</h4>
              </div>
              <ul className="space-y-2">
                {post.responsibilities.slice(0, 3).map((res, i) => (
                  <li key={i} className="flex gap-3 text-[11px] text-slate-600 dark:text-slate-400 font-serif leading-relaxed">
                    <span className="text-primary font-bold">•</span>
                    {res}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />
                <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Candidate Prerequisites</h4>
              </div>
              <ul className="space-y-2">
                {post.requirements.slice(0, 3).map((req, i) => (
                  <li key={i} className="flex gap-3 text-[11px] text-slate-600 dark:text-slate-400 font-serif leading-relaxed">
                    <span className="text-slate-300 dark:text-slate-600 font-bold">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills & Compensation Bar */}
          <div className="bg-slate-50/50 dark:bg-white/5 rounded-xl p-4 flex flex-wrap items-center justify-between gap-6 border border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-lg bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center">
                 <Calendar className="h-5 w-5 text-primary" />
               </div>
               <div>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Compensation</p>
                 <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Internship / OJT</p>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mr-2">Core Skills</span>
              {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight">
                  {tag}
                </span>
              ))}
              {post.posterUrl && (
                <button 
                  onClick={() => onShowPoster(post.posterUrl!)}
                  className="px-2 py-1 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded text-[9px] font-black text-primary uppercase tracking-widest hover:bg-primary/10 transition-all"
                >
                  Visual Poster
                </button>
              )}
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="flex flex-wrap items-center justify-between pt-4 gap-6">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={cn(
                  "h-10 px-4 rounded-lg border transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]",
                  isSaved 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                    : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-primary/50"
                )}
              >
                <Bookmark className={cn("h-3.5 w-3.5", isSaved && "fill-current")} />
                {isSaved ? "Saved" : "Save job"}
              </button>

              <div className="flex items-center gap-1.5 ml-4">
                <span className="text-[11px] font-bold text-slate-400 font-sans mr-2">Share:</span>
                <button 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/placements?id=' + post.id)}`, '_blank')}
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
                >
                  <Facebook className="h-3 w-3.5" />
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + '/placements?id=' + post.id);
                    alert("Link copied! You can now share it on Instagram.");
                  }}
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
                >
                  <Instagram className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + '/placements?id=' + post.id);
                  }}
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <button className="flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-primary transition-all font-sans">
               Report registry entry
               <Flag className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Right Column: Institutional Sidebar */}
        <div className="w-full lg:w-72 p-5 bg-slate-50/30 dark:bg-white/[0.01] flex flex-col">
          <div className="space-y-6 flex-1">
            {/* Status Section - Integrated, not floating */}
            <div className="flex gap-4 p-1">
               <div className="w-8 h-8 rounded bg-primary/5 dark:bg-primary/10 flex items-center justify-center shrink-0 border border-primary/10">
                 <Send className="h-3.5 w-3.5 text-primary" />
               </div>
               <div>
                 <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Registry Status</h4>
                 <p className="text-[10px] text-primary uppercase tracking-[0.2em] mt-0.5 font-black">Actively Hiring</p>
               </div>
            </div>

            {/* Quick Facts */}
            <div className="space-y-4 px-1">
              {[
                { icon: Clock, label: `${post.requiredHours}H total`, sub: "SIT Requirement" },
                { icon: Building2, label: "Work setup", sub: post.type.replace('_', '-') },
                { icon: MapPin, label: "Location", sub: post.location },
                { icon: Calendar, label: "Registry Date", sub: format(new Date(post.postedAt), 'MMMM dd') },
              ].map((fact, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200/30 dark:border-white/5">
                    <fact.icon className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-tight">{fact.label}</h5>
                    <p className="text-[10px] text-slate-500 font-serif">{fact.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-slate-100 dark:bg-white/10 w-full" />

            {/* Company Mini Profile */}
            <div className="space-y-5 px-1">
              <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Institutional Profile</h4>
              
              <div className="space-y-4">
                 {[
                   { icon: Building2, label: "Industry", value: post.company.industry },
                   { icon: MapPin, label: "Headquarters", value: post.company.location },
                   { icon: Globe, label: "Registry Web", value: post.company.websiteUrl ? post.company.websiteUrl.replace(/^https?:\/\//, '') : "visit-site.com", isLink: true, url: post.company.websiteUrl },
                 ].map((info, idx) => (
                   <div key={idx} className="flex gap-4">
                     <info.icon className="h-3.5 w-3.5 text-slate-300 shrink-0 mt-0.5" />
                     <div className="min-w-0 flex-1">
                       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{info.label}</p>
                       {info.isLink ? (
                         <a href={info.url || "#"} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 truncate">
                           {info.value}
                           <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                         </a>
                       ) : (
                         <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate">{info.value}</p>
                       )}
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          <Link 
            href={`/login/student?redirect=/student/opportunities/${post.id}`} 
            className="group/btn relative w-full h-12 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-lg flex items-center justify-center gap-3 overflow-hidden transition-all active:scale-[0.98] shadow-lg shadow-primary/20 mt-8"
          >
            <span className="relative z-10 flex items-center gap-2">
              Apply
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
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
