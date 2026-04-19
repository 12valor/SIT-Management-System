"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  FileText, 
  User as UserIcon, 
  LogOut,
  Menu,
  X,
  Award,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationCenter } from "@/components/NotificationCenter";

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
      // Basic client-side fallback, though middleware handles this
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

  if (status === "loading" || !session) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
         <ShieldCheck className="h-12 w-12 text-primary animate-pulse" />
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Securing Session Context...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background selection:bg-primary/20">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-all duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-card transition-all duration-500 ease-in-out lg:translate-x-0 overflow-hidden",
        isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        {/* Abstract Background Decoration */}
        <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex h-24 items-center border-b border-border px-8 gap-4 relative z-10">
          <img src="/des_UIPEN.png" alt="UIPEN Logo" className="h-10 w-auto object-contain" />
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight leading-none text-foreground uppercase font-heading">SIT Platform</span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-widest mt-1 font-sans">TUP-V Student</span>
          </div>
          <button 
            className="ml-auto lg:hidden p-2 rounded-xl bg-muted" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-5 py-10 relative z-10">
           <div className="px-5 mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-6">Manifest Navigation</h3>
           </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-5 py-4 text-xs font-black transition-all group relative overflow-hidden",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-[1.02]" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <item.icon className={cn(
                      "h-5 w-5 transition-all duration-500",
                      isActive ? "text-primary-foreground scale-110" : "text-muted-foreground/40 group-hover:text-primary"
                    )} />
                    <span className="uppercase tracking-widest">{item.name}</span>
                  </div>
                  {isActive ? (
                    <ChevronRight className="h-4 w-4 text-primary-foreground opacity-40 relative z-10" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-border opacity-0 group-hover:opacity-100 transition-all" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-border p-8 space-y-6 relative z-10">
          <div className="p-5 rounded-[2rem] bg-primary/5 border border-primary/10 shadow-inner">
             <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1.5">Certification Protocol</p>
             <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(128,0,0,0.5)]" />
                <span className="text-[11px] font-black text-foreground uppercase tracking-tighter">Verified Candidate</span>
             </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-xs font-black text-destructive hover:bg-destructive/10 transition-all group uppercase tracking-widest"
          >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:pl-72">
        <header className="sticky top-0 z-40 flex h-24 items-center gap-6 border-b border-border bg-background/70 backdrop-blur-2xl px-8 lg:px-12">
          <button 
            className="lg:hidden p-2 rounded-xl bg-muted border border-border hover:scale-105 transition-transform"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          
          <div className="flex-1">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1 leading-none">Standard Operational Matrix</p>
            <h1 className="text-xl font-black tracking-tight text-foreground uppercase">
              {navItems.find(item => item.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <NotificationCenter />
            <ThemeToggle />
            <div className="h-10 w-px bg-border mx-1" />
            <div className="flex items-center gap-4 pl-1">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-foreground leading-none tracking-tight">{session?.user?.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 uppercase font-black tracking-widest">{session?.user?.id?.slice(0, 8)}</p>
               </div>
               <div className="h-14 w-14 rounded-[1.5rem] bg-gradient-to-br from-primary to-red-600 p-0.5 shadow-2xl shadow-primary/20 ring-4 ring-background transition-all hover:rotate-3">
                  <div className="h-full w-full rounded-[1.3rem] bg-card flex items-center justify-center">
                    <span className="text-lg font-black bg-gradient-to-br from-primary to-red-600 bg-clip-text text-transparent">
                      {session?.user?.name?.split(' ').filter(Boolean).map(n => n[0]).join('') || '?'}
                    </span>
                  </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-8 lg:p-14 animate-in-fade w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
