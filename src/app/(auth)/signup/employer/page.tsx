"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { registerEmployer, getCompanies } from "./actions";
import { cn } from "@/lib/utils";
import { AuthStatusModal, type AuthStatus } from "@/components/AuthStatusModal";
import { motion } from "framer-motion";

export default function EmployerSignupPage() {
  const [error, setError] = useState("");
  const [authStatus, setAuthStatus] = useState<AuthStatus>("idle");
  const [authMessage, setAuthMessage] = useState("");
  const [companyMode, setCompanyMode] = useState<"existing" | "new">("existing");
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCompanies() {
      const data = await getCompanies();
      setCompanies(data);
    }
    fetchCompanies();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAuthStatus("loading");
    setAuthMessage("Establishing institutional partnership...");
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("companyMode", companyMode);
    
    const result = await registerEmployer(formData);

    if (result.success) {
      setAuthStatus("success");
      setAuthMessage("Partnership request submitted. Redirecting to terminal...");
      setTimeout(() => router.push("/login/employer"), 2000);
    } else {
      setAuthStatus("error");
      setAuthMessage(result.error || "System encountered a partnership conflict.");
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
            Partner Onboarding
          </span>
          <h1 className="text-4xl font-serif font-medium text-slate-900 dark:text-white mb-4">
            Employer Registration
          </h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-serif">
            Collaborate with TUP-V to manage supervised industrial training and acquire emerging technical talent.
          </p>
        </header>

        <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-10 rounded-2xl shadow-sm">
          <div className="bg-slate-50 dark:bg-white/5 p-1 rounded-xl flex gap-1 border border-slate-200 dark:border-white/10 mb-8">
            <button
              type="button"
              onClick={() => setCompanyMode("existing")}
              className={cn(
                "flex-1 h-10 rounded-lg text-xs font-medium transition-all font-serif",
                companyMode === "existing" ? "bg-white dark:bg-white/10 text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              Existing Partner
            </button>
            <button
              type="button"
              onClick={() => setCompanyMode("new")}
              className={cn(
                "flex-1 h-10 rounded-lg text-xs font-medium transition-all font-serif",
                companyMode === "new" ? "bg-white dark:bg-white/10 text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              New Company
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 text-xs font-medium text-red-600 bg-red-50/50 border border-red-100 rounded-xl font-serif">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif">
                    Full Name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif">
                    Corporate Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {companyMode === "existing" ? (
                <div className="space-y-2 animate-in-fade">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif">
                    Associated Company
                  </label>
                  <select
                    name="companyId"
                    required
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white appearance-none"
                  >
                    <option value="">Select partner company</option>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6 animate-in-slide-up">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif">
                      Company Name
                    </label>
                    <input
                      name="newCompanyName"
                      required={companyMode === "new"}
                      placeholder="TechCorp Solutions Inc."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif">
                      Industry Sector
                    </label>
                    <input
                      name="industry"
                      required={companyMode === "new"}
                      placeholder="Manufacturing / IT"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

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
            </div>

            <button
              type="submit"
              disabled={authStatus === "loading"}
              className="group relative w-full flex items-center justify-center h-12 bg-primary text-white font-medium rounded-xl overflow-hidden transition-transform active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-50 mt-4 font-serif"
            >
              <span className="relative z-10 flex items-center gap-2">
                {authStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Establish Partnership"}
              </span>
              <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex flex-col gap-4 text-center">
             <Link 
               href="/login/employer" 
               className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-serif"
             >
               ← Back to Portal Access
             </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
