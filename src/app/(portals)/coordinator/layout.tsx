"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  MapPin, 
  LogOut,
  X,
  Settings,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

import { DashboardHeader } from "@/components/DashboardHeader";
import { SignOutOverlay } from "@/components/SignOutOverlay";

export default function CoordinatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    // Add a small delay for the animation to be visible
    await new Promise(resolve => setTimeout(resolve, 800));
    signOut({ callbackUrl: "/login" });
  };

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
    { name: "Account Requests", href: "/coordinator/registrations", icon: ShieldAlert },
    { name: "System Control", href: "/coordinator/settings", icon: Settings },
  ];


  return (
    <div className="flex min-h-screen w-full bg-background">
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
            <span className="font-bold text-base tracking-tight text-foreground font-heading">SIT Platform</span>
            <span className="text-[10px] font-medium text-primary mt-1">TUP-V Admin</span>
          </div>
          <button 
            className="ml-auto lg:hidden p-2 rounded-lg bg-muted" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-4 w-4 text-muted-foreground" />
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
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground/50 group-hover:text-muted-foreground"
                  )} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Sections */}
        <div className="p-4">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all group w-full text-left"
          >
            <LogOut className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:-translate-x-1" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Sign Out Loading Overlay */}
      <SignOutOverlay isVisible={isSigningOut} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:pl-72">
        <DashboardHeader 
          session={session}
          pathname={pathname}
          navItems={navItems}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          roleTitle="Office Registrar"
        />
        
        <main className="flex-1 p-8 lg:p-14 animate-in-fade w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-14rem)]">
            <div className="flex-1">
              {children}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
