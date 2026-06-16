"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Gavel, BookOpen, ShieldCheck, Loader2 } from "lucide-react";
import { generateResourceDocument } from "@/lib/pdf-generator";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const DOCUMENTS = [
  {
    category: "Program Framework",
    items: [
      { name: "SIT Training Manual", desc: "The foundational guide for all Supervised Industrial Training procedures and protocols.", icon: BookOpen, format: "PDF" },
      { name: "Institutional Code of Conduct", desc: "Professional expectations and ethical standards for trainees in the industrial field.", icon: ShieldCheck, format: "PDF" }
    ]
  },
  {
    category: "Legal & Partnership",
    items: [
      { name: "Memorandum of Understanding (MOU)", desc: "Standard institutional agreement template for TUP-V and Industry Partners.", icon: Gavel, format: "DOCX" },
      { name: "Non-Disclosure Agreement (NDA)", desc: "Confidentiality protocol for proprietary information and trade secrets.", icon: Gavel, format: "PDF" },
      { name: "Liability Waiver Form", desc: "Institutional release form for off-campus supervised industrial training.", icon: Gavel, format: "PDF" }
    ]
  }
];

export default function ResourcesContent() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (docName: string, docDesc: string) => {
    setDownloading(docName);
    try {
      let base64data = "";
      try {
        const response = await fetch('/tup-seal-96.png');
        const blob = await response.blob();
        base64data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        console.error("Failed to load logo", e);
      }
      
      generateResourceDocument(docName, docDesc, base64data);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-32 pb-24 px-6 transition-colors duration-300">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.05 }}
        variants={staggerContainer}
      >
        <motion.header className="mb-24 text-center" variants={fadeInUp}>
          <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
            Institutional Registry
          </span>
          <h1 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-6">
            Training Documents
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-serif italic max-w-2xl mx-auto">
            A comprehensive repository of regulatory frameworks, legal templates, and technical protocols for SIT compliance.
          </p>
        </motion.header>

        <div className="space-y-20">
          {DOCUMENTS.map((section, sIdx) => (
            <motion.section key={sIdx} variants={fadeInUp} className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">0{sIdx + 1}</span>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">{section.category}</h2>
                <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
              </div>

              <div className="space-y-12">
                {section.items.map((doc, dIdx) => (
                  <div key={dIdx} className="group flex flex-col md:flex-row md:items-start justify-between gap-6 pb-12 border-b border-slate-200 dark:border-white/10 last:border-0">
                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl font-serif font-medium text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors duration-300">
                        {doc.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-serif text-lg">
                        {doc.desc}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-6 self-start md:self-center">
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{doc.format}</span>
                      <button 
                        onClick={() => handleDownload(doc.name, doc.desc)}
                        disabled={downloading === doc.name}
                        className="group/btn relative h-12 w-12 flex items-center justify-center rounded-full bg-primary text-white overflow-hidden transition-transform active:scale-90 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10">
                          {downloading === doc.name ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Download className="h-5 w-5" />
                          )}
                        </span>
                        <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.footer 
          className="mt-32 pt-12 border-t border-slate-200 dark:border-white/10 text-center"
          variants={fadeInUp}
        >
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-serif italic">
            Need additional technical assistance?
          </p>
          <a 
            href="mailto:office@tupv-sit.edu.ph"
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-medium rounded-full overflow-hidden transition-transform active:scale-95 shadow-lg shadow-primary/20"
          >
            <span className="relative z-10 font-serif">Contact Document Registry</span>
            <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          </a>
        </motion.footer>
      </motion.div>
    </main>
  );
}
