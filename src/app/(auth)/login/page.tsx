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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LoginGatePage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-32 pb-24 px-6 transition-colors duration-300">
      <motion.div 
        className="container mx-auto max-w-6xl"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* HEADER */}
        <motion.header className="mb-24 text-center" variants={fadeInUp}>
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="flex items-center gap-4 mb-8">
              <Image 
                src="/Technological_University_of_the_Philippines_Seal.svg.png" 
                alt="TUP Seal" 
                width={40}
                height={40}
                className="h-10 w-auto grayscale dark:grayscale-0 dark:logo-red-filter opacity-80" 
              />
              <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 font-sans">TUP-Visayas</span>
            </div>
            
            <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
              Authentication Gateway
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-slate-900 dark:text-white mb-6">
              Portal Selection
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto font-serif">
              Select the appropriate digital terminal to begin your institutional session.
            </p>
          </div>
        </motion.header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, idx) => (
            <motion.div
              key={role.title}
              variants={fadeInUp}
              className="relative"
            >
              <Link 
                href={role.href}
                className="group flex flex-col h-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-12 rounded-2xl transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
              >
                {/* Header: ID + Icon */}
                <div className="flex items-center justify-between mb-12">
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-white/20 tracking-widest">{role.id}</span>
                  <div className="w-10 h-10 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-white/5 rounded-full transition-all group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20">
                    <role.icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-12 flex-1">
                  <h3 className="text-2xl font-serif font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>
                  <div className="h-px w-12 bg-slate-100 dark:bg-white/5 group-hover:w-full transition-all duration-700" />
                  <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-serif italic">
                    {role.description}
                  </p>
                </div>

                {/* Footer: Action */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                   <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 font-sans">Launch Module</span>
                   <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white/20 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                      <div className="w-1.5 h-1.5 bg-current rounded-full" />
                   </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>

        <motion.footer 
          className="mt-24 pt-12 border-t border-slate-200 dark:border-white/10 text-center"
          variants={fadeInUp}
        >
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-serif">
            Need technical assistance or portal access?
          </p>
          <Link 
            href="/faq"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 font-serif"
          >
            Consult FAQ Registry
          </Link>
        </motion.footer>
      </motion.div>
    </main>
  );
}
