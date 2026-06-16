"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ArrowRight, GraduationCap, Building2, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";

export function SmartNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const scrolledRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const updateScrolled = () => {
      frame = 0;
      const nextScrolled = window.scrollY > 20;

      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const handleScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateScrolled);
      }
    };

    updateScrolled();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
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
      <header className={`fixed top-0 w-full z-50 flex flex-col transition-all duration-300 ${scrolled ? "bg-white/95 dark:bg-[#050505]/95 border-b border-border/50 shadow-sm" : "bg-white dark:bg-[#050505]"}`}>
        {/* Top Announcement Banner */}
        {showBanner && (
          <div className="bg-primary text-white py-2 px-6 flex justify-between items-center text-[11px] md:text-xs relative z-20">
            <div className="flex-1 flex justify-center">
              <span className="hover:underline cursor-pointer font-medium transition-all text-white/90 hover:text-white">
                Simplify your institutional training with a unified platform
              </span>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Main Navigation */}
        <div className={`bg-white dark:bg-[#050505] border-b border-border/40 transition-all duration-300 relative z-10 ${scrolled ? "py-1" : "py-0"}`}>
          <div className="container mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
            
            {/* Left side: Logo + Navigation */}
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-3 group">
                <Image 
                  src="/tup-seal-128.webp"
                  alt="TUP Seal" 
                  width={32}
                  height={32}
                  className="h-8 w-auto object-contain transition-all group-hover:scale-105" 
                />
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-heading">
                  TUPV SIT
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                {/* Dynamic Portals Dropdown */}
                <div 
                  className="relative h-14 md:h-16 flex items-center"
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

                <Link className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all active:scale-95" href="/news">
                  News
                </Link>

                <Link className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all active:scale-95" href="/placements">
                  Placements
                </Link>

                <Link className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all active:scale-95" href="/resources">
                  Resources
                </Link>

                <Link className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all active:scale-95" href="/partners">
                  Partners
                </Link>
                <Link className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all active:scale-95" href="/about">
                  About
                </Link>
                <Link className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all active:scale-95" href="/faq">
                  FAQ
                </Link>
              </nav>
            </div>

            {/* Right side: Actions */}
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="group relative hidden sm:inline-flex items-center justify-center bg-primary text-white px-8 py-2.5 rounded-[4px] text-[13px] font-bold overflow-hidden transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Launch Portal
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
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
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with warmer tint and deeper blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-950/40 dark:bg-black/60 backdrop-blur-md md:hidden"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-[400px] z-[70] bg-white dark:bg-[#080808] shadow-2xl md:hidden flex flex-col"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 active:scale-95 transition-transform">
                  <Image 
                    src="/tup-seal-128.webp"
                    alt="TUP Seal" 
                    width={28}
                    height={28}
                  />
                  <span className="font-bold text-lg tracking-tight">TUPV SIT</span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-slate-50 dark:bg-white/5 text-slate-500 hover:text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-8">
                  {/* Portals Section */}
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 px-1">
                      Portals
                    </h3>
                    <div className="space-y-3">
                      {portals.map((portal, idx) => (
                        <motion.div
                          key={portal.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + idx * 0.1 }}
                        >
                          <Link 
                            href={portal.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-primary/30 transition-all active:scale-[0.98] group"
                          >
                            <div className="h-12 w-12 flex items-center justify-center bg-white dark:bg-white/10 text-primary rounded-xl shadow-sm border border-slate-200/50 dark:border-white/5 group-hover:scale-110 transition-transform">
                              <portal.icon className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                {portal.title} Portal
                              </span>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                                {portal.description}
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 px-1">
                      Menu
                    </h3>
                    <div className="grid grid-cols-1 gap-1">
                      {["Home", "News", "Placements", "Resources", "Partners", "About", "FAQ"].map((item, idx) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.05 }}
                        >
                          <Link 
                            className="text-base font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between py-3 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group" 
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item}
                            <ArrowRight className="h-4 w-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-xl font-bold text-sm shadow-xl shadow-primary/20 active:scale-[0.98] transition-transform"
                >
                  Login
                </Link>
                <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-4 font-medium tracking-wide">
                  TUPV SIT MANAGEMENT SYSTEM v1.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
