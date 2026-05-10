"use client";

import React from "react";

export default function AboutContent() {
  return (
    <main className="min-h-screen bg-white py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-20">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About the System</h1>
          <p className="text-slate-600 text-lg">
            The official platform for managing Supervised Industrial Training at the Technological University of the Philippines Visayas.
          </p>
        </header>

        <div className="space-y-16">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b pb-2 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              To provide a streamlined, transparent, and high-performance digital environment where TUPV students transition seamlessly into their professional careers by automating the administrative burden of SIT and enhancing industrial engagement.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b pb-2 mb-6">Our Vision</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              To be the benchmark for institutional industrial training management in the Philippines, leveraging technology to foster the next generation of Filipino engineering and technology leaders.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b pb-2 mb-8 text-center">Core Values</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Precision</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Ensuring every training hour and document is tracked with institutional accuracy and technical rigor.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Synergy</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Creating a unified ecosystem where students, coordinators, and industry partners collaborate effectively.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Excellence</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Maintaining the highest standards of industrial engagement and professional development.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 p-10 rounded-xl">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Institutional Heritage</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                The Technological University of the Philippines Visayas (TUPV) was established in 1977. As a premier state university, TUPV is committed to providing higher technological education and training in engineering and related fields.
              </p>
              <p>
                The SIT Management System is the digital extension of this commitment, designed to bridge the gap between classroom learning and actual industrial practice.
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-32 pt-12 border-t border-slate-100 text-center">
          <p className="text-slate-500 mb-6">
            Interested in partnering with TUP-V?
          </p>
          <a 
            href="/partners"
            className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Explore Partner Registry
          </a>
        </footer>
      </div>
    </main>
  );
}
