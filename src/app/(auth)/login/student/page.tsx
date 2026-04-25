"use client";
 

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail, Lock, Loader2, ArrowLeft, ArrowRight, ShieldAlert, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export default function StudentLoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("Invalid GSFE credentials.");
        setIsLoading(false);
        return;
      }
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      const role = session?.user?.role;
      if (role === "STUDENT") router.push("/student/dashboard");
      else router.push("/");
    } catch {
      setError("Connectivity error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className={`${poppins.variable} font-poppins flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-black min-h-screen p-6 transition-colors duration-500`}>
      
      {/* BACKGROUND ACCENT */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.03),transparent_70%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[440px] w-full relative z-10"
      >
        <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 p-10 md:p-14 rounded-[40px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_100px_-20px_rgba(225,29,72,0.1)] transition-all duration-500">
          
          <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-[0.1em] mb-4">
              Student
            </h1>
            <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[320px] mx-auto">
              Authorized administrative terminal. Credentials strictly audited per access cycle.
            </p>
          </header>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <div className="flex items-center justify-center gap-2 text-primary bg-primary/5 dark:bg-primary/10 py-3 rounded-xl border border-primary/20">
                 <p className="text-[12px] font-bold uppercase tracking-tight">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="email" className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block pl-4">
                  Student Identifier
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@gsfe.tupv.edu.ph"
                    className="w-full h-16 px-6 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 rounded-2xl text-[15px] font-medium text-slate-900 dark:text-white outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="password" className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block pl-4">
                  Secure Passkey
                </label>
                <div className="relative group">
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-16 px-6 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 rounded-2xl text-[15px] font-medium text-slate-900 dark:text-white outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-slate-900 dark:bg-primary text-white font-black uppercase tracking-[0.15em] rounded-2xl hover:bg-black dark:hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50 text-[14px] shadow-xl shadow-black/5 dark:shadow-[0_10px_30px_-10px_rgba(225,29,72,0.5)]"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Authorize Entry"
              )}
            </button>
          </form>

          <footer className="mt-14 pt-10 border-t border-slate-100 dark:border-white/5 text-center">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Active Audit Log</span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-600 font-medium leading-relaxed max-w-[240px] mx-auto">
              Contact System Admin for credential recovery or access audits.
            </p>
          </footer>
        </div>

        <Link 
          href="/login" 
          className="mt-8 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest group"
        >
          Switch Terminal
        </Link>
      </motion.div>
    </div>
  );
}









