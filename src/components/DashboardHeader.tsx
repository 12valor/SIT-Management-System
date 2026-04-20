"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { NotificationCenter } from "@/components/NotificationCenter";
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
      className={`sticky top-0 z-40 flex h-16 items-center gap-6 border-b px-8 lg:px-10 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-slate-200" 
          : "bg-white border-transparent"
      }`}
    >
      <button 
        className="lg:hidden p-2 rounded-lg bg-slate-100 hover:scale-105 transition-transform"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="h-4 w-4 text-slate-600" />
      </button>
      
      <div className="flex-1">
        <h1 className="text-lg font-bold tracking-tight text-slate-800">
          {activeItem?.name || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          {/* Notification Icon - Placeholder like the minus sign in screenshot or just NotificationCenter */}
          <div className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
            <span className="text-lg font-medium leading-none mb-1">-</span>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="flex items-center gap-3">
           <div className="text-right hidden sm:block leading-none">
              <p className="text-sm font-bold text-slate-900 truncate max-w-[150px]">
                {session?.user?.name || "User"}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">
                {roleTitle === "Verified Candidate" ? "BSIT-4A" : roleTitle}
              </p>
           </div>
           
           <div className="h-9 w-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
            {session?.user?.name?.split(' ').filter(Boolean).map((n: string) => n[0]).join('') || roleInitials}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
