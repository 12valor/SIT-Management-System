"use client";

import Link from "next/link";
import {
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Building2,
  ShieldCheck,
  Zap,
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
        <section className="py-40 relative bg-white dark:bg-[#050505] overflow-hidden border-y border-slate-100 dark:border-white/5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-[120px] -z-10" />

          <div className="container mx-auto px-6">
            <Reveal className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-medium font-serif text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8">
                Select Your Gateway
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed italic">
                Connect with the official TUP-V Supervised Industrial Training platform. <br className="hidden md:block" /> Designed for excellence, engineered for career growth.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Student Card */}
              <Reveal delay={0.1}>
                <div className="group relative flex flex-col h-full bg-[#fdfdfc] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 transition-all hover:bg-[#fafaf8] dark:hover:bg-white/[0.04] rounded-[5px] overflow-hidden p-10 md:p-12">
                  <div className="flex items-center justify-between mb-12">
                    <div className="w-12 h-12 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-300 bg-white dark:bg-transparent rounded-sm rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="space-y-4 mb-10">
                    <h3 className="text-4xl font-medium font-serif text-slate-900 dark:text-white italic leading-tight">
                      Student Terminal
                    </h3>
                    <div className="h-px w-16 bg-slate-200 dark:bg-white/20 group-hover:bg-primary/30 transition-colors duration-500" />
                    <p className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic max-w-sm">
                      Certified gateway for TUP-V trainees to document, verify, and accelerate their professional industrial integration.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mb-12 flex-1">
                    {[
                      "Institutional Profile Certification",
                      "SIT Placement Manifest",
                      "Digital Logbook Verification",
                      "Archival Document Repository",
                    ].map((feature, i) => (
                      <div key={feature} className="flex items-center gap-5">
                        <span className="text-[10px] font-medium text-slate-300 dark:text-white/10 font-mono">
                          {i + 1}.
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/login/student"
                    className="w-full inline-flex h-14 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-widest text-[10px] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all gap-4 rounded-sm shadow-lg shadow-slate-900/5 dark:shadow-none"
                  >
                    Access Student Portal
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>

              {/* Company Card */}
              <Reveal delay={0.2}>
                <div className="group relative flex flex-col h-full bg-[#fdfdfc] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 transition-all hover:bg-[#fafaf8] dark:hover:bg-white/[0.04] rounded-[5px] overflow-hidden p-10 md:p-12">
                  <div className="flex items-center justify-between mb-12">
                    <div className="w-12 h-12 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-300 bg-white dark:bg-transparent rounded-sm -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <Building2 className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="space-y-4 mb-10">
                    <h3 className="text-4xl font-medium font-serif text-slate-900 dark:text-white italic leading-tight">
                      Corporate Access
                    </h3>
                    <div className="h-px w-16 bg-slate-200 dark:bg-white/20 group-hover:bg-primary/30 transition-colors duration-500" />
                    <p className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic max-w-sm">
                      Official portal for industrial partners to authenticate trainee performance and manage university collaboration.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mb-12 flex-1">
                    {[
                      "Partner Verification Registry",
                      "Industrial Talent Acquisition",
                      "Performance Evaluation Terminal",
                      "Collaborative SIT Management",
                    ].map((feature, i) => (
                      <div key={feature} className="flex items-center gap-5">
                        <span className="text-[10px] font-medium text-slate-300 dark:text-white/10 font-mono">
                          {i + 1}.
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/login/employer"
                    className="w-full inline-flex h-14 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-widest text-[10px] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all gap-4 rounded-sm shadow-lg shadow-slate-900/5 dark:shadow-none"
                  >
                    Partner Verification
                    <ArrowRight className="w-4 h-4" />
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
        <section className="py-40 bg-white dark:bg-[#050505] relative overflow-hidden border-t border-slate-100 dark:border-white/5">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row gap-20 items-start max-w-7xl mx-auto">
              {/* Sticky Header */}
              <div className="md:w-1/3 md:sticky md:top-40">
                <Reveal>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6 block">Operational Protocol</span>
                  <h2 className="text-5xl md:text-7xl font-medium font-serif text-slate-900 dark:text-white leading-[1.1] tracking-tighter mb-8 italic">
                    How It <br /> Works
                  </h2>
                  <div className="h-px w-20 bg-slate-200 dark:bg-white/10 mb-8" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed italic">
                    A procedural journey bridging academic training and industrial excellence.
                  </p>
                </Reveal>
              </div>

              {/* Procedural List */}
              <div className="md:w-2/3 space-y-0">
                {[
                  { phase: "PHASE_01", title: "Institutional Onboarding", desc: "Initialize your professional dossier. Authentication via university credentials establishes your digital identity within the SIT ecosystem.", icon: ShieldCheck },
                  { phase: "PHASE_02", title: "Industrial Deployment", desc: "Strategic matching with pre-vetted corporate partners. Trainees are deployed to environments that optimize for their specific technical specialization.", icon: Zap },
                  { phase: "PHASE_03", title: "Technical Audit", desc: "Real-time performance verification. Continuous logging and periodic institutional audits ensure academic standards are maintained in the field.", icon: CheckCircle },
                ].map((item, i) => (
                  <Reveal key={item.phase} delay={i * 0.1}>
                    <div className="group relative border-l border-slate-200 dark:border-white/10 pl-12 pb-24 last:pb-0">
                      {/* Technical Phase Label */}
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-white/20 tracking-[0.2em]">{item.phase}</span>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-white/5" />
                      </div>

                      {/* Content */}
                      <div className="relative">
                        {/* Phase Indicator Dot */}
                        <div className="absolute -left-[53px] top-2 w-2 h-2 bg-white dark:bg-[#050505] border-2 border-slate-900 dark:border-white z-10" />
                        
                        <div className="flex flex-col md:flex-row gap-10">
                          <div className="flex-1">
                            <h3 className="text-3xl font-medium font-serif text-slate-900 dark:text-white mb-6 italic tracking-tight group-hover:text-primary transition-colors duration-500">
                              {item.title}
                            </h3>
                            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic max-w-xl">
                              {item.desc}
                            </p>
                          </div>
                          
                          <div className="hidden lg:flex shrink-0 w-32 h-32 border border-slate-200 dark:border-white/10 items-center justify-center grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 bg-slate-50/50 dark:bg-white/[0.02]">
                            <item.icon className="w-10 h-10 text-slate-900 dark:text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Hover Interaction Grid */}
                      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
