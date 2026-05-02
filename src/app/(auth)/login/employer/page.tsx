"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import { AuthStatusModal, type AuthStatus } from "@/components/AuthStatusModal";
import { motion } from "framer-motion";
import { Bebas_Neue, IBM_Plex_Sans } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm",
});

export default function EmployerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState<AuthStatus>("idle");
  const [authMessage, setAuthMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus("loading");
    setAuthMessage("Validating corporate credentials...");

    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setAuthStatus("error");
        setAuthMessage("Invalid corporate credentials.");
        return;
      }
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      if (session?.user?.role === "EMPLOYER") {
        setAuthStatus("success");
        setAuthMessage("Redirecting to Partner Dashboard...");
        setTimeout(() => router.push("/employer/dashboard"), 800);
      } else {
        setAuthStatus("error");
        setAuthMessage("Restricted Access: Corporate privileges required.");
      }
    } catch {
      setAuthStatus("error");
      setAuthMessage("Connectivity error.");
    }
  };

  return (
    <div className={`${bebas.variable} ${ibmPlex.variable} font-ibm flex-1 flex flex-col items-center bg-white dark:bg-[#080808] min-h-screen pt-40 pb-20 p-6`}>
      <AuthStatusModal 
        status={authStatus} 
        message={authMessage} 
        onClose={() => setAuthStatus("idle")} 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className="max-w-[480px] w-full"
      >
        {/* SHARP CARD CONTAINER */}
        <div className="bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/10 p-10 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none">
          
          <header className="mb-14">
            <h1 className="font-bebas text-[90px] leading-[0.85] text-slate-900 dark:text-white tracking-[-0.02em] mb-6">
              Partner
            </h1>
            
            <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-[0.05em] leading-relaxed">
              Corporate access terminal. <br />
              All credentials audited per session.
            </p>
          </header>

          <form onSubmit={handleLogin} className="space-y-10">


            <div className="space-y-8">
              <div className="space-y-3">
                <label htmlFor="email" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
                  Corporate Identifier
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="corporate@company.com"
                  className="w-full h-12 bg-transparent border-b-2 border-slate-100 dark:border-white/5 text-[15px] font-medium text-slate-900 dark:text-white outline-none focus:border-rose-600 transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="password" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
                  Secure Passkey
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 bg-transparent border-b-2 border-slate-100 dark:border-white/5 text-[15px] font-medium text-slate-900 dark:text-white outline-none focus:border-rose-600 transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authStatus === "loading" || authStatus === "success"}
              className="w-full h-16 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.3em] transition-all hover:bg-rose-600 dark:hover:bg-rose-600 hover:text-white active:scale-[0.98] disabled:opacity-50 text-[12px] flex items-center justify-center gap-4"
            >
              Authenticate Partner
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <footer className="mt-16 pt-10 border-t border-slate-50 dark:border-white/5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Link 
                href="/signup/employer" 
                className="inline-flex items-center gap-3 text-slate-900 dark:text-white hover:text-rose-600 transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
              >
                Register Partner
              </Link>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-3 text-slate-400 hover:text-rose-600 transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
              >
                Switch Terminal
              </Link>
            </div>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
