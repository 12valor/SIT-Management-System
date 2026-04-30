"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    image: "/images/hero/industrial-1.png",
    title: "The Digital Bridge to Industrial Excellence",
    description: "The official platform for managing Supervised Industrial Training at the Technological University of the Philippines Visayas."
  },
  {
    image: "/images/hero/industrial-2.png",
    title: "Transitioning Classroom Logic to Practice",
    description: "Standardized industrial immersion programs designed for professional engineering excellence and institutional integrity."
  },
  {
    image: "/images/hero/industrial-3.png",
    title: "Centralized Oversight for Global Partners",
    description: "A secure archival ecosystem for trainee verification, progress monitoring, and cross-sectoral coordination."
  }
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#fafaf9] dark:bg-[#050505] flex items-center py-16 md:py-24 transition-colors duration-500 border-b border-slate-200 dark:border-white/10">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <div className="flex flex-col order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                  {slides[index].title}
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-serif leading-relaxed max-w-xl">
                  {slides[index].description}
                </p>

                <div className="flex flex-wrap items-center gap-5 pt-6">
                  <Link
                    href="/login"
                    className="group relative inline-flex items-center justify-center h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-full overflow-hidden transition-transform active:scale-95"
                  >
                    <span className="relative z-10 flex items-center">
                      Enter Portal
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  </Link>
                  <Link
                    href="/about"
                    className="group inline-flex items-center justify-center h-14 px-8 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-full hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white transition-all active:scale-95"
                  >
                    View Mission
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Clean Pagination */}
            <div className="mt-12 flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="relative py-2 group"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <div className={`h-[2px] transition-all duration-500 ${
                    i === index ? "w-10 bg-slate-900 dark:bg-white" : "w-6 bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400 dark:group-hover:bg-slate-500"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Image Container */}
          <div className="order-1 lg:order-2 relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[index].image}
                  alt={slides[index].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20 mix-blend-multiply" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

