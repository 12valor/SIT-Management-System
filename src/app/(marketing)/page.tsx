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
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE_EXPO }}
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
        <section className="py-32 relative bg-white dark:bg-[#050505] overflow-hidden border-y border-slate-100 dark:border-white/5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-[120px] -z-10" />

          <div className="container mx-auto px-6">
            <Reveal className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                Select Your Gateway
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                Connect with the official TUP-V Supervised Industrial Training platform. Designed for excellence, engineered for career growth.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Student Card */}
              <Reveal delay={0.1}>
                <div className="group relative flex flex-col h-full bg-[#fdfdfc] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 transition-all hover:bg-[#fafaf8] dark:hover:bg-white/[0.04] rounded-[5px] overflow-hidden">
                  <div className="px-8 pt-8 flex flex-col flex-1">
                    <div className="flex items-center justify-end mb-6">
                      <div className="w-10 h-10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-300 bg-white dark:bg-transparent rounded-[5px] rotate-3 group-hover:rotate-0 transition-transform">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <h3 className="text-3xl font-medium font-premium text-slate-900 dark:text-white italic leading-tight">
                        Student Terminal
                      </h3>
                      <div className="h-px w-14 bg-slate-200 dark:bg-white/20 group-hover:bg-primary/30 transition-colors" />
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
                        Certified gateway for TUP-V trainees to document, verify, and accelerate their professional industrial integration.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mb-6 flex-1">
                      {[
                        "Institutional Profile Certification",
                        "SIT Placement Manifest",
                        "Digital Logbook Verification",
                        "Archival Document Repository",
                      ].map((feature, i) => (
                        <div key={feature} className="flex items-center gap-4">
                          <span className="text-[9px] font-bold text-slate-300 dark:text-white/10 font-mono">
                            § 0{i + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/login/student"
                      className="w-full inline-flex h-12 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.25em] text-[10px] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all gap-3 rounded-[5px] mb-8"
                    >
                      Access Student Portal
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Company Card */}
              <Reveal delay={0.2}>
                <div className="group relative flex flex-col h-full bg-[#fdfdfc] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 transition-all hover:bg-[#fafaf8] dark:hover:bg-white/[0.04] rounded-[5px] overflow-hidden">
                  <div className="px-8 pt-8 flex flex-col flex-1">
                    <div className="flex items-center justify-end mb-6">
                      <div className="w-10 h-10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-300 bg-white dark:bg-transparent rounded-[5px] -rotate-3 group-hover:rotate-0 transition-transform">
                        <Building2 className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <h3 className="text-3xl font-medium font-premium text-slate-900 dark:text-white italic leading-tight">
                        Corporate Access
                      </h3>
                      <div className="h-px w-14 bg-slate-200 dark:bg-white/20 group-hover:bg-primary/30 transition-colors" />
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
                        Official portal for industrial partners to authenticate trainee performance and manage university collaboration.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mb-6 flex-1">
                      {[
                        "Partner Verification Registry",
                        "Industrial Talent Acquisition",
                        "Performance Evaluation Terminal",
                        "Collaborative SIT Management",
                      ].map((feature, i) => (
                        <div key={feature} className="flex items-center gap-4">
                          <span className="text-[9px] font-bold text-slate-300 dark:text-white/10 font-mono">
                            § 0{i + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/login/employer"
                      className="w-full inline-flex h-12 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.25em] text-[10px] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all gap-3 rounded-[5px] mb-8"
                    >
                      Partner Verification
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Section 03 — How It Works */}
        <section className="py-32 bg-slate-50 dark:bg-[#0b0b0b] relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <Reveal className="max-w-3xl mx-auto text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight mb-6">
                How It Works
              </h2>
              <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-8" />
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                A procedural journey bridging academic training and industrial excellence.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto relative">
              {[
                { step: "01", title: "Profile Setup", desc: "Create your institutional SIT profile with GSFE credentials.", icon: ShieldCheck },
                { step: "02", title: "Application", desc: "Apply to pre-vetted industry partners matching your skill set.", icon: Zap },
                { step: "03", title: "Evaluation", desc: "Track progress and receive performance audits in real-time.", icon: CheckCircle },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.15}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-8 relative group transition-all hover:border-primary/50 shadow-sm dark:shadow-none">
                      <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black flex items-center justify-center border-4 border-slate-50 dark:border-[#0b0b0b]">
                        {item.step}
                      </span>
                      <item.icon className="w-8 h-8 text-slate-900 dark:text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <h5 className="text-xl font-bold font-premium text-slate-900 dark:text-white mb-3 uppercase tracking-tight">
                      {item.title}
                    </h5>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed px-4">
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
