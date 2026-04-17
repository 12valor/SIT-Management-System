import Link from "next/link";
import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* Sidebar sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-border bg-background sm:flex">
        <div className="flex h-14 items-center border-b border-border px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
            <span className="">SIT TUP-V</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4 px-3 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-md bg-muted px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-muted"
          >
            Dashboard
          </Link>
          <Link
            href="/logbook"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            Logbook
          </Link>
          <Link
            href="/documents"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            Documents
          </Link>
        </nav>
        <div className="border-t border-border p-4">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            Profile
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* Mobile menu trigger could go here */}
          <div className="w-full flex-1">
            <h1 className="text-xl font-semibold tracking-tight">Dashboard Overview</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* User profile dropdown could go here */}
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
              JD
            </div>
          </div>
        </header>
        
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
