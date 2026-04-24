"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpRight, Building2, Globe, MapPin, Cpu } from "lucide-react";

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const partners = [
    { id: "P-001", name: "Intel Corporation", industry: "Semiconductors", loc: "Cavite", slots: 15, status: "ACTIVE" },
    { id: "P-002", name: "Accenture Philippines", industry: "Technology Services", loc: "Bacolod", slots: 25, status: "VETTED" },
    { id: "P-003", name: "Globe Telecom", industry: "Telecommunications", loc: "National", slots: 10, status: "ACTIVE" },
    { id: "P-004", name: "Meralco", industry: "Energy", loc: "NCR", slots: 8, status: "VETTED" },
    { id: "P-005", name: "Petron Corporation", industry: "Energy / Oil", loc: "Bataan", slots: 5, status: "ACTIVE" },
    { id: "P-006", name: "Smart Communications", industry: "Telecommunications", loc: "National", slots: 12, status: "ACTIVE" },
  ];

  const filteredPartners = partners.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] pt-40 pb-32 font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      
      {/* 1. REGISTRY HEADER */}
      <div className="container mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b-2 border-slate-900/10 dark:border-white/10 pb-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Live Industry Registry</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black font-premium text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9] mb-8">
              Partner <br />
              <span className="text-primary italic">Ecosystem</span>
            </h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-tight max-w-md">
              A technically-audited directory of global and local industry leaders connected to the TUP-Visayas SIT protocol.
            </p>
          </div>
          
          {/* Search Terminal */}
          <div className="w-full md:w-96 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="SEARCH_REGISTRY..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-slate-50 dark:bg-white/5 border-2 border-slate-900/5 dark:border-white/5 rounded-2xl pl-12 pr-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-primary/50 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
          </div>
        </div>
      </div>

      {/* 2. PARTNER DIRECTORY (LIST STYLE) */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4">
          
          {/* List Headings (Desktop) */}
          <div className="hidden md:grid grid-cols-6 px-10 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <div className="col-span-2">Entity Name</div>
            <div>Sector</div>
            <div>Region</div>
            <div>Capacity</div>
            <div className="text-right">Status</div>
          </div>

          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative"
              >
                <div className="relative grid grid-cols-2 md:grid-cols-6 items-center px-6 md:px-10 py-8 bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-3xl hover:bg-white dark:hover:bg-white/5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden">
                  
                  {/* Entity Name */}
                  <div className="col-span-2 flex items-center gap-6">
                    <div className="hidden md:flex w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 items-center justify-center group-hover:scale-110 transition-transform duration-500">
                       <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 mb-1">{partner.id}</div>
                      <div className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{partner.name}</div>
                    </div>
                  </div>

                  {/* Sector */}
                  <div className="hidden md:block">
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">{partner.industry}</div>
                  </div>

                  {/* Region */}
                  <div className="hidden md:flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-primary/50" />
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">{partner.loc}</div>
                  </div>

                  {/* Capacity */}
                  <div className="hidden md:flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-primary/50" />
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">{partner.slots} SLOTS</div>
                  </div>

                  {/* Status & CTA */}
                  <div className="flex justify-end items-center gap-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest ${
                      partner.status === 'ACTIVE' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      [{partner.status}]
                    </span>
                    <button className="p-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hover Accent Line */}
                  <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-0 group-hover:w-full transition-all duration-700" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[3rem]">
               <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">No matching registry found.</h3>
            </div>
          )}
        </div>
      </div>

      {/* 3. CTA STRIP */}
      <div className="container mx-auto px-6 mt-32">
        <div className="bg-slate-900 dark:bg-white p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden group">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent group-hover:scale-150 transition-transform duration-1000" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white dark:text-slate-900 uppercase tracking-tighter mb-8 leading-none">
              Become an <br />
              Institutional Partner
            </h2>
            <p className="text-slate-400 dark:text-slate-500 font-bold mb-12 max-w-xl mx-auto uppercase tracking-tight">
              Connect your organization with high-caliber talent from the Technological University of the Philippines.
            </p>
            <button className="h-16 px-12 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20">
              Apply for Registry
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
