"use client";

import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";

export function FloatingThemeToggle() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-[100] hidden sm:block"
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-2 rounded-full shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
}
