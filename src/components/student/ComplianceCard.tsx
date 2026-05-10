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
    <div className="bg-card border-2 border-foreground shadow-[8px_8px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
      <div className="px-6 py-5 border-b-2 border-foreground bg-primary text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-4 w-4" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Institutional Protocol</h3>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
          {mandatoryDoneCount}/{mandatoryTotalCount} Required
        </span>
      </div>

      <div className="p-8 space-y-8">
        <div className="space-y-2">
          <h4 className="text-2xl font-black tracking-tight leading-none text-foreground">
            Manifest<br />Compliance
          </h4>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Pending Submissions</p>
        </div>
        
        <div className="space-y-4">
          {complianceItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 group">
              <div className={cn(
                "h-5 w-5 border-2 flex items-center justify-center transition-colors",
                item.isDone ? "bg-primary border-primary text-white" : "border-foreground/10 group-hover:border-foreground/30"
              )}>
                {item.isDone && <CheckCircle2 className="h-3 w-3" />}
              </div>
              <span className={cn(
                "text-xs font-bold tracking-tight transition-colors",
                item.isDone ? "text-muted-foreground/40 line-through" : "text-foreground"
              )}>
                {item.name}
              </span>
              {item.required && !item.isDone && (
                <span className="ml-auto text-[8px] font-black text-primary uppercase tracking-[0.1em] border border-primary/20 px-1.5 py-0.5">Required</span>
              )}
            </div>
          ))}
        </div>

        <Link 
          href="/student/documents"
          className="mt-4 flex items-center justify-between p-4 bg-foreground text-background hover:bg-primary transition-all group"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Archive Vault</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
