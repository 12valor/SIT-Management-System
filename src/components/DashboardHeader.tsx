"use client";

import React from "react";

interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardHeaderProps {
  session: Session | null;
  pathname: string;
  navItems: NavItem[];
  setIsMobileMenuOpen: (open: boolean) => void;
  roleTitle: string;
}

export function DashboardHeader({ 
  session, 
  pathname, 
  navItems, 
  setIsMobileMenuOpen,
  roleTitle,
}: DashboardHeaderProps) {
  const activeItem = navItems.find(item => item.href === pathname);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-6 border-b bg-background px-6 lg:px-8">
      <button 
        className="lg:hidden text-xs font-medium hover:underline"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        Menu
      </button>
      
      <div className="flex-1">
        <p className="text-xs font-medium text-foreground">
          {activeItem?.name || "Dashboard"}
        </p>
      </div>
 
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-medium text-foreground">
            {session?.user?.name || "Unauthorized"}
          </p>
          <p className="text-[10px] text-foreground/70 font-medium">
            {roleTitle}
          </p>
        </div>
      </div>
    </header>
  );
}


