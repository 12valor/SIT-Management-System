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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium font-serif text-slate-900 dark:text-white mb-6">
                Institutional Portals
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed italic">
                Secure access points for students and industrial partners within the TUP-V ecosystem.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {/* Student Card */}
              <Reveal delay={0.1}>
                <div className="group relative flex flex-col h-full bg-[#fdfdfc] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 transition-all hover:bg-[#fafaf8] dark:hover:bg-white/[0.04] rounded-[5px] overflow-hidden p-10 md:p-14">
                  <div className="flex items-center justify-end mb-10">
                    <div className="w-12 h-12 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-300 bg-white dark:bg-transparent rounded-sm rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="space-y-4 mb-10">
                    <h3 className="text-4xl font-medium font-serif text-slate-900 dark:text-white italic leading-tight">
                      Student Terminal
                    </h3>
                    <div className="h-px w-16 bg-slate-200 dark:bg-white/20 group-hover:bg-primary/30 transition-colors duration-500" />
                    <p className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
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
                        <span className="text-[10px] font-bold text-slate-300 dark:text-white/10 font-mono">
                          § 0{i + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-[0.2em]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/login/student"
                    className="w-full inline-flex h-14 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all gap-4 rounded-sm"
                  >
                    Access Portal
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>

              {/* Company Card */}
              <Reveal delay={0.2}>
                <div className="group relative flex flex-col h-full bg-[#fdfdfc] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 transition-all hover:bg-[#fafaf8] dark:hover:bg-white/[0.04] rounded-[5px] overflow-hidden p-10 md:p-14">
                  <div className="flex items-center justify-end mb-10">
                    <div className="w-12 h-12 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-300 bg-white dark:bg-transparent rounded-sm -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <Building2 className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="space-y-4 mb-10">
                    <h3 className="text-4xl font-medium font-serif text-slate-900 dark:text-white italic leading-tight">
                      Corporate Access
                    </h3>
                    <div className="h-px w-16 bg-slate-200 dark:bg-white/20 group-hover:bg-primary/30 transition-colors duration-500" />
                    <p className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
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
                        <span className="text-[10px] font-bold text-slate-300 dark:text-white/10 font-mono">
                          § 0{i + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-[0.2em]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/login/employer"
                    className="w-full inline-flex h-14 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all gap-4 rounded-sm"
                  >
                    Access Portal
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Section 03 — Institutional Voice (Testimonial) */}
        <section className="py-40 bg-white dark:bg-[#050505] relative overflow-hidden">
          {/* Blueprint Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          <div className="max-w-4xl mx-auto px-6 relative">
            <Reveal className="text-center">
              <div className="relative mb-20 max-w-2xl mx-auto">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-[12rem] font-serif text-slate-100 dark:text-white/[0.02] select-none pointer-events-none leading-none">
                  &ldquo;
                </div>
                <blockquote className="text-2xl md:text-4xl font-medium font-serif text-slate-800 dark:text-slate-200 leading-[1.4] italic relative z-10">
                  Managing student trainees was once a fragmented process. This system provides the <span className="text-slate-950 dark:text-white font-bold underline decoration-primary/30 decoration-4 underline-offset-8">structural rigor</span> required for true industrial-academic integration.
                </blockquote>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-sans">Engr. Roberto M. Garcia</p>
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] font-mono">Senior Operations Manager · Industrial Hub</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-widest font-mono">Verified Partner Voice</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 04 — How It Works */}
        <section className="py-40 bg-slate-50 dark:bg-[#0b0b0b] relative overflow-hidden border-t border-slate-100 dark:border-white/5">
          <div className="container mx-auto px-6 relative z-10">
            <Reveal className="max-w-3xl mx-auto text-center mb-24">
              <span className="inline-block font-mono font-black text-[10px] uppercase tracking-[0.4em] text-primary/60 mb-6">Procedural Protocol 01</span>
              <h2 className="text-4xl md:text-6xl font-medium font-serif text-slate-900 dark:text-white mb-8 italic leading-tight">
                Procedural Workflow
              </h2>
              <div className="w-20 h-px bg-primary/30 mx-auto mb-10" />
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto text-lg leading-relaxed italic">
                A strategic bridge connecting academic theory with industrial command.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto relative">
              {[
                { step: "01", title: "Profile Setup", desc: "Initialize your institutional SIT profile through authenticated GSFE credentials.", icon: ShieldCheck },
                { step: "02", title: "Active Application", desc: "Deploy applications to pre-vetted industry partners matching your technical manifest.", icon: Zap },
                { step: "03", title: "Performance Audit", desc: "Track real-time progress and receive certified performance audits from onsite supervisors.", icon: CheckCircle },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.2}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 rounded-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-10 relative transition-all group-hover:border-primary/50 shadow-sm dark:shadow-none overflow-hidden">
                      <span className="absolute -top-3 -right-3 w-10 h-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-black flex items-center justify-center border-4 border-slate-50 dark:border-[#0b0b0b] font-mono">
                        {item.step}
                      </span>
                      <item.icon className="w-10 h-10 text-slate-900 dark:text-white group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h5 className="text-2xl font-medium font-serif text-slate-900 dark:text-white mb-4 italic uppercase tracking-tight">
                      {item.title}
                    </h5>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed px-6 italic">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
