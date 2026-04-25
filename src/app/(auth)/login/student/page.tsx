"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail, Lock, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Montserrat, Poppins } from "next/font/google";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <div className={`${montserrat.variable} ${poppins.variable} font-poppins flex-1 flex flex-col pt-32 pb-12 bg-slate-50/50 dark:bg-[#050505]`}>
      
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
            
            <h1 className="text-4xl font-black font-montserrat text-slate-900 dark:text-white uppercase tracking-tighter mb-16">
              Student Login
            </h1>

            <form onSubmit={handleLogin} className="space-y-12">
              {error && (
                <p className="text-[11px] font-bold text-primary uppercase tracking-tight">{error}</p>
              )}

              <div className="space-y-10">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full h-14 bg-transparent border-b-2 border-slate-100 dark:border-white/5 text-[16px] font-medium outline-none focus:border-slate-900 dark:focus:border-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800"
                />

                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-14 bg-transparent border-b-2 border-slate-100 dark:border-white/5 text-[16px] font-medium outline-none focus:border-slate-900 dark:focus:border-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 bg-slate-900 dark:bg-white text-white dark:text-black font-black font-montserrat uppercase tracking-[0.3em] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all flex items-center justify-center disabled:opacity-50 text-[12px]"
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





