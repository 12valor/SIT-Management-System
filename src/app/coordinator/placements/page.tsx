"use client";

import { useState, useEffect, useCallback } from "react";
import { Building2, MapPin, Loader2 } from "lucide-react";
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

const TYPE_STYLE: Record<PlacementType, string> = {
  ON_SITE: "bg-muted text-muted-foreground border-border",
  REMOTE:  "bg-blue-500/10 text-blue-600 border-blue-500/20",
  HYBRID:  "bg-purple-500/10 text-purple-600 border-purple-500/20",
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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Registry</p>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Active Placements</h1>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground bg-muted px-3 py-1.5 rounded-md border border-border">
          {placements.length} confirmed
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left">
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Student</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Role</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden md:table-cell">Company</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden lg:table-cell">Location</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-right">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto" />
                  </td>
                </tr>
              ) : placements.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-xs text-muted-foreground font-mono">
                    No confirmed placements yet. Approve applications to see records here.
                  </td>
                </tr>
              ) : (
                placements.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-foreground text-sm">{p.student.name ?? "—"}</p>
                      <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{p.student.email}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-bold text-foreground">{p.posting.title}</span>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Building2 className="h-3 w-3 text-primary" />
                        {p.posting.company?.name ?? "—"}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {p.posting.location}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                        TYPE_STYLE[p.posting.type]
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
        <div className="px-5 py-3 border-t border-border bg-muted/20">
          <p className="text-[10px] font-mono text-muted-foreground">
            {placements.length} total placements on record
          </p>
        </div>
      </div>
    </div>
  );
}
