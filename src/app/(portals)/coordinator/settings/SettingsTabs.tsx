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
  { id: "website", name: "Website Assets", icon: Globe, description: "Manage landing page hero carousel and branding." },
  { id: "security", name: "Security & Access", icon: Lock, description: "Authentication policies and session management." },
  { id: "registry", name: "Institutional Registry", icon: Shield, description: "Department codes and university identifiers." },
  { id: "database", name: "Database Maintenance", icon: Database, description: "Integrity checks and archival protocols." },
  { id: "infrastructure", name: "System Health", icon: Server, description: "Infrastructure monitoring and API status." },
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
      setMessage({ type: 'success', text: "Website configuration synchronized successfully." });
      setPreviews(["", "", ""]);
      const data = await getHeroSlides();
      if (data) setSlides(data);
    } else {
      setMessage({ type: 'error', text: "Failed to update system settings." });
    }
  };

  const defaultSlides = [
    { title: "Slide 1", image: "/images/hero/industrial-1.png" },
    { title: "Slide 2", image: "/images/hero/industrial-2.png" },
    { title: "Slide 3", image: "/images/hero/industrial-3.png" },
  ];

  const currentSlides = slides.length > 0 ? slides : defaultSlides;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-80 flex flex-col gap-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300 border-2",
                isActive 
                  ? "bg-primary/5 border-primary/20 shadow-sm" 
                  : "bg-card border-transparent hover:border-border"
              )}
            >
              <div className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className={cn(
                  "text-sm font-bold tracking-tight",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}>
                  {tab.name}
                </span>
                <span className="text-[11px] text-muted-foreground leading-tight line-clamp-1">
                  {tab.description}
                </span>
              </div>
            </button>
          );
        })}
      </aside>

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden min-h-[600px]">
          {activeTab === "website" && (
            <div className="p-8 lg:p-12 animate-in-fade">
              <div className="mb-10">
                <h3 className="text-xl font-bold text-foreground mb-2">Institutional Hero Assets</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  Configure the primary visual narrative of the portal. These high-impact images are the first thing 
                  industrial partners and students see upon entering the platform.
                </p>
              </div>

              {message && (
                <div className={cn(
                  "mb-8 p-4 rounded-xl border flex items-center gap-3 animate-in-slide-down",
                  message.type === 'success' 
                    ? "bg-emerald-50/50 border-emerald-100 text-emerald-700" 
                    : "bg-rose-50/50 border-rose-100 text-rose-700"
                )}>
                  {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                  <span className="text-xs font-bold uppercase tracking-widest">{message.text}</span>
                </div>
              )}

              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-10">
                  <div className="grid md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((index) => {
                      const slide = currentSlides[index];
                      const preview = previews[index];
                      const displayImage = preview || slide?.image || "";

                      return (
                        <div key={index} className="space-y-4">
                          <div className="relative aspect-[4/5] rounded-2xl bg-muted border-2 border-dashed border-border overflow-hidden flex flex-col items-center justify-center group transition-all hover:border-primary/40">
                            {displayImage ? (
                              <Image 
                                src={displayImage} 
                                alt={`Slide ${index + 1}`} 
                                fill 
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="text-muted-foreground group-hover:text-primary transition-colors flex flex-col items-center gap-2">
                                <Upload className="h-8 w-8" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Upload Asset</span>
                              </div>
                            )}
                            
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                <Upload className="h-5 w-5" />
                              </div>
                              <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">Update Slide</span>
                            </div>

                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, index)}
                              className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                          </div>
                          <div className="px-1">
                            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Slide 0{index + 1}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-1 font-medium">{slide?.title || "Default Technical Asset"}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-border">
                    <p className="text-[11px] text-muted-foreground font-medium italic">
                      * Maximum file size per asset: 4MB. Recommended aspect ratio: 4:5 or 16:9.
                    </p>
                    <button
                      type="submit"
                      disabled={isSaving || (!previews[0] && !previews[1] && !previews[2])}
                      className="inline-flex items-center justify-center h-12 px-10 bg-primary text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-primary/20 disabled:opacity-50 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
                    >
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-3" /> : null}
                      {isSaving ? "Synchronizing..." : "Update System Config"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab !== "website" && (
            <div className="flex flex-col items-center justify-center h-[600px] p-12 text-center">
              <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mb-6">
                <Settings className="h-10 w-10 opacity-20" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 capitalize">{activeTab} Controls Restricted</h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                This administrative module is currently in read-only mode while the system undergoes 
                scheduled architectural maintenance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Settings } from "lucide-react";
