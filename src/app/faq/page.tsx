import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | TUPV SIT Management System",
  description: "Find answers to common questions about the Supervised Industrial Training platform, registration, and logbook verification.",
};

const FAQ_ITEMS = [
  {
    question: "What is the SIT Management System?",
    answer: "The SIT Management System is a unified digital platform designed for Technological University of the Philippines - Visayas (TUP-V) to streamline Supervised Industrial Training. It connects students, faculty coordinators, and industrial partners for seamless logbook management and performance tracking.",
  },
  {
    question: "How do I register as a student trainee?",
    answer: "Trainees can register through the Student Portal using their official university credentials. Once registered, you will need to complete your profile and wait for institutional verification before applying for SIT placements.",
  },
  {
    question: "How are industrial hours verified?",
    answer: "Hours are logged daily by the student through the digital terminal. At the end of each week, your designated industrial supervisor must review and electronically sign the logs. Faculty coordinators conduct final audits periodically.",
  },
  {
    question: "What should I do if my supervisor hasn't verified my logs?",
    answer: "If your logs remain unverified, use the 'Request Verification' feature in your portal to send a formal reminder to your supervisor. If the delay persists, contact your SIT Faculty Coordinator for assistance.",
  },
  {
    question: "Can I use the platform on my mobile device?",
    answer: "Yes, the platform is fully responsive and optimized for mobile browsers, allowing you to log hours and check status updates while on-site at your industrial placement.",
  },
  {
    question: "How do I download my SIT Completion Certificate?",
    answer: "Once you have completed the required hours and all logs have been verified by both the supervisor and coordinator, a 'Download Certificate' button will appear in your student dashboard under the 'Archival Documents' section.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-32 pb-24 px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 text-center">
          <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
            Information Repository
          </span>
          <h1 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            Everything you need to know about navigating the SIT ecosystem at TUPV.
          </p>
        </header>

        <section className="space-y-12">
          {FAQ_ITEMS.map((item, index) => (
            <div 
              key={index} 
              className="group border-b border-slate-200 dark:border-white/10 pb-12 last:border-0"
            >
              <h2 className="text-2xl font-serif font-medium text-slate-800 dark:text-slate-200 mb-4 group-hover:text-primary transition-colors duration-300">
                {item.question}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {item.answer}
              </p>
            </div>
          ))}
        </section>

        <footer className="mt-24 pt-12 border-t border-slate-200 dark:border-white/10 text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <a 
            href="mailto:support@tupv-sit.edu.ph"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            Contact Support Registry
          </a>
        </footer>
      </div>
    </main>
  );
}

