"use client";

import React, { useState } from "react";
import { Building2, MapPin, ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";

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
    <main className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 pt-40 pb-32 font-sans transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Simple Header */}
        <div className="mb-16 border-b border-slate-100 dark:border-white/5 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Industry Partners</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
              An official registry of companies and organizations partnering with TUPV for the Supervised Industrial Training program.
            </p>
          </div>

          {/* Clean Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-12 pr-4 text-sm font-medium outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

            {/* Technical Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-8 rounded-[5px] space-y-8"
                >
                  <div className="flex gap-6 items-start">
                    <div className="w-20 h-20 shrink-0 rounded-[5px] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] animate-pulse" />
                    <div className="space-y-3 flex-1 pt-1">
                      <div className="h-3 w-1/4 bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
                      <div className="h-8 w-3/4 bg-slate-100 dark:bg-white/5 rounded-none animate-pulse" />
                      <div className="h-3 w-1/3 bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-3 pl-4 border-l-2 border-slate-100 dark:border-white/5">
                    <div className="h-4 w-full bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
                    <div className="h-4 w-5/6 bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
                  </div>
                  <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-end">
                    <div className="flex gap-8">
                      <div className="space-y-2">
                        <div className="h-2 w-12 bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
                        <div className="h-6 w-20 bg-slate-100 dark:bg-white/5 rounded-none animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-12 bg-slate-50 dark:bg-white/5 rounded-none animate-pulse" />
                        <div className="h-6 w-20 bg-slate-100 dark:bg-white/5 rounded-none animate-pulse" />
                      </div>
                    </div>
                    <div className="h-11 w-32 bg-slate-900 dark:bg-white rounded-[5px] animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

        {/* Partners Technical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner) => (
              <div 
                key={partner.id}
                className="group bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-[5px] p-0 flex flex-col transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex gap-6 items-start mb-6">
                    {/* Logo Square */}
                    <div className="w-20 h-20 shrink-0 rounded-[5px] border border-slate-200 dark:border-white/10 flex items-center justify-center bg-slate-50 dark:bg-white/[0.02] grayscale group-hover:grayscale-0 transition-all overflow-hidden">
                      <Building2 className="w-10 h-10 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">{partner.loc}</span>
                      </div>
                      <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                        {partner.name}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {partner.industry}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed flex-1 italic relative pl-4 border-l-2 border-primary/20">
                    &quot;{partner.description}&quot;
                  </p>

                  <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-end">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter mb-1">Training Capacity</span>
                        <span className="text-lg font-black text-slate-900 dark:text-white uppercase leading-none">
                          {partner.slots} <span className="text-[10px] font-bold text-slate-400 ml-1">Slots</span>
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter mb-1">Partnership</span>
                        <span className="text-lg font-black text-slate-900 dark:text-white uppercase leading-none">
                          TUPV <span className="text-[10px] font-bold text-slate-400 ml-1">SIT</span>
                        </span>
                      </div>
                    </div>

                    <Link href="#" className="h-11 px-6 rounded-[5px] flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:bg-primary dark:hover:bg-primary hover:text-white transition-all shadow-lg shadow-black/5">
                      Explore Record
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white dark:bg-[#050505] border border-dashed border-slate-200 dark:border-white/10 rounded-[5px]">
              <p className="text-slate-400 font-bold uppercase tracking-widest">No matching registry records found.</p>
            </div>
          )}
        </div>

        {/* Simplified Footer CTA */}
        <div className="mt-24 p-12 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2rem] text-center">
          <h2 className="text-2xl font-bold mb-4">Partner with TUPV</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto font-medium">
            Join our network of industry partners and help shape the next generation of technological leaders.
          </p>
          <Link 
            href="#"
            className="inline-flex h-12 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm rounded-xl hover:opacity-90 transition-all items-center"
          >
            Apply for Registry
          </Link>
        </div>

      </div>
    </main>
  );
}
