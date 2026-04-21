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
 
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          {/* Notification Icon Placeholder */}
          <div className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-lg font-medium leading-none mb-1">-</span>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="flex items-center gap-3">
           <div className="text-right hidden sm:block leading-none">
              <p className="text-sm font-bold text-foreground truncate max-w-[150px]">
                {session?.user?.name || "User"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                {roleTitle}
              </p>
           </div>
           
           <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm border border-primary/20">
            {session?.user?.name?.split(' ').filter(Boolean).map((n: string) => n[0]).join('') || roleInitials}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
