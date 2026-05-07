"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface SignOutOverlayProps {
  isVisible: boolean;
}

export function SignOutOverlay({ isVisible }: SignOutOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
        >
          <div className="flex flex-col items-center gap-8 max-w-sm w-full px-6 text-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.1 
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <Image 
                src="/Technological_University_of_the_Philippines_Seal.svg.png" 
                alt="TUP Seal" 
                width={100}
                height={100}
                className="relative z-10 h-24 w-auto object-contain"
              />
            </motion.div>

            {/* Text Content */}
            <div className="space-y-4">
              <motion.h2 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-semibold tracking-tight text-foreground"
              >
                Signing Out
              </motion.h2>
              
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm font-medium">Terminating secure session...</span>
                </div>
                
                <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.2em]">
                  Institutional Oversight Active
                </p>
              </motion.div>
            </div>

            {/* Bottom Progress Bar Placeholder */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-[1px] w-48 bg-primary/20 origin-left mt-8"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
