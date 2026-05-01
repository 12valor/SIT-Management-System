"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Gavel, BookOpen, ShieldCheck, ArrowRight } from "lucide-react";

const RESOURCE_CATEGORIES = [
  {
    id: "ARCHIVAL",
    title: "Archival Documents",
    description: "Official institutional manuals and grading rubrics for the SIT program.",
    items: [
      { name: "SIT Training Manual 2024", type: "PDF", size: "2.4 MB" },
      { name: "Grading & Evaluation Rubric", type: "PDF", size: "1.1 MB" },
      { name: "Code of Conduct for Trainees", type: "PDF", size: "850 KB" }
    ]
  },
  {
    id: "LEGAL",
    title: "Legal & Partnerships",
    description: "Standardized templates for MOU registration and confidentiality agreements.",
    items: [
      { name: "Standard MOU Template", type: "DOCX", size: "120 KB" },
      { name: "Confidentiality Agreement", type: "PDF", size: "440 KB" },
      { name: "Liability Waiver Form", type: "PDF", size: "310 KB" }
    ]
  },
  {
    id: "TECHNICAL",
    title: "Technical Guides",
    description: "Step-by-step instructions for navigating the digital logbook terminal.",
    items: [
      { name: "Logbook Entry Guide", type: "PDF", size: "3.2 MB" },
      { name: "Coordinator Portal Overview", type: "PDF", size: "2.1 MB" },
      { name: "Mobile App PWA Setup", type: "PDF", size: "1.4 MB" }
    ]
  }
];

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

export default function ResourcesContent() {
  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-32 pb-24 px-6 transition-colors duration-300">
      <motion.div 
        className="container mx-auto max-w-5xl"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.05 }}
        variants={staggerContainer}
      >
        {/* Header Section */}
        <motion.header className="mb-24 text-center" variants={fadeInUp}>
          <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
            Information Repository
          </span>
          <h1 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-6">
            Institutional Resources
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto font-serif">
            Access the official documentation and standardized templates required for the Supervised Industrial Training program at TUPV.
          </p>
        </motion.header>

        {/* Resources Grid */}
        <div className="grid gap-24 mb-32">
          {RESOURCE_CATEGORIES.map((category) => (
            <motion.section key={category.id} variants={fadeInUp} className="group">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                {/* Category Sidebar */}
                <div className="md:w-1/3">
                  <div className="sticky top-40">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">
                      {category.id}
                    </h2>
                    <h3 className="text-3xl font-serif font-medium text-slate-900 dark:text-white mb-4">
                      {category.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-serif italic leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Items List */}
                <div className="md:w-2/3 space-y-4">
                  {category.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className="group/item flex items-center justify-between p-6 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-sm hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-5">
                        <div className="h-12 w-12 flex items-center justify-center bg-slate-50 dark:bg-white/5 rounded-sm text-slate-400 group-hover/item:text-primary transition-colors">
                          <FileText className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="font-serif font-medium text-slate-900 dark:text-white text-lg">
                            {item.name}
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {item.type} • {item.size}
                          </span>
                        </div>
                      </div>
                      
                      <button className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-white/5 text-slate-400 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                        <Download className="h-4 w-4" strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer Guidance */}
        <motion.footer 
          className="mt-32 pt-16 border-t border-slate-200 dark:border-white/10 text-center"
          variants={fadeInUp}
        >
          <div className="max-w-2xl mx-auto">
            <BookOpen className="h-10 w-10 text-primary mx-auto mb-8" strokeWidth={1} />
            <h2 className="text-2xl font-serif font-medium text-slate-900 dark:text-white mb-6">
              Need a Custom Document?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 font-serif">
              If you require a specific institutional form not listed in this repository, please contact the SIT Strategic Office for archival assistance.
            </p>
            <a 
              href="mailto:support@tupv-sit.edu.ph"
              className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
            >
              Request Official Document
              <ArrowRight className="ml-3 h-4 w-4" />
            </a>
          </div>
        </motion.footer>
      </motion.div>
    </main>
  );
}
