import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIT Management System",
  description: "Secure authentication for SIT stakeholders",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] flex flex-col font-sans selection:bg-primary/20 overflow-hidden relative">
      {/* TECHNICAL BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-grid-black dark:bg-grid-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-[#050505] dark:via-transparent dark:to-[#050505]" />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
