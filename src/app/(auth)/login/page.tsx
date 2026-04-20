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
    accent: "text-slate-900",
    border: "hover:border-slate-900/10",
    bg: "hover:bg-slate-50",
  },
  {
    key: "employer",
    label: "Employer",
    sub: "Post roles and manage trainees",
    icon: Building2,
    href: "/login/employer",
    accent: "text-slate-900",
    border: "hover:border-slate-900/10",
    bg: "hover:bg-slate-50",
  },
  {
    key: "coordinator",
    label: "Coordinator",
    sub: "Manage students and companies",
    icon: ShieldCheck,
    href: "/login/coordinator",
    accent: "text-slate-900",
    border: "hover:border-slate-900/10",
    bg: "hover:bg-slate-50",
  },
];

export default function LoginGatePage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 relative overflow-x-hidden">
      {/* Background Layer: Institutional Subtlety */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image 
          src="/images/auth/gate.png" 
          alt="University Campus" 
          fill
          className="object-cover opacity-10 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-slate-100/50" />
      </div>

      {/* Institutional Top Bar */}
      <header className="relative z-20 w-full bg-white border-b border-slate-200 py-6 px-10 shadow-sm transition-all duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <img 
              src="/Technological_University_of_the_Philippines_Seal.svg.png" 
              alt="TUP Seal" 
              className="h-14 w-auto object-contain" 
            />
            <div className="h-10 w-px bg-slate-200 lg:block hidden" />
            <div className="flex flex-col items-start leading-tight">
               <h1 className="text-xl font-black text-slate-900 tracking-tight font-heading uppercase">TUP-Visayas</h1>
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] font-sans">SIT Monitoring System</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-heading mb-0.5">Academic Session</p>
              <p className="text-[10px] font-medium text-slate-400 font-sans">2023 - 2024</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-slate-300" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full">
          <div className="mb-14 text-center">
             <h2 className="text-4xl font-bold text-slate-900 tracking-tighter font-heading uppercase mb-3">Portal Access Gateway</h2>
             <div className="w-12 h-1.5 bg-primary mx-auto rounded-full mb-6" />
             <p className="text-sm text-slate-500 font-medium font-sans">Select your specific institutional role to access the supervision terminal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    href={role.href}
                    className="flex flex-col h-full bg-white rounded-xl border border-slate-200 p-8 hover:border-primary/30 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                       <Icon className="h-24 w-24 text-slate-900" />
                    </div>
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0 bg-slate-50 border border-slate-100 mb-8 transition-colors group-hover:bg-primary group-hover:border-primary">
                      <Icon className="h-7 w-7 text-slate-900 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-slate-900 tracking-tight font-heading uppercase mb-2">{role.label}</h3>
                      <p className="text-[11px] leading-relaxed text-slate-500 font-sans font-medium">{role.sub}</p>
                    </div>
                    <div className="mt-10 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                      Enter Terminal <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 pt-10 border-t border-slate-200 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 font-heading">Registry Services</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup/student" className="px-8 py-3.5 flex items-center justify-center rounded-lg border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all font-heading shadow-sm">
                New Student Registration
              </Link>
              <Link href="/signup/employer" className="px-8 py-3.5 flex items-center justify-center rounded-lg border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all font-heading shadow-sm">
                Corporate Partnership Application
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-20 py-8 px-10 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-heading">
            © 2024 Technological University of the Philippines Visayas
          </p>
          <div className="flex items-center gap-8">
             <Link href="/" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors font-heading">Institutional Policy</Link>
             <Link href="/" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors font-heading">System Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
