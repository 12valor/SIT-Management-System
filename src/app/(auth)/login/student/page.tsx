"use client";
 

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

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
    <div className={`${poppins.variable} font-poppins flex-1 flex flex-col pt-32 pb-12 bg-slate-50/50 dark:bg-[#050505]`}>
      
      {/* LOGO */}
      <div className="fixed top-12 left-12 z-20">
        <Link href="/" className="flex items-center gap-4">
          <Image 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            width={40}
            height={40}
            className="h-10 w-auto grayscale dark:grayscale-0 dark:logo-red-filter" 
          />
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[440px] w-full"
        >
          <div className="bg-white dark:bg-[#0a0a0a] border border-slate-100 dark:border-white/5 p-12 md:p-20 rounded-sm shadow-[40px_40px_80px_-20px_rgba(0,0,0,0.05)] dark:shadow-none">
            
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight mb-16">
              Student Login
            </h1>

            <form onSubmit={handleLogin} className="space-y-12">
              {error && (
                <p className="text-[11px] font-bold text-primary uppercase tracking-tight">{error}</p>
              )}

              <div className="space-y-10">
                <div className="space-y-3">
                  <label htmlFor="email" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block pl-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 px-4 bg-transparent border border-slate-100 dark:border-white/5 rounded-sm text-[15px] font-medium outline-none focus:border-primary transition-all placeholder:text-slate-200"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="password" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block pl-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 px-4 bg-transparent border border-slate-100 dark:border-white/5 rounded-sm text-[15px] font-medium outline-none focus:border-primary transition-all placeholder:text-slate-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 bg-slate-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-[0.2em] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all flex items-center justify-center disabled:opacity-50 text-[11px]"
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}






