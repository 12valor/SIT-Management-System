"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail, Lock, Loader2, ShieldCheck, Terminal } from "lucide-react";
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

export default function StudentLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    <div className={`${bebas.variable} ${ibmPlex.variable} font-ibm flex-1 flex flex-col items-center justify-center bg-white dark:bg-[#050505] min-h-screen p-6 selection:bg-rose-500 selection:text-white`}>
      
      {/* INDUSTRIAL GRID OVERLAY */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[480px] w-full relative z-10"
      >
        <div className="bg-white dark:bg-[#0c0c0c] border-2 border-slate-900 dark:border-white/[0.08] p-1 md:p-1 rounded-none shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[20px_20px_0px_0px_rgba(255,255,255,0.01)]">
          
          <div className="border border-slate-200 dark:border-white/[0.05] p-10 md:p-16">
            <header className="mb-14 relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-rose-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-600">Terminal 01</span>
              </div>
              
              <h1 className="font-bebas text-7xl md:text-8xl leading-none text-slate-900 dark:text-white tracking-tighter mb-4">
                Student
              </h1>
              
              <div className="flex items-start gap-4">
                <Terminal className="w-4 h-4 mt-1 text-slate-400 shrink-0" />
                <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed uppercase tracking-wide">
                  Credentials strictly audited. Access cycle: 2026.IV.25
                </p>
              </div>
            </header>

            <form onSubmit={handleLogin} className="space-y-10">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-rose-600 bg-rose-50 dark:bg-rose-500/5 p-4 border-l-4 border-rose-600"
                >
                  <p className="text-[11px] font-black uppercase tracking-widest">{error}</p>
                </motion.div>
              )}

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end px-1">
                    <label htmlFor="email" className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">
                      Identifier
                    </label>
                    <span className="text-[9px] text-slate-400 font-mono tracking-tighter">[GSFE_ID]</span>
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@gsfe.tupv.edu.ph"
                    className="w-full h-14 px-5 bg-slate-50 dark:bg-white/[0.02] border-b-2 border-slate-200 dark:border-white/10 text-[14px] font-medium text-slate-900 dark:text-white outline-none focus:border-rose-600 focus:bg-slate-100 dark:focus:bg-white/[0.04] transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end px-1">
                    <label htmlFor="password" className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">
                      Passkey
                    </label>
                    <span className="text-[9px] text-slate-400 font-mono tracking-tighter">[SECURE_HASH]</span>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-14 px-5 bg-slate-50 dark:bg-white/[0.02] border-b-2 border-slate-200 dark:border-white/10 text-[14px] font-medium text-slate-900 dark:text-white outline-none focus:border-rose-600 focus:bg-slate-100 dark:focus:bg-white/[0.04] transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full h-16 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 text-[13px]"
              >
                <div className="absolute inset-0 bg-rose-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300">
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Authorize Entry
                      <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </span>
              </button>
            </form>

            <footer className="mt-20 flex flex-col items-center gap-6">
              <div className="w-full h-[1px] bg-slate-100 dark:bg-white/5" />
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] max-w-[280px] text-center leading-relaxed">
                Contact system administrator for credential recovery or terminal access audits.
              </p>
            </footer>
          </div>
        </div>

        <Link 
          href="/login" 
          className="mt-12 flex items-center justify-center gap-4 text-slate-400 hover:text-rose-600 transition-all text-[10px] font-black uppercase tracking-[0.3em] group"
        >
          <div className="w-8 h-[1px] bg-slate-200 group-hover:bg-rose-600 transition-colors" />
          Switch Terminal
          <div className="w-8 h-[1px] bg-slate-200 group-hover:bg-rose-600 transition-colors" />
        </Link>
      </motion.div>
    </div>
  );
}
