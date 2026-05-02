"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

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
          className={`fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-[#080808]/90 backdrop-blur-sm p-6 ${bebas.variable}`}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            className="bg-white dark:bg-[#0c0c0c] border border-slate-300 dark:border-white/10 p-12 max-w-sm w-full shadow-2xl relative"
          >
            {status === "error" && onClose && (
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Close [X]
              </button>
            )}
            
            <div className="flex flex-col items-center text-center gap-6">
              {status === "loading" && (
                <Loader2 className="w-12 h-12 animate-spin text-slate-900 dark:text-white" strokeWidth={1.5} />
              )}
              {status === "success" && (
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-500" strokeWidth={1.5} />
              )}
              {status === "error" && (
                <XCircle className="w-12 h-12 text-rose-600" strokeWidth={1.5} />
              )}
              
              <div>
                <h3 className="font-bebas text-5xl mb-3 text-slate-900 dark:text-white tracking-[-0.02em]">
                  {status === "loading" && "AUTHENTICATING"}
                  {status === "success" && "ACCESS GRANTED"}
                  {status === "error" && "ACCESS DENIED"}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {message || (status === "loading" ? "Validating credentials..." : "")}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
