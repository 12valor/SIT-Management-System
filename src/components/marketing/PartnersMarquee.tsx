"use client";

import React, { useEffect, useState } from "react";
import Marquee from "@/components/ui/marquee";
import { Building2 } from "lucide-react";
import { getPublicPartners } from "@/app/(portals)/coordinator/companies/actions";
import { getMarqueeSettings } from "@/app/(portals)/coordinator/settings/general/actions";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Partner = {
  id: string;
  name: string;
  industry: string;
  logoUrl: string | null;
};

type MarqueeSettings = {
  enabled: boolean;
  title: string;
  label: string;
  speed: number;
  showInAbout: boolean;
};

export function PartnersMarquee() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [settings, setSettings] = useState<MarqueeSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [partnerData, settingsData] = await Promise.all([
          getPublicPartners(),
          getMarqueeSettings()
        ]);
        setPartners(partnerData as Partner[]);
        setSettings(settingsData);
      } catch (error) {
        console.error("Failed to load marquee data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  // Fallback partners if none in DB
  const displayPartners = partners.length > 0 ? partners : [
    { id: "1", name: "Global Tech Solutions", industry: "IT Services", logoUrl: null },
    { id: "2", name: "BuildRight Construction", industry: "Engineering", logoUrl: null },
    { id: "3", name: "EcoEnergy Corp", industry: "Renewables", logoUrl: null },
    { id: "4", name: "Nexus Manufacturing", industry: "Industrial", logoUrl: null },
    { id: "5", name: "CloudScale Systems", industry: "Software", logoUrl: null },
    { id: "6", name: "InnoVantage", industry: "Consulting", logoUrl: null },
    { id: "7", name: "Prime Logistics", industry: "Transportation", logoUrl: null },
    { id: "8", name: "Alpha Robotics", industry: "Automation", logoUrl: null },
  ];

  if (isLoading && partners.length === 0) {
    return (
      <div className="py-20 bg-white dark:bg-background overflow-hidden border-y border-slate-100 dark:border-white/5">
        <div className="flex gap-12 animate-pulse justify-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-40 bg-slate-100 dark:bg-white/5 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (settings && !settings.enabled) return null;

  return (
    <section className="py-32 bg-white dark:bg-background relative overflow-hidden border-y border-slate-100 dark:border-white/5">
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/60 mb-3 block">
            {settings?.label || "Industrial Network"}
          </span>
          <h2 className="text-3xl font-serif font-medium text-slate-800 dark:text-slate-200">
            {settings?.title || "Trusted by Leading Organizations"}
          </h2>
        </motion.div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className={cn("py-4", `[--duration:${settings?.speed || 50}s]`, "[--gap:3rem]")}>
          {displayPartners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center py-6"
            >
              <div className="relative h-20 w-64 flex items-center justify-center">
                {partner.logoUrl ? (
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                ) : (
                  <div className="flex items-center gap-4 grayscale opacity-40 hover:opacity-100 hover:scale-110 transition-all duration-700">
                    <Building2 className="h-10 w-10 text-slate-400" />
                    <span className="text-xl font-serif font-semibold tracking-tighter text-slate-500 uppercase">
                      {partner.name.split(' ')[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Marquee>

        {/* Gradient Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-background" />
      </div>
    </section>
  );
}
