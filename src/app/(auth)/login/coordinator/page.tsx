"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ShieldAlert, Mail, Lock, Loader2, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
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
        setError("Invalid administrative credentials. Please check your access level.");
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
      setError("A network error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-24 pb-12 relative overflow-hidden">
      
      {/* INSTITUTIONAL HEADER */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <Link href="/login" className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
          <Image 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            width={32}
            height={32}
            className="h-8 w-auto grayscale brightness-200" 
          />
          <div className="flex flex-col leading-none">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">TUP-Visayas</span>
             <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-widest">Admin Portal</span>
          </div>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-[420px] w-full">
          
          <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-2xl shadow-red-900/5">
            {/* FORM HEADER */}
            <div className="mb-10 text-center">
              <div className="h-14 w-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mx-auto mb-6">
                <ShieldAlert className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 font-heading tracking-tight uppercase mb-2">Admin</h2>
              <p className="text-sm text-slate-500 font-medium">
                Authorized administrative terminal. Credentials strictly audited per access cycle.
              </p>
            </div>

            {/* FORM BODY */}
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-[11px] font-bold text-red-600 uppercase tracking-tight text-center">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Admin Identifier</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-red-600 transition-colors" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="coordinator@tupv.edu.ph"
                    className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium outline-none focus:border-red-400 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Secure Passkey</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-red-600 transition-colors" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium outline-none focus:border-red-400 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-red-600 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[11px]"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Authorize Entry
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-3 text-center">
               <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Audit Log</span>
               </div>
               <p className="text-[10px] font-medium text-slate-400 max-w-[200px]">
                  Contact System Admin for credential recovery or access audits.
               </p>
            </div>
          </div>

          <Link href="/login" className="mt-8 flex items-center justify-center gap-2 group opacity-50 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Role Selection</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
