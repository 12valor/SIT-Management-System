"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Hide the marketing footer on application portal routes
  if (
    pathname.startsWith("/student") ||
    pathname.startsWith("/employer") ||
    pathname.startsWith("/coordinator")
  ) {
    return null;
  }

  return (
    <footer className="pt-24 pb-12 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-12 mb-16">
          {/* BRAND COLUMN */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-4">
              <Image 
                src="/Technological_University_of_the_Philippines_Seal.svg.png" 
                alt="TUP Seal" 
                width={48}
                height={48}
                className="h-12 w-auto grayscale contrast-125 brightness-75 transition-all duration-300" 
              />
              <div className="flex flex-col uppercase">
                 <h5 className="text-sm font-bold text-slate-900 font-heading leading-tight">TUP-V SIT</h5>
                 <span className="text-[10px] font-medium text-slate-400 tracking-widest font-heading">Institutional Link</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-sans">
              The official landing for Supervised Industrial Training at Technological University of the Philippines - Visayas. Connecting emerging talent with industry leadership.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:border-slate-900 transition-colors cursor-pointer group">
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors">FB</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:border-slate-900 transition-colors cursor-pointer group">
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors">LN</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:border-slate-900 transition-colors cursor-pointer group">
                 <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors">TW</span>
              </div>
            </div>
          </div>

          {/* PORTALS COLUMN */}
          <div className="min-w-fit">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8 font-heading">Access Portals</h4>
            <ul className="space-y-4">
              <li><Link href="/login/student" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans focus:outline-none">Student Portal</Link></li>
              <li><Link href="/login/employer" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans focus:outline-none">Employer Portal</Link></li>
              <li><Link href="/signup/student" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans focus:outline-none">New Student Registration</Link></li>
            </ul>
          </div>

          {/* RESOURCES COLUMN */}
          <div className="min-w-fit">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8 font-heading">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans focus:outline-none">SIT Guidelines</Link></li>
              <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans focus:outline-none">Partner Companies</Link></li>
              <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans focus:outline-none">Digital Logbook Guide</Link></li>
              <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans focus:outline-none">Training Modules</Link></li>
            </ul>
          </div>

          {/* INSTITUTIONAL COLUMN */}
          <div className="min-w-fit">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8 font-heading">Institutional</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans focus:outline-none">About TUP-Visayas</Link></li>
              <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans focus:outline-none">UIPEN Strategic Office</Link></li>
              <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans focus:outline-none">Contact Registry</Link></li>
              <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans focus:outline-none">Technical Support</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-sans leading-relaxed">
            © 2026 Technological University of the Philippines - Visayas. <br className="md:hidden" /> ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-[0.2em] font-sans transition-colors focus:outline-none">Privacy Protocol</Link>
            <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-[0.2em] font-sans transition-colors focus:outline-none">Terms of Service</Link>
            <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-[0.2em] font-sans transition-colors focus:outline-none">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
