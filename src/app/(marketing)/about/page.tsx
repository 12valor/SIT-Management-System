"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] pt-40 pb-32 overflow-hidden selection:bg-primary selection:text-white font-sans uppercase">
      
      {/* 1. ARCHITECTURAL GRID BASE */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] dark:opacity-[0.1]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* SECTION 01: THE MANIFESTO */}
        <section className="mb-64">
          <div className="flex flex-col md:flex-row border-t-4 border-slate-900 dark:border-white pt-8 gap-20">
            <div className="md:w-[20%] shrink-0">
              <span className="text-4xl font-black block tracking-tighter">01</span>
              <span className="text-[10px] font-black tracking-[0.4em] text-primary">Manifesto</span>
            </div>
            <div className="md:w-[80%]">
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter mb-20"
              >
                WE BRIDGE <br />
                <span className="text-primary italic">ACADEMIA</span> <br />
                & INDUSTRY.
              </motion.h1>
              
              <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
                <p className="text-sm md:text-base font-bold leading-tight text-slate-500 dark:text-slate-400">
                  THE TUPV SUPERVISED INDUSTRIAL TRAINING (SIT) SYSTEM IS NOT A PORTAL. IT IS A TECHNICAL PROTOCOL. A STANDARDIZED BRIDGE BUILT TO CONVERT ACADEMIC THEORY INTO INDUSTRIAL EXCELLENCE.
                </p>
                <p className="text-sm md:text-base font-bold leading-tight text-slate-500 dark:text-slate-400">
                  FOUNDED ON THE PRINCIPLE OF RIGOR. WE AUTOMATE THE ADMINISTRATIVE BURDEN SO THE FOCUS REMAINS ON THE WORK. THE FUTURE OF PHILIPPINE ENGINEERING IS GROWN HERE.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: THE SPECIFICATION (MISSION/VISION) */}
        <section className="mb-64">
          <div className="grid md:grid-cols-3 border-y-2 border-slate-900/10 dark:border-white/10">
            
            {/* MISSION */}
            <div className="p-12 md:border-r-2 border-slate-900/10 dark:border-white/10 flex flex-col justify-between min-h-[400px] group hover:bg-primary transition-colors duration-500">
              <div>
                <span className="text-xs font-black tracking-widest group-hover:text-white/50 transition-colors">SPEC_01 // MISSION</span>
                <h2 className="text-4xl font-black mt-8 group-hover:text-white transition-colors leading-none tracking-tighter">SEAMLESS <br/>TRANSITION</h2>
              </div>
              <p className="text-xs font-bold leading-relaxed group-hover:text-white/90 transition-colors">
                PROVIDE A TRANSPARENT, HIGH-PERFORMANCE ENVIRONMENT WHERE STUDENTS TRANSITION INTO PROFESSIONAL CAREERS WITH ZERO FRICTION.
              </p>
            </div>

            {/* VISION */}
            <div className="p-12 md:border-r-2 border-slate-900/10 dark:border-white/10 flex flex-col justify-between min-h-[400px] group hover:bg-slate-900 dark:hover:bg-white transition-colors duration-500">
              <div>
                <span className="text-xs font-black tracking-widest group-hover:text-slate-400 dark:group-hover:text-slate-500 transition-colors">SPEC_02 // VISION</span>
                <h2 className="text-4xl font-black mt-8 group-hover:text-white dark:group-hover:text-slate-900 transition-colors leading-none tracking-tighter">GLOBAL <br/>BENCHMARK</h2>
              </div>
              <p className="text-xs font-bold leading-relaxed group-hover:text-white/70 dark:group-hover:text-slate-700 transition-colors">
                SET THE INSTITUTIONAL STANDARD FOR INDUSTRIAL TRAINING MANAGEMENT IN THE PHILIPPINES, LEVERAGING RAW TECHNOLOGY.
              </p>
            </div>

            {/* VALUES */}
            <div className="p-12 flex flex-col justify-between min-h-[400px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -rotate-12 translate-x-10 -translate-y-10" />
               <div>
                <span className="text-xs font-black tracking-widest">SPEC_03 // CORE_VALUES</span>
                <div className="mt-8 space-y-4">
                  {["PRECISION", "SYNERGY", "EXCELLENCE", "RIGOR"].map((val) => (
                    <div key={val} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary" />
                      <span className="text-2xl font-black tracking-tighter">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs font-bold text-slate-400">
                CORE VALUES BUILT INTO THE SYSTEM ARCHITECTURE.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 03: THE NUMBERS */}
        <section>
          <div className="flex flex-col md:flex-row items-end gap-10">
            <div className="text-[20vw] md:text-[15vw] font-black leading-[0.8] tracking-[calc(-0.05em)] text-slate-900 dark:text-white">
              77<span className="text-primary">'</span>
            </div>
            <div className="pb-4 md:pb-10 max-w-sm">
              <span className="text-[10px] font-black tracking-[0.4em] text-primary block mb-2">Heritage Protocol</span>
              <p className="text-xs font-bold leading-snug text-slate-500">
                TUPV WAS ESTABLISHED IN 1977. SINCE THEN, WE HAVE BEEN REFINING THE PROCESS OF INDUSTRIAL INTEGRATION. THIS SYSTEM IS THE DIGITAL CULMINATION OF DECADES OF EXPERIENCE.
              </p>
            </div>
          </div>
          
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-1 border-t border-slate-900/10 dark:border-white/10">
            {[
              { label: "Partners", val: "500+" },
              { label: "Students", val: "2.4K" },
              { label: "Locations", val: "12" },
              { label: "Stability", val: "99.9%" }
            ].map((stat) => (
              <div key={stat.label} className="pt-8 group">
                <span className="text-[10px] font-black text-slate-400 block mb-1 group-hover:text-primary transition-colors">{stat.label}</span>
                <span className="text-4xl font-black group-hover:scale-110 block transition-transform origin-left">{stat.val}</span>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* OVERSIZED BACKGROUND TEXT */}
      <div className="fixed -bottom-20 left-0 right-0 pointer-events-none select-none z-[-1] opacity-[0.02] dark:opacity-[0.03]">
        <div className="text-[30vw] font-black whitespace-nowrap leading-none tracking-tighter">
          TUP-VISAYAS TUP-VISAYAS TUP-VISAYAS
        </div>
      </div>
    </main>
  );
}
