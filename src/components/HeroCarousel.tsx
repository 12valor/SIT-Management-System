"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Landmark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const images = [
  "/images/hero/industrial-1.png",
  "/images/hero/industrial-2.png",
  "/images/hero/industrial-3.png",
];

const messages = [
  {
    category: "Institutional Vision",
    recordId: "DOC_IV_772",
    title: "The Digital Bridge to Industrial Excellence",
    description: "The official platform for managing Supervised Industrial Training at the Technological University of the Philippines Visayas."
  },
  {
    category: "Strategic Mandate",
    recordId: "DOC_SM_814",
    title: "Transitioning Classroom Logic to Industrial Practice",
    description: "Standardized industrial immersion programs designed for professional engineering excellence and institutional integrity."
  },
  {
    category: "Operational Protocol",
    recordId: "DOC_OP_102",
    title: "Centralized Oversight for Global Partners",
    description: "A secure archival ecosystem for trainee verification, progress monitoring, and cross-sectoral coordination."
  }
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 10000); // Slower for editorial pace
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[800px] w-full overflow-hidden bg-[#fafaf9] dark:bg-background transition-colors duration-500">
      {/* Institutional Grid Background */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-6 h-full relative z-10 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Content — Left Side */}
          <div className="lg:col-span-7 pt-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
              >
                <div className="flex items-center gap-6">
                   <div className="flex flex-col">
                      <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-1">
                        {messages[index].category}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 dark:text-slate-600 tracking-widest uppercase">
                        Reference: {messages[index].recordId}
                      </span>
                   </div>
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-medium text-slate-900 dark:text-white leading-[1.05] tracking-tight">
                  {messages[index].title}
                </h1>

                <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-serif italic leading-relaxed max-w-2xl">
                  {messages[index].description}
                </p>

                <div className="flex flex-wrap gap-6 pt-8">
                  <Link
                    href="/login"
                    className="group inline-flex items-center justify-center h-16 px-12 bg-primary text-white font-serif font-medium rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                  >
                    Enter Portal
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center h-16 px-12 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-serif font-medium rounded-full hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                  >
                    View Mission
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image — Right Side / Asymmetric Layout */}
          <div className="lg:col-span-5 relative hidden lg:block">
             <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[index]}
                      alt="Institutional Record"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-80"
                      priority
                    />
                    <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
                  </motion.div>
                </AnimatePresence>
                
                {/* Decorative Frame Overlays */}
                <div className="absolute inset-x-8 top-8 flex justify-between items-start">
                   <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 flex items-center gap-3">
                      <Landmark className="w-3 h-3 text-primary" />
                      <span className="text-[9px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-widest">TUP-V SIT Archive</span>
                   </div>
                </div>
             </div>
             
             {/* Large Decorative Category in Background */}
             <div className="absolute -bottom-10 -right-10 text-[12rem] font-serif font-black text-slate-200 dark:text-white/[0.02] select-none pointer-events-none italic">
                {String(index + 1).padStart(2, '0')}
             </div>
          </div>
        </div>
      </div>

      {/* Archival Pagination Indicator */}
      <div className="absolute bottom-16 right-12 flex flex-col gap-8 items-end z-20">
        <div className="flex flex-col gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group flex items-center gap-4 text-right"
            >
              <span className={`text-[10px] font-mono tracking-widest transition-all duration-500 uppercase ${
                i === index ? "text-primary opacity-100" : "text-slate-400 opacity-0 group-hover:opacity-40"
              }`}>
                {messages[i].category}
              </span>
              <div className={`h-[2px] transition-all duration-500 rounded-full ${
                i === index ? "w-12 bg-primary" : "w-6 bg-slate-300 dark:bg-white/10 hover:bg-slate-400"
              }`} />
            </button>
          ))}
        </div>
        <div className="text-[10px] font-mono text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">
           Institutional Record {index + 1} / {images.length}
        </div>
      </div>
    </section>
  );
}

