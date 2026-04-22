"use client";

import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck, ArrowRight, Bell, Command, Activity, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AESTHETIC DIRECTION: Industrial Precision
 * LAYOUT: Structural Grid with Monospaced HUD Elements
 * TYPOGRAPHY: Space Grotesk (Display) + JetBrains Mono (Data)
 * COLOR: Deep Ink, SIT Maroon (#800000), Slate Gray
 */

export default function LoginGatePage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* FLOATING DECORATIVE MARKERS */}
      <div className="absolute top-20 left-10 z-0 opacity-20 dark:opacity-40 hidden lg:block">
        <div className="font-mono text-[10px] space-y-1">
          <p>SYS_REF: TUPV_SIT_v4.0.2</p>
          <p>LOC_DATA: 10.69 / 122.95</p>
          <p className="text-primary font-bold">STATUS: OPERATIONAL</p>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-20 relative z-10">
        <div className="max-w-[1200px] w-full mx-auto">
          
          {/* HEADER SECTION */}
          <div className="relative mb-20">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                <Command className="w-3 h-3" />
                Access Gateway
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white font-heading tracking-tighter leading-[0.9] max-w-4xl">
                SUPERVISED <br/>
                <span className="text-primary italic">INDUSTRIAL</span> TRAINING
              </h1>
              
              <p className="max-w-xl text-slate-500 dark:text-slate-400 font-medium text-lg">
                Secure portal for TUPV students, coordinators, and industry partners to manage training lifecycles.
              </p>
            </div>
          </div>

          {/* SELECTION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            
            {/* PORTAL CARDS MAPPING */}
            {[
              {
                title: "Student",
                desc: "Manage logs, journals, and view evaluations for your OJT/SIT program.",
                icon: GraduationCap,
                href: "/login/student",
                color: "primary",
                meta: { id: "USR_STD", perm: "READ/WRITE" }
              },
              {
                title: "Employer",
                desc: "Review trainee performance, verify attendance, and submit final ratings.",
                icon: Building2,
                href: "/login/employer",
                color: "slate",
                meta: { id: "USR_EMP", perm: "VERIFY_ONLY" }
              },
              {
                title: "Coordinator",
                desc: "Oversee SIT records, approve accounts, and manage institutional data.",
                icon: ShieldCheck,
                href: "/login/coordinator",
                color: "slate",
                meta: { id: "USR_ADM", perm: "ROOT_ACCESS" }
              }
            ].map((portal, i) => (
              <div 
                key={portal.title}
                className="group relative bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-8 flex flex-col transition-all duration-500 hover:border-primary/50 dark:hover:border-primary/50"
              >
                {/* TECHNICAL ACCENT NOTCH */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                   <div className="absolute top-[-24px] right-[-24px] w-12 h-12 bg-slate-100 dark:bg-white/5 rotate-45 group-hover:bg-primary/20 transition-colors duration-500" />
                </div>

                {/* CARD DATA HEADER */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-tighter text-slate-400 mb-1">AUTH_ID</span>
                    <span className="font-mono text-[11px] font-bold dark:text-slate-200">{portal.meta.id}</span>
                  </div>
                  <div className="h-10 w-10 border border-slate-100 dark:border-white/5 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                    <portal.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110 duration-500", i === 0 ? "text-primary" : "text-slate-400 dark:text-slate-600")} />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-heading mb-4 tracking-tight uppercase">{portal.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium mb-8">
                    {portal.desc}
                  </p>
                </div>

                {/* ACTION BUTTON */}
                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-2 opacity-50">
                    <Activity className="w-3 h-3 text-primary animate-pulse" />
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">{portal.meta.perm}</span>
                  </div>
                  
                  <Link 
                    href={portal.href}
                    className={cn(
                      "group/btn relative flex items-center justify-between w-full p-4 font-bold tracking-tight transition-all duration-300",
                      i === 0 
                        ? "bg-primary text-white hover:bg-primary/90" 
                        : "bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-slate-200"
                    )}
                  >
                    <span className="relative z-10 text-sm uppercase italic">Authenticate</span>
                    <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-10 dark:group-hover/btn:opacity-20 transition-opacity bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* SYSTEM LOG BAR */}
          <div className="mt-8 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4 shrink-0">
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                  <span className="font-mono text-[11px] font-bold text-primary uppercase tracking-widest">Live_Notice</span>
               </div>
               <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-800 hidden md:block" />
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8 overflow-hidden">
               <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-slate-400">01</span>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate">DTR submission deadline: Every Friday 5PM</p>
               </div>
               <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-slate-400">02</span>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate">New: Upload photos in journal (max 2MB)</p>
               </div>
            </div>

            <Link href="/help" className="shrink-0 flex items-center gap-2 group/help">
               <Fingerprint className="w-4 h-4 text-slate-400 group-hover/help:text-primary transition-colors" />
               <span className="font-mono text-[10px] font-bold text-slate-500 uppercase group-hover/help:text-primary transition-colors">Support_Console</span>
            </Link>
          </div>

        </div>
      </main>

      {/* CORNER COORDINATES (Visual Only) */}
      <div className="absolute bottom-6 left-6 font-mono text-[8px] text-slate-400 uppercase tracking-widest hidden md:block z-20">
        [ SECURE_LAYER: ENCRYPTED ]
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[8px] text-slate-400 uppercase tracking-widest hidden md:block z-20">
        TUPV_SIT_SYSTEM_2024
      </div>
    </div>
  );
}
