"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useEffect, useCallback } from "react";
import { Building2, MapPin, Loader2, MapPinned } from "lucide-react";
import { getPlacements } from "./actions";
import { PlacementType } from "@prisma/client";
import { cn } from "@/lib/utils";

type Placement = {
  id: string;
  updatedAt: Date;
  student: { name: string | null; email: string | null; course: string | null };
  posting: {
    title: string;
    location: string;
    type: PlacementType;
    company: { name: string; industry: string } | null;
  };
};

const TYPE_LABEL: Record<PlacementType, string> = {
  ON_SITE: "On-site",
  REMOTE: "Remote",
  HYBRID: "Hybrid",
};

export default function CoordinatorPlacementsPage() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await getPlacements();
    setPlacements(res as Placement[]);
    setIsLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <Skeleton 
      name="coordinator-placements" 
      loading={isLoading}
      fallback={
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-muted rounded-lg" />
          <div className="h-96 bg-muted rounded-xl border border-border" />
        </div>
      }
    >
      <div className="flex-1 space-y-12">
        {/* 1. Header Section */}
        <div className="pb-6 border-b border-border/50 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground uppercase tracking-tight">
              SIT Placements
            </h2>
            <p className="text-sm text-foreground/80 mt-1">
              Verified student affiliations and active industry partnerships
            </p>
          </div>
          <div className="text-[10px] font-semibold text-foreground/70 bg-muted px-2 py-0.5 rounded border border-border/50 uppercase tracking-wider">
            {placements.length} Confirmed Placements
          </div>
        </div>

        {/* 2. Main Content Section */}
        <div className="space-y-6 pb-24">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Placement Manifest</h3>
            <div className="p-1 bg-primary/10 rounded-lg text-primary">
              <MapPinned className="h-4 w-4" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Internal Intern</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Industrial Role</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left hidden md:table-cell">Host Company</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left hidden lg:table-cell">Site Location</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-right">Modality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {placements.length === 0 && !isLoading ? (
                    <tr>
                      <td colSpan={5} className="py-32 text-center">
                        <p className="text-xs font-semibold text-foreground/30 uppercase tracking-widest">
                          No Records Confirmed
                        </p>
                      </td>
                    </tr>
                  ) : (
                    placements.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-foreground tracking-tight">{p.student.name ?? "—"}</p>
                          <p className="text-[10px] text-foreground/50 font-medium mt-0.5">{p.student.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-foreground/80">{p.posting.title}</span>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-1.5 text-xs text-foreground/70 font-medium">
                            <Building2 className="h-3.5 w-3.5 opacity-50" />
                            {p.posting.company?.name ?? "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                            <MapPin className="h-3.5 w-3.5 opacity-50" /> {p.posting.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider border shadow-sm",
                            p.posting.type === 'ON_SITE' ? "bg-muted text-foreground/60 border-border/50" :
                            p.posting.type === 'REMOTE' ? "bg-primary/5 text-primary border-primary/10" :
                            "bg-primary/5 text-primary border-primary/10"
                          )}>
                            {TYPE_LABEL[p.posting.type]}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-border/40 bg-muted/20 flex items-center justify-between">
              <p className="text-[9px] font-medium text-foreground/40 uppercase tracking-widest">
                Records Synchronized: {placements.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
