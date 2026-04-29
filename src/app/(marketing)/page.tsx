"use client";

import Link from "next/link";
import {
  Building2,
  ArrowRight,
  Quote,
} from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px 0px" });

  const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.9, 
        delay, 
        ease: EASE_EXPO,
        opacity: { duration: 1.2 }
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col relative overflow-hidden bg-[#fafaf9] dark:bg-background transition-colors duration-300">
      {/* Subtle Institutional Grid Background */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] pointer-events-none" />

      <main className="relative z-10">
        {/* Section 01 — Hero */}
        <section className="bg-white dark:bg-[#050505]">
          <HeroCarousel />
        </section>

        {/* Section 02 — Gateway Cards */}
        <section className="py-40 relative border-y border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl">
            <Reveal className="text-center mb-24">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">
                Portal Selection
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-medium text-slate-900 dark:text-white mb-8">
                Institutional Entry Points
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-serif italic max-w-2xl mx-auto text-lg leading-relaxed">
                Access the official digital terminals for Supervised Industrial Training management at TUP-V.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Student Card */}
              <Reveal delay={0.1}>
                <div className="group relative flex flex-col h-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-12 transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 rounded-2xl">
                  <header className="mb-10">
                    <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-3 block">
                      Trainee Portal
                    </span>
                    <h3 className="text-3xl font-serif font-medium text-slate-900 dark:text-white mb-4">
                      Student Terminal
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-serif italic leading-relaxed">
                      Official gateway for trainees to document performance and manage SIT placements.
                    </p>
                  </header>

                  <div className="space-y-6 mb-12 flex-1">
                    {[
                      "Institutional Profile Certification",
                      "SIT Placement Manifest",
                      "Digital Logbook Verification",
                      "Archival Document Repository",
                    ].map((feature) => (
                      <div key={feature} className="flex items-start gap-4">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-slate-700 dark:text-slate-300 font-serif">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/login/student"
                    className="w-full inline-flex h-14 items-center justify-center bg-primary text-white font-serif font-medium rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    Access Student Portal
                  </Link>
                </div>
              </Reveal>

              {/* Company Card */}
              <Reveal delay={0.2}>
                <div className="group relative flex flex-col h-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-12 transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 rounded-2xl">
                  <header className="mb-10">
                    <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-3 block">
                      Supervisor Portal
                    </span>
                    <h3 className="text-3xl font-serif font-medium text-slate-900 dark:text-white mb-4">
                      Partner Verification
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-serif italic leading-relaxed">
                      Official portal for industrial partners to authenticate trainee performance and records.
                    </p>
                  </header>

                  <div className="space-y-6 mb-12 flex-1">
                    {[
                      "Partner Verification Registry",
                      "Industrial Talent Acquisition",
                      "Performance Evaluation Terminal",
                      "Collaborative SIT Management",
                    ].map((feature) => (
                      <div key={feature} className="flex items-start gap-4">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-slate-700 dark:text-slate-300 font-serif">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/login/employer"
                    className="w-full inline-flex h-14 items-center justify-center bg-primary text-white font-serif font-medium rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    Authenticate Access
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Section 03 — Institutional Voice (Refined Testimonial) */}
        <section className="py-48 relative overflow-hidden bg-[#fafaf9] dark:bg-background">
          <div className="container mx-auto px-6 relative">
            <Reveal className="max-w-4xl mx-auto text-center">
              {/* Refined Quotation Icon — Matching Image */}
              <div className="flex justify-center mb-12">
                <div className="w-20 h-20 bg-primary/[0.03] dark:bg-primary/10 rounded-full flex items-center justify-center text-primary/20">
                  <Quote className="w-10 h-10 rotate-180" fill="currentColor" strokeWidth={0} />
                </div>
              </div>

              {/* Quote Text — Matching Image (Non-italic, bold highlight) */}
              <blockquote className="text-3xl md:text-5xl font-serif font-medium text-slate-900 dark:text-slate-100 leading-[1.2] tracking-tight mb-16">
                Managing student trainees was once a fragmented process. This system provides the <span className="text-primary font-bold italic">structural rigor</span> required for true industrial-academic integration.
              </blockquote>
              
              {/* Author Info — Matching Image (Centered with icon circle) */}
              <div className="inline-flex flex-col items-center">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary/40 shadow-inner">
                    <Building2 className="w-8 h-8" strokeWidth={1} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-1">
                      Engr. Roberto M. Garcia
                    </h4>
                    <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]">
                      Senior Operations Manager · Industrial Hub
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 04 — Operational Protocol */}
        <section className="py-40 bg-white dark:bg-[#050505] relative overflow-hidden border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
          <div className="container mx-auto px-6 max-w-5xl">
            <header className="mb-24 text-center">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">
                Operational Protocol
              </span>
              <h2 className="text-5xl md:text-6xl font-serif font-medium text-slate-900 dark:text-white mb-8">
                The SIT Lifecycle
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-serif italic max-w-2xl mx-auto">
                The institutional journey from academic training to industrial integration, mapped across three strategic phases.
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-16 relative">
              {[
                { phase: "01", title: "Institutional Onboarding", desc: "Initialize your professional dossier. Authentication via university credentials establishes your digital identity within the SIT ecosystem." },
                { phase: "02", title: "Industrial Deployment", desc: "Strategic matching with pre-vetted corporate partners. Trainees are deployed to environments that optimize for technical growth." },
                { phase: "03", title: "Technical Audit", desc: "Real-time performance verification. Continuous logging and periodic institutional audits ensure academic standards are maintained." },
              ].map((item, i) => (
                <Reveal key={item.phase} delay={i * 0.1} className="relative group">
                  <div className="text-primary font-black text-5xl mb-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 font-serif italic">
                    {item.phase}
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-slate-900 dark:text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                    {item.desc}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="mt-32 pt-16 border-t border-slate-100 dark:border-white/5 text-center">
              <p className="text-slate-400 dark:text-slate-500 mb-10 font-serif italic">
                Ready to begin your institutional onboarding?
              </p>
              <Link 
                href="/login/student"
                className="inline-flex items-center justify-center px-12 py-5 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/20"
              >
                Access Student Terminal
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

