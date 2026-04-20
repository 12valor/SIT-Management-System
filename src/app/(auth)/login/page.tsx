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
    <div className="min-h-screen w-full flex flex-col items-center justify-start relative overflow-y-auto bg-slate-900 py-12 md:py-20 lg:py-24">
      {/* Dynamic Background with Maroon Overlay */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/images/auth/gate.png" 
          alt="University Campus" 
          fill
          className="object-cover opacity-25 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
      </div>

      <div className="max-w-md w-full relative z-10 px-6">
        {/* TUPv Branding Hub */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <div className="bg-white/95 p-3 rounded-2xl shadow-xl shadow-black/20 backdrop-blur-sm border border-white/20">
              <img 
                src="/Technological_University_of_the_Philippines_Seal.svg.png" 
                alt="TUP Seal" 
                className="h-20 w-auto object-contain" 
              />
            </div>
            <div className="h-20 w-px bg-white/20" />
            <div className="flex flex-col items-start">
               <h1 className="text-4xl font-black text-white tracking-tighter leading-none font-heading uppercase">TUPv</h1>
               <span className="text-[11px] font-bold text-white/50 uppercase tracking-[0.4em] mt-3 font-sans">SIT Platform</span>
            </div>
          </motion.div>
        </div>

        {/* Interaction Panel */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/50 border border-white/10 backdrop-blur-sm">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-heading uppercase mb-1">Sign In</h2>
            <p className="text-xs text-slate-500 font-medium font-sans">Access your designated institutional portal.</p>
          </div>

          <div className="space-y-4">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.key}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <Link
                    href={role.href}
                    className="flex items-center gap-5 p-5 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:bg-slate-50 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 bg-slate-50 group-hover:border-primary/10 transition-all shadow-sm">
                      <Icon className="h-6 w-6 text-slate-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold text-slate-900 tracking-tight font-heading uppercase">{role.label}</p>
                      <p className="text-[10px] text-slate-500 font-sans tracking-wide">{role.sub}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-heading">Registration Portals</span>
              <div className="flex-1 border-t border-slate-100" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link href="/signup/student" className="h-12 flex items-center justify-center rounded-xl border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-all font-heading">
                Student
              </Link>
              <Link href="/signup/employer" className="h-12 flex items-center justify-center rounded-xl border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-all font-heading">
                Employer
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center pb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors font-heading group">
            <ArrowRight className="h-3 w-3 rotate-180 group-hover:-translate-x-1 transition-transform" /> 
            Back to landing
          </Link>
        </div>
      </div>
    </div>
  );
}
