"use client";

import Link from "next/link";
import { Briefcase, GraduationCap, CheckCircle, ArrowRight, Sparkles, Building2, Users, Rocket, Target, ShieldCheck, Zap } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#050505]">

      <main className="flex-1">
        <HeroCarousel />
        
        {/* Entry Points Section */}
        <section className="py-32 relative overflow-hidden bg-white dark:bg-[#050505]">
          {/* Subtle Background Accents */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-[120px] -z-10" />

          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4"
              >
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Institutional Access</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight mb-4">Select Your Gateway</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                Connect with the official TUP-V Supervised Industrial Training platform. Designed for excellence, engineered for career growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {/* Student Card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-transparent rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative p-10 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-2xl hover:shadow-primary/5">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-3xl font-bold font-premium text-slate-900 dark:text-white mb-4 uppercase tracking-tight">For Students</h3>
                  <p className="text-[15px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                    Build your professional identity, discover premier internship opportunities, and track your SIT progress with institutional precision.
                  </p>
                  
                  <ul className="space-y-4 mb-12 flex-1">
                    {["Institutional Profile Builder", "Seamless Internship Applications", "Digital Daily Journal Tracking", "SIT Document Repository"].map((feature) => (
                      <li key={feature} className="flex items-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                          <CheckCircle className="h-3 w-3 text-primary" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href="/login" className="group/btn w-full inline-flex h-14 items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-widest hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-lg shadow-slate-900/10 gap-3">
                    Launch Student Portal
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Company Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-slate-500/20 to-transparent rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative p-10 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 hover:border-slate-400/30 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-2xl hover:shadow-slate-500/5">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                    <Building2 className="h-8 w-8 text-slate-700 dark:text-slate-300" />
                  </div>
                  
                  <h3 className="text-3xl font-bold font-premium text-slate-900 dark:text-white mb-4 uppercase tracking-tight">For Partners</h3>
                  <p className="text-[15px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                    Access high-caliber TUP-V talent, post strategic internship roles, and monitor trainee performance via a secure corporate terminal.
                  </p>
                  
                  <ul className="space-y-4 mb-12 flex-1">
                    {["Premium Talent Acquisition", "Automated Applicant Filtering", "Digital Evaluation Terminal", "Direct Performance Feedback"].map((feature) => (
                      <li key={feature} className="flex items-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center mr-3 shrink-0">
                          <CheckCircle className="h-3 w-3 text-slate-500 dark:text-slate-300" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href="/login" className="group/btn w-full inline-flex h-14 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 transition-all shadow-lg shadow-slate-100/10 gap-3">
                    Corporate Access
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 bg-slate-50/50 dark:bg-white/[0.01] border-y border-slate-100 dark:border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight mb-6">How It Works</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-8" />
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                A streamlined, three-step process designed to bridge the gap between academic training and industrial excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-1/4 left-0 w-full h-px bg-slate-200 dark:bg-white/10 -z-10" />

              {[
                { 
                  step: "01", 
                  title: "Profile Setup", 
                  desc: "Create your institutional SIT profile with GSFE credentials.", 
                  icon: ShieldCheck 
                },
                { 
                  step: "02", 
                  title: "Application", 
                  desc: "Apply to pre-vetted industry partners matching your skill set.", 
                  icon: Zap 
                },
                { 
                  step: "03", 
                  title: "Evaluation", 
                  desc: "Track progress and receive performance audits in real-time.", 
                  icon: CheckCircle 
                }
              ].map((step, i) => (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-8 shadow-xl shadow-slate-200/20 dark:shadow-none relative group transition-all hover:border-primary/50">
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black flex items-center justify-center border-4 border-white dark:border-[#050505]">{step.step}</span>
                    <step.icon className="w-8 h-8 text-slate-900 dark:text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <h5 className="text-xl font-bold font-premium text-slate-900 dark:text-white mb-3 uppercase tracking-tight">{step.title}</h5>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed px-4">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Marquee Strip */}
        <section className="py-20 bg-white dark:bg-[#050505] overflow-hidden">
          <div className="container mx-auto px-6 mb-12 text-center">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mb-4">Official Training Partners</p>
          </div>
          <div className="flex space-x-20 animate-none opacity-30 grayscale hover:grayscale-0 transition-all cursor-default overflow-hidden whitespace-nowrap justify-center items-center">
            {["INTEL", "ACCENTURE", "GLOBE", "SMART", "MERALCO", "PETRON"].map((partner) => (
              <span key={partner} className="text-3xl font-black font-premium text-slate-400 dark:text-white/20 tracking-tighter hover:text-primary transition-colors">{partner}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
