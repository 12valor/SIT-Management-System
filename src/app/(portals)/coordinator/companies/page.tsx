"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useEffect, useCallback } from "react";
import { Search, ShieldCheck, ShieldAlert, Mail, Globe, Clock, Loader2, Building } from "lucide-react";
import { getCompanies, setCompanyVerification } from "./actions";
import { cn } from "@/lib/utils";

type Company = {
  id: string;
  name: string;
  email: string;
  industry: string;
  isVerified: boolean;
  joinedAt: Date;
  _count: { employers: number; postings: number };
};

export default function CoordinatorCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const load = useCallback(async () => {
    const res = await getCompanies();
    setCompanies(res as Company[]);
    setIsLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleVerify = async (id: string, status: boolean) => {
    setProcessing(id);
    await setCompanyVerification(id, status);
    await load();
    setProcessing(null);
  };

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const verifiedCount  = companies.filter((c) => c.isVerified).length;
  const pendingCount   = companies.filter((c) => !c.isVerified).length;

  return (
    <Skeleton 
      name="coordinator-companies" 
      loading={isLoading}
      fallback={
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-muted rounded-lg" />
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-muted rounded-xl border border-border" />
            ))}
          </div>
          <div className="h-96 bg-muted rounded-xl border border-border" />
        </div>
      }
    >
      <div className="flex-1 space-y-12">
        {/* 1. Header Section */}
        <div className="pb-6 border-b border-border/50 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground uppercase tracking-tight">
              Industrial Partners
            </h2>
            <p className="text-sm text-foreground/80 mt-1">
              Management of institutional industrial affiliations and MOU status
            </p>
          </div>
          <div className="text-[10px] font-semibold text-foreground/70 bg-muted px-2 py-0.5 rounded border border-border/50 uppercase tracking-wider">
            {companies.length} Registered Entities
          </div>
        </div>

        {/* 2. Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Total Partners",  value: companies.length },
            { label: "MOU Verified",    value: verifiedCount },
            { label: "Pending Review",  value: pendingCount },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-2">
              <p className="text-[10px] font-semibold uppercase text-foreground/50 tracking-wider">{s.label}</p>
              <p className="text-3xl font-semibold text-foreground tracking-tight">{s.value}</p>
            </div>
          ))}
        </div>

        {/* 3. Table & Toolbar Section */}
        <div className="space-y-6 pb-24">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Partner Registry</h3>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30" />
                <input
                  type="text"
                  placeholder="Search partners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 h-9 rounded-lg border border-border bg-card text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">Company Entity</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left hidden md:table-cell">Industry Focus</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left hidden lg:table-cell">Personnel</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left hidden lg:table-cell">Postings</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-left">MOU Status</th>
                    <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-wider text-foreground/50 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filtered.length === 0 && !isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-32 text-center">
                        <p className="text-xs font-semibold text-foreground/30 uppercase tracking-widest">
                          {companies.length === 0 ? "No partners registered" : "No results found"}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((c) => (
                      <tr key={c.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-foreground tracking-tight leading-none">{c.name}</p>
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-foreground/50 font-medium">
                            <Mail className="h-2.5 w-2.5 opacity-50" /> {c.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-1 text-xs text-foreground/70 font-medium">
                            <Globe className="h-3 w-3 opacity-50" /> {c.industry}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className="text-sm font-semibold tabular-nums text-foreground/80">{c._count.employers}</span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className="text-sm font-semibold tabular-nums text-foreground/80">{c._count.postings}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider border shadow-sm",
                            c.isVerified
                              ? "bg-primary/5 text-primary border-primary/10"
                              : "bg-amber-500/5 text-amber-600 border-amber-500/10"
                          )}>
                            {c.isVerified ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                            {c.isVerified ? "Verified" : "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {!c.isVerified ? (
                            <button
                              onClick={() => handleVerify(c.id, true)}
                              disabled={processing === c.id}
                              className="h-8 px-3 rounded-lg border border-primary bg-primary text-primary-foreground text-[9px] font-semibold uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-1.5 ml-auto"
                            >
                              {processing === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShieldCheck className="h-3 w-3" />}
                              Verify
                            </button>
                          ) : (
                            <button
                              onClick={() => handleVerify(c.id, false)}
                              disabled={processing === c.id}
                              className="h-8 px-3 rounded-lg border border-border bg-muted text-foreground/60 text-[9px] font-semibold uppercase tracking-wider hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all disabled:opacity-50 flex items-center gap-1.5 ml-auto"
                            >
                              {processing === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Clock className="h-3 w-3" />}
                              Revoke
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-border/40 bg-muted/20">
              <p className="text-[9px] font-medium text-foreground/40 uppercase tracking-widest">
                Partner Entities: {filtered.length} of {companies.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
  );
}
