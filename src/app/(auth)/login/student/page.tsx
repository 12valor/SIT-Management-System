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
    <div className="flex-1 flex flex-col pt-32 pb-12 bg-white dark:bg-[#050505]">
      
      {/* MINIMAL LOGO */}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-[360px] w-full"
        >
          <div className="flex flex-col mb-12">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">
              Student Login
            </h1>
            <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
              Manage your SIT records using your GSFE account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <p className="text-[11px] font-bold text-primary uppercase tracking-tight">{error}</p>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">GSFE Account</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@gsfe.tupv.edu.ph"
                  className="w-full h-12 bg-transparent border-b border-slate-200 dark:border-white/10 text-[14px] font-medium outline-none focus:border-primary transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-800"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 bg-transparent border-b border-slate-200 dark:border-white/10 text-[14px] font-medium outline-none focus:border-primary transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[11px]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Enter Portal
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-16 flex flex-col gap-6">
            <Link href="/login" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
              <ArrowLeft className="h-3 w-3" />
              Back to selection
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
              Institutional credentials required. <br />
              GSFE accounts are managed by the <br />
              <span className="text-slate-600 dark:text-slate-300">Information Technology Department</span>
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

