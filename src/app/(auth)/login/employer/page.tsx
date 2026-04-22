"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Building2, Mail, Lock, Loader2, ArrowLeft, ArrowRight, Activity, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function EmployerLoginPage() {
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
        setError("AUTH_FAILURE: INVALID_CORPORATE_CREDENTIALS");
        setIsLoading(false);
        return;
      }
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      const role = session?.user?.role;
      if (role === "EMPLOYER") router.push("/employer/dashboard");
      else router.push("/");
    } catch {
      setError("SYS_ERROR: NETWORK_OR_SERVER_FAILURE");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-32 pb-20 relative">
      
      {/* INSTITUTIONAL HEADER */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        <Link href="/login" className="flex items-center gap-3 group opacity-80 hover:opacity-100 transition-opacity">
          <Image 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            width={32}
            height={32}
            className="h-8 w-auto grayscale dark:invert" 
          />
          <div className="flex flex-col leading-none">
             <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest">TUP-VISAYAS</span>
             <span className="font-mono text-[7px] text-slate-400">PARTNER_ACCESS_PORTAL</span>
          </div>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-[450px] w-full relative">
          
          {/* DECORATIVE COORDINATES */}
          <div className="absolute -top-12 -left-12 font-mono text-[8px] text-slate-400 hidden md:block select-none">
            [ REG_ZONE: SOUTH_VISAYAS ]
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 relative overflow-hidden group">
            {/* TECHNICAL ACCENT NOTCH */}
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
               <div className="absolute top-[-24px] right-[-24px] w-12 h-12 bg-slate-100 dark:bg-white/5 rotate-45" />
            </div>

            {/* FORM HEADER */}
            <div className="p-8 md:p-10 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center justify-between mb-8">
                <div className="h-12 w-12 border border-slate-200 dark:border-white/10 flex items-center justify-center bg-slate-50 dark:bg-white/5">
                  <Building2 className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex flex-col items-end">
                   <span className="font-mono text-[9px] text-slate-400 uppercase tracking-tighter">NODE_ID</span>
                   <span className="font-mono text-[11px] font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest">EMP_AUTH_02</span>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white font-heading tracking-tighter uppercase mb-2 text-gradient">Partner</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[280px]">
                Access the Industry Partner portal to evaluate trainee performance and manage SIT placements.
              </p>
            </div>

            {/* FORM BODY */}
            <div className="p-8 md:p-10">
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 border-l-2 border-red-600 flex items-center gap-3">
                    <Activity className="w-4 h-4 text-red-600 shrink-0" />
                    <span className="font-mono text-[10px] font-bold text-red-600 uppercase tracking-tight">{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">Corporate_Identifier</label>
                  <div className="relative group/input">
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="CORPORATE@COMPANY.COM"
                      className="w-full h-14 pl-6 pr-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-sm font-bold font-mono outline-none focus:border-slate-900 dark:focus:border-slate-100 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 uppercase"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] bg-slate-900 dark:bg-white scale-x-0 group-focus-within/input:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">Security_Passkey</label>
                  <div className="relative group/input">
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-14 pl-6 pr-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-sm font-bold font-mono outline-none focus:border-slate-900 dark:focus:border-slate-100 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] bg-slate-900 dark:bg-white scale-x-0 group-focus-within/input:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group/btn relative w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-black font-bold tracking-[0.1em] transition-all flex items-center justify-between px-6 disabled:opacity-50 font-heading overflow-hidden"
                >
                  <span className="relative z-10 text-sm uppercase italic">Verify_and_Enter</span>
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin relative z-10" />
                  ) : (
                    <ArrowRight className="h-4 w-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  )}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-slate-400" />
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">TLS_ENCRYPTED</span>
                 </div>
                 <Link href="/signup/employer" className="font-mono text-[9px] font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest underline underline-offset-4 decoration-slate-200 dark:decoration-slate-800">
                    Partner_Registration
                 </Link>
              </div>
            </div>
          </div>

          <Link href="/login" className="mt-8 flex items-center justify-center gap-2 group opacity-50 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Return_to_Gateway</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
