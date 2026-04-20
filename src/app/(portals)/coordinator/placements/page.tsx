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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Industrial Placements</h1>
          <p className="text-sm text-slate-500 font-medium">Verified student affiliations and active industry partnerships.</p>
        </div>
        <div className="h-10 px-4 flex items-center bg-white rounded-lg border border-slate-200 shadow-sm text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {placements.length} Confirmed Placements
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left">Internal Intern</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left">Industrial Role</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left hidden md:table-cell">Host Company</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left hidden lg:table-cell">Site Location</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Modality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#800000] mx-auto opacity-20" />
                  </td>
                </tr>
              ) : placements.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-32 text-center">
                    <p className="text-sm text-slate-300 font-bold uppercase tracking-widest">
                      No Records Confirmed
                    </p>
                  </td>
                </tr>
              ) : (
                placements.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 leading-tight">{p.student.name ?? "—"}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{p.student.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-700">{p.posting.title}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Building2 className="h-3.5 w-3.5 text-[#800000] opacity-60" />
                        {p.posting.company?.name ?? "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin className="h-3.5 w-3.5" /> {p.posting.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border shadow-sm",
                        p.posting.type === 'ON_SITE' ? "bg-slate-50 text-slate-500 border-slate-200" :
                        p.posting.type === 'REMOTE' ? "bg-blue-50 text-blue-600 border-blue-100" :
                        "bg-purple-50 text-purple-600 border-purple-100"
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
        <div className="px-6 py-3 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {placements.length} Total Synchronized Placements
          </p>
        </div>
      </div>
    </div>
  );
}
