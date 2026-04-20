"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // We could log this to an error reporting service here
    console.error("Global boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen pb-20 flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-red-100">
          <AlertCircle className="h-8 w-8" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">System Fault Detected</h2>
        <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
          The SIT Management System encountered an unexpected runtime error. We&apos;ve logged the diagnostics.
        </p>
        
        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/10 hover:bg-black hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <RotateCcw className="h-4 w-4" />
          Attempt Recovery
        </button>
      </div>
    </div>
  );
}
