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
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-pulse" />
              <Image 
                src="/Technological_University_of_the_Philippines_Seal.svg.png" 
                alt="TUP Seal" 
                width={80}
                height={80}
                className="relative z-10 h-20 w-auto object-contain"
              />
            </motion.div>

            {/* Simple Text Content */}
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Signing Out
              </h2>
              <Loader2 className="h-4 w-4 animate-spin text-primary opacity-50" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
