"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex-1 min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-6 shadow-sm">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        
        <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-2">Dashboard Data Unavailable</h2>
        <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
          We encountered an issue loading this section of the portal. Your session remains active.
        </p>
        
        <button
          onClick={() => reset()}
          className="h-10 px-6 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-bold shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 active:scale-95"
        >
          <RefreshCcw className="h-4 w-4" />
          Reload Component
        </button>
      </div>
    </div>
  );
}
