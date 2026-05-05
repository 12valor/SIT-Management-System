"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, ChevronRight } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  const isPortalRoute = 
    pathname.startsWith("/student") ||
    pathname.startsWith("/employer") ||
    pathname.startsWith("/coordinator");

  if (isPortalRoute) {
    return null;
  }

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");

  return (
    <footer className={`relative z-10 w-full pt-20 pb-10 border-t transition-colors duration-300 ${
      isAuthRoute 
        ? "bg-white dark:bg-[#050505] border-slate-200 dark:border-white/5" 
        : "bg-[#F8F9FA] dark:bg-white/[0.02] border-slate-200 dark:border-white/5"
    }`}>
      <div className="mx-auto px-6 md:px-12 lg:px-20 w-full max-w-[1600px]">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 mb-16">
          {/* BRAND COLUMN */}
          <div className="flex flex-col gap-8 lg:w-[30%]">
            <div className="flex items-center gap-5">
              <Image 
                src="/Technological_University_of_the_Philippines_Seal.svg.png" 
                alt="TUP Seal" 
                width={70}
                height={70}
                className="h-16 w-auto" 
              />
               <div className="flex flex-col uppercase">
                  <h5 className="text-2xl font-black text-[#1A202C] dark:text-white leading-none tracking-tight">TUP-V SIT</h5>
                  <span className="text-[12px] font-bold text-primary tracking-[0.2em] mt-1.5">Institutional Link</span>
               </div>
            </div>
             <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm font-medium">
              The official landing for Supervised Industrial Training at Technological University of the Philippines - Visayas. Connecting emerging talent with industry leadership.
            </p>
             <div className="flex items-center gap-3">
              <Link href="#" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* VERTICAL DIVIDER */}
          <div className="hidden lg:block w-[1px] bg-slate-200 dark:bg-white/10 self-stretch opacity-60" />

          {/* LINKS GRID */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-12 lg:pl-4">
            {/* PORTALS COLUMN */}
            <div>
              <div className="mb-8">
                <h4 className="text-[13px] font-black text-[#1A202C] dark:text-white uppercase tracking-wider mb-2">Access Portals</h4>
                <div className="w-10 h-[2.5px] bg-primary" />
              </div>
              <ul className="space-y-0">
                {[
                  { name: "Student Portal", href: "/login/student" },
                  { name: "Employer Portal", href: "/login/employer" },
                  { name: "New Student Registration", href: "/signup/student" }
                ].map((link, i) => (
                  <li key={i} className="border-b border-slate-200/60 dark:border-white/5 last:border-0">
                    <Link href={link.href} className="flex items-center gap-3 py-4 text-[13.5px] font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
                      <ChevronRight size={14} className="text-primary opacity-80 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RESOURCES COLUMN */}
            <div>
              <div className="mb-8">
                <h4 className="text-[13px] font-black text-[#1A202C] dark:text-white uppercase tracking-wider mb-2">Resources</h4>
                <div className="w-10 h-[2.5px] bg-primary" />
              </div>
              <ul className="space-y-0">
                {[
                  { name: "SIT Guidelines", href: "#" },
                  { name: "Partner Companies", href: "/partners" },
                  { name: "Digital Logbook Guide", href: "#" },
                  { name: "Training Modules", href: "#" }
                ].map((link, i) => (
                  <li key={i} className="border-b border-slate-200/60 dark:border-white/5 last:border-0">
                    <Link href={link.href} className="flex items-center gap-3 py-4 text-[13.5px] font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
                      <ChevronRight size={14} className="text-primary opacity-80 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* INSTITUTIONAL COLUMN */}
            <div>
              <div className="mb-8">
                <h4 className="text-[13px] font-black text-[#1A202C] dark:text-white uppercase tracking-wider mb-2">Institutional</h4>
                <div className="w-10 h-[2.5px] bg-primary" />
              </div>
              <ul className="space-y-0">
                {[
                  { name: "About the Platform", href: "/about" },
                  { name: "UIPEN Strategic Office", href: "#" },
                  { name: "Contact Registry", href: "#" },
                  { name: "Technical Support", href: "#" }
                ].map((link, i) => (
                  <li key={i} className="border-b border-slate-200/60 dark:border-white/5 last:border-0">
                    <Link href={link.href} className="flex items-center gap-3 py-4 text-[13.5px] font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
                      <ChevronRight size={14} className="text-primary opacity-80 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Technological University of the Philippines - Visayas. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[11px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">Security</Link>
            <Link href="#" className="text-[11px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}



