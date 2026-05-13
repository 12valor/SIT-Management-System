"use client";

import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const roles = [
  {
    id: "TERM_S_01",
    title: "Student",
    description: "Access your SIT logbook, track your internship hours, and manage your daily journals.",
    icon: GraduationCap,
    href: "/login/student",
  },
  {
    id: "TERM_P_02",
    title: "Industry Partner",
    description: "Review trainee attendance, evaluate field performance, and manage site supervisors.",
    icon: Building2,
    href: "/login/employer",
  },
  {
    id: "TERM_C_03",
    title: "Coordinator",
    description: "Monitor student placements, manage institutional records, and generate SIT reports.",
    icon: ShieldCheck,
    href: "/login/coordinator",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/5 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] -z-10" />

      <motion.div 
        className="container mx-auto max-w-6xl px-6 pt-32 pb-24"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* HEADER */}
        <motion.header className="mb-20" variants={fadeInUp}>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="px-4 py-1.5 rounded-full bg-secondary border border-border/50 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Institutional Gateway
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Portal Selection
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose your designated portal to securely access the Supervised Industrial Training management system.
            </p>
          </div>
        </motion.header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((role) => (
            <motion.div
              key={role.title}
              variants={fadeInUp}
              className="h-full"
            >
              <Link 
                href={role.href}
                className="group relative flex flex-col h-full bg-card/50 backdrop-blur-sm border border-border/60 p-8 rounded-[2rem] transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 hover:bg-card active:scale-[0.98]"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-secondary border border-border/50 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:border-primary">
                  <role.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {role.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">
                    {role.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="mt-12 flex items-center justify-between group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-sm font-semibold tracking-wide text-foreground/80 group-hover:text-primary transition-colors duration-300">
                    Access Portal
                  </span>
                  <div className="w-10 h-10 rounded-full bg-secondary border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-all duration-300" strokeWidth={2} />
                  </div>
                </div>

                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </section>

        <motion.footer 
          className="mt-20 pt-12 border-t border-border/50 flex flex-col items-center gap-8"
          variants={fadeInUp}
        >
          <p className="text-muted-foreground text-sm">
            Need technical assistance or portal access?
          </p>
          <Link 
            href="/faq"
            className="group relative inline-flex items-center justify-center h-14 px-10 bg-primary dark:bg-white text-white dark:text-slate-950 font-bold rounded-full overflow-hidden transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
              Consult Support Center
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-slate-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          </Link>
        </motion.footer>
      </motion.div>
    </main>
  );
}


