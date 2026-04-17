"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMockStore } from "@/store/mock-store";
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  FileText, 
  User as UserIcon, 
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
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
    } else if (user.role !== 'student') {
      router.push("/employer/dashboard");
    }
  }, [user, router]);

  const navItems = [
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Opportunities", href: "/student/opportunities", icon: Briefcase },
    { name: "Logbook", href: "/student/logbook", icon: BookOpen },
    { name: "Documents", href: "/student/documents", icon: FileText },
    { name: "Profile", href: "/student/profile", icon: UserIcon },
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
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold italic">T</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-gradient">SIT Platform</span>
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
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-[18px] w-[18px] transition-transform group-hover:scale-110",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
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
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all group"
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
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">Student Portal</p>
            <h1 className="text-lg font-bold tracking-tight">
              {navItems.find(item => item.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative h-9 w-9 rounded-lg border border-border bg-card flex items-center justify-center transition-colors hover:bg-muted">
              <Bell className="h-[18px] w-[18px] text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            </button>
            <ThemeToggle />
            <div className="h-9 w-px bg-border mx-1" />
            <div className="flex items-center gap-3 pl-1">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold leading-none">{user.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 capitalize font-medium">{user.role}</p>
               </div>
               <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20">
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
