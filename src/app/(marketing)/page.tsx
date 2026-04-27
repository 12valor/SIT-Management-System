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
                <div className="group relative flex flex-col h-full bg-white dark:bg-[#050505] border border-slate-200 dark:border-white/10 transition-all hover:border-primary/40 rounded-none overflow-hidden p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                  {/* Technical Background Texture */}
                  <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] pointer-events-none" />
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[40px] font-black select-none group-hover:text-primary/20 transition-colors">01</div>
                  
                  <div className="relative z-10 space-y-6 mb-12">
                    <h3 className="text-5xl font-medium font-serif text-slate-900 dark:text-white leading-tight tracking-tighter">
                      Student <span className="italic">Terminal</span>
                    </h3>
                    <div className="h-px w-24 bg-slate-200 dark:bg-white/20 group-hover:w-full transition-all duration-700 ease-expo" />
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic max-w-sm">
                      Certified gateway for TUP-V trainees to document, verify, and accelerate their professional industrial integration.
                    </p>
                  </div>

                  <div className="relative z-10 grid grid-cols-1 gap-5 mb-14 flex-1">
                    {[
                      "Institutional Profile Certification",
                      "SIT Placement Manifest",
                      "Digital Logbook Verification",
                      "Archival Document Repository",
                    ].map((feature, i) => (
                      <div key={feature} className="flex items-center gap-6 border-l border-slate-100 dark:border-white/5 pl-6 py-1 hover:border-primary/30 transition-colors">
                        <span className="text-[11px] font-bold text-slate-300 dark:text-white/10 font-mono tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[12px] font-black text-slate-900 dark:text-slate-300 uppercase tracking-[0.15em]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/login/student"
                    className="relative z-10 w-full inline-flex h-16 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all gap-4 rounded-none overflow-hidden group/btn"
                  >
                    <span className="relative z-10">Initialize Portal Access</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </Reveal>

              {/* Company Card */}
              <Reveal delay={0.2}>
                <div className="group relative flex flex-col h-full bg-white dark:bg-[#050505] border border-slate-200 dark:border-white/10 transition-all hover:border-primary/40 rounded-none overflow-hidden p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                  {/* Technical Background Texture */}
                  <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] pointer-events-none" />
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[40px] font-black select-none group-hover:text-primary/20 transition-colors">02</div>

                  <div className="relative z-10 space-y-6 mb-12">
                    <h3 className="text-5xl font-medium font-serif text-slate-900 dark:text-white leading-tight tracking-tighter">
                      Corporate <span className="italic">Access</span>
                    </h3>
                    <div className="h-px w-24 bg-slate-200 dark:bg-white/20 group-hover:w-full transition-all duration-700 ease-expo" />
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic max-w-sm">
                      Official portal for industrial partners to authenticate trainee performance and manage university collaboration.
                    </p>
                  </div>

                  <div className="relative z-10 grid grid-cols-1 gap-5 mb-14 flex-1">
                    {[
                      "Partner Verification Registry",
                      "Industrial Talent Acquisition",
                      "Performance Evaluation Terminal",
                      "Collaborative SIT Management",
                    ].map((feature, i) => (
                      <div key={feature} className="flex items-center gap-6 border-l border-slate-100 dark:border-white/5 pl-6 py-1 hover:border-primary/30 transition-colors">
                        <span className="text-[11px] font-bold text-slate-300 dark:text-white/10 font-mono tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[12px] font-black text-slate-900 dark:text-slate-300 uppercase tracking-[0.15em]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/login/employer"
                    className="relative z-10 w-full inline-flex h-16 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all gap-4 rounded-none overflow-hidden group/btn"
                  >
                    <span className="relative z-10">Partner Verification</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-2 transition-transform" />
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

        {/* Section 04 — How It Works */}
        <section className="py-40 bg-slate-50 dark:bg-[#0b0b0b] relative overflow-hidden border-t border-slate-100 dark:border-white/5">
          <div className="container mx-auto px-6 relative z-10">
            <Reveal className="max-w-4xl mx-auto text-center mb-32">
              <h2 className="text-5xl md:text-7xl font-medium font-serif text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8 italic">
                How It Works
              </h2>
              <div className="w-24 h-px bg-primary/20 mx-auto mb-10" />
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto text-lg md:text-xl leading-relaxed italic">
                A procedural journey bridging academic training and industrial excellence.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-20 max-w-7xl mx-auto relative">
              {[
                { step: "01", title: "Profile Setup", desc: "Initialize your institutional SIT profile with GSFE credentials.", icon: ShieldCheck },
                { step: "02", title: "Application", desc: "Deploy applications to pre-vetted industry partners matching your skill set.", icon: Zap },
                { step: "03", title: "Evaluation", desc: "Track progress and receive performance audits in real-time.", icon: CheckCircle },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.15}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 rounded-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-12 relative transition-all group-hover:border-primary/40 shadow-sm dark:shadow-none">
                      <span className="absolute -top-4 -right-4 w-10 h-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-black flex items-center justify-center border-4 border-slate-50 dark:border-[#0b0b0b] font-mono">
                        {item.step}
                      </span>
                      <item.icon className="w-10 h-10 text-slate-900 dark:text-white group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h5 className="text-3xl font-medium font-serif text-slate-900 dark:text-white mb-6 italic tracking-tight">
                      {item.title}
                    </h5>
                    <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed px-6 italic">
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
