"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { NotificationCenter } from "@/components/NotificationCenter";
import { ThemeToggle } from "@/components/theme-toggle";

interface DashboardHeaderProps {
  session: any;
  pathname: string;
  navItems: { name: string; href: string; icon: any }[];
  setIsMobileMenuOpen: (open: boolean) => void;
  roleTitle: string;
  roleInitials: string;
}

export function DashboardHeader({ 
  session, 
  pathname, 
  navItems, 
  setIsMobileMenuOpen,
  roleTitle,
  roleInitials
}: DashboardHeaderProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Scrolled state for visual feedback
    if (latest > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Smart visibility logic
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const activeItem = navItems.find(item => item.href === pathname);

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-40 flex h-20 items-center gap-6 border-b px-8 lg:px-12 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-2xl border-slate-200 shadow-sm shadow-slate-200/20" 
          : "bg-background border-transparent"
      }`}
    >
      <button 
        className="lg:hidden p-2 rounded-xl bg-muted border border-border hover:scale-105 transition-transform"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>
      
      <div className="flex-1">
        <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-1 leading-none opacity-70">
          Standard Operational Matrix
        </p>
        <h1 className="text-lg font-black tracking-tighter text-foreground uppercase truncate max-w-[200px] sm:max-w-none">
          {activeItem?.name || "System Unit"}
        </h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:flex items-center gap-4">
          <NotificationCenter />
          <ThemeToggle />
        </div>
        
        <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />
        
        <div className="flex items-center gap-4 pl-1">
           <div className="text-right hidden md:block">
              <p className="text-xs font-black text-foreground leading-none tracking-tight">
                {session?.user?.name || "Principal Agent"}
              </p>
              <p className="text-[9px] text-primary mt-1.5 uppercase font-black tracking-widest leading-none">
                {roleTitle}
              </p>
           </div>
           
           <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-slate-900/20 ring-4 ring-background transition-all hover:scale-105">
            {session?.user?.name?.split(' ').filter(Boolean).map((n: string) => n[0]).join('') || roleInitials}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
