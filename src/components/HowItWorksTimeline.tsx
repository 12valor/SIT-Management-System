"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ShieldCheck, Zap, CheckCircle, LucideIcon } from "lucide-react";

interface Step {
  step: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  align: string;
  scrollStart: number;
}

function TimelineStep({ 
  step, 
  index, 
  scrollYProgress 
}: { 
  step: Step; 
  index: number; 
  scrollYProgress: MotionValue<number>;
}) {
  const topPos = index === 0 ? "10%" : index === 1 ? "50%" : "90%";
  const isLeft = step.align === "left";

  const dynamicOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, step.scrollStart - 0.15), step.scrollStart],
    [0, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [step.scrollStart - 0.1, step.scrollStart],
    [40, 0]
  );

  const scale = useTransform(
    scrollYProgress, 
    [step.scrollStart - 0.1, step.scrollStart], 
    [0, 1]
  );

  return (
    <div className="absolute w-full" style={{ top: topPos }}>
      {/* The Node Dot */}
      <motion.div 
        className="absolute left-[32px] md:left-1/2 w-4 h-4 bg-white dark:bg-[#050505] border-2 border-primary -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ scale }}
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
        <div className={`bg-[#fdfdfc] dark:bg-white/[0.02] p-8 md:p-12 rounded-[5px] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col ${isLeft ? 'md:items-end' : 'items-start'} items-start transition-all duration-500 group hover:bg-[#fafaf8] dark:hover:bg-white/[0.04] relative overflow-hidden`}>
          
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1 rounded-sm text-[9px] font-black tracking-[0.3em] mb-8 relative z-10 font-mono">
            REF_STEP_0{step.step}
          </div>
          
          <div className="w-16 h-16 rounded-[5px] bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10 border border-primary/10">
            <step.icon className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className="text-3xl md:text-4xl font-medium font-serif text-slate-900 dark:text-white mb-4 italic leading-tight relative z-10">{step.title}</h3>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed relative z-10 italic max-w-sm">{step.desc}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function HowItWorksTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const steps: Step[] = [
    { 
      step: "1", 
      title: "Profile Setup", 
      desc: "Initialize your institutional SIT profile through authenticated student credentials.", 
      icon: ShieldCheck,
      align: "left",
      scrollStart: 0.1,
    },
    { 
      step: "2", 
      title: "Active Application", 
      desc: "Deploy applications to pre-vetted industry partners matching your technical manifest.", 
      icon: Zap,
      align: "right",
      scrollStart: 0.45,
    },
    { 
      step: "3", 
      title: "Performance Audit", 
      desc: "Track real-time progress and receive certified performance audits from onsite supervisors.", 
      icon: CheckCircle,
      align: "left",
      scrollStart: 0.8,
    }
  ];

  return (
    <section ref={containerRef} className="relative min-h-[400vh] bg-white dark:bg-[#050505] border-t border-slate-100 dark:border-white/5">
      
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden pt-24 md:pt-32 pb-16">
        
        {/* Header */}
        <div className="w-full text-center z-30 px-6 shrink-0 mb-16 md:mb-24">
          <span className="inline-block font-mono font-black text-[10px] uppercase tracking-[0.4em] text-primary/60 mb-4">Procedural Protocol 01</span>
          <h2 className="text-4xl md:text-6xl font-medium font-serif text-slate-900 dark:text-white mb-6">How It Works</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed italic">
            A strategic journey bridging <span className="text-slate-900 dark:text-white">academic theory</span> and <span className="text-slate-900 dark:text-white">industrial command</span>.
          </p>
        </div>

        {/* Timeline Area */}
        <div className="relative w-full max-w-6xl mx-auto flex-1 px-6">
          
          {/* Straight Vertical Line Base */}
          <div className="absolute left-[32px] md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 -translate-x-1/2" />
          
          {/* Animated Fill Line */}
          <motion.div 
            className="absolute left-[32px] md:left-1/2 top-0 w-[2px] bg-primary -translate-x-1/2 origin-top z-10 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
            style={{ 
              bottom: 0,
              scaleY: scrollYProgress 
            }}
          />

          {/* Nodes and Cards */}
          <div className="relative w-full h-full">
            {steps.map((step, index) => (
              <TimelineStep 
                key={step.step} 
                step={step} 
                index={index} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
