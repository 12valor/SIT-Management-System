"use client";

import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const roles = [
  {
    id: "TERM_S_01",
    title: "Student Trainee",
    description: "Access your logbook, track hours, and submit daily journals.",
    icon: GraduationCap,
    href: "/login/student",
  },
  {
    id: "TERM_P_02",
    title: "Industry Partner",
    description: "Evaluate trainee performance and manage site supervisors.",
    icon: Building2,
    href: "/login/employer",
  },
  {
    id: "TERM_C_03",
    title: "Coordinator",
    description: "Monitor placements, manage records, and generate reports.",
    icon: ShieldCheck,
    href: "/login/coordinator",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.08 }
  }
};

export default function LoginGatePage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] dark:bg-[#0F1923] flex flex-col items-center justify-center py-20 px-6 font-sans">
      <motion.div 
        className="w-full max-w-5xl"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.header className="mb-16 text-center md:text-left border-b border-slate-200 dark:border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8" variants={fadeUp}>
          <div className="space-y-3">
            <span className="text-sm font-semibold tracking-[0.15em] text-[#C52C3C] dark:text-red-400 uppercase">
              Technological University of the Philippines
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-[#F5F0E8] leading-tight">
              SIT Portal Selection
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md leading-relaxed font-serif">
            Select your designated institutional role to access the training management systems.
          </p>
        </motion.header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <motion.div key={role.title} variants={fadeUp} className="h-full">
              <Link 
                href={role.href}
                className="group flex flex-col h-full bg-white dark:bg-[#1A242D] border border-slate-200 dark:border-white/10 p-8 rounded-xl transition-all hover:border-[#C52C3C]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#FAFAF7] dark:bg-[#0F1923] border border-slate-100 dark:border-white/5 mb-6 text-slate-600 dark:text-slate-400 group-hover:text-[#C52C3C] dark:group-hover:text-red-400 transition-colors">
                  <role.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-serif font-medium text-slate-900 dark:text-[#F5F0E8] group-hover:text-[#C52C3C] dark:group-hover:text-red-400 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-500 group-hover:text-[#C52C3C] dark:group-hover:text-red-400 transition-colors">
                  <span>Enter Portal</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </section>

        <motion.footer className="mt-20 text-center" variants={fadeUp}>
          <p className="text-slate-500 dark:text-slate-400 font-serif italic mb-4">
            Need institutional assistance?
          </p>
          <Link 
            href="/faq"
            className="group relative inline-flex items-center justify-center h-14 px-10 bg-[#C52C3C] dark:bg-red-900 text-white font-bold rounded-full overflow-hidden transition-all active:scale-95 shadow-lg shadow-[#C52C3C]/20"
          >
            <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
              Contact the Registrar
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-slate-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          </Link>
        </motion.footer>
      </motion.div>
    </main>
  );
}


