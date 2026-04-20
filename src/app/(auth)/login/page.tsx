"use client";

import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const roles = [
  {
    key: "student",
    label: "Student",
    sub: "Track your SIT hours and logbook",
    icon: GraduationCap,
    href: "/login/student",
  },
  {
    key: "employer",
    label: "Employer",
    sub: "Post roles and manage trainees",
    icon: Building2,
    href: "/login/employer",
  },
  {
    key: "coordinator",
    label: "Coordinator",
    sub: "Manage students and companies",
    icon: ShieldCheck,
    href: "/login/coordinator",
  },
];

export default function LoginGatePage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white relative overflow-x-hidden">
      {/* Background Layer: Subtle Institutional Texture */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
        <Image 
          src="/images/auth/gate.png" 
          alt="University Campus" 
          fill
          className="object-cover grayscale"
          priority
        />
      </div>

      {/* Institutional Top Bar */}
      <header className="relative z-20 w-full bg-white border-b border-slate-100 py-5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img 
              src="/Technological_University_of_the_Philippines_Seal.svg.png" 
              alt="TUP Seal" 
              className="h-12 w-auto object-contain" 
            />
            <div className="flex flex-col items-start leading-tight">
               <h1 className="text-lg font-black text-slate-900 tracking-tight font-heading uppercase">TUP-Visayas</h1>
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] font-sans">SIT Monitoring System</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-heading">Academic Session</p>
              <p className="text-[10px] font-bold text-slate-900 font-sans">2023 - 2024</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-6xl w-full">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-heading uppercase mb-4">Portal Access Gateway</h2>
             <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" />
             <p className="text-sm text-slate-500 font-medium font-sans">Select your specific institutional role to access the supervision terminal.</p>
          </div>

          {/* Role Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.key}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-8 pt-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/60 hover:border-primary/20 overflow-hidden">
                    {/* Visual Decor: Watermark Icon */}
                    <div className="absolute top-6 right-6 opacity-[0.08] transition-transform duration-700 group-hover:scale-110 group-hover:opacity-[0.12]">
                       <Icon className="h-28 w-28 text-slate-900" strokeWidth={1} />
                    </div>

                    {/* Small Icon Box */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-10 transition-colors group-hover:bg-primary/5 group-hover:border-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <div className="flex-1 mb-10">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight font-heading uppercase mb-2">{role.label}</h3>
                      <p className="text-xs leading-relaxed text-slate-400 font-sans font-medium">{role.sub}</p>
                    </div>

                    <Link
                      href={role.href}
                      className="w-full h-14 flex items-center justify-center rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-900 active:scale-[0.98] shadow-lg shadow-primary/10 font-heading"
                    >
                      Enter Terminal <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Registry Services */}
          <div className="mt-24 md:mt-32 pt-12 border-t border-slate-100 flex flex-col items-center">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10 font-heading">Registry Services</h4>
            
            <div className="flex flex-wrap justify-center gap-5">
              <Link 
                href="/signup/student" 
                className="h-14 px-10 flex items-center justify-center rounded-full border border-slate-300 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all font-heading"
              >
                New Student Registration
              </Link>
              <Link 
                href="/signup/employer" 
                className="h-14 px-10 flex items-center justify-center rounded-full border border-slate-300 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all font-heading"
              >
                Corporate Partnership Application
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="relative z-20 py-10 px-8 text-center border-t border-slate-50">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] font-heading">
          © 2024 Technological University of the Philippines Visayas • Secure Access Terminal
        </p>
      </footer>
    </div>
  );
}
