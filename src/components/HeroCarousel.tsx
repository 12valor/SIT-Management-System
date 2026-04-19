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
    kicker: "Industry Protocols",
    title: <>Bridge.<br />Talent. <br /><span className="text-primary italic">Industry.</span></>,
    description: "The official gateway for Supervised Industrial Training at Technological University of the Philippines - Visayas."
  },
  {
    kicker: "Strategic Onboarding",
    title: <>Future.<br />Ready. <br /><span className="text-primary italic">Scale.</span></>,
    description: "Empowering the next generation of engineering professionals through standardized industrial immersion."
  },
  {
    kicker: "Industrial Network",
    title: <>Connect.<br />Evaluate. <br /><span className="text-primary italic">Approve.</span></>,
    description: "A centralized manifest for student progress, employer verification, and institutional oversight."
  }
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-slate-950">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt="Industrial Training"
              fill
              className="object-cover grayscale brightness-110"
              priority
            />
            {/* Monochromatic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="container relative z-10 mx-auto px-10 h-full flex flex-col justify-center pt-32 lg:pt-40">
        <div className="max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/90 font-heading">
                  {messages[index].kicker}
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-white leading-[0.8] font-heading uppercase">
                {messages[index].title}
              </h1>

              <div className="max-w-xl">
                <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed font-sans border-l-4 border-primary pl-10 py-3">
                  {messages[index].description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 pt-10">
                <Link
                  href="/login"
                  className="group inline-flex items-center justify-center h-20 px-12 rounded-xl bg-primary text-white text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all hover:-translate-y-1 active:scale-[0.98] font-heading"
                >
                  Enter Portal
                  <ArrowRight className="ml-4 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center h-20 px-12 rounded-xl border-2 border-white/20 bg-white/5 text-white/80 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white/10 hover:border-white/40 hover:text-white transition-all font-heading"
                >
                  Briefing Guide
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Index Progress */}
      <div className="absolute bottom-12 right-12 z-10 flex gap-3">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === index ? "w-12 bg-primary" : "w-6 bg-white/10"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
