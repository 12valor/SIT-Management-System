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
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Left side - Unified Branding Panel */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-[45%] bg-slate-950 flex-col justify-between p-16 overflow-hidden h-full">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/auth/gate.png" 
            alt="University Campus" 
            fill
            className="object-cover opacity-20 grayscale brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        {/* Brand Identity */}
        <div className="relative z-10">
          <img src="/Technological_University_of_the_Philippines_Seal.svg.png" alt="TUP Seal" className="h-16 w-auto object-contain" />
        </div>

        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 font-heading">
              SIT Management Platform
            </h1>
            <p className="text-lg text-slate-400 font-medium leading-relaxed font-sans">
              Professional Training & Industry Immersion gateway for Technological University of the Philippines - Visayas.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10">
          <div className="w-12 h-1 bg-primary/40 rounded-full" />
        </div>
      </div>

      {/* Right side - Ergonomic Interaction Panel */}
      <div className="flex-1 flex flex-col justify-center bg-white relative z-20 p-8 sm:p-12 lg:p-24 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2 font-heading uppercase">Sign In</h2>
            <p className="text-sm text-slate-500 font-medium font-sans">Select your designated portal to continue.</p>
          </div>

          <div className="space-y-4">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    href={role.href}
                    className="flex items-center gap-5 p-5 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:bg-slate-50/50 hover:shadow-xl hover:shadow-slate-200/50 transition-all group lg:min-h-[100px]"
                  >
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 bg-slate-50 group-hover:border-primary/10 transition-all group-hover:scale-105">
                      <Icon className="h-6 w-6 text-slate-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold text-slate-900 tracking-tight font-heading uppercase">{role.label}</p>
                      <p className="text-xs text-slate-500 mt-1 font-sans">{role.sub}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-heading">Registration Options</span>
              <div className="flex-1 border-t border-slate-100" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link href="/signup/student" className="h-12 flex items-center justify-center rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 hover:border-primary/30 transition-all font-heading">
                Student
              </Link>
              <Link href="/signup/employer" className="h-12 flex items-center justify-center rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 hover:border-primary/30 transition-all font-heading">
                Employer
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors font-heading group">
              <ArrowRight className="h-3 w-3 rotate-180 group-hover:-translate-x-1 transition-transform" /> 
              Back to landing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
