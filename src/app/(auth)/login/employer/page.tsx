"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Building2, Mail, Lock, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

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
        setError("Invalid institutional credentials or verification required.");
        setIsLoading(false);
        return;
      }
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      const role = session?.user?.role;
      if (role === "EMPLOYER") router.push("/employer/dashboard");
      else router.push("/");
    } catch {
      setError("An unexpected system error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 relative overflow-x-hidden pt-24 lg:pt-32 pb-12">
      {/* Institutional Decoration: Subtlety */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image 
          src="/images/auth/gate.png" 
          alt="University Campus" 
          fill
          className="object-cover opacity-10 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-slate-100/50" />
      </div>

      {/* Institutional Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-30 w-full bg-white border-b border-slate-200 py-4 px-6 md:px-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/login" className="flex items-center gap-4 group">
            <img 
              src="/Technological_University_of_the_Philippines_Seal.svg.png" 
              alt="TUP Seal" 
              className="h-10 w-auto object-contain" 
            />
            <div className="flex flex-col items-start leading-tight">
               <h1 className="text-sm font-black text-slate-900 tracking-tight font-heading uppercase group-hover:text-primary transition-colors">TUP-Visayas</h1>
               <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] font-sans">Supervised Industrial Training</span>
            </div>
          </Link>
          <Link href="/login" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors font-heading flex items-center gap-2 group">
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> Role Selection
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full">
          {/* Main Corporate Access Form */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/30">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-900">
                    <Building2 className="h-6 w-6" />
                 </div>
                 <div className="flex-1">
                    <h2 className="text-xl font-black tracking-tight text-slate-900 font-heading uppercase">Corporate Access</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-sans">Industry Partner Terminal</p>
                 </div>
              </div>
              <p className="text-xs text-slate-500 font-medium font-sans leading-relaxed">
                Log in to the Industry Partner portal to manage trainee placements and evaluate student performance under the TUP-V SIT program.
              </p>
            </div>

            <div className="p-8 md:p-10">
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-lg uppercase tracking-wider font-heading"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading ml-1">Corporate Identifier (Email)</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="corporate@company.com"
                      className="w-full h-12 pl-12 pr-4 rounded-lg border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading">Security Passkey</label>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-12 pl-12 pr-4 rounded-lg border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-slate-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-primary transition-all flex items-center justify-center gap-3 disabled:opacity-50 font-heading group"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Verify and Enter Portal
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Industry Assistance</p>
                 <Link href="/signup/employer" className="text-[10px] font-black text-slate-600 hover:text-primary uppercase tracking-widest transition-colors font-heading underline decoration-slate-200 underline-offset-4">
                    Partner Registration Registry
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
