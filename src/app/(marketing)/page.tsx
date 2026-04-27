"use client";

import Link from "next/link";
import {
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Building2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];



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
        <HeroCarousel />

        {/* Gateway Cards: Uniform & Refined */}
        <section className="py-24 bg-white dark:bg-[#050505] transition-colors relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              
              {/* Student Terminal */}
              <Reveal delay={0.1}>
                <div className="group relative h-full bg-[#fdfdfc] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-10 flex flex-col transition-all hover:bg-[#fafaf8] dark:hover:bg-white/[0.04] rounded-[5px]">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center mb-8 border border-primary/10 transition-colors">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                      Student <span className="text-primary italic">Terminal</span>
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-white/40 leading-relaxed font-medium mb-10">
                      Access the official TUP-V Supervised Industrial Training platform to document, verify, and accelerate your professional journey.
                    </p>
                    
                    <div className="space-y-4 mb-10">
                      {[
                        "Logbook Management",
                        "Placement Manifest",
                        "Document Archive"
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                          <span className="text-[10px] font-bold text-slate-600 dark:text-white/60 uppercase tracking-widest">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/login/student"
                    className="inline-flex h-12 w-full items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all gap-3 rounded-[5px] group/btn"
                  >
                    Enter Portal
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </Reveal>

              {/* Partner Registry */}
              <Reveal delay={0.2}>
                <div className="group relative h-full bg-[#fdfdfc] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-10 flex flex-col transition-all hover:bg-[#fafaf8] dark:hover:bg-white/[0.04] rounded-[5px]">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-sm flex items-center justify-center mb-8 border border-slate-200 dark:border-white/10 transition-colors">
                      <Building2 className="w-6 h-6 text-slate-400 dark:text-white/30" />
                    </div>
                    <h3 className="text-3xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                      Partner <span className="italic">Registry</span>
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-white/40 leading-relaxed font-medium mb-10">
                      Secure gateway for industrial partners to authenticate student performance and coordinate institutional collaboration.
                    </p>

                    <div className="space-y-4 mb-10">
                      {[
                        "Talent Verification",
                        "Trainee Evaluation",
                        "SIT Management"
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-white/20 rounded-full" />
                          <span className="text-[10px] font-bold text-slate-600 dark:text-white/60 uppercase tracking-widest">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/login/employer"
                    className="inline-flex h-12 w-full items-center justify-center border border-slate-900 dark:border-white/20 text-slate-900 dark:text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-950 transition-all gap-3 rounded-[5px] group/btn"
                  >
                    Partner Access
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>


        {/* How It Works */}
        <section className="py-28 relative overflow-hidden bg-slate-50 dark:bg-[#0b0b0b]">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <Reveal>
                <h2 className="text-3xl md:text-5xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight mb-6">
                  How It Works
                </h2>
                <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-8" />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  A procedural journey bridging academic training and industrial excellence.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
              {[
                { step: "01", title: "Profile Setup", desc: "Create your institutional SIT profile with GSFE credentials.", icon: ShieldCheck },
                { step: "02", title: "Application", desc: "Apply to pre-vetted industry partners matching your skill set.", icon: Zap },
                { step: "03", title: "Evaluation", desc: "Track progress and receive performance audits in real-time.", icon: CheckCircle },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.12} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-8 relative group transition-all hover:border-primary/50">
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
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Institutional Voice */}
        <section className="py-28 bg-white dark:bg-[#050505] border-y border-slate-100 dark:border-white/5 transition-colors">
          <Reveal className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[9px] font-mono text-slate-400 dark:text-white/25 uppercase tracking-[0.25em] mb-10 transition-colors">
              Field Report · Industrial Training Office
            </p>
            <blockquote className="text-2xl md:text-3xl font-medium font-premium italic text-slate-800 dark:text-white/80 leading-relaxed mb-10 transition-colors">
              &quot;Managing student placements across dozens of industry partners once required weeks of coordination. The platform reduced our processing cycle to a single working day.&quot;
            </blockquote>
            <div className="h-px w-16 bg-slate-200 dark:bg-white/10 mx-auto mb-8 transition-colors" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest transition-colors">
                Engr. Carla Reyes
              </p>
              <p className="text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.15em] transition-colors">
                Industrial Training Coordinator · College of Engineering, TUP-V · 2024–2025
              </p>
            </div>
          </Reveal>
        </section>

        {/* Closing CTA */}
        <section className="py-24 bg-primary relative overflow-hidden transition-colors">
          <div className="absolute inset-0 bg-grid-white opacity-[0.04] pointer-events-none" />
          <Reveal className="container mx-auto px-6 text-center relative z-10">
            <p className="text-[9px] font-mono text-white/40 uppercase tracking-[0.25em] mb-6">
              Official Institutional Gateway
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-premium text-white uppercase tracking-tight mb-5 max-w-3xl mx-auto">
              Begin Your Institutional Registration
            </h2>
            <p className="text-white/70 font-medium max-w-xl mx-auto leading-relaxed mb-12">
              Access the official SIT gateway for the Technological University of the Philippines - Visayas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup/student"
                className="inline-flex h-13 px-10 items-center justify-center bg-white text-primary font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/90 transition-colors gap-3 rounded-[5px]"
              >
                Student Registration
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/signup/employer"
                className="inline-flex h-13 px-10 items-center justify-center border border-white/30 text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-colors gap-3 rounded-[5px]"
              >
                Partner Enrollment
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
