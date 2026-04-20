"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

export function SmartNavbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Scrolled state for background
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hidden state for hide-on-scroll
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-5 group">
          <img 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            className="h-12 w-auto object-contain transition-transform group-hover:scale-105" 
          />
          <div className="h-8 w-px bg-white/20" />
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-white leading-none font-heading uppercase">SIT Platform</span>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] leading-none mt-1.5 font-sans">TUP-Visayas</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link className="text-[11px] font-bold text-white hover:text-white/70 transition-all font-heading uppercase tracking-widest" href="/login">
            Opportunities
          </Link>
          <Link className="text-[11px] font-bold text-white hover:text-white/70 transition-all font-heading uppercase tracking-widest" href="/login">
            Companies
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link 
            href="/login" 
            className="px-8 py-3 rounded-xl bg-primary text-white text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all font-heading"
          >
            Portal Login
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
