"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, Briefcase, ArrowRight, Building2, Filter } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

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
  postedAt: Date;
  company: {
    name: string;
    logoUrl: string | null;
    industry: string;
  };
};

export default function PlacementsContent({ initialPostings }: { initialPostings: Placement[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");

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
        className="container mx-auto max-w-5xl"
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
              Query Registry
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
              <div className="space-y-4">
                {filteredPostings.map((post) => (
                  <motion.article 
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="group relative bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-8 md:p-10 rounded-sm hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
                  >
                    {/* Archival Reference Line */}
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none select-none overflow-hidden">
                      <span className="text-8xl font-black font-serif tracking-tighter">SIT</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 relative z-10">
                      
                      {/* Left: Metadata & Core Details */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                          <span className="text-[9px] font-bold text-slate-400 bg-slate-50 dark:bg-white/5 px-2 py-1 border border-slate-100 dark:border-white/5 rounded-sm tracking-widest uppercase">
                            DOC-ID: {post.id.slice(0, 8).toUpperCase()}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-slate-300" />
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary italic">
                            Published: {format(new Date(post.postedAt), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-serif mb-8">
                          <div className="p-2 bg-primary/5 rounded-full border border-primary/10">
                            <Building2 className="h-4 w-4 text-primary/60" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-slate-200 tracking-tight">{post.company.name}</span>
                              <span className="text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-sm border border-emerald-500/20 font-bold uppercase tracking-tighter">Verified</span>
                            </div>
                            <p className="text-xs text-slate-500 italic">{post.company.industry}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-white/5">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deployment</p>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-serif">
                              <MapPin className="h-3.5 w-3.5 text-primary/40" />
                              {post.location}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Environment</p>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-serif">
                              <Briefcase className="h-3.5 w-3.5 text-primary/40" />
                              {post.type.replace('_', '-')}
                            </div>
                          </div>
                          <div className="space-y-1 hidden md:block">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hours</p>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-serif">
                              <Clock className="h-3.5 w-3.5 text-primary/40" />
                              {post.requiredHours} Required
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Technical Requirements & Action */}
                      <div className="flex flex-col items-stretch md:items-end justify-between md:min-h-[220px] md:pl-10 md:border-l border-slate-100 dark:border-white/5 mt-6 md:mt-0">
                        <div className="mb-10">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 md:text-right">Technical Focus</p>
                          <div className="flex flex-wrap gap-2 md:justify-end">
                            {post.tags.slice(0, 4).map(tag => (
                              <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-white/5 px-2.5 py-1.5 rounded-sm border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-colors">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <Link 
                          href={`/login/student?redirect=/student/opportunities/${post.id}`} 
                          className="group/btn relative inline-flex items-center justify-center w-full md:w-auto px-10 py-4 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm overflow-hidden transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
                        >
                          <span className="relative z-10 flex items-center">
                            Initialize Application
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </span>
                          <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                        </Link>
                      </div>

                    </div>
                  </motion.article>
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
            <div className="flex flex-col md:items-end justify-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">EST. 1977</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 mt-1">OFFICIAL REPOSITORY</p>
            </div>
          </div>
        </motion.footer>

      </motion.div>
    </main>
  );
}
