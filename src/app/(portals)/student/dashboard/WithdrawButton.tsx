"use client";

import { useState } from "react";
import { withdrawApplication } from "@/app/(portals)/student/dashboard/actions";
import { Loader2, X } from "lucide-react";

export function WithdrawButton({ applicationId }: { applicationId: string }) {
  const [isPending, setIsPending] = useState(false);

  const handleWithdraw = async () => {
    if (!confirm("Are you sure you want to withdraw this application? This action cannot be undone.")) {
      return;
    }

    setIsPending(true);
    try {
      const result = await withdrawApplication(applicationId);
      if (result.success) {
        alert("Application withdrawn successfully");
      } else {
        alert(result.error || "Failed to withdraw application");
      }
    } catch {
      alert("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={handleWithdraw}
      disabled={isPending}
      className="inline-flex items-center justify-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400 dark:hover:border-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Withdraw Application"
    >
      {isPending ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <X className="h-3 w-3" />
      )}
      Withdraw
    </button>
  );
}
