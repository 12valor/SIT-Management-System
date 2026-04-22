"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ShieldAlert, Mail, Lock, Loader2, ArrowLeft, ArrowRight, Activity, ShieldCheck, Fingerprint } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CoordinatorLoginPage() {
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
        setError("AUTH_FAILURE: INVALID_ADMIN_CREDENTIALS");
        setIsLoading(false);
        return;
      }
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      const role = session?.user?.role;
      if (role === "COORDINATOR") router.push("/coordinator/dashboard");
      else {
        setError("ACCESS_DENIED: INSUFFICIENT_PRIVILEGES");
        setIsLoading(false);
      }
    } catch {
      setError("SYS_ERROR: AUTH_NODE_UNREACHABLE");
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
             <span className="font-mono text-[7px] text-slate-400">ADMIN_SECURE_NODE</span>
          </div>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-[450px] w-full relative">
          
          {/* DECORATIVE COORDINATES */}
          <div className="absolute -top-12 -left-12 font-mono text-[8px] text-red-600/50 hidden md:block select-none animate-pulse">
            [ SECURITY_LEVEL: ALPHA_ROOT ]
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 relative overflow-hidden group shadow-2xl shadow-red-900/5">
            {/* TECHNICAL ACCENT NOTCH */}
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
               <div className="absolute top-[-24px] right-[-24px] w-12 h-12 bg-red-50 dark:bg-red-900/10 rotate-45" />
            </div>

            {/* FORM HEADER */}
            <div className="p-8 md:p-10 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center justify-between mb-8">
                <div className="h-12 w-12 border border-red-100 dark:border-red-900/30 flex items-center justify-center bg-red-50 dark:bg-red-900/10">
                  <ShieldAlert className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex flex-col items-end">
                   <span className="font-mono text-[9px] text-slate-400 uppercase tracking-tighter">NODE_ID</span>
                   <span className="font-mono text-[11px] font-bold text-red-600 uppercase tracking-widest">ADM_AUTH_00</span>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white font-heading tracking-tighter uppercase mb-2">Admin</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[280px]">
                Authorized administrative terminal. Credentials strictly audited per access cycle.
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
                  <label htmlFor="email" className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">Admin_Identifier</label>
                  <div className="relative group/input">
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="COORDINATOR@TUPV.EDU.PH"
                      className="w-full h-14 pl-6 pr-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-sm font-bold font-mono outline-none focus:border-red-600 dark:focus:border-red-600 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 uppercase"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] bg-red-600 scale-x-0 group-focus-within/input:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">Encrypted_Passkey</label>
                  <div className="relative group/input">
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-14 pl-6 pr-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-sm font-bold font-mono outline-none focus:border-red-600 dark:focus:border-red-600 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] bg-red-600 scale-x-0 group-focus-within/input:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group/btn relative w-full h-14 bg-red-600 text-white font-bold tracking-[0.1em] transition-all flex items-center justify-between px-6 disabled:opacity-50 font-heading overflow-hidden"
                >
                  <span className="relative z-10 text-sm uppercase italic">Authorize_Node</span>
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin relative z-10" />
                  ) : (
                    <Fingerprint className="h-4 w-4 relative z-10 group-hover/btn:scale-110 transition-transform" />
                  )}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col items-center gap-4 text-center">
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-red-600" />
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">SYSTEM_AUDIT_ACTIVE</span>
                 </div>
                 <p className="font-mono text-[8px] text-slate-500 uppercase leading-relaxed max-w-[200px]">
                    Contact University SysAdmin for credential recovery or access log audits.
                 </p>
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
