"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ArrowRight, GraduationCap, Building2, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";

export function SmartNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const portals = [
    { title: "Student", description: "SIT logbooks & journals", href: "/login/student", icon: GraduationCap },
    { title: "Industry Partner", description: "Field evaluations & DTR", href: "/login/employer", icon: Building2 },
    { title: "Coordinator", description: "System oversight", href: "/login/coordinator", icon: ShieldCheck },
  ];

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
            
            {/* Left side: Logo + Navigation */}
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-3 group">
                <Image 
                  src="/Technological_University_of_the_Philippines_Seal.svg.png" 
                  alt="TUP Seal" 
                  width={32}
                  height={32}
                  className="h-8 w-auto object-contain transition-all group-hover:scale-105 grayscale dark:grayscale-0 dark:logo-red-filter" 
                />
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-heading">
                  TUPV SIT
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                {/* Dynamic Portals Dropdown */}
                <div 
                  className="relative h-16 flex items-center"
                  onMouseEnter={() => setActiveDropdown("portals")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    href="/login"
                    className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all duration-300"
                  >
                    Portals 
                    <ChevronDown className={`h-3.5 w-3.5 opacity-50 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${activeDropdown === "portals" ? "rotate-180" : ""}`} />
                  </Link>

                  <AnimatePresence>
                    {activeDropdown === "portals" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute top-full left-[-20px] w-[280px] z-50 pt-2"
                      >
                        <div className="relative overflow-hidden rounded-sm border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#0c0c0c]">
                          <div className="p-1.5 flex flex-col gap-0.5">
                            {portals.map((portal, idx) => (
                              <motion.div
                                key={portal.title}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                              >
                                <Link 
                                  href={portal.href}
                                  className="group/item flex items-center gap-4 p-3 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 rounded-sm relative"
                                >
                                  <div className="h-9 w-9 flex items-center justify-center bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-400 group-hover/item:text-primary group-hover/item:bg-primary/10 transition-all duration-300 rounded-sm">
                                    <portal.icon className="h-4.5 w-4.5" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[12px] font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1">
                                      {portal.title}
                                    </span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                                      {portal.description}
                                    </span>
                                  </div>
                                  <div className="absolute right-3 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                    <ArrowRight className="h-3 w-3 text-primary" />
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

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

            {/* Right side: Actions */}
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
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-white/60 dark:bg-black/60 pt-[120px] px-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] mb-6">Access Terminals</span>
                <div className="grid grid-cols-1 gap-3">
                  {portals.map((portal) => (
                    <Link 
                      key={portal.title}
                      href={portal.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-5 p-4 bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-sm active:scale-[0.98] transition-transform"
                    >
                      <div className="h-12 w-12 flex items-center justify-center bg-white/30 dark:bg-white/10 text-primary rounded-sm shadow-sm">
                        <portal.icon className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                          {portal.title} Portal
                        </span>
                        <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest opacity-60">
                          {portal.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-black/10 dark:bg-white/10 my-4" />

              <div className="flex flex-col gap-2">
                <Link className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex justify-between items-center py-3 px-2 rounded-sm hover:bg-black/5 dark:hover:bg-white/5" href="/partners" onClick={() => setIsMobileMenuOpen(false)}>
                  Partners <ArrowRight className="h-4 w-4 text-primary" />
                </Link>
                <Link className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex justify-between items-center py-3 px-2 rounded-sm hover:bg-black/5 dark:hover:bg-white/5" href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  About <ArrowRight className="h-4 w-4 text-primary" />
                </Link>
              </div>
              
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-5 bg-primary text-white text-center rounded-sm font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                  Secure Login
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
