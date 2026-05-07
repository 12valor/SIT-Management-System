"use client";

import React, { useState, useEffect } from "react";
import { Globe, Upload, Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { updateHeroSlides, getHeroSlides } from "./actions";

export default function GeneralSettingsPage() {
  const [slides, setSlides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  
  const [previews, setPreviews] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    async function load() {
      const data = await getHeroSlides();
      if (data) {
        setSlides(data);
      }
      setIsLoading(false);
    }
    load();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const MAX_SIZE = 4 * 1024 * 1024; // 4MB
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
    setMessage("");

    const formData = new FormData();
    if (previews[0]) formData.set("slide1", previews[0]);
    if (previews[1]) formData.set("slide2", previews[1]);
    if (previews[2]) formData.set("slide3", previews[2]);

    const result = await updateHeroSlides(formData);
    
    setIsSaving(false);
    if (result.success) {
      setMessage("Hero images successfully updated.");
      setPreviews(["", "", ""]); // clear previews after save
      // reload slides
      const data = await getHeroSlides();
      if (data) setSlides(data);
    } else {
      setMessage("Failed to update hero images.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const defaultSlides = [
    { title: "Slide 1", image: "/images/hero/industrial-1.png" },
    { title: "Slide 2", image: "/images/hero/industrial-2.png" },
    { title: "Slide 3", image: "/images/hero/industrial-3.png" },
  ];

  const currentSlides = slides.length > 0 ? slides : defaultSlides;

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        <Link href="/coordinator/settings" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-serif w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to System Control
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Globe className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">General Website Settings</h2>
        </div>
        <p className="text-sm text-muted-foreground font-medium max-w-2xl leading-relaxed">
          Manage the public-facing aspects of the SIT Management System, including the landing page hero visuals.
        </p>
      </div>

      <div className="bg-card border border-border p-8 rounded-xl shadow-sm">
        <div className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-2">Landing Page Hero Assets</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Update the 3 carousel images displayed on the institutional portal gateway. Optimal resolution: 1920x1080px.
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 text-xs font-bold text-emerald-600 bg-emerald-50/50 border border-emerald-100 rounded-xl font-serif">
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((index) => {
              const slide = currentSlides[index];
              const preview = previews[index];
              const displayImage = preview || slide?.image || "";

              return (
                <div key={index} className="space-y-4">
                  <div className="relative aspect-video rounded-xl bg-muted border-2 border-dashed border-border overflow-hidden flex flex-col items-center justify-center group">
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
                        <Upload className="h-6 w-6" />
                        <span className="text-xs font-medium">Upload Image</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <Upload className="h-4 w-4" /> Change Asset
                      </span>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, index)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-foreground uppercase tracking-widest mb-1">Slide {index + 1}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">{slide?.title || "Default text"}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <button
              type="submit"
              disabled={isSaving || (!previews[0] && !previews[1] && !previews[2])}
              className="inline-flex items-center justify-center h-10 px-8 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-lg disabled:opacity-50 transition-all hover:bg-primary/90"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {isSaving ? "Saving Configuration..." : "Save Configuration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
