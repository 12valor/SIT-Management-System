"use client";

import React, { useEffect, useState } from "react";
import Marquee from "@/components/ui/marquee";
import { Building2 } from "lucide-react";
import { getPublicPartners } from "@/app/(portals)/coordinator/companies/actions";
import { motion } from "framer-motion";

type Partner = {
  id: string;
  name: string;
  industry: string;
  logoUrl: string | null;
};

export function PartnersMarquee() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPartners() {
      try {
        const data = await getPublicPartners();
        setPartners(data as Partner[]);
      } catch (error) {
        console.error("Failed to load marquee partners:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPartners();
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

  return (
    <section className="py-24 bg-white dark:bg-background relative overflow-hidden border-y border-slate-100 dark:border-white/5">
      <div className="container mx-auto px-6 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-2 block">
            Industrial Network
          </span>
          <h2 className="text-2xl font-serif font-medium text-slate-800 dark:text-slate-200">
            Trusted by Leading Organizations
          </h2>
        </motion.div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s]">
          {displayPartners.map((partner) => (
            <div
              key={partner.id}
              className="group relative flex items-center gap-4 px-8 py-4 bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 rounded-2xl transition-all duration-300 hover:border-primary/30 hover:bg-white dark:hover:bg-white/[0.04]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-[#0f0f0f] shadow-sm border border-slate-100 dark:border-white/10 overflow-hidden shrink-0">
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="h-full w-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                ) : (
                  <Building2 className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors duration-500" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                  {partner.name}
                </span>
                <span className="text-[10px] font-bold text-primary/50 uppercase tracking-tighter">
                  {partner.industry}
                </span>
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
