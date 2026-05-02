"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AuthStatusModal, type AuthStatus } from "@/components/AuthStatusModal";
import { motion } from "framer-motion";

export default function StudentLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState<AuthStatus>("idle");
  const [authMessage, setAuthMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus("loading");
    setAuthMessage("Validating GSFE credentials...");

    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setAuthStatus("error");
        setAuthMessage("Invalid GSFE credentials.");
        return;
      }
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      if (session?.user?.role === "STUDENT") {
        setAuthStatus("success");
        setAuthMessage("Redirecting to Student Portal...");
        setTimeout(() => {
          router.refresh();
          router.push("/student/dashboard");
        }, 800);
      } else {
        setAuthStatus("error");
        setAuthMessage("Restricted Access: Valid GSFE identity required.");
      }
    } catch {
      setAuthStatus("error");
      setAuthMessage("Connectivity error.");
    }
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-32 pb-24 px-6 transition-colors duration-300">
      <AuthStatusModal 
        status={authStatus} 
        message={authMessage} 
        onClose={() => setAuthStatus("idle")} 
      />
      
      <motion.div 
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="mb-12 text-center">
          <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
            Institutional Gateway
          </span>
          <h1 className="text-4xl font-serif font-medium text-slate-900 dark:text-white mb-4">
            Student Portal
          </h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-serif">
            Institutional access terminal. All credentials audited per session.
          </p>
        </header>

        <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-8 rounded-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
               <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif">
                  Identifier
               </label>
               <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@gsfe.tupv.edu.ph"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
               />
            </div>
            
            <div className="space-y-2">
               <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif">
                  Secure Passkey
               </label>
               <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
               />
            </div>

            <button
              type="submit"
              disabled={authStatus === "loading" || authStatus === "success"}
              className="w-full flex items-center justify-center h-12 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 mt-4 font-serif"
            >
              Continue as Student
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex flex-col gap-4 text-center">
             <Link 
               href="/login" 
               className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-serif"
             >
               ← Return to Gateway
             </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
