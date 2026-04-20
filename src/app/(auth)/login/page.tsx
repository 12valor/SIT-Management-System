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
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-6 md:p-12 overflow-hidden">
      <div className="max-w-md w-full">
        {/* Branding Hub */}
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <img 
              src="/Technological_University_of_the_Philippines_Seal.svg" 
              alt="TUP Seal" 
              className="h-20 w-auto object-contain mx-auto" 
            />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-heading uppercase mb-2">
            SIT Management Platform
          </h1>
          <p className="text-sm text-slate-500 font-medium font-sans">
            Technological University of the Philippines - Visayas
          </p>
        </div>

        {/* Interaction Panel */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider font-heading">Sign In</h2>
            <p className="text-xs text-slate-400 font-medium">Select your role to access the portal</p>
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
                    className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:border-primary/20 hover:bg-white hover:shadow-lg hover:shadow-slate-100 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 bg-white group-hover:border-primary/10 transition-all">
                      <Icon className="h-5 w-5 text-slate-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 tracking-tight font-heading uppercase">{role.label}</p>
                      <p className="text-[10px] text-slate-500 font-sans">{role.sub}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-50">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300 font-heading shrink-0">Registration</span>
              <div className="flex-1 border-t border-slate-100" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Link href="/signup/student" className="h-11 flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-white hover:border-primary/30 hover:text-primary transition-all font-heading">
                Student
              </Link>
              <Link href="/signup/employer" className="h-11 flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-white hover:border-primary/30 hover:text-primary transition-all font-heading">
                Employer
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors font-heading group">
            <ArrowRight className="h-3 w-3 rotate-180 group-hover:-translate-x-1 transition-transform" /> 
            Back to landing
          </Link>
        </div>
      </div>
    </div>
  );
}
