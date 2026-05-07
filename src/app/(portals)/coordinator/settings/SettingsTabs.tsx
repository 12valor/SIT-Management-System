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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
      {/* Sidebar Navigation */}
      <aside className="lg:col-span-1 space-y-1">
        <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-4 px-4">Management Nodes</p>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm transition-all border-l-2",
                isActive 
                  ? "bg-primary/5 border-primary text-foreground font-semibold" 
                  : "border-transparent text-foreground/60 hover:text-foreground hover:bg-muted/50"
              )}
            >
              <tab.icon className={cn("h-4 w-4", isActive ? "text-primary" : "opacity-40")} />
              {tab.name}
            </button>
          );
        })}
      </aside>

      {/* Content Area */}
      <div className="lg:col-span-3 space-y-8">
        {activeTab === "website" && (
          <div className="bg-card border border-border p-8 rounded-xl shadow-sm space-y-10 animate-in-fade">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-semibold text-foreground">Landing Page Assets</h3>
              <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Public-Facing Visuals</p>
            </div>

            {message && (
              <div className={cn(
                "p-4 rounded-lg border flex items-center gap-3 animate-in-slide-down",
                message.type === 'success' 
                  ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600" 
                  : "bg-rose-500/5 border-rose-500/20 text-rose-600"
              )}>
                {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold">{message.text}</span>
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" />
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[0, 1, 2].map((index) => {
                    const slide = currentSlides[index];
                    const preview = previews[index];
                    const displayImage = preview || slide?.image || "";

                    return (
                      <div key={index} className="space-y-4 group">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Slide 0{index + 1}</p>
                        </div>
                        <div className="relative aspect-[4/5] bg-muted border border-border rounded-lg overflow-hidden transition-all group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/5">
                          {displayImage ? (
                            <Image 
                              src={displayImage} 
                              alt={`Slide ${index + 1}`} 
                              fill 
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                              <Upload className="h-6 w-6 text-foreground/20" />
                              <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Null Asset</span>
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                            <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center">
                              <Upload className="h-5 w-5" />
                            </div>
                            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Replace Asset</span>
                          </div>

                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, index)}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                        </div>
                        <div className="space-y-1 px-1">
                          <p className="text-xs font-semibold text-foreground line-clamp-1">{slide?.title || "Technical Asset"}</p>
                          <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Verified Reference</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-border">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest italic">Constraint: 4MB Limit</p>
                    <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Protocol: 4:5 Portrait</p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSaving || (!previews[0] && !previews[1] && !previews[2])}
                    className="inline-flex items-center justify-center h-10 px-8 bg-foreground text-background text-[10px] font-bold uppercase tracking-[0.2em] rounded-md transition-all hover:bg-foreground/90 disabled:opacity-30 disabled:translate-y-0 active:scale-[0.98]"
                  >
                    {isSaving && <Loader2 className="h-3 w-3 animate-spin mr-3" />}
                    {isSaving ? "Synchronizing..." : "Sync State"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab !== "website" && (
          <div className="bg-card border border-border p-12 rounded-xl shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
            <div className="h-16 w-16 bg-muted border border-border rounded-lg flex items-center justify-center text-foreground/20">
              <Lock className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest italic">Node Restricted</h3>
              <p className="text-xs text-foreground/50 max-w-xs leading-relaxed">
                Module for {activeTab.replace(/_/g, ' ')} management is currently undergoing maintenance.
              </p>
            </div>
            <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Protocol Version v5.2.0</p>
          </div>
        )}
      </div>
    </div>
  );
}
