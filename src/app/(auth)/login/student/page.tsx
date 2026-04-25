"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { GraduationCap, Mail, Lock, Loader2, ArrowLeft, ArrowRight, ShieldCheck, Bell } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

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
    <div className="flex-1 flex flex-col pt-32 pb-12 bg-slate-50/50 dark:bg-[#050505]">
      
      {/* LOGO */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-20">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            width={32}
            height={32}
            className="h-8 w-auto grayscale dark:grayscale-0 dark:logo-red-filter" 
          />
          <span className="text-sm font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            TUPV SIT
          </span>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[400px] w-full"
        >
          <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 p-12 rounded-sm shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none">
            <div className="flex flex-col mb-10">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">
                Student Login
              </h1>
              <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                Enter your GSFE credentials to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              {error && (
                <p className="text-[11px] font-bold text-primary uppercase tracking-tight">{error}</p>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Account Identifier</label>
                  <div className="relative">
                    <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@gsfe.tupv.edu.ph"
                      className="w-full h-12 pl-8 bg-transparent border-b border-slate-100 dark:border-white/10 text-[14px] font-medium outline-none focus:border-primary transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Security Key</label>
                  <div className="relative">
                    <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-12 pl-8 bg-transparent border-b border-slate-100 dark:border-white/10 text-[14px] font-medium outline-none focus:border-primary transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[11px] shadow-lg shadow-black/5"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Initialize Portal
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-50 dark:border-white/5">
              <Link href="/login" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                <ArrowLeft className="h-3 w-3" />
                Return to selection
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}



