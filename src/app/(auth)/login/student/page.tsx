"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2, ArrowRight } from "lucide-react";
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
      if (session?.user?.role === "STUDENT") router.push("/student/dashboard");
      else router.push("/");
    } catch {
      setError("Connectivity error.");
      setIsLoading(false);
    }
  };

  return (
    <div className={`${bebas.variable} ${ibmPlex.variable} font-ibm flex-1 flex flex-col items-center justify-center bg-white dark:bg-[#080808] min-h-screen p-8 selection:bg-rose-600 selection:text-white`}>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className="max-w-[420px] w-full"
      >
        <header className="mb-16">
          <h1 className="font-bebas text-[120px] leading-[0.8] text-slate-900 dark:text-white tracking-[-0.04em]">
            Student
          </h1>
          <div className="h-[4px] w-24 bg-rose-600 mt-8 mb-6" />
          <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-[0.1em] leading-relaxed">
            Institutional access terminal. <br />
            credentials audited.
          </p>
        </header>

        <form onSubmit={handleLogin} className="space-y-12">
          {error && (
            <div className="text-rose-600 text-[11px] font-bold uppercase tracking-[0.2em] py-4 border-y border-rose-600/20">
              {error}
            </div>
          )}

          <div className="space-y-10">
            <div className="group space-y-3">
              <label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Identifier
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@gsfe.tupv.edu.ph"
                className="w-full h-12 bg-transparent border-b border-slate-200 dark:border-white/10 text-[15px] font-medium text-slate-900 dark:text-white outline-none focus:border-rose-600 transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800"
              />
            </div>

            <div className="group space-y-3">
              <label htmlFor="password" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Secure Passkey
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 bg-transparent border-b border-slate-200 dark:border-white/10 text-[15px] font-medium text-slate-900 dark:text-white outline-none focus:border-rose-600 transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-16 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.3em] transition-all hover:bg-rose-600 dark:hover:bg-rose-600 hover:text-white active:scale-[0.98] disabled:opacity-50 text-[13px] flex items-center justify-center gap-4"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Authorize
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <footer className="mt-24 pt-12 border-t border-slate-100 dark:border-white/5">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-3 text-slate-400 hover:text-rose-600 transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
          >
            Switch Terminal
          </Link>
        </footer>
      </motion.div>
    </div>
  );
}
