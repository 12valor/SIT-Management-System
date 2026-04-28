"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardHeaderProps {
  session: Session | null;
  pathname: string;
  navItems: NavItem[];
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
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    
    // Simply set scrolled state for visual feedback
    if (latest > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const activeItem = navItems.find(item => item.href === pathname);

  return (
    <motion.header
      initial="visible"
      animate="visible"
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-40 flex h-16 items-center gap-6 border-b px-8 lg:px-10 transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-xl border-border" 
          : "bg-background border-transparent"
      }`}
    >
      <button 
        className="lg:hidden p-2 rounded-lg bg-muted hover:scale-105 transition-transform"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
      </button>
      
      <div className="flex-1">
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          {activeItem?.name || "Dashboard"}
        </h1>
      </div>
 
      <div className="flex items-center gap-4">
        {/* System Indicators */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-x border-border/50 hidden md:flex">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Node Active</span>
        </div>

        <ThemeToggle />
        
        {/* User Access Block */}
        <div className="flex items-center border border-border bg-card hover:border-primary/30 transition-colors cursor-default group overflow-hidden">
           {/* Info Section */}
           <div className="px-4 py-2 border-r border-border hidden sm:block">
              <p className="text-[10px] font-black text-foreground uppercase tracking-wider leading-none">
                {session?.user?.name || "Unauthorized"}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                 <div className="h-1 w-1 bg-primary" />
                 <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                   {roleTitle}
                 </p>
              </div>
           </div>
           
           {/* Avatar Section (Sharp) */}
           <div className="h-10 w-10 flex items-center justify-center bg-muted text-foreground text-xs font-black group-hover:bg-primary group-hover:text-white transition-all">
            {session?.user?.name?.split(' ').filter(Boolean).map((n: string) => n[0]).join('') || roleInitials}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
