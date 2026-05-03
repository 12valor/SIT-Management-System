"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, ArrowRight, Building2, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
  requirements: string[];
  responsibilities: string[];
  posterUrl: string | null;
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
              <div className="space-y-4">
                {filteredPostings.map((post) => (
                  <motion.article 
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-xl hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Company Logo Section */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center overflow-hidden">
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
                            <Building2 className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
                          )}
                        </div>
                        {post.posterUrl && (
                          <button 
                            onClick={() => setSelectedPoster(post.posterUrl)}
                            className="mt-4 w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                          >
                            View Poster
                          </button>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight mb-1">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <span className="font-semibold hover:underline cursor-pointer">{post.company.name}</span>
                              <span className="text-slate-300 dark:text-slate-700">•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {post.location}
                              </span>
                              <span className="text-slate-300 dark:text-slate-700">•</span>
                              <span className="text-emerald-600 dark:text-emerald-400 font-medium">{post.type.replace('_', '-')}</span>
                            </div>
                          </div>
                          
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-full border border-slate-100 dark:border-white/5 h-fit">
                            {format(new Date(post.postedAt), 'MMM dd')}
                          </span>
                        </div>

                        {/* Description Snippet */}
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-serif">
                          {post.description}
                        </p>

                        {(post.requirements.length > 0 || post.responsibilities.length > 0) && (
                          <div className="grid md:grid-cols-2 gap-8 mb-8 p-6 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                            {post.responsibilities.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Strategic Responsibilities</h4>
                                <ul className="space-y-2">
                                  {post.responsibilities.map((res, i) => (
                                    <li key={i} className="flex gap-3 text-[11px] text-slate-600 dark:text-slate-400 font-serif leading-relaxed">
                                      <span className="text-primary mt-1">•</span>
                                      {res}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {post.requirements.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Candidate Prerequisites</h4>
                                <ul className="space-y-2">
                                  {post.requirements.map((req, i) => (
                                    <li key={i} className="flex gap-3 text-[11px] text-slate-600 dark:text-slate-400 font-serif leading-relaxed">
                                      <span className="text-slate-300 dark:text-slate-700 mt-1">•</span>
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Footer / Meta Tags */}
                        <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-100 dark:border-white/5">
                          <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-white/5 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-tight border border-slate-100 dark:border-white/10">
                              <Clock className="h-3 w-3 text-primary/60" />
                              {post.requiredHours}h Req.
                            </div>
                            {post.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="px-3 py-1.5 bg-primary/5 dark:bg-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-tight border border-primary/10">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <Link 
                            href={`/login/student?redirect=/student/opportunities/${post.id}`} 
                            className="group/btn relative inline-flex items-center justify-center px-8 py-3 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
                          >
                            <span className="relative z-10 flex items-center">
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                          </Link>
                        </div>
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
              {/* Institutional markers removed per request */}
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
                <img 
                  src={selectedPoster} 
                  alt="Job Poster" 
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
                <button 
                  onClick={() => setSelectedPoster(null)}
                  className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                >
                  Close Archive <ArrowRight className="h-4 w-4 rotate-45" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
