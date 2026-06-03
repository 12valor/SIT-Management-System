"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import React from "react";

const SmartNavbar = dynamic(() =>
  import("@/components/SmartNavbar").then((mod) => mod.SmartNavbar)
);
const Footer = dynamic(() =>
  import("@/components/Footer").then((mod) => mod.Footer)
);
const FloatingFAQ = dynamic(() =>
  import("@/components/FloatingFAQ").then((mod) => mod.FloatingFAQ)
);
const FloatingThemeToggle = dynamic(() =>
  import("@/components/FloatingThemeToggle").then((mod) => mod.FloatingThemeToggle)
);

function isPortalRoute(pathname: string) {
  return (
    pathname.startsWith("/student") ||
    pathname.startsWith("/employer") ||
    pathname.startsWith("/coordinator")
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (isPortalRoute(pathname)) {
    return <div className="flex-1 flex flex-col">{children}</div>;
  }

  return (
    <>
      <SmartNavbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
      <FloatingFAQ />
      <FloatingThemeToggle />
    </>
  );
}
