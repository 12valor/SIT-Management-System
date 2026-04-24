"use client";

import React, { useState } from "react";
import { Search, Building2, MapPin, Cpu, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const partners = [
    { id: "P-001", name: "Intel Corporation", industry: "Semiconductors", loc: "Cavite", slots: 15, status: "Active" },
    { id: "P-002", name: "Accenture Philippines", industry: "Technology Services", loc: "Bacolod", slots: 25, status: "Vetted" },
    { id: "P-003", name: "Globe Telecom", industry: "Telecommunications", loc: "National", slots: 10, status: "Active" },
    { id: "P-004", name: "Meralco", industry: "Energy", loc: "NCR", slots: 8, status: "Vetted" },
    { id: "P-005", name: "Petron Corporation", industry: "Energy / Oil", loc: "Bataan", slots: 5, status: "Active" },
    { id: "P-006", name: "Smart Communications", industry: "Telecommunications", loc: "National", slots: 12, status: "Active" },
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

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner) => (
              <div 
                key={partner.id}
                className="group bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 p-8 rounded-3xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-primary">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${
                      partner.status === 'Active' 
                        ? 'bg-green-500/10 text-green-600' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {partner.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{partner.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">{partner.industry}</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 uppercase tracking-tight">
                      <MapPin className="w-3.5 h-3.5" />
                      {partner.loc}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 uppercase tracking-tight">
                      <Cpu className="w-3.5 h-3.5" />
                      {partner.slots} Training Slots
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">{partner.id}</span>
                  <Link href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:gap-2 transition-all">
                    View Details
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-slate-200 dark:border-white/10 rounded-3xl">
              <p className="text-slate-400 font-bold uppercase tracking-widest">No partners found matching your search.</p>
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
