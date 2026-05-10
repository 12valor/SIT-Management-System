"use client";

import React from "react";
import { Download, FileText } from "lucide-react";

const DOCUMENTS = [
  {
    category: "Program Framework",
    items: [
      { name: "SIT Training Manual", desc: "Foundational guide for all Supervised Industrial Training procedures.", format: "PDF" },
      { name: "Institutional Code of Conduct", desc: "Professional expectations and ethical standards for trainees.", format: "PDF" }
    ]
  },
  {
    category: "Legal & Partnership",
    items: [
      { name: "Memorandum of Understanding (MOU)", desc: "Standard institutional agreement template for Partners.", format: "DOCX" },
      { name: "Non-Disclosure Agreement (NDA)", desc: "Confidentiality protocol for proprietary information.", format: "PDF" },
      { name: "Liability Waiver Form", desc: "Institutional release form for off-campus training.", format: "PDF" }
    ]
  }
];

export default function ResourcesContent() {
  return (
    <main className="min-h-screen bg-white py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-20">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Training Documents</h1>
          <p className="text-slate-600 text-lg">
            Download the required regulatory frameworks and legal templates for SIT compliance.
          </p>
        </header>

        <div className="space-y-16">
          {DOCUMENTS.map((section, sIdx) => (
            <section key={sIdx} className="space-y-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b pb-2">
                {section.category}
              </h2>

              <div className="divide-y divide-slate-100">
                {section.items.map((doc, dIdx) => (
                  <div key={dIdx} className="py-8 flex items-center justify-between gap-6 group">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-slate-50 text-slate-400 group-hover:text-primary transition-colors">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-primary transition-colors">
                          {doc.name}
                        </h3>
                        <p className="text-slate-500 text-sm">
                          {doc.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-slate-300">{doc.format}</span>
                      <button className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-primary hover:border-primary hover:text-white transition-all active:scale-90">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-32 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm">
            TUPV SIT Management System — Document Repository
          </p>
        </footer>
      </div>
    </main>
  );
}
