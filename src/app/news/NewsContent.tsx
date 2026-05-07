"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
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
    date: "May 01, 2026",
    tag: "Program Update",
    title: "New Digital Logbook Synchronization Protocol",
    summary: "Effective immediately, all trainees are required to synchronize their digital logbooks every 24 hours. This measure ensures real-time oversight and data integrity for all industrial partners.",
    isUrgent: true
  },
  {
    id: 2,
    date: "April 28, 2026",
    tag: "Partnership",
    title: "Five New Industrial Partners Join SIT Registry",
    summary: "TUPV is proud to announce formal partnerships with leading regional engineering firms, expanding available placements for Mechanical and Electronics Engineering students.",
    isUrgent: false
  },
  {
    id: 3,
    date: "April 20, 2026",
    tag: "Institutional",
    title: "End-of-Semester SIT Evaluation Schedule",
    summary: "The official timeline for final evaluations and document submissions for the Second Semester 2025-2026 has been published. Please consult the Resources tab for the detailed calendar.",
    isUrgent: false
  },
  {
    id: 4,
    date: "April 15, 2026",
    tag: "Compliance",
    title: "Safety Awareness Seminar for Incoming Trainees",
    summary: "Mandatory safety training session scheduled for all students eligible for deployment in the upcoming mid-year term. Failure to attend will result in a delay of deployment.",
    isUrgent: true
  }
];

export default function NewsContent() {
  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-32 pb-24 px-6 transition-colors duration-300">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.05 }}
        variants={staggerContainer}
      >
        <motion.header className="mb-24 text-center" variants={fadeInUp}>
          <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
            Institutional Registry
          </span>
          <h1 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-6">
            News & Announcements
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Official archival record of program updates, partnership announcements, and institutional directives issued by the SIT Strategic Office.
          </p>
        </motion.header>

        <section className="space-y-16">
          {ANNOUNCEMENTS.map((news) => (
            <motion.article 
              key={news.id} 
              className="group border-b border-slate-200 dark:border-white/10 pb-16 last:border-0"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-medium text-slate-400">
                  {news.date}
                </span>
                <span className="h-px w-4 bg-slate-200 dark:bg-white/10" />
                <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
                  {news.tag}
                </span>
                {news.isUrgent && (
                  <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full tracking-widest uppercase">
                    Urgent
                  </span>
                )}
              </div>

              <div className="group cursor-pointer">
                <h2 className="text-3xl font-serif font-medium text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {news.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 font-serif">
                  {news.summary}
                </p>
                <button className="flex items-center gap-2 text-xs font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                  Read Full Memo <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </section>

        <motion.footer 
          className="mt-24 pt-12 border-t border-slate-200 dark:border-white/10 text-center"
          variants={fadeInUp}
        >
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-serif">
            Looking for older archival documents?
          </p>
          <a 
            href="/resources"
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-medium rounded-full overflow-hidden transition-transform active:scale-95 shadow-lg shadow-primary/20"
          >
            <span className="relative z-10">Access Resource Vault</span>
            <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          </a>
        </motion.footer>
      </motion.div>
    </main>
  );
}
