"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const defaultSlides = [
  {
    image: "/images/hero/industrial-1.png",
    title: "Master Your SIT Requirements",
    description: "The official portal for TUPV students to manage logbooks, track training hours, and streamline internship documentation."
  },
  {
    image: "/images/hero/industrial-2.png",
    title: "Bridge Classroom to Career",
    description: "Access standardized training programs designed to transition your academic foundation into professional engineering expertise."
  },
  {
    image: "/images/hero/industrial-3.png",
    title: "Seamless Partner Coordination",
    description: "A secure platform for employers and coordinators to verify progress, manage placements, and maintain training standards."
  }
];

export function HeroCarousel({ slides: customSlides }: { slides?: { image: string, title: string, description: string }[] | null }) {
  const [index, setIndex] = useState(0);

  const activeSlides = customSlides && customSlides.length > 0 ? customSlides : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

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
            src={activeSlides[index].image}
            alt={activeSlides[index].title}
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
                {activeSlides[index].title}
              </h1>

              <p className="text-lg sm:text-xl text-white/80 font-serif leading-relaxed max-w-2xl">
                {activeSlides[index].description}
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

      </div>
    </section>
  );
}

