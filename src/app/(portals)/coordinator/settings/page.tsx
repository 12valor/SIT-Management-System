import React from "react";
import { Settings, Shield, Database, Lock, Globe, Server } from "lucide-react";

export default function SystemControlPage() {
  const controlSections = [
    {
      title: "Security & Authentication",
      icon: Lock,
      description: "Manage system-wide access policies, token expiration, and multi-factor enforcement.",
      status: "Operational",
      statusColor: "text-emerald-500"
    },
    {
      title: "Database Integrity",
      icon: Database,
      description: "Audit storage allocation, run maintenance scripts, and verify relationship constraints.",
      status: "Optimized",
      statusColor: "text-emerald-500"
    },
    {
      title: "Institutional Registry",
      icon: Shield,
      description: "Configure official university branding, department identifiers, and regional settings.",
      status: "Verified",
      statusColor: "text-emerald-500"
    },
    {
      title: "System Infrastructure",
      icon: Server,
      description: "Monitor node health, API latency, and real-time synchronization services.",
      status: "Active",
      statusColor: "text-emerald-500"
    }
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Settings className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">System Control</h2>
        </div>
        <p className="text-sm text-muted-foreground font-medium max-w-2xl leading-relaxed">
          High-level administrative terminal for the SIT Management System. Configure core operational 
          parameters and maintain institutional oversight across all platform nodes.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {controlSections.map((section) => (
          <div 
            key={section.title}
            className="group bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <section.icon size={120} />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <section.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full border border-border">
                  <span className={`w-1.5 h-1.5 rounded-full bg-current ${section.statusColor}`} />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{section.status}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-3">{section.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                {section.description}
              </p>

              <button className="h-10 w-full rounded-lg bg-muted border border-border text-[11px] font-bold text-foreground uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-[0.98]">
                Configure Parameters
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Tools Section */}
      <div className="bg-muted border border-border rounded-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <Globe className="h-5 w-5 text-primary" />
          <h4 className="text-sm font-bold text-foreground uppercase tracking-[0.2em]">Deployment Environment</h4>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { label: "Current Node", value: "TUPV-VISAYAS-01" },
            { label: "API Version", value: "v5.2.0-stable" },
            { label: "Last Audit", value: new Date().toLocaleDateString() },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
              <p className="text-sm font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
