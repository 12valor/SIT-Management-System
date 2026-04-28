"use client";

import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";

export function FloatingThemeToggle() {
  const pathname = usePathname();
  const isPortalRoute = 
    pathname.startsWith("/student") ||
    pathname.startsWith("/employer") ||
    pathname.startsWith("/coordinator");

  if (isPortalRoute) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] hidden sm:block">
      <ThemeToggle />
    </div>
  );
}
