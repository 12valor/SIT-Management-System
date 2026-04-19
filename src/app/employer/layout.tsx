"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  BarChart3, 
  ClipboardList, 
  Users, 
  Building2, 
  LogOut,
  Menu,
  X,
  Settings,
  ClipboardCheck,
  Star,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationCenter } from "@/components/NotificationCenter";

export default function EmployerLayout({
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
    } else if (session?.user?.role && session.user.role.toLowerCase() !== 'employer') {
      router.push(`/${session.user.role.toLowerCase()}/dashboard`);
    }
  }, [session, status, router]);

  const navItems = [
    { name: "Executive Analytics", href: "/employer/dashboard", icon: BarChart3 },
    { name: "Industrial Postings", href: "/employer/postings", icon: ClipboardList },
    { name: "Trainee Applicants", href: "/employer/applicants", icon: Users },
    { name: "Logbook Approvals", href: "/employer/logbooks", icon: ClipboardCheck },
    { name: "Performance Audit", href: "/employer/evaluations", icon: Star },
    { name: "Partner Profile", href: "/employer/profile", icon: Building2 },
    { name: "Office Settings", href: "/employer/settings", icon: Settings },
  ];

  if (status === "loading" || !session) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
         <Briefcase className="h-12 w-12 text-primary animate-pulse" />
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Verifying Partner Credentials...</p>
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
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="flex h-24 items-center border-b border-border px-8 gap-4 relative z-10">
          <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20">
            <Building2 className="text-primary-foreground h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter leading-none text-foreground uppercase italic">PARTNER.HUB</span>
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mt-2">Industrial Portal</span>
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
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-6">Management Matrix</h3>
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
                      ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/30 scale-[1.02]" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <item.icon className={cn(
                      "h-5 w-5 transition-all duration-500",
                      isActive ? "text-primary-foreground scale-110" : "text-muted-foreground/40 group-hover:text-primary"
                    )} />
                    <span className="uppercase tracking-[0.1em]">{item.name}</span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-6 bg-primary-foreground rounded-full opacity-40 relative z-10" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-border p-8 space-y-6 relative z-10">
          <div className="p-5 rounded-[2rem] bg-primary/5 border border-primary/10 shadow-inner">
             <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1.5">Compliance Level</p>
             <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(128,0,0,0.5)]" />
                <span className="text-[11px] font-black text-foreground uppercase tracking-tight">Active Partner</span>
             </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-xs font-black text-destructive hover:bg-destructive/10 transition-all group uppercase tracking-widest"
          >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Sign Out
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
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-1.5 leading-none">Industrial Partner manifest</p>
            <h1 className="text-xl font-black tracking-tighter text-foreground uppercase italic">
              {navItems.find(item => item.href === pathname)?.name || "Partner Unit"}
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <NotificationCenter />
            <ThemeToggle />
            <div className="h-10 w-px bg-border mx-1" />
            <div className="flex items-center gap-5 pl-2">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-foreground leading-none tracking-tight">{session?.user?.name}</p>
                  <p className="text-[10px] text-primary mt-2 uppercase font-black tracking-widest leading-none">Supervisor</p>
               </div>
               <div className="h-14 w-14 rounded-[1.5rem] bg-primary flex items-center justify-center text-primary-foreground text-lg font-black shadow-2xl shadow-primary/20 ring-4 ring-background transition-all hover:scale-105">
                {session?.user?.name?.split(' ').filter(Boolean).map(n => n[0]).join('') || 'E'}
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
