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
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto text-sm md:text-base hidden sm:block">
            A procedural journey bridging academic training and industrial excellence. Scroll to reveal.
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

              // Dynamic opacity: Fade in (0 -> 1), Stay active (1 -> 1), Dim when passed (1 -> 0.3)
              // The last step does not dim, so we provide a shorter array to avoid values > 1.0 (which crash WAAPI)
              const dynamicOpacity = useTransform(
                scrollYProgress,
                index === steps.length - 1
                  ? [step.scrollStart - 0.1, step.scrollStart]
                  : [step.scrollStart - 0.1, step.scrollStart, step.scrollStart + 0.25, step.scrollStart + 0.35],
                index === steps.length - 1
                  ? [0, 1]
                  : [0, 1, 1, 0.2]
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
                    <div className={`bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-white/10 shadow-xl flex flex-col ${isLeft ? 'md:items-end' : 'items-start'} items-start transition-all duration-500`}>
                      <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1 rounded-full text-[10px] font-black tracking-widest mb-4">
                        STEP {step.step}
                      </div>
                      
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold font-premium text-slate-900 dark:text-white mb-2 uppercase tracking-tight">{step.title}</h3>
                      <p className="text-sm md:text-[15px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{step.desc}</p>
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
