"use client";

import React, { useState } from "react";
import { 
  Globe, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { updateCompanyPresence } from "./actions";
import { motion, AnimatePresence } from "framer-motion";

interface PresenceFormProps {
  initialData: {
    websiteUrl: string | null;
    facebookUrl: string | null;
    linkedinUrl: string | null;
    twitterUrl: string | null;
    instagramUrl: string | null;
  };
}

export function PresenceForm({ initialData }: PresenceFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const result = await updateCompanyPresence(formData);

    setIsSubmitting(false);
    if (result.success) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Failed to update links");
    }
  };

  const socialLinks = [
    { name: "facebookUrl", label: "Facebook Page", icon: Facebook, placeholder: "https://facebook.com/yourcompany" },
    { name: "linkedinUrl", label: "LinkedIn Profile", icon: Linkedin, placeholder: "https://linkedin.com/company/yourcompany" },
    { name: "twitterUrl", label: "X (Twitter) Profile", icon: Twitter, placeholder: "https://x.com/yourcompany" },
    { name: "instagramUrl", label: "Instagram Profile", icon: Instagram, placeholder: "https://instagram.com/yourcompany" },
  ];

  return (
    <div className="max-w-3xl">
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-border bg-muted/30">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Connect with Trainees</h3>
          <p className="text-[11px] text-muted-foreground font-medium mt-1">
            Manage your institution&apos;s digital footprint to help students learn more about your culture.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Primary Institutional Link */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
               <Globe className="h-3 w-3" />
               Institutional Foundation
            </h4>
            <div className="space-y-2">
              <label 
                htmlFor="websiteUrl"
                className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1"
              >
                Official Website
              </label>
              <div className="relative group">
                <input
                  type="url"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl || ""}
                  onChange={handleChange}
                  placeholder="https://yourcompany.com"
                  className="w-full h-14 px-5 rounded-xl bg-background border-2 border-border text-base font-bold transition-all focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none group-hover:border-primary/30"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors">
                  <Globe className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2 pt-4">
               <Facebook className="h-3 w-3" />
               Social Ecosystem
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialLinks.map((link) => (
                <div key={link.name} className="space-y-2">
                  <label 
                    htmlFor={link.name}
                    className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-2"
                  >
                    <link.icon className="h-3 w-3 text-muted-foreground/40" />
                    {link.label}
                  </label>
                  <div className="relative group">
                    <input
                      type="url"
                      id={link.name}
                      name={link.name}
                      value={(formData as any)[link.name] || ""}
                      onChange={handleChange}
                      placeholder={link.placeholder}
                      className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm font-medium transition-all focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none group-hover:border-primary/50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border mt-8">
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Profile Synchronized
                </motion.div>
              )}
              {status === "error" && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2 text-destructive font-bold text-xs uppercase tracking-wider"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errorMessage}
                </motion.div>
              )}
              {status === "idle" && (
                 <div className="h-4 w-4" />
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Commit Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <AlertCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1">Visibility Note</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              These links will be displayed on your company profile card visible to all trainees. 
              Ensure they are public-facing and professional as they represent your institutional identity within the SIT ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
