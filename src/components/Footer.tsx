"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, ChevronRight } from "lucide-react";

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
    <footer className={`relative z-10 w-full pt-12 pb-8 border-t transition-colors duration-300 ${
      isAuthRoute 
        ? "bg-white dark:bg-[#050505] border-slate-200 dark:border-white/5" 
        : "bg-[#F8F9FA] dark:bg-white/[0.02] border-slate-200 dark:border-white/5"
    }`}>
      <div className="mx-auto px-6 md:px-10 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24 mb-10">
          {/* BRAND COLUMN */}
          <div className="flex flex-col gap-6 lg:w-[28%]">
            <div className="flex items-center gap-5">
              <Image 
                src="/tup-seal-128.webp"
                alt="TUP Seal" 
                width={70}
                height={70}
                className="h-14 w-auto" 
              />
               <div className="flex flex-col uppercase">
                  <h5 className="text-xl font-bold text-[#1A202C] dark:text-white leading-none tracking-tight">TUP-V SIT</h5>
               </div>
            </div>
             <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm font-normal">
              The official landing for Supervised Industrial Training at Technological University of the Philippines - Visayas. Connecting emerging talent with industry leadership.
            </p>
             <div className="flex items-center gap-3">
              <Link href="https://www.facebook.com/tupvisayas.sitprogram" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
                <Facebook className="w-4.5 h-4.5" />
              </Link>

            </div>
          </div>

          {/* VERTICAL DIVIDER */}
          <div className="hidden lg:block w-[1px] bg-slate-200 dark:bg-white/10 self-stretch opacity-60" />

          {/* LINKS COLUMNS */}
          <div className="flex-[2] flex flex-col md:flex-row justify-between gap-12 lg:pl-24">
            {/* PORTALS COLUMN */}
            <div className="min-w-[200px]">
              <div className="mb-6">
                <h4 className="text-[12px] font-bold text-[#1A202C] dark:text-white uppercase tracking-wider mb-1.5">Access Portals</h4>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <ul className="space-y-0">
                {[
                  { name: "Student Portal", href: "/login/student" },
                  { name: "Employer Portal", href: "/login/employer" },
                  { name: "New Student Registration", href: "/signup/student" }
                ].map((link, i) => (
                  <li key={i} className="border-b border-slate-200/60 dark:border-white/5 last:border-0">
                    <Link href={link.href} className="flex items-center gap-3 py-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
                      <ChevronRight size={12} className="text-primary opacity-80 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RESOURCES COLUMN */}
            <div className="min-w-[200px]">
              <div className="mb-6">
                <h4 className="text-[12px] font-bold text-[#1A202C] dark:text-white uppercase tracking-wider mb-1.5">Resources</h4>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <ul className="space-y-0">
                {[
                  { name: "SIT Guidelines", href: "/resources" },
                  { name: "Partner Companies", href: "/partners" }
                ].map((link, i) => (
                  <li key={i} className="border-b border-slate-200/60 dark:border-white/5 last:border-0">
                    <Link href={link.href} className="flex items-center gap-3 py-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
                      <ChevronRight size={12} className="text-primary opacity-80 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* INSTITUTIONAL COLUMN */}
            <div className="min-w-[200px]">
              <div className="mb-6">
                <h4 className="text-[12px] font-bold text-[#1A202C] dark:text-white uppercase tracking-wider mb-1.5">Institutional</h4>
                <div className="w-8 h-[2px] bg-primary" />
              </div>
              <ul className="space-y-0">
                {[
                  { name: "About the Platform", href: "/about" },
                  { name: "Contact Registry", href: "/about" },
                  { name: "Technical Support", href: "/faq" }
                ].map((link, i) => (
                  <li key={i} className="border-b border-slate-200/60 dark:border-white/5 last:border-0">
                    <Link href={link.href} className="flex items-center gap-3 py-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
                      <ChevronRight size={12} className="text-primary opacity-80 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


