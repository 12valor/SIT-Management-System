"use client";

import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { StudentDocument, REQUIRED_CREDENTIALS } from "@/app/(portals)/student/dashboard/types";

interface Props {
  documents: StudentDocument[];
}

export function ComplianceCard({ documents }: Props) {
  const complianceItems = REQUIRED_CREDENTIALS.map(req => ({
    ...req,
    isDone: documents.some(doc => doc.name === req.name)
  }));

  const mandatoryMissing = complianceItems.some(item => item.required && !item.isDone);

  if (!mandatoryMissing) return null;

  const mandatoryDoneCount = complianceItems.filter(i => i.required && i.isDone).length;
  const mandatoryTotalCount = complianceItems.filter(i => i.required).length;

  return (
    <div className="bg-white dark:bg-white/[0.02] border rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="px-5 py-3 border-b bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <h3 className="text-xs font-bold uppercase tracking-wider">Required Tasks</h3>
        </div>
        <span className="text-xs font-bold tabular-nums">
          {mandatoryDoneCount}/{mandatoryTotalCount}
        </span>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            Document Compliance
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Complete these tasks to apply for placements.</p>
        </div>
        
        <div className="space-y-3">
          {complianceItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 group">
              <div className={cn(
                "h-5 w-5 rounded-full border flex items-center justify-center transition-colors shrink-0",
                item.isDone ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-200 dark:border-white/10"
              )}>
                {item.isDone && <CheckCircle2 className="h-3 w-3" />}
              </div>
              <span className={cn(
                "text-sm font-medium transition-colors",
                item.isDone ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-300"
              )}>
                {item.name}
              </span>
              {item.required && !item.isDone && (
                <span className="ml-auto text-[10px] font-bold text-red-500 uppercase tracking-tight">Missing</span>
              )}
            </div>
          ))}
        </div>

        <Link 
          href="/student/documents"
          className="mt-2 flex items-center justify-between px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-all group"
        >
          <span className="text-xs font-bold">Go to Documents</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
