"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ShieldAlert, Mail, Lock, Loader2, ArrowLeft, Command } from "lucide-react";
import Image from "next/image";

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
        setError("Invalid administrative credentials.");
        setIsLoading(false);
        return;
      }
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      const role = session?.user?.role;
      if (role === "COORDINATOR") router.push("/coordinator/dashboard");
      else {
        setError("Restricted Access: Coordinator privilege required.");
        setIsLoading(false);
      }
    } catch {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Left side - Visual Experience (Light Edition) */}
      <div className="relative hidden lg:flex lg:w-3/5 xl:w-[60%] bg-slate-50 flex-col justify-between p-12 overflow-hidden border-r border-slate-200 h-full">
        <div className="absolute inset-0 pointer-events-none">
          <Image 
            src="/images/auth/coordinator.png" 
            alt="Administrative Office" 
            fill
            className="object-cover transition-opacity duration-700"
            style={{ opacity: 0.45, filter: 'grayscale(100%) brightness(0.95)' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 flex items-center">
          <img src="/Technological_University_of_the_Philippines_Seal.svg.png" alt="TUP Seal" className="h-12 w-auto object-contain" />
        </div>

        <div className="relative z-10 max-w-2xl mt-12 px-2">
          <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.5em] mb-6 font-heading">Authority Terminal</p>
          <h1 className="text-7xl font-bold text-slate-900 tracking-tighter leading-[0.9] mb-10 font-heading">
            Institutional <br />
            Control <br /> 
            <span className="text-amber-600 italic">Command.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md font-sans">
            Centralized administrative hub for TUP-Visayas. Monitor institutional compliance, manage registries, and secure academic integrity.
          </p>
        </div>

        <div className="relative z-10">
           <div className="inline-flex items-center gap-4 px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading">Restricted Access Node</p>
           </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-20 bg-white relative z-20">
        <div className="max-w-md w-full lg:ml-12 xl:ml-20">
          <div className="mb-10">
            <Link href="/login" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors mb-10 font-heading">
              <ArrowLeft className="h-3 w-3" /> Back to role selection
            </Link>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-3 font-heading uppercase">Admin Login</h2>
            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
              <p className="text-xs text-amber-800 font-medium leading-relaxed font-sans">
                Security Notice: All administrative logins are strictly audited. Unauthorized access attempts will be logged and reported.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl uppercase tracking-wider font-heading">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading">Admin Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-amber-600 transition-colors" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tupv.edu.ph"
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-600/5 transition-all text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading">Access Key</label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-amber-600 transition-colors" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-600/5 transition-all text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-amber-600 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 font-heading"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Authorize & Sign In"}
            </button>
          </form>

          <footer className="mt-12 pt-8 border-t border-border">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-relaxed">
              TUP-V SIT Management Office <br /> Technical University of the Philippines Visayas
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
