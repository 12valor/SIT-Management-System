"use client";

import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck, Facebook, Linkedin, Twitter } from "lucide-react";
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
                  <Link 
                    href="/login/student"
                    className="inline-flex w-fit items-center justify-center bg-primary px-8 py-3.5 rounded-xl text-white text-sm font-bold tracking-tight hover:bg-[#600000] active:scale-[0.98] transition-all"
                  >
                    Student Login
                  </Link>
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

      {/* FOOTER */}
      <footer className="w-full bg-white pt-20 pb-12 px-8 md:px-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
            
            {/* BRAND COLUMN */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Image 
                  src="/Technological_University_of_the_Philippines_Seal.svg.png" 
                  alt="TUP Seal" 
                  width={48}
                  height={48}
                  className="h-12 w-auto grayscale contrast-125 brightness-75" 
                />
                <div className="flex flex-col uppercase">
                   <h5 className="text-sm font-bold text-slate-900 font-heading leading-tight">TUP-V SIT</h5>
                   <span className="text-[10px] font-medium text-slate-400 tracking-widest font-heading">Institutional Link</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-slate-500 font-medium">
                The official landing for Supervised Industrial Training at Technological University of the Philippines - Visayas. Connecting emerging talent with industry leadership.
              </p>
              <div className="flex items-center gap-3">
                <Link href="#" className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 transition-all">
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link href="#" className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 transition-all">
                  <Linkedin className="h-4 w-4" />
                </Link>
                <Link href="#" className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 transition-all">
                  <Twitter className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* ACCESS COL */}
            <div className="flex flex-col gap-8">
              <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] font-heading">
                ACCESS PORTALS
              </h5>
              <div className="flex flex-col gap-4">
                <Link href="/login/student" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">Student Portal</Link>
                <Link href="/login/employer" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">Employer Portal</Link>
                <Link href="/signup/student" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">New Student Registration</Link>
              </div>
            </div>

            {/* RESOURCES COL */}
            <div className="flex flex-col gap-8">
              <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] font-heading">
                RESOURCES
              </h5>
              <div className="flex flex-col gap-4">
                <Link href="#" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">SIT Guidelines</Link>
                <Link href="#" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">Partner Companies</Link>
                <Link href="#" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">Digital Logbook Guide</Link>
                <Link href="#" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">Training Modules</Link>
              </div>
            </div>

            {/* INSTITUTIONAL COL */}
            <div className="flex flex-col gap-8">
              <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] font-heading">
                INSTITUTIONAL
              </h5>
              <div className="flex flex-col gap-4">
                <Link href="#" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">About TUP-Visayas</Link>
                <Link href="#" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">UIPEN Strategic Office</Link>
                <Link href="#" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">Contact Registry</Link>
                <Link href="#" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">Technical Support</Link>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.15em]">
              © 2026 TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES - VISAYAS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-8">
              <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">PRIVACY PROTOCOL</Link>
              <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">TERMS OF SERVICE</Link>
              <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">SECURITY</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
