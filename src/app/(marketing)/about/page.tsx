"use client";

import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 pt-40 pb-32 font-sans selection:bg-primary selection:text-white transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Simple Header */}
        <div className="mb-24 border-b border-slate-100 dark:border-white/5 pb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About the SIT Management System</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            The official platform for managing Supervised Industrial Training (SIT) at the Technological University of the Philippines Visayas.
          </p>
        </div>

        {/* Mission and Vision - CLEAR AND PLAIN */}
        <div className="grid gap-20 mb-24">
          
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Our Mission</h2>
            <p className="text-2xl font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
              To provide a streamlined, transparent, and high-performance digital environment where TUPV students can transition seamlessly into their professional careers by automating the administrative burden of SIT and enhancing industrial engagement.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Our Vision</h2>
            <p className="text-2xl font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
              To be the benchmark for institutional industrial training management in the Philippines, leveraging technology to foster the next generation of Filipino engineering and technology leaders.
            </p>
          </section>

        </div>

        {/* Core Values */}
        <section className="mb-24 pt-20 border-t border-slate-100 dark:border-white/5">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-12 text-center">Core Values</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Precision</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Ensuring every training hour and document is tracked with institutional accuracy and technical rigor.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Synergy</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Creating a unified ecosystem where students, coordinators, and industry partners collaborate effectively.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Excellence</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Maintaining the highest standards of industrial engagement and professional development.
              </p>
            </div>
          </div>
        </section>

        {/* Institutional Background */}
        <section className="bg-slate-50 dark:bg-white/[0.02] p-12 rounded-2xl border border-slate-100 dark:border-white/5">
          <h2 className="text-sm font-bold mb-6 text-slate-900 dark:text-white">Institutional Heritage</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            The Technological University of the Philippines Visayas (TUPV) was established in 1977. As a premier state university, TUPV is committed to providing higher technological education and training in engineering and related fields.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The SIT Management System is the digital extension of this commitment, designed to bridge the gap between classroom learning and actual industrial practice in the Visayas region and beyond.
          </p>
        </section>

      </div>
    </main>
  );
}
