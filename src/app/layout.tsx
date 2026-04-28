import type { Metadata } from "next";
import { Poppins, Montserrat, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TUP-V SIT Management System",
  description: "A premium platform for managing Supervised Industrial Training (SIT) at TUP-V. Connecting students and industry partners.",
};

import { AuthProvider } from "@/components/providers/session-provider";
import { Footer } from "@/components/Footer";
import { SmartNavbar } from "@/components/SmartNavbar";
import { FloatingThemeToggle } from "@/components/FloatingThemeToggle";
import { FloatingFAQ } from "@/components/FloatingFAQ";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${montserrat.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 antialiased selection:bg-primary selection:text-white">
        <NextTopLoader 
          color="hsl(348 83% 40%)"
          showSpinner={false}
          shadow="0 0 10px hsl(348 83% 40%),0 0 5px hsl(348 83% 40%)"
        />
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SmartNavbar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
            <FloatingFAQ />
            <FloatingThemeToggle />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
