"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMockStore } from "@/store/mock-store";
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
  Bell,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoordinatorLayout({
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
    } else if (user.role !== 'coordinator') {
      router.push("/student/dashboard");
    }
  }, [user, router]);

  const navItems = [
    { name: "Overview", href: "/coordinator/dashboard", icon: LayoutDashboard },
    { name: "Students", href: "/coordinator/students", icon: Users },
    { name: "Companies", href: "/coordinator/companies", icon: Building },
    { name: "Placements", href: "/coordinator/placements", icon: MapPin },
    { name: "Reports", href: "/coordinator/reports", icon: FileSearch },
    { name: "Settings", href: "/coordinator/settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950 selection:bg-indigo-500/20">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-20 items-center border-b border-slate-100 dark:border-slate-800 px-8 gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <ShieldCheck className="text-white h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight leading-none text-slate-900 dark:text-white">Admin Hub</span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Coordinator Portal</span>
          </div>
          <button 
            className="ml-auto lg:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-8">
           <div className="px-4 mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Navigation</h3>
           </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all group",
                    isActive 
                      ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" 
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      "h-5 w-5 transition-transform group-hover:scale-110",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
                    )} />
                    {item.name}
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 p-6 space-y-4">
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20">
             <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">System Status</p>
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Operations Normal</span>
             </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all group"
          >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8">
          <button 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {navItems.find(item => item.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative h-11 w-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 shadow-sm">
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-900" />
            </button>
            <ThemeToggle />
            <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
            <div className="flex items-center gap-4 pl-2">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{user.name}</p>
                  <p className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-1 uppercase font-black tracking-tighter">Office Head</p>
               </div>
               <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-indigo-600/30 ring-2 ring-white dark:ring-slate-800">
                {user.name?.split(' ').filter(Boolean).map(n => n[0]).join('') || 'C'}
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-8 lg:p-12 animate-in-fade w-full">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
