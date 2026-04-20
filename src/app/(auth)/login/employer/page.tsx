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
        setError("Unauthorized or pending MOU verification.");
        setIsLoading(false);
        return;
      }
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      const role = session?.user?.role;
      if (role === "EMPLOYER") router.push("/employer/dashboard");
      else if (role) router.push(`/${role.toLowerCase()}/dashboard`);
      else router.push("/");
    } catch {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start relative overflow-y-auto bg-slate-900 py-12 md:py-20 lg:py-24">
      {/* Fixed Dynamic Background with Maroon Overlay */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/images/auth/gate.png" 
          alt="University Campus" 
          fill
          className="object-cover opacity-25 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
      </div>

      <div className="max-w-md w-full relative z-10 px-6">
        {/* TUPv Branding Hub */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <img 
              src="/Technological_University_of_the_Philippines_Seal.svg.png" 
              alt="TUP Seal" 
              className="h-16 w-auto object-contain drop-shadow-2xl" 
            />
            <div className="h-16 w-px bg-white/20" />
            <div className="flex flex-col items-start text-left">
               <h1 className="text-3xl font-black text-white tracking-tighter leading-none font-heading uppercase">TUPv</h1>
               <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mt-2 font-sans">SIT Platform</span>
            </div>
          </motion.div>
        </div>

        {/* Interaction Panel */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/50 border border-white/10 backdrop-blur-sm">
          <div className="mb-10 text-center md:text-left">
            <Link href="/login" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mb-6 font-heading group">
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> Back to role selection
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2 font-heading uppercase">Employer Login</h2>
            <p className="text-sm text-slate-500 font-medium font-sans">Institutional linkage access for corporate partners.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl uppercase tracking-wider font-heading"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading ml-1">Corporate Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-medium font-sans outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 shadow-inner shadow-slate-100/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading">Password</label>
                <Link href="#" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest font-heading underline-offset-4">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-medium font-sans outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 shadow-inner shadow-slate-100/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 font-heading group"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Verify & Sign In
                  <ArrowLeft className="h-3 w-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <footer className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-heading">New partner?</span>
            <Link href="/signup/employer" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline underline-offset-4 font-heading">
              Apply for Partnership
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
