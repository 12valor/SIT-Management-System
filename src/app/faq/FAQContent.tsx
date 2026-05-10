"use client";

import React from "react";

const FAQ_ITEMS = [
  {
    question: "What is the SIT Management System?",
    answer: "The SIT Management System is a unified digital platform designed for Technological University of the Philippines - Visayas (TUP-V) to streamline Supervised Industrial Training.",
  },
  {
    question: "How do I register as a student trainee?",
    answer: "Trainees can register through the Student Portal using their official university credentials. Once registered, you will need to complete your profile and wait for institutional verification.",
  },
  {
    question: "How are industrial hours verified?",
    answer: "Hours are logged daily by the student through the digital terminal. At the end of each week, your designated industrial supervisor must review and electronically sign the logs.",
  },
  {
    question: "What should I do if my supervisor hasn't verified my logs?",
    answer: "If your logs remain unverified, use the 'Request Verification' feature in your portal to send a formal reminder to your supervisor.",
  },
  {
    question: "Can I use the platform on my mobile device?",
    answer: "Yes, the platform is fully responsive and optimized for mobile browsers, allowing you to log hours and check status updates while on-site.",
  },
  {
    question: "How do I download my SIT Completion Certificate?",
    answer: "Once you have completed the required hours and all logs have been verified, a 'Download Certificate' button will appear in your student dashboard.",
  },
];

export default function FAQContent() {
  return (
    <main className="min-h-screen bg-white py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-600 text-lg">
            Everything you need to know about navigating the SIT ecosystem at TUPV.
          </p>
        </header>

        <section className="space-y-12">
          {FAQ_ITEMS.map((item, index) => (
            <div 
              key={index} 
              className="border-b border-slate-100 pb-12 last:border-0"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                {item.question}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {item.answer}
              </p>
            </div>
          ))}
        </section>

        <footer className="mt-24 pt-12 border-t border-slate-100 text-center">
          <p className="text-slate-500 mb-6">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <a 
            href="mailto:support@tupv-sit.edu.ph"
            className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Contact Support
          </a>
        </footer>
      </div>
    </main>
  );
}
