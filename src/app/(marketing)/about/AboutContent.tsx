"use client";

import React from "react";
import { motion } from "framer-motion";

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

export default function AboutContent() {
  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-32 pb-24 px-6 transition-colors duration-300">
      <motion.div 
        className="container mx-auto max-w-4xl"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Header Section */}
        <motion.header className="mb-24 text-center" variants={fadeInUp}>
          <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
            Institutional Identity
          </span>
          <h1 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-6">
            The Digital Bridge
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            The official platform for managing Supervised Industrial Training at the Technological University of the Philippines Visayas.
          </p>
        </motion.header>

        {/* Mission and Vision - Large Serif Style */}
        <div className="grid gap-20 mb-32">
          <motion.section variants={fadeInUp}>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8">Our Mission</h2>
            <p className="text-3xl font-serif leading-snug text-slate-800 dark:text-slate-200">
              To provide a streamlined, transparent, and high-performance digital environment where TUPV students transition seamlessly into their professional careers by automating the administrative burden of SIT and enhancing industrial engagement.
            </p>
          </motion.section>

          <motion.section variants={fadeInUp}>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8">Our Vision</h2>
            <p className="text-3xl font-serif leading-snug text-slate-800 dark:text-slate-200">
              To be the benchmark for institutional industrial training management in the Philippines, leveraging technology to foster the next generation of Filipino engineering and technology leaders.
            </p>
          </motion.section>
        </div>

        {/* Core Values - 3 Column Grid Layout */}
        <motion.section className="mb-32" variants={fadeInUp}>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-16 text-center">Core Values</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-serif font-medium mb-4 text-slate-900 dark:text-white">Precision</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                Ensuring every training hour and document is tracked with institutional accuracy and technical rigor.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-medium mb-4 text-slate-900 dark:text-white">Synergy</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                Creating a unified ecosystem where students, coordinators, and industry partners collaborate effectively.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-medium mb-4 text-slate-900 dark:text-white">Excellence</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                Maintaining the highest standards of industrial engagement and professional development.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Institutional Heritage - Boxed Layout */}
        <motion.section 
          className="bg-slate-50 dark:bg-white/[0.02] p-12 md:p-16 rounded-2xl border border-slate-100 dark:border-white/5"
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-serif font-medium mb-8 text-slate-900 dark:text-white">Institutional Heritage</h2>
          <div className="space-y-6">
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
              The Technological University of the Philippines Visayas (TUPV) was established in 1977. As a premier state university, TUPV is committed to providing higher technological education and training in engineering and related fields.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
              The SIT Management System is the digital extension of this commitment, designed to bridge the gap between classroom learning and actual industrial practice in the Visayas region and beyond.
            </p>
          </div>
        </motion.section>

        <motion.footer 
          className="mt-32 pt-12 border-t border-slate-200 dark:border-white/10 text-center"
          variants={fadeInUp}
        >
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-serif">
            Interested in partnering with TUP-V?
          </p>
          <a 
            href="/partners"
            className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            Explore Partner Registry
          </a>
        </motion.footer>
      </motion.div>
    </main>
  );
}
