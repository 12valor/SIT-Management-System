"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ShieldCheck, ShieldAlert, Mail, Globe, Clock, Loader2 } from "lucide-react";
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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Registry</p>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Industry Partners</h1>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Partners",  value: companies.length },
          { label: "MOU Verified",    value: verifiedCount },
          { label: "Pending Review",  value: pendingCount },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-lg bg-card border border-border">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-black font-mono tabular-nums text-foreground mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by company name or industry..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 h-9 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left">
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Company</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden md:table-cell">Industry</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden lg:table-cell">Employers</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden lg:table-cell">Postings</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">MOU Status</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-xs text-muted-foreground font-mono">
                    {companies.length === 0 ? "No partner companies registered." : "No results for your search."}
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-foreground text-sm leading-tight">{c.name}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px] font-mono text-muted-foreground">
                        <Mail className="h-3 w-3" /> {c.email}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Globe className="h-3 w-3" /> {c.industry}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className="text-sm font-mono font-bold tabular-nums text-foreground">{c._count.employers}</span>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className="text-sm font-mono font-bold tabular-nums text-foreground">{c._count.postings}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                        c.isVerified
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      )}>
                        {c.isVerified ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                        {c.isVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {!c.isVerified ? (
                        <button
                          onClick={() => handleVerify(c.id, true)}
                          disabled={processing === c.id}
                          className="h-7 px-3 rounded border border-primary bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 flex items-center gap-1 ml-auto"
                        >
                          {processing === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShieldCheck className="h-3 w-3" />}
                          Verify
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVerify(c.id, false)}
                          disabled={processing === c.id}
                          className="h-7 px-3 rounded border border-border bg-muted text-muted-foreground text-[9px] font-black uppercase tracking-widest hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors disabled:opacity-50 flex items-center gap-1 ml-auto"
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
        <div className="px-5 py-3 border-t border-border bg-muted/20">
          <p className="text-[10px] font-mono text-muted-foreground">
            Showing {filtered.length} of {companies.length} partners
          </p>
        </div>
      </div>
    </div>
  );
}
