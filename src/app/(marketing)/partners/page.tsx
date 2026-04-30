"use client";

import React, { useState } from "react";
import { Building2, MapPin, ArrowRight, Search, Users } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "boneyard-js/react";
import { motion, AnimatePresence } from "framer-motion";

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const partners = [
    { 
      id: "P-001", 
      name: "Intel Corporation", 
      industry: "Semiconductors", 
      loc: "Cavite", 
      slots: 15, 
      status: "Active",
      description: "Leading global manufacturer of semiconductor chips and microprocessor technologies for computing systems."
    },
    { 
      id: "P-002", 
      name: "Accenture Philippines", 
      industry: "Technology Services", 
      loc: "Bacolod", 
      slots: 25, 
      status: "Vetted",
      description: "Professional services company specializing in digital, cloud, and security solutions for global enterprises."
    },
    { 
      id: "P-003", 
      name: "Globe Telecom", 
      industry: "Telecommunications", 
      loc: "National", 
      slots: 10, 
      status: "Active",
      description: "Major telecommunications provider offering wireless and broadband services across the Philippine archipelago."
    },
    { 
      id: "P-004", 
      name: "Meralco", 
      industry: "Energy", 
      loc: "NCR", 
      slots: 8, 
      status: "Vetted",
      description: "The Philippines' largest electric power distribution company serving the National Capital Region and surrounding provinces."
    },
    { 
      id: "P-005", 
      name: "Petron Corporation", 
      industry: "Energy / Oil", 
      loc: "Bataan", 
      slots: 5, 
      status: "Active",
      description: "Leading oil refining and marketing company providing essential energy products for industrial and consumer use."
    },
    { 
      id: "P-006", 
      name: "Smart Communications", 
      industry: "Telecommunications", 
      loc: "National", 
      slots: 12, 
      status: "Active",
      description: "Wholly-owned wireless communications and digital services subsidiary of PLDT, focused on 5G and fiber-tech."
    },
  ];

  const filteredPartners = partners.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Skeleton 
      name="partners-page"
      loading={false}
      animate="shimmer"
      stagger={60}
      transition={400}
    >
      <main className="min-h-screen bg-[#fafaf9] dark:bg-[#050505] text-slate-900 dark:text-slate-100 pt-32 md:pt-40 pb-32 transition-colors duration-500 overflow-hidden">
        
        {/* Decorative ambient background */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-24 max-w-3xl mx-auto">
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
                Meet the organizations collaborating with TUPV to shape the next generation of technical leaders through supervised industrial training.
              </p>
            </motion.div>

            {/* Pill-shaped Search */}
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
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    className="group flex flex-col bg-white dark:bg-[#0f0f0f] border border-slate-100 dark:border-white/5 rounded-3xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden"
                  >
                    {/* Soft background hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <header className="flex items-center gap-5 mb-8">
                        <div className="w-16 h-16 shrink-0 rounded-full bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                          <Building2 className="w-7 h-7 text-slate-400 group-hover:text-primary transition-colors duration-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif font-medium text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                            {partner.name}
                          </h3>
                          <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full">
                            {partner.industry}
                          </span>
                        </div>
                      </header>

                      <div className="flex-1">
                        <p className="text-slate-600 dark:text-slate-400 font-serif italic leading-relaxed text-lg mb-8">
                          "{partner.description}"
                        </p>
                      </div>

                      <footer className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-primary/70" />
                            <span className="font-medium">{partner.loc}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-primary/70" />
                            <span className="font-medium">{partner.slots} Openings</span>
                          </div>
                        </div>
                        
                        <Link 
                          href="#" 
                          className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                          aria-label={`View details for ${partner.name}`}
                        >
                          <ArrowRight className="w-4 h-4" />
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
                    We couldn't find any partners matching "{searchQuery}". Try adjusting your search terms.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Welcoming Footer CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-32 max-w-4xl mx-auto"
          >
            <div className="relative bg-white dark:bg-[#0f0f0f] rounded-[2.5rem] p-12 md:p-16 text-center border border-slate-200 dark:border-white/5 shadow-2xl shadow-black/5 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 dark:text-white mb-6">
                  Become an Industry Partner
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-serif">
                  Join our network of forward-thinking organizations. Together, we can shape the next generation of technological leaders through immersive, hands-on industrial training.
                </p>
                
                <Link
                  href="#"
                  className="group relative inline-flex items-center justify-center h-14 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-full overflow-hidden transition-transform active:scale-95 shadow-lg"
                >
                  <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
                    Apply to Join
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </Skeleton>
  );
}
