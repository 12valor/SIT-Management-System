"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  MapPin, 
  FileSearch,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  Zap,
  Command
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationCenter } from "@/components/NotificationCenter";

export default function CoordinatorLayout({
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
    } else if (session?.user?.role && session.user.role.toLowerCase() !== 'coordinator') {
      router.push(`/${session.user.role.toLowerCase()}/dashboard`);
    }
  }, [session, status, router]);

  const navItems = [
    { name: "Strategic Overview", href: "/coordinator/dashboard", icon: LayoutDashboard },
    { name: "Student Manifest", href: "/coordinator/students", icon: Users },
    { name: "Industrial Partners", href: "/coordinator/companies", icon: Building },
    { name: "SIT Placements", href: "/coordinator/placements", icon: MapPin },
    { name: "Intelligence Reports", href: "/coordinator/reports", icon: FileSearch },
    { name: "Account Requests", href: "/coordinator/registrations", icon: ShieldAlert },
    { name: "System Control", href: "/coordinator/settings", icon: Settings },
  ];

  if (status === "loading" || !session) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
         <ShieldCheck className="h-12 w-12 text-primary animate-pulse" />
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Authenticating Executive Access...</p>
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
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex h-24 items-center border-b border-border px-8 gap-4 relative z-10">
          <div className="w-11 h-11 bg-primary rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-primary/20">
            <Command className="text-primary-foreground h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter leading-none text-foreground uppercase italic">ADMIN.HQ</span>
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mt-2">Executive Command</span>
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
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-6 font-black">Control Matrix</h3>
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
                  {isActive ? (
                    <div className="w-1.5 h-6 bg-primary-foreground rounded-full opacity-40 relative z-10" />
                  ) : (
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-40 transition-all group-hover:translate-x-1" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-border p-8 space-y-6 relative z-10">
          <div className="p-5 rounded-[2rem] bg-muted shadow-inner">
             <div className="flex items-center justify-between mb-3">
               <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Network Secure</p>
               <Zap className="h-3 w-3 text-primary fill-primary" />
             </div>
             <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(128,0,0,0.5)] animate-pulse" />
                <span className="text-[11px] font-black text-foreground uppercase tracking-tight">Active Protocol</span>
             </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-xs font-black text-destructive hover:bg-destructive/10 transition-all group uppercase tracking-widest"
          >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Terminate Link
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
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-1.5 leading-none">Administrative Manifest</p>
            <h1 className="text-xl font-black tracking-tighter text-foreground uppercase italic">
              {navItems.find(item => item.href === pathname)?.name || "Strategic Unit"}
            </h1>
          </div>

          <div className="flex items-center gap-5">
            <NotificationCenter />
            <ThemeToggle />
            <div className="h-10 w-px bg-border mx-1" />
            <div className="flex items-center gap-5 pl-2">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-foreground leading-none tracking-tight">{session?.user?.name}</p>
                  <p className="text-[10px] text-primary mt-2 uppercase font-black tracking-widest leading-none">Office Registrar</p>
               </div>
               <div className="h-14 w-14 rounded-[1.5rem] bg-primary flex items-center justify-center text-primary-foreground text-lg font-black shadow-2xl shadow-primary/20 ring-4 ring-background transition-all hover:scale-105">
                {session?.user?.name?.split(' ').filter(Boolean).map(n => n[0]).join('') || 'C'}
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
