"use client";

import { CheckCircle2, Circle, AlertCircle, ArrowRight } from "lucide-react";
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
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-border bg-destructive/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <h3 className="text-xs font-bold text-destructive uppercase tracking-widest">Action Required</h3>
        </div>
        <span className="text-[10px] font-bold text-destructive/60 uppercase tracking-widest">
          {mandatoryDoneCount}/{mandatoryTotalCount} Required
        </span>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-sm font-bold text-foreground">
          Pending Credentials
        </p>
        
        <div className="space-y-3">
          {complianceItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              {item.isDone ? (
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground/30 shrink-0" />
              )}
              <span className={cn(
                "text-xs font-medium",
                item.isDone ? "text-muted-foreground line-through" : "text-foreground"
              )}>
                {item.name}
              </span>
              {item.required && !item.isDone && (
                <span className="ml-auto text-[8px] font-black text-destructive/60 uppercase tracking-[0.1em]">Required</span>
              )}
            </div>
          ))}
        </div>

        <Link 
          href="/student/documents"
          className="mt-4 flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">Complete Submission</span>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      </div>
    </div>
  );
}
