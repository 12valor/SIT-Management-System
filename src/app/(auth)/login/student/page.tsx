"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { GraduationCap, Mail, Lock, Loader2, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

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
        setError("AUTH_FAILURE: INVALID_CREDENTIALS_PROVIDED");
        setIsLoading(false);
        return;
      }
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      const role = session?.user?.role;
      if (role === "STUDENT") router.push("/student/dashboard");
      else router.push("/");
    } catch {
      setError("SYSTEM_ERROR: NETWORK_CONNECTIVITY_TIMEOUT");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-20 pb-12 relative overflow-hidden bg-[#fafafa] dark:bg-[#050505]">
      
      {/* SCANLINE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] dark:opacity-[0.07] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* INSTITUTIONAL HEADER */}
      <div className="fixed top-8 left-8 flex items-center gap-6 z-20">
        <Link href="/login" className="group flex items-center gap-4">
          <Image 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            width={40}
            height={40}
            className="h-10 w-auto grayscale dark:grayscale-0 brightness-100 dark:logo-red-filter transition-all group-hover:scale-110" 
          />
          <div className="flex flex-col leading-none border-l border-border pl-4">
             <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">TUP-Visayas</span>
             <span className="text-[9px] font-bold text-primary uppercase tracking-[0.3em] mt-1">Terminal Selection</span>
          </div>
        </Link>
      </div>

      {/* BACKGROUND DECOR - TECHNICAL SPECS */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-end gap-1 opacity-20 pointer-events-none select-none">
        <span className="text-[10px] font-mono text-slate-500">SIT_OS_v4.2.0</span>
        <span className="text-[10px] font-mono text-slate-500">ENCRYPTION: AES-256-GCM</span>
        <span className="text-[10px] font-mono text-slate-500">LATENCY: 14MS</span>
      </div>

      <main className="flex-1 flex items-center justify-center px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[440px] w-full"
        >
          {/* THE MONOLITHIC TERMINAL CONTAINER */}
          <div className="relative group">
            {/* EXTERNAL FRAME DECOR */}
            <div className="absolute -top-3 -left-3 h-8 w-8 border-t-2 border-l-2 border-primary/40 rounded-tl-sm" />
            <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-primary/40 rounded-br-sm" />
            
            <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 p-1 rounded-sm shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none relative">
              
              {/* TERMINAL HEADER */}
              <div className="bg-slate-50 dark:bg-white/[0.03] px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">Identity Authentication</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400">#STUDENT_CORE</span>
              </div>

              <div className="p-10 space-y-10">
                <div className="flex flex-col items-center text-center">
                   <div className="h-16 w-16 bg-primary text-white flex items-center justify-center rounded-sm mb-6 rotate-45 group-hover:rotate-0 transition-transform duration-500">
                     <GraduationCap className="h-8 w-8 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                   </div>
                   <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-3">Institutional Login</h1>
                   <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest leading-relaxed max-w-[280px]">
                     GSFE Gateway: Enter secure credentials to access the internal SIT terminal
                   </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-8">
                  {error && (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 bg-primary/5 border border-primary/20 flex items-center gap-3"
                    >
                      <div className="h-2 w-2 bg-primary rounded-full animate-ping" />
                      <p className="text-[10px] font-black text-primary uppercase tracking-tight">{error}</p>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    <div className="relative group/input">
                      <span className="absolute -top-2.5 left-3 px-2 bg-white dark:bg-[#0a0a0a] text-[9px] font-black text-slate-400 group-focus-within/input:text-primary uppercase tracking-[0.2em] transition-colors z-10">User Identifier</span>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 dark:text-slate-600 group-focus-within/input:text-primary transition-colors" />
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="STUDENT_ACCOUNT@GSFE.TUPV.EDU.PH"
                          className="w-full h-14 pl-12 pr-4 bg-transparent border border-slate-200 dark:border-white/10 rounded-sm text-[12px] font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800 uppercase"
                        />
                      </div>
                    </div>

                    <div className="relative group/input">
                      <span className="absolute -top-2.5 left-3 px-2 bg-white dark:bg-[#0a0a0a] text-[9px] font-black text-slate-400 group-focus-within/input:text-primary uppercase tracking-[0.2em] transition-colors z-10">Security Key</span>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 dark:text-slate-600 group-focus-within/input:text-primary transition-colors" />
                        <input
                          id="password"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full h-14 pl-12 pr-4 bg-transparent border border-slate-200 dark:border-white/10 rounded-sm text-[12px] font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.3em] rounded-sm hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all flex items-center justify-center gap-4 disabled:opacity-50 text-[11px] group/btn shadow-xl shadow-black/10 dark:shadow-white/5 active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Initialize Session
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                   <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-slate-300 dark:text-slate-700" />
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">TLS_SECURED</span>
                   </div>
                   <Link href="/login" className="text-[9px] font-black text-slate-400 dark:text-slate-600 hover:text-primary uppercase tracking-widest transition-colors">
                     Switch Terminal
                   </Link>
                </div>
              </div>
            </div>
          </div>

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

