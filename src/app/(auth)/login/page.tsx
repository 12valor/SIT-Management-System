"use client";

import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Building2, ShieldCheck, ArrowRight } from "lucide-react";
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
                className="group flex flex-col h-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-10 rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-2"
              >
                {/* RE-DESIGNED HEADER: CENTERED FLOATING ICON */}
                <div className="flex justify-center mb-12 relative">
                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 flex items-center justify-center blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                    <role.icon className="w-24 h-24 text-primary" />
                  </div>
                  
                  {/* Icon Container */}
                  <div className="relative w-24 h-24 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[2rem] flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/10">
                    <role.icon className="w-12 h-12" strokeWidth={1} />
                    
                    {/* Corner Accent */}
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-slate-200 dark:bg-white/10 group-hover:bg-primary transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-12 flex-1">
                  <h3 className="text-3xl font-serif font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-serif italic">
                    {role.description}
                  </p>
                </div>

                {/* VISIBLE LOGIN BUTTON — SOLID RED */}
                <div className="mt-auto pt-8 border-t border-slate-50 dark:border-white/5">
                   <div className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-2xl font-serif font-medium border border-transparent transition-all group-hover:bg-primary/90 shadow-lg shadow-primary/20">
                      <span>Log In to Portal</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
            className="inline-flex items-center justify-center px-8 py-4 bg-primary/5 text-primary border border-primary/20 font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-serif"
          >
            Consult FAQ Registry
          </Link>
        </motion.footer>
      </motion.div>
    </main>
  );
}
