"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  FileText, 
  User as UserIcon, 
  LogOut,
  X,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardFooter } from "@/components/DashboardFooter";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role && session.user.role.toLowerCase() !== 'student') {
      router.push(`/${session.user.role.toLowerCase()}/dashboard`);
    }
  }, [session, status, router]);

  const navItems = [
    { name: "Executive Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Industry Opportunities", href: "/student/opportunities", icon: Briefcase },
    { name: "Digital Logbook", href: "/student/logbook", icon: BookOpen },
    { name: "Training Documents", href: "/student/documents", icon: FileText },
    { name: "SIT Certification", href: "/student/completion", icon: Award },
    { name: "Professional Profile", href: "/student/profile", icon: UserIcon },
  ];


  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] selection:bg-[#800000]/10">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-all duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-all duration-500 ease-in-out lg:translate-x-0 overflow-hidden",
        isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        {/* Logo/Branding Section */}
        <div className="flex h-20 items-center px-6 gap-3 mb-4">
          <Image 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            width={36}
            height={36}
            className="h-9 w-auto object-contain" 
          />
          <div className="flex flex-col justify-center leading-none">
            <span className="font-bold text-base tracking-tight text-slate-800 font-heading">SIT Platform</span>
            <span className="text-[10px] font-medium text-[#800000] mt-1">TUP-V Student</span>
          </div>
          <button 
            className="ml-auto lg:hidden p-2 rounded-lg bg-slate-100" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-4 w-4 text-slate-600" />
          </button>
        </div>
        
        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all rounded-lg group",
                    isActive 
                      ? "bg-[#fff1f1] text-[#800000]" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-[#800000]" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Sections */}
        <div className="p-4 space-y-4">
          {/* Status Card */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
             <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-medium text-slate-500">Status:</span>
                <span className="text-[11px] font-bold text-[#800000]">Verified</span>
             </div>
             {status === "loading" ? (
                <div className="h-3 w-24 bg-slate-200 animate-pulse rounded" />
             ) : (
                <p className="text-[10px] font-medium text-slate-400">
                   Student ID: {session?.user?.email?.split('@')[0].toUpperCase() || "2021-0042"}
                </p>
             )}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-all group w-full text-left"
          >
            <LogOut className="h-4 w-4 text-slate-400 group-hover:text-slate-900 transition-transform group-hover:-translate-x-1" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:pl-72">
        <DashboardHeader 
          session={session}
          pathname={pathname}
          navItems={navItems}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          roleTitle="Verified Candidate"
          roleInitials="S"
        />
        
        <main className="flex-1 p-8 lg:p-14 animate-in-fade w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-14rem)]">
            <div className="flex-1">
              {children}
            </div>
            <DashboardFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
