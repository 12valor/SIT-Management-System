"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, X } from "lucide-react";

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/60 backdrop-blur-[2px] p-6"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 4 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="bg-white dark:bg-[#161616] rounded-xl p-8 max-w-xs w-full shadow-xl relative border border-slate-200/60 dark:border-white/10"
          >
            {status === "error" && onClose && (
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-1.5 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            <div className="flex flex-col items-center text-center gap-4">
              {status === "loading" && (
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-2">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-900 dark:text-white" />
                </div>
              )}
              {status === "success" && (
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              )}
              {status === "error" && (
                <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mb-2">
                  <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
              )}
              
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-slate-900 dark:text-white">
                  {status === "loading" && "Authenticating"}
                  {status === "success" && "Access Granted"}
                  {status === "error" && "Access Denied"}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
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
