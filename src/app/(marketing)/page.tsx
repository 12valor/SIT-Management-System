"use client";

import Link from "next/link";
import {
  Building2,
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
  const inView = useInView(ref, { once: true, margin: "-100px 0px" });

  // Impeccable Motion Law: Exponential Ease-Out
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
    <div className="flex flex-col">
      <main>
        {/* Section 01 — Hero */}
        <section className="bg-white dark:bg-[#050505]">
          <HeroCarousel />
        </section>

        {/* Section 02 — Gateway Cards */}
        <section className="py-40 relative bg-white dark:bg-background overflow-hidden border-y border-slate-200 dark:border-white/10 transition-colors duration-300">
          <div className="container mx-auto px-6 max-w-6xl">
            <Reveal className="text-center mb-24">
              <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
                Portal Access
              </span>
              <h2 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-6">
                Select Your Gateway
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-serif max-w-2xl mx-auto text-lg leading-relaxed">
                The official technological entry point for TUPV students and industrial partners. Designed for academic integrity and professional growth.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Student Card */}
              <Reveal delay={0.1}>
                <div className="group relative flex flex-col h-full bg-[#fafaf9] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-12 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 rounded-2xl">
                  <header className="mb-10">
                    <h3 className="text-3xl font-serif font-medium text-slate-900 dark:text-white mb-4">
                      Student Terminal
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 font-serif leading-relaxed">
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
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40" />
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
                <div className="group relative flex flex-col h-full bg-[#fafaf9] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-12 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 rounded-2xl">
                  <header className="mb-10">
                    <h3 className="text-3xl font-serif font-medium text-slate-900 dark:text-white mb-4">
                      Partner Verification
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 font-serif leading-relaxed">
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
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40" />
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

        {/* Section 03 — Institutional Voice (Testimonial) */}
        <section className="py-48 bg-white dark:bg-[#050505] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="max-w-5xl mx-auto px-6 relative">
            <Reveal className="text-center">
              <div className="relative mb-20 max-w-3xl mx-auto">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-[15rem] font-serif text-slate-100 dark:text-white/[0.02] select-none pointer-events-none leading-none opacity-50">
                  &ldquo;
                </div>
                <blockquote className="text-3xl md:text-5xl font-medium font-serif text-slate-900 dark:text-slate-100 leading-[1.3] italic relative z-10 tracking-tight">
                  Managing student trainees was once a fragmented process. This system provides the <span className="text-primary font-bold">structural rigor</span> required for true industrial-academic integration.
                </blockquote>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-primary/60" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-normal font-sans">Engr. Roberto M. Garcia</p>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest font-sans">Senior Operations Manager · Industrial Hub</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 04 — Operational Protocol (How It Works) */}
        <section className="py-40 bg-[#fafaf9] dark:bg-background relative overflow-hidden border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
          <div className="container mx-auto px-6 max-w-4xl">
            <header className="mb-24 text-center">
              <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
                Operational Protocol
              </span>
              <h2 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-6">
                How It Works
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-serif max-w-2xl mx-auto">
                The institutional journey from academic training to industrial integration, mapped across three strategic phases.
              </p>
            </header>

            <div className="space-y-24 relative">
              {/* Vertical Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 -translate-x-1/2 hidden md:block" />

              {[
                { phase: "01", title: "Institutional Onboarding", desc: "Initialize your professional dossier. Authentication via university credentials establishes your digital identity within the SIT ecosystem, ensuring all records are tied to your official academic history." },
                { phase: "02", title: "Industrial Deployment", desc: "Strategic matching with pre-vetted corporate partners. Trainees are deployed to environments that optimize for their specific technical specialization and career trajectory." },
                { phase: "03", title: "Technical Audit", desc: "Real-time performance verification. Continuous logging and periodic institutional audits ensure academic standards are maintained in the field through a rigorous digital verification process." },
              ].map((item, i) => (
                <Reveal key={item.phase} delay={i * 0.1} className={`relative flex flex-col md:flex-row gap-12 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Step Number Circle */}
                  <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 w-10 h-10 rounded-full bg-[#fafaf9] dark:bg-background border border-slate-200 dark:border-white/20 flex items-center justify-center z-10">
                    <span className="font-serif text-sm font-medium text-slate-900 dark:text-white">{item.phase}</span>
                  </div>

                  <div className="md:w-1/2 space-y-4 text-center md:text-left">
                    <h3 className={`text-3xl font-serif font-medium text-slate-900 dark:text-white ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-serif ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      {item.desc}
                    </p>
                  </div>
                  <div className="md:w-1/2" />
                </Reveal>
              ))}
            </div>

            <div className="mt-32 pt-16 border-t border-slate-200 dark:border-white/10 text-center">
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-serif">
                Ready to begin your institutional onboarding?
              </p>
              <Link 
                href="/login/student"
                className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
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
