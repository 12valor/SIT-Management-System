"use client";

import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Building2, ShieldCheck, ArrowRight, Bell } from "lucide-react";
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
    <div className="flex-1 flex flex-col pt-32 pb-12 relative overflow-hidden bg-[#fafafa] dark:bg-[#050505]">
      
      {/* SCANLINE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] dark:opacity-[0.07] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* INSTITUTIONAL HEADER */}
      <div className="flex flex-col items-center justify-center mb-16 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-10 mb-12"
        >
          <Image 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            width={80}
            height={80}
            className="h-20 w-auto grayscale dark:grayscale-0 brightness-100 dark:logo-red-filter opacity-90 transition-all hover:scale-110" 
          />
          <div className="h-12 w-px bg-slate-200 dark:bg-white/10 hidden sm:block" />
          <div className="flex flex-col items-start leading-none">
             <h1 className="text-2xl font-black font-heading text-slate-900 dark:text-white uppercase tracking-[-0.02em]">TUP-Visayas</h1>
             <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mt-2">SIT_CORE_GATEWAY_v1.0</span>
          </div>
        </motion.div>
        
        <h2 className="text-4xl md:text-7xl font-black text-center font-heading text-slate-900 dark:text-white uppercase tracking-tighter max-w-4xl leading-[0.9] mb-8">
          Secure Terminal Access
        </h2>
        <div className="flex items-center gap-4 text-slate-400">
           <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
           <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-center">
             Select authentication module to proceed
           </p>
           <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center px-6 relative z-10">
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
                className="group relative flex flex-col h-full bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-1 rounded-sm shadow-[10px_10px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none hover:border-primary/50 transition-all duration-500 overflow-hidden"
              >
                {/* TECHNICAL DECOR */}
                <div className="absolute top-0 right-0 p-3 flex gap-1 opacity-20">
                   <div className="h-1 w-1 rounded-full bg-slate-400" />
                   <div className="h-1 w-1 rounded-full bg-slate-400" />
                </div>
                
                <div className="p-10 flex flex-col h-full relative z-10">
                  <div className="mb-12 flex items-center justify-between">
                    <div className={`h-16 w-16 bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center rounded-sm transition-all duration-500 group-hover:bg-primary dark:group-hover:bg-primary group-hover:text-white group-hover:rotate-12`}>
                      <role.icon className="h-8 w-8" />
                    </div>
                    <div className="text-[9px] font-mono text-slate-300 dark:text-slate-800 uppercase vertical-text tracking-widest group-hover:text-primary transition-colors">
                      AUTH_MODULE_0{idx+1}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight leading-none">
                    {role.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest leading-relaxed mb-10 flex-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    {role.description}
                  </p>

                  <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                     <span className="text-[10px] font-black text-slate-400 group-hover:text-primary uppercase tracking-[0.2em] transition-colors">Launch Module</span>
                     <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>

                {/* HOVER SCANLINE ACCENT */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      {/* SYSTEM ANNOUNCEMENTS - TERMINAL STYLE */}
      <div className="mt-24 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-900 text-white rounded-sm shrink-0">
            <Bell className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Status Feed</span>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-8 md:gap-12 items-center overflow-hidden">
             {[
               "NETWORK: ENCRYPTED_CHANNEL_ACTIVE",
               "DTR_SYNC: SYNCHRONIZED_SUCCESSFULLY",
               "SECURITY_PROTOCOL: TLS_1.3_ENABLED"
             ].map((log, i) => (
               <div key={i} className="flex items-center gap-4 whitespace-nowrap group cursor-help">
                  <span className="text-[10px] font-black text-primary font-heading opacity-50 group-hover:opacity-100 transition-opacity">[{i+1}]</span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{log}</span>
               </div>
             ))}
          </div>
          <div className="hidden lg:flex items-center gap-4">
             <div className="flex gap-1">
                {[1, 2, 3].map(i => <div key={i} className="h-1 w-1 rounded-full bg-primary" />)}
             </div>
             <span className="text-[9px] font-mono text-slate-400 uppercase">SYSTEM_READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

