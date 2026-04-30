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
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-black flex items-end pb-24 md:pb-32">
      
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[index].image}
            alt={slides[index].title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlays for Text Legibility */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-12">
        
        {/* Left Side: Text and Buttons */}
        <div className="flex-1 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-white leading-[1.1] tracking-tight">
                {slides[index].title}
              </h1>

              <p className="text-lg sm:text-xl text-white/80 font-serif leading-relaxed max-w-2xl">
                {slides[index].description}
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-8">
                <Link
                  href="/login"
                  className="group relative inline-flex items-center justify-center h-14 px-8 bg-white text-slate-900 font-medium rounded-full overflow-hidden transition-transform active:scale-95"
                >
                  <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
                    Enter Portal
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                </Link>
                <Link
                  href="/about"
                  className="group inline-flex items-center justify-center h-14 px-8 border border-white/30 text-white font-medium rounded-full hover:border-white hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm"
                >
                  View Mission
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side / Bottom: Pagination */}
        <div className="flex items-center gap-3 md:pb-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative py-4 group"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className={`h-[2px] transition-all duration-500 ${
                i === index ? "w-16 bg-white" : "w-8 bg-white/30 group-hover:bg-white/60"
              }`} />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

