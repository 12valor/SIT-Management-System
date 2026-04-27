"use client";

import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Building2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const roles = [
  {
    id: "TERM_S_01",
    title: "Student",
    description: "Manage your SIT logbook, journals, and view your evaluation reports.",
    icon: GraduationCap,
    href: "/login/student",
  },
  {
    id: "TERM_P_02",
    title: "Industry Partner",
    description: "Verify trainee attendance and evaluate student performance in the field.",
    icon: Building2,
    href: "/login/employer",
  },
  {
    id: "TERM_C_03",
    title: "Coordinator",
    description: "Institutional oversight, SIT management, and student placement monitoring.",
    icon: ShieldCheck,
    href: "/login/coordinator",
  },
];

export default function LoginGatePage() {
  return (
    <div className="flex-1 flex flex-col pt-32 pb-24 bg-white dark:bg-[#050505]">
      
      {/* HEADER */}
      <div className="flex flex-col items-center justify-center mb-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-16"
        >
          <Image 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            width={40}
            height={40}
            className="h-10 w-auto grayscale dark:grayscale-0 dark:logo-red-filter" 
          />
          <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 font-sans">TUP-Visayas</span>
        </motion.div>
        
        <h2 className="text-5xl md:text-7xl font-black text-center text-slate-900 dark:text-white uppercase tracking-tighter max-w-4xl leading-[0.9]">
          Portal Selection
        </h2>
      </div>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200 dark:border-white/10">
          {roles.map((role, idx) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <Link 
                href={role.href}
                className="group relative flex flex-col h-full bg-white dark:bg-[#0a0a0a] border-r last:border-r-0 border-slate-200 dark:border-white/10 p-12 transition-all duration-500 hover:bg-slate-50 dark:hover:bg-white/[0.02]"
              >
                {/* Header: ID + Icon */}
                <div className="flex items-center justify-between mb-12">
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-white/20 tracking-widest">{role.id}</span>
                  <div className="w-10 h-10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-300 bg-white dark:bg-transparent rounded-sm transition-all group-hover:border-primary/40 group-hover:text-primary">
                    <role.icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-12 flex-1">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>
                  <div className="h-px w-12 bg-slate-200 dark:bg-white/10 group-hover:w-full transition-all duration-700" />
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                    {role.description}
                  </p>
                </div>

                {/* Footer: Action */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                   <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">Launch Module</span>
                   <div className="w-6 h-6 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white/20 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                      <div className="w-1.5 h-1.5 bg-current rounded-full" />
                   </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}




