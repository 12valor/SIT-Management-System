"use client";

import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Building2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const roles = [
  {
    title: "Student",
    description: "Manage your SIT logbook, journals, and view your evaluation reports.",
    icon: GraduationCap,
    href: "/login/student",
    color: "bg-primary",
  },
  {
    title: "Industry Partner",
    description: "Verify trainee attendance and evaluate student performance in the field.",
    icon: Building2,
    href: "/login/employer",
    color: "bg-slate-700",
  },
  {
    title: "Coordinator",
    description: "Institutional oversight, SIT management, and student placement monitoring.",
    icon: ShieldCheck,
    href: "/login/coordinator",
    color: "bg-red-700",
  },
];

export default function LoginGatePage() {
  return (
    <div className="flex-1 flex flex-col pt-32 pb-24 bg-slate-50/50 dark:bg-[#050505]">
      
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
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white font-poppins">TUP-Visayas</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-black text-center text-slate-900 dark:text-white uppercase tracking-tighter max-w-4xl leading-[0.9] font-poppins">
          Portal Selection
        </h2>
      </div>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, idx) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                href={role.href}
                className="group relative flex flex-col h-full bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 p-10 rounded-sm shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none hover:border-primary/50 transition-all duration-500 font-poppins"
              >
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                  {role.title}
                </h3>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                  {role.description}
                </p>

                <div className="pt-6 border-t border-slate-50 dark:border-white/5">
                   <span className="text-[10px] font-black text-slate-400 group-hover:text-primary uppercase tracking-[0.2em] transition-colors">Launch Module</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}




