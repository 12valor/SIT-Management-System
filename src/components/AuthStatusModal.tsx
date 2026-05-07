"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type AuthStatus = "idle" | "loading" | "success" | "error";

interface AuthStatusModalProps {
  status: AuthStatus;
  message?: string;
  onClose?: () => void;
}

export function AuthStatusModal({ status, message, onClose }: AuthStatusModalProps) {
  return (
    <AnimatePresence>
      {status !== "idle" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md p-6"
        >
          {status === "error" && onClose && (
            <button 
              onClick={onClose} 
              className="absolute top-8 right-8 p-3 rounded-full text-foreground/40 hover:text-foreground hover:bg-muted transition-all active:scale-95"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex flex-col items-center gap-8 text-center max-w-sm w-full">
            {/* Logo/Icon Section */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={status}
              className="relative"
            >
              <div className={cn(
                "absolute inset-0 rounded-full blur-2xl animate-pulse",
                status === "loading" && "bg-primary/10",
                status === "success" && "bg-emerald-500/10",
                status === "error" && "bg-rose-500/10"
              )} />
              
              {status === "loading" && (
                <Image 
                  src="/Technological_University_of_the_Philippines_Seal.svg.png" 
                  alt="TUP Seal" 
                  width={80}
                  height={80}
                  className="relative z-10 h-20 w-auto object-contain"
                />
              )}

              {status === "success" && (
                <div className="relative z-10 h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" strokeWidth={1.5} />
                </div>
              )}

              {status === "error" && (
                <div className="relative z-10 h-20 w-20 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                  <XCircle className="h-10 w-10 text-rose-500" strokeWidth={1.5} />
                </div>
              )}
            </motion.div>

            {/* Content Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {status === "loading" && "Authenticating"}
                {status === "success" && "Access Granted"}
                {status === "error" && "Access Denied"}
              </h2>
              
              <div className="flex flex-col items-center gap-3">
                {status === "loading" && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-primary opacity-50" />
                    <span className="text-sm font-medium">{message || "Validating credentials..."}</span>
                  </div>
                )}
                
                {(status === "success" || status === "error") && (
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {message}
                  </p>
                )}
              </div>
            </div>

            {/* Error Action */}
            {status === "error" && onClose && (
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-all"
              >
                Try Again
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
