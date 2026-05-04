import React from "react";
import { getCompanyPresence } from "./actions";
import { PresenceForm } from "./PresenceForm";
import { Globe, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function InstitutionalPresencePage() {
  const res = await getCompanyPresence();

  if (!res.success || !res.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-card border border-dashed border-border rounded-xl">
        <h2 className="text-xl font-bold text-foreground">Configuration Error</h2>
        <p className="text-sm text-muted-foreground mt-2">{res.error || "Could not load company data"}</p>
      </div>
    );
  }

  const company = res.data;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
        <Link href="/employer/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Institutional Presence</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Globe className="h-6 w-6" />
             </div>
             <div>
                <h1 className="text-3xl font-black tracking-tight text-foreground">{company.name}</h1>
                <p className="text-sm text-muted-foreground font-medium">Identity & External Connectivity Hub</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
        <div className="lg:col-span-8">
           <PresenceForm initialData={{
             websiteUrl: company.websiteUrl,
             facebookUrl: company.facebookUrl,
             linkedinUrl: company.linkedinUrl,
             twitterUrl: company.twitterUrl,
             instagramUrl: company.instagramUrl,
           }} />
        </div>
        
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Management Summary</h4>
            <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-xs font-medium text-muted-foreground">Verification Status</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-wider border border-emerald-200">Verified Partner</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-xs font-medium text-muted-foreground">Profile Reach</span>
                <span className="text-xs font-bold text-foreground">Global</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs font-medium text-muted-foreground">Last Synchronization</span>
                <span className="text-[10px] font-bold text-foreground uppercase">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-foreground text-background p-8 rounded-2xl space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Institutional Branding</h4>
              <p className="text-[10px] opacity-60 font-medium">Coming Soon</p>
            </div>
            <p className="text-xs leading-relaxed opacity-80">
              Future updates will allow you to customize your company banner, cultural manifesto, and testimonial highlights.
            </p>
            <div className="h-1 w-12 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
