"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function SmartNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide the marketing navbar on application portal routes
  if (
    pathname.startsWith("/student") ||
    pathname.startsWith("/employer") ||
    pathname.startsWith("/coordinator")
  ) {
    return null;
  }

  return (
    <>
      <header className={`fixed top-0 w-full z-50 flex flex-col transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-white dark:bg-[#050505]"}`}>
        {/* Top Announcement Banner */}
        <div className="bg-primary text-white py-2 px-4 flex justify-center items-center gap-3 text-[11px] md:text-xs text-center relative z-20">
          <span className="hover:underline cursor-pointer font-medium transition-all text-white/90 hover:text-white">
            Simplify your institutional training with a unified platform
          </span>
        </div>

        {/* Main Navigation */}
        <div className={`bg-white dark:bg-[#050505] border-b border-border/40 transition-all duration-300 relative z-10 ${scrolled ? "py-1" : "py-0"}`}>
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            
            {/* Left: Logo & Links */}
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-3 group">
                <Image 
                  src="/Technological_University_of_the_Philippines_Seal.svg.png" 
                  alt="TUP Seal" 
                  width={32}
                  height={32}
                  className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
                />
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-heading">
                  TUPV SIT
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <Link className="flex items-center gap-1 text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="/login">
                  Portals <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Link>
                <Link className="flex items-center gap-1 text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="/login">
                  Programs <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Link>
                <Link className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="/partners">
                  Partners
                </Link>
                <Link className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="/about">
                  About
                </Link>
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="hidden sm:inline-flex items-center justify-center bg-primary text-white px-8 py-2.5 rounded-[2px] text-[13px] font-bold transition-all hover:bg-primary/90 active:scale-[0.98] group/btn gap-2"
              >
                Launch Portal
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>

              <button 
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-[#050505] pt-[120px] px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              <Link className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-4 flex justify-between" href="/login">
                Portals <ChevronDown className="h-5 w-5 opacity-30" />
              </Link>
              <Link className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-4" href="/partners">Partners</Link>
              <Link className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-4" href="/about">About</Link>
              
              <div className="flex flex-col gap-4 mt-4">
                <Link href="/login" className="w-full py-4 bg-primary text-white text-center rounded-[2px] font-bold text-[13px] transition-all active:scale-[0.98]">
                  Launch Portal
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
