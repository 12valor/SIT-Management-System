"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Gavel, BookOpen, ShieldCheck, ArrowRight, Info } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
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

export default function ResourcesContent() {
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
              SIT STRATEGIC OFFICE • DOCUMENT REPOSITORY
            </span>
          </div>
          <h1 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-8 leading-tight">
            Institutional Handbook & Resources
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-serif leading-relaxed max-w-3xl italic">
            A comprehensive terminal for the Supervised Industrial Training program. This repository contains all regulatory frameworks, legal templates, and technical protocols required for institutional compliance.
          </p>
        </motion.header>

        {/* Table of Contents - Clean & Document-like */}
        <motion.section className="mb-32 grid md:grid-cols-2 gap-16" variants={fadeInUp}>
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Navigation Registry</h2>
            <nav className="space-y-4">
              {['Program Framework', 'Legal Templates', 'Evaluation Rubrics'].map((item, idx) => (
                <a 
                  key={idx}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="flex items-center justify-between group py-3 px-4 -mx-4 rounded-sm border-b border-slate-100 dark:border-white/5 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all duration-300 active:scale-[0.98]"
                >
                  <span className="font-serif text-lg text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                    0{idx + 1}. {item}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                </a>
              ))}
            </nav>
          </div>
          <div className="bg-slate-100/50 dark:bg-white/[0.02] p-8 rounded-sm border border-slate-200/60 dark:border-white/5">
            <Info className="h-6 w-6 text-primary mb-6" strokeWidth={1.5} />
            <h3 className="font-serif font-medium text-slate-900 dark:text-white text-lg mb-4">Registry Compliance</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-serif">
              All documents listed herein are the intellectual property of TUPV. Redistribution without official authorization is strictly prohibited under institutional policy.
            </p>
          </div>
        </motion.section>

        {/* Content Sections - Editorial Flow */}
        <div className="space-y-40">
          
          {/* Section 01: Program Framework */}
          <motion.section id="program-framework" variants={fadeInUp}>
            <div className="flex items-baseline gap-4 mb-12">
              <span className="text-4xl font-serif text-primary/20 italic">01</span>
              <h2 className="text-4xl font-serif font-medium text-slate-900 dark:text-white">Program Framework</h2>
            </div>
            
            <div className="prose prose-slate dark:prose-invert max-w-none font-serif text-lg leading-relaxed text-slate-600 dark:text-slate-400 space-y-8">
              <p>
                The Supervised Industrial Training (SIT) program at TUPV is designed as a bridge between theoretical academic rigor and the demands of the modern industrial landscape. Students are required to complete a minimum of 600 hours of field experience.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mt-12 not-prose">
                <div className="p-8 bg-white dark:bg-white/[0.01] border border-slate-200 dark:border-white/10">
                  <BookOpen className="h-6 w-6 text-primary mb-6" strokeWidth={1} />
                  <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Training Manual</h4>
                  <p className="text-sm text-slate-500 mb-6 font-serif">The foundational guide for all SIT procedures.</p>
                  <button className="group relative px-6 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all active:scale-95 shadow-md shadow-primary/10">
                    <span className="relative z-10 flex items-center gap-2">
                      Download Archive <Download className="h-3 w-3" />
                    </span>
                    <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  </button>
                </div>
                <div className="p-8 bg-white dark:bg-white/[0.01] border border-slate-200 dark:border-white/10">
                  <ShieldCheck className="h-6 w-6 text-primary mb-6" strokeWidth={1} />
                  <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Code of Conduct</h4>
                  <p className="text-sm text-slate-500 mb-6 font-serif">Professional expectations for trainees in the field.</p>
                  <button className="group relative px-6 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all active:scale-95 shadow-md shadow-primary/10">
                    <span className="relative z-10 flex items-center gap-2">
                      Download Archive <Download className="h-3 w-3" />
                    </span>
                    <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 02: Legal Templates */}
          <motion.section id="legal-templates" variants={fadeInUp}>
            <div className="flex items-baseline gap-4 mb-12">
              <span className="text-4xl font-serif text-primary/20 italic">02</span>
              <h2 className="text-4xl font-serif font-medium text-slate-900 dark:text-white">Legal & Partnership Templates</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { name: "Memorandum of Understanding (MOU)", desc: "Standard agreement between TUPV and Industry Partners.", format: "DOCX" },
                { name: "Non-Disclosure Agreement (NDA)", desc: "Confidentiality protocol for proprietary information.", format: "PDF" },
                { name: "Liability Waiver Form", desc: "Institutional release for off-campus field training.", format: "PDF" }
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between py-8 border-b border-slate-200 dark:border-white/10 group/item">
                  <div className="flex items-start gap-6">
                    <div className="mt-1 text-slate-300 group-hover/item:text-primary transition-colors">
                      <Gavel className="h-6 w-6" strokeWidth={1} />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-medium text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">
                        {doc.name}
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 font-serif italic text-sm">
                        {doc.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.format}</span>
                    <button className="group/btn relative h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white overflow-hidden transition-all duration-300 active:scale-90 shadow-lg shadow-primary/20">
                      <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
                        <Download className="h-4 w-4" />
                      </span>
                      <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>


        </div>
      </motion.div>
    </main>
  );
}
