"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bell, ChevronRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ANNOUNCEMENTS = [
  {
    id: 1,
    date: "MAY 01, 2026",
    tag: "PROGRAM UPDATE",
    title: "New Digital Logbook Synchronization Protocol",
    summary: "Effective immediately, all trainees are required to synchronize their digital logbooks every 24 hours. This measure ensures real-time oversight and data integrity for all industrial partners.",
    isUrgent: true
  },
  {
    id: 2,
    date: "APRIL 28, 2026",
    tag: "PARTNERSHIP",
    title: "Five New Industrial Partners Join SIT Registry",
    summary: "TUPV is proud to announce formal partnerships with leading regional engineering firms, expanding available placements for Mechanical and Electronics Engineering students.",
    isUrgent: false
  },
  {
    id: 3,
    date: "APRIL 20, 2026",
    tag: "INSTITUTIONAL",
    title: "End-of-Semester SIT Evaluation Schedule",
    summary: "The official timeline for final evaluations and document submissions for the Second Semester 2025-2026 has been published. Please consult the Resources tab for the detailed calendar.",
    isUrgent: false
  },
  {
    id: 4,
    date: "APRIL 15, 2026",
    tag: "COMPLIANCE",
    title: "Safety Awareness Seminar for Incoming Trainees",
    summary: "Mandatory safety training session scheduled for all students eligible for deployment in the upcoming mid-year term. Failure to attend will result in a delay of deployment.",
    isUrgent: true
  }
];

export default function NewsContent() {
  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-48 pb-24 px-6 transition-colors duration-300">
      <motion.div 
        className="container mx-auto max-w-4xl"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Archival Header */}
        <motion.header className="mb-24 border-b border-slate-200 dark:border-white/10 pb-16" variants={fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-primary/40" />
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-[10px]">
              SIT STRATEGIC OFFICE • NEWS & ANNOUNCEMENTS
            </span>
          </div>
          <h1 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-8 leading-tight">
            Institutional Bulletins
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-serif leading-relaxed max-w-3xl italic">
            Official archival record of program updates, partnership announcements, and institutional directives issued by the SIT Strategic Office.
          </p>
        </motion.header>

        {/* Featured / Urgent Banner */}
        <motion.section className="mb-32" variants={fadeInUp}>
          <div className="bg-slate-900 dark:bg-white/[0.02] text-white p-10 rounded-sm border border-slate-800 dark:border-white/10 relative overflow-hidden group active:scale-[0.99] transition-transform cursor-pointer">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary text-[10px] font-black px-2 py-1 tracking-widest uppercase">URGENT</span>
                  <span className="text-[10px] font-medium tracking-widest uppercase opacity-60">MEMO-2026-042</span>
                </div>
                <h2 className="text-3xl font-serif mb-4 leading-tight">Final Call: Mid-Year Deployment Applications</h2>
                <p className="text-slate-400 font-serif leading-relaxed mb-6">
                  Deadline for submission of all deployment prerequisites is May 15, 2026. No extensions will be granted for this cycle.
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  View Directive <ArrowRight className="h-3 w-3" />
                </div>
              </div>
              <div className="hidden md:block opacity-10 group-hover:opacity-20 transition-opacity">
                <Bell className="h-40 w-40" strokeWidth={1} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Timeline Registry */}
        <div className="space-y-0">
          <motion.h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-12" variants={fadeInUp}>
            Chronological Registry
          </motion.h3>
          
          <div className="relative border-l border-slate-200 dark:border-white/10 ml-4 md:ml-0 md:pl-0">
            {ANNOUNCEMENTS.map((news) => (
              <motion.article 
                key={news.id} 
                className="relative pl-12 pb-24 last:pb-0"
                variants={fadeInUp}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] top-2 h-2 w-2 rounded-full bg-primary border-4 border-[#fafaf9] dark:border-background box-content" />
                
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-4">
                  <span className="text-sm font-mono font-medium text-slate-400 tracking-tighter">
                    {news.date}
                  </span>
                  <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
                    {news.tag}
                  </span>
                </div>

                <div className="group cursor-pointer active:scale-[0.99] transition-transform">
                  <h4 className="text-2xl font-serif font-medium text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors leading-snug">
                    {news.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 font-serif leading-relaxed mb-6 max-w-2xl">
                    {news.summary}
                  </p>
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-all">
                    Read Full Memo <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Institutional Footer */}
        <motion.footer 
          className="mt-40 pt-20 border-t border-slate-900/10 dark:border-white/10"
          variants={fadeInUp}
        >
          <div className="grid md:grid-cols-3 gap-12 text-sm text-slate-500 dark:text-slate-400 font-serif">
            <div>
              <h5 className="text-slate-900 dark:text-white font-medium mb-4 uppercase tracking-widest text-[10px]">Registry Office</h5>
              <p>Bulletin Control Division</p>
              <p>TUPV Strategic Office</p>
            </div>
            <div>
              <h5 className="text-slate-900 dark:text-white font-medium mb-4 uppercase tracking-widest text-[10px]">Contact Bulletin</h5>
              <p>Email: bulletins@tupv.edu.ph</p>
              <p>Internal: EXT 102</p>
            </div>
            <div className="flex flex-col items-end justify-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">ARCHIVE SECURED</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">LAST UPDATED: 05/01/26</p>
            </div>
          </div>
        </motion.footer>

      </motion.div>
    </main>
  );
}
