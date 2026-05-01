"use client";

import Link from "next/link";
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
          {roles.map((role) => (
            <motion.div
              key={role.title}
              variants={fadeInUp}
              className="h-full"
            >
              <Link 
                href={role.href}
                className="group flex flex-col h-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-8 rounded-2xl transition-all duration-300 hover:border-primary/40 hover:bg-slate-50/50 dark:hover:bg-white/[0.04]"
              >
                {/* Clean, unboxed icon */}
                <div className="mb-8 text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors duration-300">
                  <role.icon className="w-10 h-10" strokeWidth={1.25} />
                </div>

                {/* Content */}
                <div className="flex-1 mb-12">
                  <h3 className="text-2xl font-serif font-medium text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {role.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-serif leading-relaxed text-[15px]">
                    {role.description}
                  </p>
                </div>

                {/* Understated Editorial CTA */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-6">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors duration-300">
                    Enter Gateway
                  </span>
                  <div className="w-8 h-8 rounded-full border border-transparent group-hover:border-primary/20 flex items-center justify-center transition-all duration-300 bg-slate-50 dark:bg-white/5 group-hover:bg-primary/5">
                    <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-primary transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
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
            className="group relative inline-flex items-center justify-center h-14 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-full overflow-hidden transition-transform active:scale-95 shadow-lg font-serif"
          >
            <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
              Consult FAQ Registry
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          </Link>
        </motion.footer>
      </motion.div>
    </main>
  );
}

