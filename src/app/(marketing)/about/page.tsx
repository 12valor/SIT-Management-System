import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the System | TUPV SIT Management System",
  description: "Learn about the mission, vision, and institutional heritage behind the TUPV Supervised Industrial Training platform.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-20 text-center">
          <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
            Institutional Identity
          </span>
          <h1 className="text-5xl font-serif font-medium text-slate-900 mb-6">
            The Digital Bridge
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            The SIT Management System is the official technological gateway for Supervised Industrial Training at TUP-V.
          </p>
        </header>

        <div className="space-y-24">
          <section className="group">
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-primary mb-8">Our Mission</h2>
            <p className="text-3xl font-serif leading-snug text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
              To provide a streamlined, transparent, and high-performance digital environment where TUPV students transition seamlessly into their professional careers.
            </p>
          </section>

          <section className="group">
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-primary mb-8">Our Vision</h2>
            <p className="text-3xl font-serif leading-snug text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
              To be the benchmark for institutional industrial training management in the Philippines, leveraging technology to foster the next generation of leaders.
            </p>
          </section>

          <section className="pt-20 border-t border-slate-200">
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-primary mb-12">Core Principles</h2>
            <div className="grid gap-12">
              <div>
                <h3 className="text-2xl font-serif font-medium text-slate-900 mb-4">Precision</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Every training hour and document is tracked with institutional accuracy. We eliminate ambiguity in industrial training documentation through rigorous digital verification.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-medium text-slate-900 mb-4">Synergy</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We foster a unified ecosystem where students, coordinators, and partners collaborate. The platform acts as a central node for university-industry integration.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-medium text-slate-900 mb-4">Excellence</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Maintaining the highest standards of professional development. Our goal is to ensure that every SIT placement is a high-value learning experience.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-20 border-t border-slate-200">
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-primary mb-8">Institutional Heritage</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Established in 1977, the Technological University of the Philippines Visayas (TUPV) has consistently stood as a premier state university for technological education.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed italic border-l-4 border-primary pl-8 py-2">
              "This platform is the digital extension of our commitment to excellence, bridging the gap between classroom theory and industrial reality."
            </p>
          </section>
        </div>

        <footer className="mt-24 pt-12 border-t border-slate-200 text-center">
          <p className="text-slate-500 mb-6">
            Interested in partnering with TUP-V?
          </p>
          <a 
            href="/partners"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            Explore Partner Registry
          </a>
        </footer>
      </div>
    </main>
  );
}
