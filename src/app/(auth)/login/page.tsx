"use client";

import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck } from "lucide-react";
import Image from "next/image";

/**
 * AESTHETIC DIRECTION: Grounded Institutional Portal
 * LAYOUT: Centered Floating Card
 * TYPOGRAPHY: Montserrat (Headings) + Poppins (Links/Body)
 * COLOR: Maroon (#800000), Soft Slate, Light Red Accents
 */

export default function LoginGatePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-primary/20">
      
      {/* HEADER */}
      <header className="w-full px-8 md:px-20 py-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            width={56}
            height={56}
            className="h-14 w-auto" 
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-slate-900 tracking-tighter leading-none font-heading uppercase">
              TUP-VISAYAS
            </h1>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest leading-none mt-1">
              SIT Monitoring System
            </span>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end">
           <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-[0.2em] mb-1">Academic Session</span>
           <span className="text-sm font-bold text-slate-800 font-heading tracking-tight">2025 – 2026</span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-[0_10px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-16">
            
            {/* CARD HEADER */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-heading tracking-tight">
                Student Industrial Training Portal
              </h2>
              <p className="text-sm md:text-base font-medium text-slate-400">
                Select the account type to continue.
              </p>
            </div>

            {/* SELECTION GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              
              {/* STUDENT ACCESS */}
              <div className="group relative bg-white rounded-[1.5rem] p-8 md:p-10 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold text-slate-900 font-heading">Student Access</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-500 mb-8 font-medium">
                    For TUPV students enrolled in OJT/SIT. Log daily time record (DTR), upload journal, view evaluation.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <Link 
                      href="/login/student"
                      className="inline-flex w-fit items-center justify-center bg-primary px-8 py-3.5 rounded-xl text-white text-sm font-bold tracking-tight hover:bg-[#600000] active:scale-[0.98] transition-all"
                    >
                      Student Login
                    </Link>
                  </div>
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">
                    REQUIRES @TUPV.EDU.PH ACCOUNT
                  </div>
                </div>
              </div>

              {/* COMPANY ACCESS */}
              <div className="group bg-white rounded-[1.5rem] p-8 md:p-10 border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="h-6 w-6 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    <h3 className="text-xl font-bold text-slate-900 font-heading">Company / Supervisor Access</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-500 mb-8 font-medium">
                    For partner companies and industry supervisors. Verify trainee attendance and submit performance rating.
                  </p>
                </div>
                <Link 
                  href="/login/employer"
                  className="inline-flex w-fit items-center justify-center bg-white border-2 border-slate-100 px-8 py-3.5 rounded-xl text-slate-700 text-sm font-bold tracking-tight hover:bg-slate-50 hover:border-slate-200 active:scale-[0.98] transition-all"
                >
                  Company Login
                </Link>
              </div>

            </div>

            {/* ANNOUNCEMENTS SECTION */}
            <div className="relative bg-red-50/50 rounded-2xl border border-red-100/50 p-8 overflow-hidden">
               {/* Background Shield Icon */}
               <ShieldCheck className="absolute right-8 top-1/2 -translate-y-1/2 h-24 w-24 text-red-100/40 -rotate-12 pointer-events-none" />
               
               <h4 className="text-[11px] font-bold text-red-800 uppercase tracking-[0.2em] mb-4 font-heading">
                 ANNOUNCEMENTS
               </h4>
               <ul className="space-y-2.5 relative z-10">
                 <li className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                    <span className="h-1 w-1 bg-red-400 rounded-full" />
                    DTR submission deadline: Every Friday 5PM
                 </li>
                 <li className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                    <span className="h-1 w-1 bg-red-400 rounded-full" />
                    New: Upload photos in journal (max 2MB)
                 </li>
                 <li className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                    <span className="h-1 w-1 bg-red-400 rounded-full" />
                    For password reset, contact ojt@tupv.edu.ph
                 </li>
               </ul>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
