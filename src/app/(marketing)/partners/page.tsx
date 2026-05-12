"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Building2, MapPin, ArrowRight, Search, Users } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "boneyard-js/react";
import { motion, AnimatePresence } from "framer-motion";
import { getPublicPartners } from "@/app/(portals)/coordinator/companies/actions";

type Partner = {
  id: string;
  name: string;
  industry: string;
  location: string | null;
  slots: number;
  description: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
};

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPartners = useCallback(async () => {
    try {
      const data = await getPublicPartners();
      setPartners(data as Partner[]);
    } catch (error) {
      console.error("Failed to load partners:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPartners();
  }, [loadPartners]);

  const filteredPartners = partners.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 pt-32 md:pt-40 pb-32 transition-colors duration-500 overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-slate-100/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        
        {/* Header Section (Always Visible) */}
        <div className={`flex flex-col items-center text-center max-w-3xl mx-auto ${filteredPartners.length <= 2 && !isLoading ? 'mb-16' : 'mb-24'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-primary font-medium tracking-widest text-xs uppercase">
                Our Community
              </span>
              <div className="h-px w-8 bg-primary/40" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6">
              Industry Partners
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-serif leading-relaxed">
              Connecting TUPV students with leading organizations for hands-on industrial training and professional career growth.
            </p>
          </motion.div>

          {/* Pill-shaped Search (Always Visible) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl mt-12 relative group"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center w-full h-16 bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 rounded-full shadow-lg shadow-black/5 overflow-hidden focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
              <Search className="absolute left-6 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Search by company or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-transparent pl-16 pr-6 text-slate-700 dark:text-slate-200 font-medium placeholder:text-slate-400 outline-none"
              />
            </div>
          </motion.div>
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-sm text-slate-500 font-medium"
            >
              {partners.length} verified {partners.length === 1 ? 'partner' : 'partners'} currently active
            </motion.div>
          )}
        </div>

        {/* Dynamic Content with Skeleton Card Fallback */}
        <Skeleton 
          name="partners-grid"
          loading={isLoading}
          animate="shimmer"
          stagger={60}
          transition={400}
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-32 w-full bg-slate-100 dark:bg-white/5" />
                  <div className="px-6 pb-6 flex-1 flex flex-col relative pt-14">
                    <div className="absolute -top-12 left-6 h-24 w-24 rounded-2xl bg-white dark:bg-[#0f0f0f] border-4 border-white dark:border-[#0f0f0f] shadow-md" />
                    <div className="space-y-3">
                      <div className="h-6 w-3/4 bg-slate-100 dark:bg-white/5 rounded" />
                      <div className="h-5 w-24 bg-slate-50 dark:bg-white/5 rounded-md" />
                    </div>
                    <div className="mt-8 space-y-2 flex-1">
                      <div className="h-4 w-full bg-slate-50/50 dark:bg-white/5 rounded" />
                      <div className="h-4 w-full bg-slate-50/50 dark:bg-white/5 rounded" />
                      <div className="h-4 w-2/3 bg-slate-50/50 dark:bg-white/5 rounded" />
                    </div>
                    <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                      <div className="space-y-4 flex-1">
                        <div className="space-y-2">
                          <div className="h-3 w-20 bg-slate-100 dark:bg-white/5 rounded" />
                          <div className="h-3 w-32 bg-slate-50 dark:bg-white/5 rounded" />
                        </div>
                        <div className="h-3 w-24 bg-slate-100 dark:bg-white/5 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          {/* Partners Grid */}
          <div className={`grid gap-8 ${
            filteredPartners.length === 1 
              ? "grid-cols-1 max-w-2xl mx-auto" 
              : filteredPartners.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}>
            <AnimatePresence mode="popLayout">
              {filteredPartners.length > 0 ? (
                filteredPartners.map((partner, i) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    key={partner.id}
                    className="group flex flex-col bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 active:scale-[0.98]"
                  >
                    {/* Banner */}
                    <div className="h-32 w-full relative bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                      {partner.bannerUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={partner.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-white/5 dark:to-white/10" />
                      )}
                    </div>
                    
                    {/* Profile Body */}
                    <div className="px-6 pb-6 flex-1 flex flex-col relative pt-14">
                      {/* Logo (Overlapping) */}
                      <div className="absolute -top-12 left-6 h-24 w-24 rounded-2xl bg-white dark:bg-[#0f0f0f] border-4 border-white dark:border-[#0f0f0f] shadow-md flex items-center justify-center overflow-hidden">
                        {partner.logoUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={partner.logoUrl} alt={partner.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                        )}
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="font-serif font-medium text-slate-900 dark:text-white text-xl leading-tight truncate group-hover:text-primary transition-colors">
                          {partner.name}
                        </h3>
                        <p className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-white/5 rounded-md text-[10px] font-semibold text-slate-600 dark:text-slate-300 mt-2.5 uppercase tracking-wider truncate">
                          {partner.industry}
                        </p>
                      </div>

                      <div className="flex-1 mt-6">
                        <p className="text-slate-600 dark:text-slate-400 font-serif italic leading-relaxed text-sm line-clamp-3">
                          &quot;{partner.description || "Partner of Technological University of the Philippines Visayas for the SIT program."}&quot;
                        </p>
                      </div>

                      <footer className="mt-8 pt-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-sm">
                        <div className="flex flex-col gap-3 text-slate-500 dark:text-slate-400">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-primary/70" />
                              <span className="font-bold text-[10px] uppercase tracking-wider">Operational Sites</span>
                            </div>
                            <div className="pl-5 space-y-1.5">
                              {partner.location?.split('\n').filter(l => l.trim() !== '').slice(0, 3).map((loc, i) => (
                                <p key={i} className="text-xs font-serif italic text-slate-600 dark:text-slate-400 leading-tight">
                                  {loc}
                                </p>
                              ))}
                              {(partner.location?.split('\n').filter(l => l.trim() !== '').length ?? 0) > 3 && (
                                <p className="text-[10px] font-bold text-primary/50 uppercase tracking-tighter">
                                  + {(partner.location?.split('\n').filter(l => l.trim() !== '').length ?? 0) - 3} additional branches
                                </p>
                              )}
                              {(!partner.location || partner.location.trim() === '') && (
                                <p className="text-xs font-serif italic text-slate-400">Institutional site data pending.</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-primary/70" />
                            <span className="font-medium text-xs">{partner.slots} Openings</span>
                          </div>
                        </div>
                        <Link 
                          href={`/placements?search=${encodeURIComponent(partner.name)}`}
                          className="flex items-center gap-2 text-xs font-bold text-primary hover:underline group/link"
                        >
                          View Full Post
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </footer>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-24 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-slate-900 dark:text-white mb-2">No partners found</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md">
                    We couldn&apos;t find any partners matching &quot;{searchQuery}&quot;. Try adjusting your search terms.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Skeleton>

        {/* Welcoming Footer CTA (Always Visible) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`max-w-4xl mx-auto ${filteredPartners.length <= 2 && !isLoading ? 'mt-16' : 'mt-32'}`}
        >
          <div className="relative bg-white dark:bg-[#0f0f0f] rounded-[2.5rem] p-12 md:p-16 text-center border border-slate-200 dark:border-white/5 shadow-2xl shadow-black/5 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 dark:text-white mb-6">
                Become an Industry Partner
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-serif">
                Join our network of industry leaders to mentor TUPV students and find talented trainees for your technical teams.
              </p>
              
              <Link
                href="#"
                className="group relative inline-flex items-center justify-center h-14 px-10 bg-primary text-white font-medium rounded-full overflow-hidden transition-transform active:scale-95 shadow-lg shadow-primary/20"
              >
                <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
                  Apply to Join
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
