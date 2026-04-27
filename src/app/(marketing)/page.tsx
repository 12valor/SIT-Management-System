"use client";

import Link from "next/link";
import {
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Building2,
  ShieldCheck,
  Zap,
  FileCheck,
  Clock,
  FolderOpen,
  Users,
  ClipboardList,
  BadgeCheck,
  BarChart2,
  Archive,
} from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PARTNERS = [
  { name: "Aboitiz Power Corporation", sector: "Energy" },
  { name: "MORE Electric and Power", sector: "Utilities" },
  { name: "Globe Telecom Inc.", sector: "Telecommunications" },
  { name: "Concentrix Philippines", sector: "Technology Services" },
  { name: "First Gen Corporation", sector: "Renewable Energy" },
  { name: "Jollibee Foods Corporation", sector: "Food Technology" },
  { name: "SM Development Corporation", sector: "Construction" },
  { name: "DOST Region VI", sector: "Government Research" },
  { name: "PhilRice Research Center", sector: "Agricultural Engineering" },
  { name: "BDO Unibank", sector: "Financial Technology" },
  { name: "Mang Inasal Philippines", sector: "Food Manufacturing" },
  { name: "Penshoppe Group", sector: "Retail Manufacturing" },
];

const CAPABILITIES = [
  {
    role: "Student Portal",
    items: [
      { icon: FileCheck, label: "Digital Logbook with Supervisor Sign-Off" },
      { icon: Clock, label: "Real-Time Hour Tracking Against Program Units" },
      { icon: FolderOpen, label: "Document Repository for MOA and Endorsements" },
      { icon: Archive, label: "Performance Evaluation Receipt and Archive" },
    ],
  },
  {
    role: "Employer Portal",
    items: [
      { icon: BadgeCheck, label: "GSFE-Authenticated Trainee Verification" },
      { icon: ClipboardList, label: "Evaluation Form Submission and Certification" },
      { icon: Users, label: "Direct Communication with Coordinator Office" },
      { icon: BarChart2, label: "Multi-Trainee Progress Monitoring" },
    ],
  },
  {
    role: "Coordinator Office",
    items: [
      { icon: Users, label: "Batch Student Placement Administration" },
      { icon: BadgeCheck, label: "Industry Partner Accreditation Management" },
      { icon: BarChart2, label: "Evaluation Aggregation and Grade Computation" },
      { icon: Archive, label: "Institutional Compliance Audit Trail" },
    ],
  },
];

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

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const words = text.split(" ");

  return (
    <h2
      ref={ref}
      className="text-4xl md:text-5xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight mb-4 flex flex-wrap justify-center gap-x-3"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.05, ease: EASE_EXPO }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

export default function Home() {
  const partnerTape = [...PARTNERS, ...PARTNERS];

  return (
    <div className="flex flex-col">
      <main>
        <HeroCarousel />

        {/* Partner Registry Strip */}
        <div className="bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5 py-5 overflow-hidden transition-colors">
          <div className="flex items-center gap-10 mb-3 px-6">
            <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] shrink-0">
              Registered Partners
            </span>
            <div className="h-px flex-1 bg-slate-100 dark:bg-white/10" />
            <span className="text-[9px] font-mono font-bold text-slate-300 dark:text-white/20 uppercase tracking-[0.15em] shrink-0">
              Academic Year 2024–2025
            </span>
          </div>
          <div className="overflow-hidden">
            <div className="flex animate-marquee w-max">
              {partnerTape.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center shrink-0 px-8"
                >
                  <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-white/60 uppercase tracking-[0.15em] whitespace-nowrap transition-colors">
                    {p.name}
                  </span>
                  <span className="mx-4 text-slate-200 dark:text-white/15 text-[10px] font-mono">·</span>
                  <span className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest whitespace-nowrap transition-colors">
                    {p.sector}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gateway Cards */}
        <section className="py-28 relative overflow-hidden bg-white dark:bg-[#050505]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <WordReveal text="Select Your Gateway" />
              <Reveal delay={0.2}>
                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                  Connect with the official TUP-V Supervised Industrial Training platform. Designed for excellence, engineered for career growth.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Reveal delay={0.15}>
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

              <Reveal delay={0.28}>
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

        {/* Platform Capabilities */}
        <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors border-y border-slate-100 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="flex items-center gap-6 mb-16">
                <div>
                  <p className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-1">
                    System Reference
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight">
                    Platform Architecture
                  </h2>
                </div>
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Capabilities list */}
              <div className="lg:col-span-7 space-y-0">
                {CAPABILITIES.map((section, si) => (
                  <Reveal key={section.role} delay={si * 0.1}>
                    <div className="border-t border-slate-200 dark:border-white/10 py-8">
                      <p className="text-[9px] font-mono font-bold text-primary/80 uppercase tracking-[0.25em] mb-5">
                        {section.role}
                      </p>
                      <div className="space-y-4">
                        {section.items.map((item, ii) => (
                          <div key={item.label} className="flex items-center gap-4">
                            <span className="text-[9px] font-mono text-slate-400 dark:text-white/20 w-5 shrink-0 tabular-nums">
                              {String(ii + 1).padStart(2, "0")}
                            </span>
                            <item.icon className="w-3.5 h-3.5 text-slate-300 dark:text-white/30 shrink-0" />
                            <span className="text-xs font-bold text-slate-700 dark:text-white/70 uppercase tracking-widest leading-relaxed transition-colors">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Archive record panel */}
              <Reveal delay={0.2} className="lg:col-span-5">
                <div className="bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 p-8 h-full font-mono transition-colors">
                  <p className="text-[9px] text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-6">
                    System Record
                  </p>
                  <div className="space-y-0">
                    {[
                      ["INSTITUTION", "TUP-V"],
                      ["COLLEGE", "Engineering"],
                      ["PROGRAM", "Supervised Industrial Training"],
                      ["CYCLE", "2024–2025"],
                      ["STATUS", "ACTIVE"],
                    ].map(([key, val]) => (
                      <div key={key} className="flex gap-4 py-3 border-b border-slate-100 dark:border-white/5">
                        <span className="text-[9px] text-slate-400 dark:text-white/25 uppercase tracking-widest w-28 shrink-0">
                          {key}
                        </span>
                        <span className="text-[10px] text-slate-600 dark:text-white/60 uppercase tracking-wide">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 space-y-0">
                    {[
                      ["Enrolled", "312"],
                      ["Partners", "24"],
                      ["Hours Logged", "48,620"],
                      ["Compliance", "100%"],
                    ].map(([key, val]) => (
                      <div key={key} className="flex justify-between items-baseline py-3 border-b border-slate-100 dark:border-white/5 last:border-0">
                        <span className="text-[9px] text-slate-400 dark:text-white/25 uppercase tracking-widest">
                          {key}
                        </span>
                        <span className="text-sm font-bold text-slate-800 dark:text-white/80 tabular-nums">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[8px] text-slate-300 dark:text-white/15 uppercase tracking-[0.15em] mt-8">
                    Data as of December 2024
                  </p>
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
              "Managing student placements across dozens of industry partners once required weeks of coordination. The platform reduced our processing cycle to a single working day."
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
