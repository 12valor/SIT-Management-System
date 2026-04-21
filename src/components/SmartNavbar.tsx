"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function SmartNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
      <header className="fixed top-0 w-full z-50 flex flex-col shadow-sm">
        {/* Top Announcement Banner */}
        <div className="bg-primary text-white py-2 px-4 flex justify-center items-center gap-3 text-[11px] md:text-xs">
          <span className="bg-white/20 px-2.5 py-0.5 rounded-full font-medium tracking-wide">
            New
          </span>
          <span className="hover:underline cursor-pointer flex items-center gap-1 font-medium transition-all text-white/90 hover:text-white">
            Simplify your institutional training with a unified platform <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        {/* Main Navigation */}
        <div className="bg-white border-b border-border/40 transition-all duration-300">
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
                <span className="font-extrabold text-xl tracking-tight text-[#0f172a] font-heading">
                  TUPV SIT
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <Link className="flex items-center gap-1 text-[13px] font-semibold text-[#0f172a] hover:text-primary transition-colors" href="/login">
                  Portals <ChevronDown className="h-3.5 w-3.5 text-[#64748b]" />
                </Link>
                <Link className="flex items-center gap-1 text-[13px] font-semibold text-[#0f172a] hover:text-primary transition-colors" href="/login">
                  Programs <ChevronDown className="h-3.5 w-3.5 text-[#64748b]" />
                </Link>
                <Link className="text-[13px] font-semibold text-[#0f172a] hover:text-primary transition-colors" href="/login">
                  Partners
                </Link>
                <Link className="text-[13px] font-semibold text-[#0f172a] hover:text-primary transition-colors" href="/login">
                  Resources
                </Link>
                <Link className="text-[13px] font-semibold text-[#0f172a] hover:text-primary transition-colors" href="/login">
                  About
                </Link>
              </nav>
            </div>

            {/* Right: Auth */}
            <div className="flex items-center gap-4">
              <Link 
                href="/login" 
                className="hidden sm:block text-[14px] font-bold text-primary hover:text-primary/80 transition-colors px-4"
              >
                Log In
              </Link>
              
              <Link 
                href="/login" 
                className="hidden sm:inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-[14px] font-bold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                Get Started
              </Link>

              <button 
                className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
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
            className="fixed inset-0 z-40 bg-white pt-[104px] px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              <Link className="text-lg font-bold text-[#0f172a] border-b border-slate-100 pb-4 flex justify-between" href="/login">
                Portals <ChevronDown className="h-5 w-5 text-slate-400" />
              </Link>
              <Link className="text-lg font-bold text-[#0f172a] border-b border-slate-100 pb-4 flex justify-between" href="/login">
                Programs <ChevronDown className="h-5 w-5 text-slate-400" />
              </Link>
              <Link className="text-lg font-bold text-[#0f172a] border-b border-slate-100 pb-4" href="/login">Partners</Link>
              <Link className="text-lg font-bold text-[#0f172a] border-b border-slate-100 pb-4" href="/login">Resources</Link>
              <Link className="text-lg font-bold text-[#0f172a] border-b border-slate-100 pb-4" href="/login">About</Link>
              
              <div className="flex flex-col gap-4 mt-4">
                <Link href="/login" className="w-full py-4 text-center text-primary font-bold text-lg">
                  Log In
                </Link>
                <Link href="/login" className="w-full py-4 bg-primary text-white text-center rounded-xl font-bold text-lg">
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
