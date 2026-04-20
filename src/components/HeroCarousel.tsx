"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const images = [
  "/images/hero/industrial-1.png",
  "/images/hero/industrial-2.png",
  "/images/hero/industrial-3.png",
];

const messages = [
  {
    kicker: "Institutional Portal",
    title: "Unified SIT Management for the Next Generation",
    description: "Digital gateway for Supervised Industrial Training at Technological University of the Philippines - Visayas."
  },
  {
    kicker: "Strategic Growth",
    title: "Bridge the Gap Between Campus and Career",
    description: "Standardized industrial immersion programs designed for professional engineering excellence."
  },
  {
    kicker: "Industry Network",
    title: "Centralized Oversight for Industry Partners",
    description: "A secure ecosystem for student verification, progress monitoring, and institutional coordination."
  }
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-slate-950">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt="Industrial Training"
              fill
              className="object-cover grayscale"
              priority
            />
            {/* Subtle Minimal Overlay */}
            <div className="absolute inset-0 bg-slate-900/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="container relative z-10 mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 font-heading">
                  {messages[index].kicker}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] font-heading">
                {messages[index].title}
              </h1>

              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto font-sans">
                {messages[index].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link
                  href="/login"
                  className="group inline-flex items-center justify-center h-14 px-10 rounded-2xl bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all active:scale-[0.98] font-heading"
                >
                  Enter Portal
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center h-14 px-10 rounded-2xl border border-white/10 bg-white/5 text-white/80 text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all font-heading"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modern Slice Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === index ? "w-10 bg-primary" : "w-6 bg-white/10 hover:bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
