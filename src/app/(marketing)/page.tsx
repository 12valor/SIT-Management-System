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
                <div className="group relative flex flex-col h-full bg-[#fdfbf7] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 transition-all hover:border-primary/40 rounded-none overflow-hidden p-12 md:p-16 shadow-sm hover:shadow-xl transition-all duration-700">
                  {/* Institutional Ornament */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-primary/20" />
                  
                  <div className="relative z-10 text-center space-y-8 mb-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 mb-2">Student Division</p>
                    <h3 className="text-5xl font-medium font-serif text-slate-900 dark:text-white leading-tight">
                      SIT <span className="italic">Terminal</span>
                    </h3>
                    <div className="flex items-center justify-center gap-4">
                      <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic max-w-sm mx-auto">
                      Official portal for student trainees to document and certify their industrial immersion journey.
                    </p>
                  </div>

                  <div className="relative z-10 space-y-6 mb-16 flex-1">
                    {[
                      "Institutional Profile Certification",
                      "Digital Logbook Verification",
                      "SIT Placement Manifest",
                      "Archival Repository Access",
                    ].map((feature, i) => (
                      <div key={feature} className="flex flex-col items-center text-center gap-2">
                        <span className="text-[12px] font-black text-slate-900 dark:text-slate-300 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                          {feature}
                        </span>
                        {i < 3 && <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10" />}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/login/student"
                    className="relative z-10 w-full inline-flex h-16 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] border border-transparent hover:bg-transparent hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white transition-all gap-4"
                  >
                    <span>Begin Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>

              {/* Company Card */}
              <Reveal delay={0.2}>
                <div className="group relative flex flex-col h-full bg-[#fdfbf7] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 transition-all hover:border-primary/40 rounded-none overflow-hidden p-12 md:p-16 shadow-sm hover:shadow-xl transition-all duration-700">
                  {/* Institutional Ornament */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-primary/20" />

                  <div className="relative z-10 text-center space-y-8 mb-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 mb-2">Partner Division</p>
                    <h3 className="text-5xl font-medium font-serif text-slate-900 dark:text-white leading-tight">
                      Corporate <span className="italic">Registry</span>
                    </h3>
                    <div className="flex items-center justify-center gap-4">
                      <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic max-w-sm mx-auto">
                      Dignified access for industrial partners to authenticate trainee performance and academic alignment.
                    </p>
                  </div>

                  <div className="relative z-10 space-y-6 mb-16 flex-1">
                    {[
                      "Partner Identity Verification",
                      "Industrial Talent Acquisition",
                      "Performance Auditing Terminal",
                      "Institutional Collaboration",
                    ].map((feature, i) => (
                      <div key={feature} className="flex flex-col items-center text-center gap-2">
                        <span className="text-[12px] font-black text-slate-900 dark:text-slate-300 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                          {feature}
                        </span>
                        {i < 3 && <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10" />}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/login/employer"
                    className="relative z-10 w-full inline-flex h-16 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] border border-transparent hover:bg-transparent hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white transition-all gap-4"
                  >
                    <span>Authenticate Credentials</span>
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
