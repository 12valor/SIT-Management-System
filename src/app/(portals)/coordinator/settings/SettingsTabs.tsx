"use client";

import React, { useState, useEffect } from "react";
import { 
  Globe, 
  Shield, 
  Database, 
  Lock, 
  Server, 
  Upload, 
  Loader2, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { updateHeroSlides, getHeroSlides } from "./general/actions";

const TABS = [
  { id: "website", name: "Website Assets", icon: Globe, description: "Hero carousel and branding." },
  { id: "security", name: "Security & Access", icon: Lock, description: "Auth policies." },
  { id: "registry", name: "Institutional Registry", icon: Shield, description: "University identifiers." },
  { id: "database", name: "Database Maintenance", icon: Database, description: "Archival protocols." },
  { id: "infrastructure", name: "System Health", icon: Server, description: "API status." },
];

interface HeroSlide {
  image: string;
  title: string;
  description: string;
}

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("website");
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [previews, setPreviews] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    async function load() {
      const data = await getHeroSlides();
      if (data) setSlides(data);
      setIsLoading(false);
    }
    load();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const MAX_SIZE = 4 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        alert("Image exceeds 4MB limit.");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[index] = reader.result as string;
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const formData = new FormData();
    if (previews[0]) formData.set("slide1", previews[0]);
    if (previews[1]) formData.set("slide2", previews[1]);
    if (previews[2]) formData.set("slide3", previews[2]);

    const result = await updateHeroSlides(formData);
    
    setIsSaving(false);
    if (result.success) {
      setMessage({ type: 'success', text: "System state synchronized" });
      setPreviews(["", "", ""]);
      const data = await getHeroSlides();
      if (data) setSlides(data);
    } else {
      setMessage({ type: 'error', text: "Synchronization failure" });
    }
  };

  const defaultSlides = [
    { title: "Slide 1", image: "/images/hero/industrial-1.png", description: "" },
    { title: "Slide 2", image: "/images/hero/industrial-2.png", description: "" },
    { title: "Slide 3", image: "/images/hero/industrial-3.png", description: "" },
  ];

  const currentSlides = slides.length > 0 ? slides : defaultSlides;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 font-light">
      {/* Sidebar Navigation */}
      <aside className="lg:col-span-1 space-y-1">
        <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.3em] mb-6 px-4 font-thin">Management Nodes</p>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 text-[13px] transition-all border-l-[1px] font-light tracking-wide",
                isActive 
                  ? "bg-primary/[0.03] border-primary text-foreground" 
                  : "border-transparent text-foreground/40 hover:text-foreground hover:bg-muted/30"
              )}
            >
              <tab.icon className={cn("h-4 w-4", isActive ? "text-primary" : "opacity-20")} />
              {tab.name}
            </button>
          );
        })}
      </aside>

      {/* Content Area */}
      <div className="lg:col-span-3 space-y-8">
        {activeTab === "website" && (
          <div className="bg-card border border-border/60 p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-12 animate-in-fade">
            <div className="flex items-center justify-between border-b border-border/40 pb-6">
              <h3 className="text-lg font-light text-foreground tracking-tight">Landing Page Assets</h3>
              <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.3em] font-thin text-right">Visual Identity Node</p>
            </div>

            {message && (
              <div className={cn(
                "p-4 rounded-lg border flex items-center gap-3 animate-in-slide-down",
                message.type === 'success' 
                  ? "bg-emerald-500/[0.03] border-emerald-500/10 text-emerald-600" 
                  : "bg-rose-500/[0.03] border-rose-500/10 text-rose-600"
              )}>
                {message.type === 'success' ? <CheckCircle2 className="h-4 w-4 stroke-[1px]" /> : <AlertCircle className="h-4 w-4 stroke-[1px]" />}
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-light">{message.text}</span>
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary opacity-10" />
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[0, 1, 2].map((index) => {
                    const slide = currentSlides[index];
                    const preview = previews[index];
                    const displayImage = preview || slide?.image || "";

                    return (
                      <div key={index} className="space-y-6 group">
                        <div className="flex items-center justify-between">
                          <p className="text-[9px] font-mono text-foreground/30 uppercase tracking-[0.4em] font-thin">Slide Index 0{index + 1}</p>
                        </div>
                        <div className="relative aspect-[3/4] bg-muted/30 border border-border/40 rounded-lg overflow-hidden transition-all duration-700 group-hover:border-primary/30 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                          {displayImage ? (
                            <Image 
                              src={displayImage} 
                              alt={`Slide ${index + 1}`} 
                              fill 
                              className="object-cover opacity-90 grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100"
                              unoptimized
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                              <Upload className="h-6 w-6 text-foreground/10 stroke-[1px]" />
                              <span className="text-[9px] font-mono text-foreground/20 uppercase tracking-[0.3em] font-thin text-center leading-loose">Asset<br/>Missing</span>
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-white/40 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-[4px]">
                            <div className="h-12 w-12 rounded-full bg-background/80 border border-border/50 flex items-center justify-center text-foreground shadow-sm">
                              <Upload className="h-5 w-5 stroke-[1px]" />
                            </div>
                            <span className="text-foreground text-[9px] font-light uppercase tracking-[0.3em]">Replace Content</span>
                          </div>

                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, index)}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                        </div>
                        <div className="space-y-2 px-1">
                          <p className="text-[13px] font-light text-foreground/80 line-clamp-1 tracking-tight">{slide?.title || "Technical Asset"}</p>
                          <div className="h-[1px] w-4 bg-primary/20 group-hover:w-8 transition-all duration-500" />
                          <p className="text-[9px] font-mono text-foreground/20 uppercase tracking-[0.4em] font-thin">Verified Access</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-10 border-t border-border/40">
                  <div className="space-y-2">
                    <p className="text-[9px] font-mono text-foreground/20 uppercase tracking-[0.4em] font-thin">Constraint: 4.0MB MAX_SIZE</p>
                    <p className="text-[9px] font-mono text-foreground/20 uppercase tracking-[0.4em] font-thin">Format: Static_WebP_PNG</p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSaving || (!previews[0] && !previews[1] && !previews[2])}
                    className="inline-flex items-center justify-center h-12 px-10 bg-foreground text-background text-[10px] font-light uppercase tracking-[0.4em] rounded-lg transition-all duration-500 hover:tracking-[0.5em] disabled:opacity-20 disabled:tracking-[0.4em] active:scale-[0.98] shadow-sm shadow-black/5"
                  >
                    {isSaving && <Loader2 className="h-3 w-3 animate-spin mr-4 stroke-[1px]" />}
                    {isSaving ? "Synchronizing..." : "Sync State"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab !== "website" && (
          <div className="bg-card border border-border/40 p-16 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] min-h-[460px] flex flex-col items-center justify-center text-center space-y-10 animate-in-fade">
            <div className="h-20 w-20 bg-muted/20 border border-border/20 rounded-full flex items-center justify-center text-foreground/10">
              <Lock className="h-8 w-8 stroke-[1px]" />
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-light text-foreground uppercase tracking-[0.5em] italic opacity-40 italic">Node Restricted</h3>
              <p className="text-[13px] text-foreground/30 max-w-xs leading-relaxed font-light tracking-wide">
                Management protocols for {activeTab.replace(/_/g, ' ')} are currently offline for maintenance.
              </p>
            </div>
            <p className="text-[9px] font-mono text-foreground/20 uppercase tracking-[0.5em] font-thin">System_Ver_5.2.0-STABLE</p>
          </div>
        )}
      </div>
    </div>
  );
}
