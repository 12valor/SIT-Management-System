"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Zap, CheckCircle } from "lucide-react";

export function HowItWorksTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const steps = [
    { 
      step: "01", 
      title: "Profile Setup", 
      desc: "Create your institutional SIT profile with GSFE credentials.", 
      icon: ShieldCheck,
      align: "left",
      scrollStart: 0.1,
    },
    { 
      step: "02", 
      title: "Application", 
      desc: "Apply to pre-vetted industry partners matching your skill set.", 
      icon: Zap,
      align: "right",
      scrollStart: 0.45,
    },
    { 
      step: "03", 
      title: "Evaluation", 
      desc: "Track progress and receive performance audits in real-time.", 
      icon: CheckCircle,
      align: "left",
      scrollStart: 0.8,
    }
  ];

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-slate-50/50 dark:bg-[#050505] border-y border-slate-100 dark:border-white/5">
      
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden pt-16 md:pt-24 pb-16">
        
        {/* Header */}
        <div className="w-full text-center z-30 px-6 shrink-0 mb-12 md:mb-16">
          <span className="inline-block font-black text-[10px] uppercase tracking-[0.3em] text-primary mb-2 md:mb-4">Module 01</span>
          <h2 className="text-3xl md:text-5xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight mb-4">How It Works</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto text-base md:text-xl leading-relaxed">
            A procedural journey bridging <strong className="text-slate-900 dark:text-white font-bold">academic training</strong> and <strong className="text-slate-900 dark:text-white font-bold">industrial excellence</strong>. <br className="hidden sm:block"/>Scroll to reveal the timeline.
          </p>
        </div>

        {/* Timeline Area */}
        <div className="relative w-full max-w-5xl mx-auto flex-1 px-6">
          
          {/* Straight Vertical Line Base */}
          <div className="absolute left-[32px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-white/10 -translate-x-1/2 rounded-full" />
          
          {/* Animated Fill Line */}
          <motion.div 
            className="absolute left-[32px] md:left-1/2 top-0 w-[4px] bg-primary -translate-x-1/2 origin-top rounded-full z-10"
            style={{ 
              bottom: 0,
              scaleY: scrollYProgress 
            }}
          />

          {/* Nodes and Cards */}
          <div className="relative w-full h-full">
            {steps.map((step, index) => {
              // Exact placement on the Y axis
              const topPos = index === 0 ? "10%" : index === 1 ? "50%" : "90%";

              // Dynamic opacity: Fade in (0 -> 1) and stay at 1. No dimming.
              const dynamicOpacity = useTransform(
                scrollYProgress,
                [Math.max(0, step.scrollStart - 0.15), step.scrollStart],
                [0, 1]
              );

              // Slide up on reveal
              const y = useTransform(
                scrollYProgress,
                [step.scrollStart - 0.1, step.scrollStart],
                [40, 0]
              );

              const isLeft = step.align === "left";
              
              return (
                <div key={step.step} className="absolute w-full" style={{ top: topPos }}>
                  
                  {/* The Node Dot */}
                  <motion.div 
                    className="absolute left-[32px] md:left-1/2 w-5 h-5 rounded-full bg-white dark:bg-[#050505] border-4 border-primary -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ 
                      scale: useTransform(scrollYProgress, [step.scrollStart - 0.1, step.scrollStart], [0, 1]) 
                    }}
                  />

                  {/* The Card */}
                  <motion.div
                    style={{ opacity: dynamicOpacity, y }}
                    className={`absolute -translate-y-1/2 w-[calc(100%-70px)] md:w-[calc(50%-60px)] ${
                      isLeft 
                        ? "left-[70px] md:left-auto md:right-[calc(50%+60px)] md:text-right" 
                        : "left-[70px] md:left-[calc(50%+60px)] text-left"
                    }`}
                  >
                    <div className={`bg-white dark:bg-[#050505] p-6 md:p-10 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-2xl shadow-slate-200/20 dark:shadow-none flex flex-col ${isLeft ? 'md:items-end' : 'items-start'} items-start transition-all duration-500 group hover:border-primary/30 relative overflow-hidden`}>
                      
                      {/* Subtle hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest mb-6 relative z-10 shadow-sm">
                        STEP {step.step}
                      </div>
                      
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 relative z-10">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold font-premium text-slate-900 dark:text-white mb-3 uppercase tracking-tight relative z-10">{step.title}</h3>
                      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed relative z-10">{step.desc}</p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
