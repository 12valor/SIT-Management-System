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
  AlertCircle,
  LayoutTemplate
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { updateHeroSlides, getHeroSlides, getMarqueeSettings, updateMarqueeSettings } from "./general/actions";

const TABS = [
  { id: "website", name: "Hero Carousel", icon: Globe },
  { id: "marquee", name: "Partners Marquee", icon: LayoutTemplate },
  { id: "security", name: "Security", icon: Lock },
  { id: "registry", name: "Registry", icon: Shield },
  { id: "database", name: "Database", icon: Database },
  { id: "infrastructure", name: "System", icon: Server },
];

const DEFAULT_MARQUEE_SETTINGS = {
  enabled: true,
  title: "",
  label: "",
  speed: 50,
  showInAbout: true
};

interface HeroSlide {
  image: string;
  title: string;
  description: string;
}

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("website");
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [marqueeSettings, setMarqueeSettings] = useState(DEFAULT_MARQUEE_SETTINGS);
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  const [isMarqueeLoading, setIsMarqueeLoading] = useState(false);
  const [hasLoadedHero, setHasLoadedHero] = useState(false);
  const [hasLoadedMarquee, setHasLoadedMarquee] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [previews, setPreviews] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    let isCancelled = false;

    async function loadHeroSlides() {
      if (hasLoadedHero) return;
      setIsHeroLoading(true);
      const slideData = await getHeroSlides();
      if (isCancelled) return;
      if (slideData) setSlides(slideData);
      setHasLoadedHero(true);
      setIsHeroLoading(false);
    }

    async function loadMarqueeSettings() {
      if (hasLoadedMarquee) return;
      setIsMarqueeLoading(true);
      const mData = await getMarqueeSettings();
      if (isCancelled) return;
      if (mData) setMarqueeSettings(mData);
      setHasLoadedMarquee(true);
      setIsMarqueeLoading(false);
    }

    if (activeTab === "website") {
      loadHeroSlides();
    }

    if (activeTab === "marquee") {
      loadMarqueeSettings();
    }

    return () => {
      isCancelled = true;
    };
  }, [activeTab, hasLoadedHero, hasLoadedMarquee]);

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
      setMessage({ type: 'success', text: "Settings saved successfully" });
      setPreviews(["", "", ""]);
      const data = await getHeroSlides();
      if (data) setSlides(data);
    } else {
      setMessage({ type: 'error', text: "Failed to save settings" });
    }
  };

  const defaultSlides = [
    { title: "Slide 1", image: "/images/hero/industrial-1.webp", description: "" },
    { title: "Slide 2", image: "/images/hero/industrial-2.webp", description: "" },
    { title: "Slide 3", image: "/images/hero/industrial-3.webp", description: "" },
  ];

  const currentSlides = slides.length > 0 ? slides : defaultSlides;

  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* Navigation */}
      <aside className="w-full md:w-56 space-y-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all font-medium group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <tab.icon className="h-4 w-4" />
              </motion.div>
              {tab.name}
            </button>
          );
        })}
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-card border border-border rounded-xl shadow-sm p-8 min-h-[500px]">
          {activeTab === "website" && (
            <div className="space-y-10 animate-in-fade">
              <div className="pb-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Landing Page Images</h3>
                <p className="text-sm text-muted-foreground mt-1">Upload the 3 background slides for the hero carousel.</p>
              </div>

              {message && (
                <div className={cn(
                  "p-4 rounded-lg border flex items-center gap-3",
                  message.type === 'success' 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                    : "bg-rose-50 border-rose-200 text-rose-700"
                )}>
                  {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                  <span className="text-sm font-medium">{message.text}</span>
                </div>
              )}

              {isHeroLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[0, 1, 2].map((index) => {
                      const slide = currentSlides[index];
                      const preview = previews[index];
                      const displayImage = preview || slide?.image || "";

                      return (
                        <div key={index} className="space-y-4">
                          <label className="text-sm font-semibold text-foreground">Slide {index + 1}</label>
                          <div className="relative aspect-video bg-muted border-2 border-dashed border-border rounded-lg overflow-hidden flex items-center justify-center group hover:border-primary/50 transition-all">
                            {displayImage ? (
                              <Image 
                                src={displayImage} 
                                alt={`Slide ${index + 1}`} 
                                fill 
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Upload className="h-6 w-6" />
                                <span className="text-xs">No image</span>
                              </div>
                            )}
                            
                            <motion.div 
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className="absolute inset-0 bg-black/40 transition-all flex items-center justify-center pointer-events-none"
                            >
                              <motion.div 
                                whileHover={{ scale: 1.1 }}
                                className="bg-white text-black px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm"
                              >
                                Change Image
                              </motion.div>
                            </motion.div>

                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, index)}
                              className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-8 border-t border-border">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSaving || (!previews[0] && !previews[1] && !previews[2])}
                      className="inline-flex items-center justify-center h-10 px-8 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all shadow-sm"
                    >
                      {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                      {isSaving ? "Saving..." : "Save Settings"}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === "marquee" && (
            <div className="space-y-10 animate-in-fade">
              <div className="pb-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Partners Marquee Settings</h3>
                <p className="text-sm text-muted-foreground mt-1">Configure how industrial partner logos appear on the landing page.</p>
              </div>

              {message && (
                <div className={cn(
                  "p-4 rounded-lg border flex items-center gap-3",
                  message.type === 'success' 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                    : "bg-rose-50 border-rose-200 text-rose-700"
                )}>
                  {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                  <span className="text-sm font-medium">{message.text}</span>
                </div>
              )}

              <div className="space-y-8 max-w-2xl">
                {!hasLoadedMarquee || isMarqueeLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                  <div className="space-y-0.5">
                    <label className="text-sm font-semibold text-foreground">Display Marquee</label>
                    <p className="text-xs text-muted-foreground">Show the partners section on the Home Page.</p>
                  </div>
                  <button 
                    onClick={() => setMarqueeSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors outline-none",
                      marqueeSettings.enabled ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  >
                    <span className={cn("inline-block h-4 w-4 transform rounded-full bg-white transition-transform", marqueeSettings.enabled ? "translate-x-6" : "translate-x-1")} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Section Title</label>
                      <input 
                        value={marqueeSettings.title} 
                        onChange={e => setMarqueeSettings(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Upper Label</label>
                      <input 
                        value={marqueeSettings.label} 
                        onChange={e => setMarqueeSettings(prev => ({ ...prev, label: e.target.value }))}
                        className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Scroll Speed (Seconds)</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min="10" max="100" step="5"
                        value={marqueeSettings.speed} 
                        onChange={e => setMarqueeSettings(prev => ({ ...prev, speed: parseInt(e.target.value) }))}
                        className="flex-1 accent-primary"
                      />
                      <span className="text-xs font-mono font-bold text-primary">{marqueeSettings.speed}s</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-8 border-t border-border">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      setIsSaving(true);
                      const res = await updateMarqueeSettings(marqueeSettings);
                      setIsSaving(false);
                      if (res.success) {
                        setMessage({ type: 'success', text: "Marquee settings updated successfully" });
                        setTimeout(() => setMessage(null), 3000);
                      } else {
                        setMessage({ type: 'error', text: "Failed to update settings" });
                      }
                    }}
                    disabled={isSaving}
                    className="inline-flex items-center justify-center h-10 px-8 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all shadow-sm"
                  >
                    {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Save Marquee Settings
                  </motion.button>
                </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
