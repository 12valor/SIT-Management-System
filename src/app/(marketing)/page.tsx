"use client";

import Link from "next/link";
import { GraduationCap, CheckCircle, ArrowRight, Sparkles, Building2, ShieldCheck, Zap } from "lucide-react";
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

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Student Card - Technical Manual Style */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col h-full bg-white dark:bg-white/[0.02] border-t-4 border-t-primary border-x border-b border-slate-200 dark:border-white/10 p-10 lg:p-12 transition-all hover:bg-slate-50/50 dark:hover:bg-white/[0.04] rounded-[5px] overflow-hidden"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] font-mono">PORTAL_TYPE_01</span>
                  <div className="w-12 h-12 border border-primary/20 flex items-center justify-center text-primary bg-primary/5 rounded-[5px]">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="space-y-4 mb-10">
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Student Terminal</h3>
                  <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Build your professional identity, discover premier internship opportunities, and track your SIT progress with institutional precision.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-12 flex-1">
                  {[
                    "Institutional Profile Builder", 
                    "Seamless Internship Applications", 
                    "Digital Daily Journal Tracking", 
                    "SIT Document Repository"
                  ].map((feature, i) => (
                    <div key={feature} className="flex items-center gap-4 group/item">
                      <span className="text-[9px] font-bold text-slate-300 dark:text-white/20 font-mono">0{i+1}</span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/login/student" className="w-full inline-flex h-14 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all gap-3 rounded-[5px]">
                  Launch Student Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Company Card - Registry Terminal Style */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col h-full bg-slate-50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/10 p-10 lg:p-12 transition-all hover:border-slate-400 dark:hover:border-white/20 rounded-[5px] overflow-hidden"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] font-mono">PORTAL_TYPE_02</span>
                  <div className="w-12 h-12 border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-600 dark:text-slate-300 rounded-[5px]">
                    <Building2 className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="space-y-4 mb-10">
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Corporate Access</h3>
                  <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Access high-caliber TUP-V talent, post strategic internship roles, and monitor trainee performance via a secure corporate terminal.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-12 flex-1">
                  {[
                    "Premium Talent Acquisition", 
                    "Automated Applicant Filtering", 
                    "Digital Evaluation Terminal", 
                    "Direct Performance Feedback"
                  ].map((feature, i) => (
                    <div key={feature} className="flex items-center gap-4 group/item">
                      <span className="text-[9px] font-bold text-slate-300 dark:text-white/20 font-mono">0{i+1}</span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/login/employer" className="w-full inline-flex h-14 items-center justify-center border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all gap-3 rounded-[5px]">
                  Partner Verification
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>


          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 bg-slate-50/50 dark:bg-white/[0.01] border-y border-slate-100 dark:border-white/5 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight mb-6">How It Works</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-8" />
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                A procedural journey bridging academic training and industrial excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto relative">

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

      </main>
    </div>
  );
}
