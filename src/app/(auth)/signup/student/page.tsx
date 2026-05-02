"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { registerStudent } from "./actions";
import { AuthStatusModal, type AuthStatus } from "@/components/AuthStatusModal";
import { motion } from "framer-motion";

export default function StudentSignupPage() {
  const [error, setError] = useState("");
  const [authStatus, setAuthStatus] = useState<AuthStatus>("idle");
  const [authMessage, setAuthMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAuthStatus("loading");
    setAuthMessage("Initializing institutional enrollment...");
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await registerStudent(formData);

    if (result.success) {
      setAuthStatus("success");
      setAuthMessage("Registration submitted. Redirecting to terminal...");
      setTimeout(() => router.push("/login/student"), 2000);
    } else {
      setAuthStatus("error");
      setAuthMessage(result.error || "System encountered an enrollment conflict.");
      setError(result.error || "Something went wrong");
    }
  }

  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-32 pb-24 px-6 transition-colors duration-300">
      <AuthStatusModal 
        status={authStatus} 
        message={authMessage} 
        onClose={() => setAuthStatus("idle")} 
      />
      
      <motion.div 
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="mb-12 text-center">
          <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
            Institutional Intake
          </span>
          <h1 className="text-4xl font-serif font-medium text-slate-900 dark:text-white mb-4">
            Student Registration
          </h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-serif">
            Create your platform access credentials to begin your industrial training journey.
          </p>
        </header>

        <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-10 rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 text-xs font-medium text-red-600 bg-red-50/50 border border-red-100 rounded-xl font-serif">
                {error}
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Juan Dela Cruz"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif">
                  Course / Program
                </label>
                <select
                  name="course"
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white appearance-none"
                >
                  <option value="">Select program</option>
                  <option value="BS in Computer Engineering">BS in Computer Engineering</option>
                  <option value="BS in Electronics Engineering">BS in Electronics Engineering</option>
                  <option value="BS in Mechanical Engineering">BS in Mechanical Engineering</option>
                  <option value="BS in Information Technology">BS in Information Technology</option>
                  <option value="BS in Chemical Engineering">BS in Chemical Engineering</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif">
                Institutional Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="id@tupv.edu.ph"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif">
                Security Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={authStatus === "loading"}
              className="group relative w-full flex items-center justify-center h-12 bg-primary text-white font-medium rounded-xl overflow-hidden transition-transform active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-50 mt-4 font-serif"
            >
              <span className="relative z-10 flex items-center gap-2">
                {authStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enroll in Platform"}
              </span>
              <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex flex-col gap-4 text-center">
             <Link 
               href="/login/student" 
               className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-serif"
             >
               ← Back to Portal Access
             </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}v>
    </div>
  </div>
  );
}
