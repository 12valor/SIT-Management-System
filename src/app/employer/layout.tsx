"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMockStore } from "@/store/mock-store";
import { 
  BarChart3, 
  ClipboardList, 
  Users, 
  Building2, 
  LogOut,
  Menu,
  X,
  Bell,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmployerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useMockStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Simple auth guard
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== 'employer') {
      router.push("/student/dashboard");
    }
  }, [user, router]);

  const navItems = [
    { name: "Analytics", href: "/employer/dashboard", icon: BarChart3 },
    { name: "My Postings", href: "/employer/postings", icon: ClipboardList },
    { name: "Applicants", href: "/employer/applicants", icon: Users },
    { name: "Company Profile", href: "/employer/profile", icon: Building2 },
    { name: "Settings", href: "/employer/settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen w-full bg-muted/30 selection:bg-primary/20">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-300 ease-in-out sm:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center border-b border-border/50 px-6 gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold italic">B</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Employer Hub</span>
          <button 
            className="ml-auto sm:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group",
                    isActive 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-[18px] w-[18px] transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-muted-foreground group-hover:text-blue-600"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-border/50 p-4 space-y-2">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all group"
          >
            <LogOut className="h-[18px] w-[18px] group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 sm:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-background/80 backdrop-blur-md px-6">
          <button 
            className="sm:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex-1">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5 font-mono">Industry Partner</p>
            <h1 className="text-lg font-bold tracking-tight">
              {navItems.find(item => item.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative h-9 w-9 rounded-xl border border-border bg-card flex items-center justify-center transition-colors hover:bg-muted">
              <Bell className="h-[18px] w-[18px] text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600" />
            </button>
            <ThemeToggle />
            <div className="h-9 w-px bg-border mx-1" />
            <div className="flex items-center gap-3 pl-1">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold leading-none">{user.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 capitalize font-medium">{user.role}</p>
               </div>
               <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-600/20">
                {user.name?.split(' ').filter(Boolean).map(n => n[0]).join('') || '?'}
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6 md:p-10 animate-in-fade max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
