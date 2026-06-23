"use client";

import { Building2, MapPin, MapPinned } from "lucide-react";
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

interface PlacementsClientProps {
  initialPlacements: Placement[];
}

export default function PlacementsClient({ initialPlacements }: PlacementsClientProps) {
  const placements = initialPlacements;

  return (
    <div className="flex-1 space-y-12">
      {/* 1. Header Section */}
      <div className="pb-8 border-b border-border/40 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">SIT Placements</h2>
          <p className="text-base text-foreground/60 mt-2 font-medium">Verified student affiliations and active industry partnerships</p>
        </div>
        <div className="text-xs font-medium text-foreground/60 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/40">
          <span className="font-bold text-foreground">{placements.length}</span> Confirmed Placements
        </div>
      </div>

      {/* 2. Main Content Section */}
      <div className="space-y-6 pb-24">
        <div className="flex items-center justify-between border-b border-border/40 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary"><MapPinned className="h-5 w-5" /></div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">Placement Manifest</h3>
          </div>
        </div>

        <div className="bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30 border-b border-border/40">
                  <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-foreground/50 text-left">Internal Intern</th>
                  <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-foreground/50 text-left">Industrial Role</th>
                  <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-foreground/50 text-left hidden md:table-cell">Host Company</th>
                  <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-foreground/50 text-left hidden lg:table-cell">Site Location</th>
                  <th className="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-foreground/50 text-right">Modality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {placements.length === 0 ? (
                  <tr><td colSpan={5} className="py-32 text-center"><p className="text-xs font-semibold text-foreground/30 uppercase tracking-widest">No Records Confirmed</p></td></tr>
                ) : (
                  placements.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground tracking-tight">{p.student.name ?? "—"}</p>
                        <p className="text-xs text-foreground/50 font-medium mt-0.5">{p.student.email}</p>
                      </td>
                      <td className="px-6 py-4"><span className="text-sm font-medium text-foreground/80">{p.posting.title}</span></td>
                      <td className="px-6 py-4 hidden md:table-cell"><div className="flex items-center gap-2 text-sm text-foreground/70 font-medium"><Building2 className="h-4 w-4 text-foreground/40" />{p.posting.company?.name ?? "—"}</div></td>
                      <td className="px-6 py-4 hidden lg:table-cell"><div className="flex items-center gap-2 text-sm text-foreground/60"><MapPin className="h-4 w-4 text-foreground/40" /> {p.posting.location}</div></td>
                      <td className="px-6 py-4 text-right">
                        <span className={cn("inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm ring-1 ring-inset", p.posting.type === 'ON_SITE' ? "bg-muted/50 text-foreground/70 ring-border/50" : "bg-primary/5 text-primary ring-primary/20")}>
                          {TYPE_LABEL[p.posting.type]}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-border/40 bg-muted/10 flex items-center justify-between">
            <p className="text-[10px] font-medium text-foreground/50 uppercase tracking-widest">Records Synchronized: <span className="font-bold text-foreground">{placements.length}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
