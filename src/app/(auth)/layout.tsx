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
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-primary/20 relative">
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
