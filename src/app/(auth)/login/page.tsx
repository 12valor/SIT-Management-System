"use client";

import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck, ArrowRight, Bell } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming a utility exists, otherwise will adjust

/**
 * AESTHETIC DIRECTION: Grounded Institutional Portal
 * LAYOUT: Centered Floating Card with Refined Grid
 * TYPOGRAPHY: Montserrat (Headings) + Poppins (Links/Body)
 * COLOR: Maroon (#800000), Soft Slate, Light Red Accents
 */

export default function LoginGatePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/20 dark:bg-slate-950">
      
      {/* MAIN CONTAINER */}
      <main className="flex-1 flex items-center justify-center p-4 pt-32 pb-12">
        <div className="max-w-[1100px] w-full mx-auto">
          
          {/* HEADER SECTION */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-heading tracking-tight leading-tight">
              Welcome to the <br/>
              <span className="text-primary">SIT Management Portal</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium">
              Select your role below to securely access your dashboard and manage your training records.
            </p>
          </div>

          {/* SELECTION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            
            {/* STUDENT ACCESS */}
            <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-300 flex flex-col">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                 <GraduationCap className="w-32 h-32 text-primary" />
              </div>
              
              <div className="flex-1 relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-4">Student Access</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                  For TUPV students enrolled in OJT/SIT. Log your daily time record, upload journal entries, and view evaluations.
                </p>
              </div>
              
              <div className="mt-auto relative z-10 space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Link 
                  href="/login/student"
                  className="flex items-center justify-between w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl font-semibold transition-all group/btn"
                >
                  <span>Student Login</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center">
                  Requires @tupv.edu.ph account
                </p>
              </div>
            </div>

            {/* COMPANY ACCESS */}
            <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-5 transition-opacity pointer-events-none">
                 <Building2 className="w-32 h-32 text-slate-900 dark:text-white" />
              </div>

              <div className="flex-1 relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-7 w-7 text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-4">Company Partner</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                  For partner companies and industry supervisors. Verify trainee attendance, review journals, and submit ratings.
                </p>
              </div>
              
              <div className="mt-auto relative z-10 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Link 
                  href="/login/employer"
                  className="flex items-center justify-between w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-6 py-4 rounded-xl font-semibold transition-all group/btn"
                >
                  <span>Employer Login</span>
                  <ArrowRight className="w-5 h-5 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>

            {/* COORDINATOR ACCESS */}
            <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-5 transition-opacity pointer-events-none">
                 <ShieldCheck className="w-32 h-32 text-slate-900 dark:text-white" />
              </div>

              <div className="flex-1 relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="h-7 w-7 text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-4">Coordinator</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                  For SIT Coordinators and Administrators. Manage student records, approve accounts, and oversee the program.
                </p>
              </div>
              
              <div className="mt-auto relative z-10 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Link 
                  href="/login/coordinator"
                  className="flex items-center justify-between w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-6 py-4 rounded-xl font-semibold transition-all group/btn"
                >
                  <span>Admin Login</span>
                  <ArrowRight className="w-5 h-5 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>

          </div>

          {/* ANNOUNCEMENTS BAR */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-3 shrink-0 text-primary">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <Bell className="w-5 h-5" />
              </div>
              <span className="font-bold tracking-wider text-sm uppercase">Notice</span>
            </div>
            
            <div className="flex-1 flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-none snap-x">
               <div className="shrink-0 snap-start flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-lg">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  DTR submission deadline: Every Friday 5PM
               </div>
               <div className="shrink-0 snap-start flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-lg">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  New: Upload photos in journal (max 2MB)
               </div>
            </div>
            
            <div className="shrink-0">
               <Link href="/help" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">
                 Need Help?
               </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
