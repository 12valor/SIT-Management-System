"use client";

import React, { useState } from "react";
import { Search, Building2, MapPin, Cpu, ArrowUpRight } from "lucide-react";
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

        {/* Partners Technical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-white/10 border border-slate-200 dark:border-white/10">
          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner) => (
              <div 
                key={partner.id}
                className="group bg-white dark:bg-[#080808] p-0 flex flex-col transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-white/[0.02]"
              >
                <div className="p-8 flex flex-col flex-1">
                  {/* Top Meta Bar */}
                  <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-white/5 pb-4">
                    <span className="font-mono text-[10px] font-bold text-slate-400 tracking-tighter uppercase">
                      Registry ID: {partner.id}
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 border ${
                      partner.status === 'Active' 
                        ? 'border-green-500/20 bg-green-500/5 text-green-600' 
                        : 'border-primary/20 bg-primary/5 text-primary'
                    }`}>
                      {partner.status}
                    </span>
                  </div>

                  <div className="flex gap-6 items-start">
                    {/* Logo Square */}
                    <div className="w-16 h-16 shrink-0 border border-slate-200 dark:border-white/10 flex items-center justify-center bg-slate-50 dark:bg-white/[0.02] grayscale group-hover:grayscale-0 transition-all">
                      <Building2 className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                        {partner.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{partner.loc}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-8 text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed flex-1 italic">
                    "{partner.description}"
                  </p>

                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">Availability</span>
                        <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase">{partner.slots} Slots</span>
                      </div>
                      <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">Sector</span>
                        <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase">{partner.industry}</span>
                      </div>
                    </div>

                    <Link href="#" className="h-10 px-4 flex items-center gap-2 border border-slate-900 dark:border-white text-slate-900 dark:text-white text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all">
                      Details
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white dark:bg-[#050505]">
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
