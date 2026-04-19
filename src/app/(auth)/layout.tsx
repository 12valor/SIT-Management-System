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
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
