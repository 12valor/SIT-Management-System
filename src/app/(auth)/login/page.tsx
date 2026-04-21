"use client";

import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function LoginGatePage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-100 font-sans selection:bg-red-900/10">
      {/* 1. Institutional White Header */}
      <header className="relative z-20 w-full bg-white border-b border-slate-100 py-5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Image 
              src="/Technological_University_of_the_Philippines_Seal.svg.png" 
              alt="TUP Seal" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain" 
            />
            <div className="flex flex-col items-start leading-tight">
               <h1 className="text-lg font-black text-slate-900 tracking-tight font-heading uppercase">TUP-Visayas</h1>
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] font-sans">SIT Monitoring System</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-heading">Academic Session</p>
              <p className="text-[10px] font-bold text-slate-900 font-sans">2025 - 2026</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Portal Container */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-5xl bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          
          {/* Header Section */}
          <div className="p-10 border-b border-slate-50">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-2">
              Student Industrial Training Portal
            </h2>
            <p className="text-sm text-slate-500 font-medium">Select the account type to continue.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 p-10">
            {/* Student Access Card */}
            <div className="flex-1 p-8 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors group">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-slate-900">Student Access</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed min-h-[4rem] mb-8">
                For TUPV students enrolled in OJT/SIT. Log daily time record (DTR), upload journal, view evaluation.
              </p>
              <Link 
                href="/login/student"
                className="inline-flex h-12 items-center justify-center px-8 rounded-lg bg-primary text-white font-bold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all shadow-md active:scale-95 mb-4"
              >
                Student Login
              </Link>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                Requires @tupv.edu.ph account
              </p>
            </div>

            {/* Company Access Card */}
            <div className="flex-1 p-8 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors group">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="h-6 w-6 text-slate-600" />
                <h3 className="text-xl font-bold text-slate-900">Company / Supervisor Access</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed min-h-[4rem] mb-8">
                For partner companies and industry supervisors. Verify trainee attendance and submit performance rating.
              </p>
              <Link 
                href="/login/employer"
                className="inline-flex h-12 items-center justify-center px-8 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-all active:scale-95"
              >
                Company Login
              </Link>
            </div>
          </div>

          {/* 3. Announcement Board */}
          <div className="px-10 pb-10">
            <div className="p-8 rounded-xl bg-primary/5 border border-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <ShieldCheck className="h-20 w-20 text-primary rotate-12" />
              </div>
              <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Announcements</h4>
              <ul className="space-y-3">
                {[
                  "DTR submission deadline: Every Friday 5PM",
                  "New: Upload photos in journal (max 2MB)",
                  "For password reset, contact ojt@tupv.edu.ph"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Registry Services & Footer */}
      <footer className="w-full max-w-5xl mx-auto pb-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8">
          <Link href="/signup/student" className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest transition-colors mb-1 md:mb-0">
             Student Registry
          </Link>
          <Link href="/signup/employer" className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">
             Partner Application
          </Link>
        </div>
        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]">
          © 2026 Technological University of the Philippines Visayas • Digital Logbook System
        </p>
      </footer>
    </div>
  );
}
