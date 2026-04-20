"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export function SmartNavbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Scrolled state for background change
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Smart visibility logic (Hide on scroll down, show on scroll up)
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsMobileMenuOpen(false); // Close mobile menu if hidden
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl border-slate-200 py-2 shadow-sm" 
            : "bg-transparent border-transparent py-4 text-white"
        }`}
      >
        <div className="container mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <img 
              src="/Technological_University_of_the_Philippines_Seal.svg.png" 
              alt="TUP Seal" 
              className="h-11 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <div className={`h-8 w-px ${scrolled ? "bg-slate-200" : "bg-white/20"}`} />
            <div className="flex flex-col">
              <span className={`font-black text-sm tracking-tight leading-none font-heading uppercase ${scrolled ? "text-slate-900" : "text-white"}`}>
                SIT Platform
              </span>
              <span className={`text-[8px] font-bold uppercase tracking-[0.2em] leading-none mt-1.5 font-sans ${scrolled ? "text-slate-400" : "text-white/50"}`}>
                TUP-Visayas
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link className={`text-[10px] font-bold uppercase tracking-widest transition-colors font-heading ${scrolled ? "text-slate-500 hover:text-primary" : "text-white/70 hover:text-white"}`} href="/login">
              Opportunities
            </Link>
            <Link className={`text-[10px] font-bold uppercase tracking-widest transition-colors font-heading ${scrolled ? "text-slate-500 hover:text-primary" : "text-white/70 hover:text-white"}`} href="/login">
              Partner Registry
            </Link>
            <Link className={`text-[10px] font-bold uppercase tracking-widest transition-colors font-heading ${scrolled ? "text-slate-500 hover:text-primary" : "text-white/70 hover:text-white"}`} href="/login">
              Resources
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all font-heading ${
                scrolled 
                  ? "bg-slate-900 text-white hover:bg-primary shadow-lg shadow-slate-900/10" 
                  : "bg-white text-slate-900 hover:bg-slate-50"
              }`}
            >
              Sign In <ArrowRight className="h-3 w-3" />
            </Link>

            <button 
              className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              <Link className="text-lg font-black text-slate-900 uppercase tracking-widest font-heading border-b border-slate-100 pb-4" href="/login">Opportunities</Link>
              <Link className="text-lg font-black text-slate-900 uppercase tracking-widest font-heading border-b border-slate-100 pb-4" href="/login">Partner Registry</Link>
              <Link className="text-lg font-black text-slate-900 uppercase tracking-widest font-heading border-b border-slate-100 pb-4" href="/login">Resources</Link>
              <Link href="/login" className="w-full py-4 mt-4 bg-primary text-white text-center rounded-xl font-black uppercase tracking-widest font-heading">
                Portal Login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
