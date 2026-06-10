"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { registerEmployer, getCompanies, checkAvailability } from "./actions";
import { cn } from "@/lib/utils";
import { AuthStatusModal, type AuthStatus } from "@/components/AuthStatusModal";
import { motion, AnimatePresence } from "framer-motion";

export default function EmployerSignupPage() {
  const [error, setError] = useState("");
  const [authStatus, setAuthStatus] = useState<AuthStatus>("idle");
  const [authMessage, setAuthMessage] = useState("");
  const [companyMode, setCompanyMode] = useState<"existing" | "new">("existing");
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [locationLines, setLocationLines] = useState<string[]>([]);
  const [emailStatus, setEmailStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [companyStatus, setCompanyStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [generatedEmail, setGeneratedEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCompanies() {
      const data = await getCompanies();
      setCompanies(data);
    }
    fetchCompanies();
  }, []);

  const checkUserEmail = async (email: string) => {
    if (!email || !email.includes("@")) {
      setEmailStatus("idle");
      return;
    }
    setEmailStatus("checking");
    const result = await checkAvailability("user", email);
    setEmailStatus(result.available ? "available" : "taken");
  };

  const checkCompanyName = async (name: string) => {
    if (!name || name.length < 3) {
      setCompanyStatus("idle");
      setGeneratedEmail(null);
      return;
    }
    setCompanyStatus("checking");
    const result = await checkAvailability("company", name);
    setCompanyStatus(result.available ? "available" : "taken");
    setGeneratedEmail(result.generatedEmail || null);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAuthStatus("loading");
    setAuthMessage("Establishing institutional partnership...");
    setError("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setAuthStatus("error");
      setAuthMessage("Security verification failed: Passwords do not match.");
      setError("Passwords do not match");
      return;
    }

    formData.append("companyMode", companyMode);
    
    // Send Base64 strings instead of raw files to ensure portability on Vercel
    if (logoPreview) formData.set("logo", logoPreview);
    if (bannerPreview) formData.set("banner", bannerPreview);
    
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "banner") => {
    const file = e.target.files?.[0];
    if (file) {
      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_SIZE) {
        setAuthStatus("error");
        setAuthMessage(`The selected ${type} exceeds the 2MB industrial limit. Please optimize the file.`);
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "logo") setLogoPreview(reader.result as string);
        else setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-32 pb-24 px-6 transition-colors duration-300">
      <AuthStatusModal 
        status={authStatus} 
        message={authMessage} 
        onClose={() => setAuthStatus("idle")} 
      />
      
      <motion.div 
        className="max-w-2xl mx-auto"
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
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-serif flex items-center h-4">
                    Full Name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="w-full h-11 px-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-[13px] text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-serif flex items-center justify-between h-4">
                    Corporate Email
                    <AnimatePresence>
                      {emailStatus !== "idle" && emailStatus !== "checking" && (
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                            emailStatus === "available" ? "text-green-600" : "text-red-600"
                          )}
                        >
                          <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", emailStatus === "available" ? "bg-green-500" : "bg-red-500")} />
                          {emailStatus === "available" ? "Available" : "Taken"}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. name@corporate.com"
                      onChange={() => {
                        setEmailStatus("idle");
                      }}
                      onBlur={(e) => checkUserEmail(e.target.value)}
                      className={cn(
                        "w-full h-11 px-4 bg-slate-50 dark:bg-white/5 border rounded-xl outline-none transition-all text-[13px] text-slate-900 dark:text-white",
                        emailStatus === "available" ? "border-green-500/50 focus:ring-green-500/20" : 
                        emailStatus === "taken" ? "border-red-500/50 focus:ring-red-500/20" : 
                        "border-slate-200 dark:border-white/10 focus:border-primary/50 focus:ring-primary/20"
                      )}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {emailStatus === "checking" && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                    </div>
                  </div>
                </div>
              </div>

              {companyMode === "existing" ? (
                <div className="space-y-1.5 animate-in-fade">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-serif flex items-center h-4">
                    Associated Company
                  </label>
                  <div className="relative group/select">
                    <select
                      name="companyId"
                      required
                      className="w-full h-11 px-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-[13px] text-slate-900 dark:text-white appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Select partner company</option>
                      {companies.map(c => (
                        <option key={c.id} value={c.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{c.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within/select:text-primary transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6 animate-in-slide-up">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-serif flex items-center justify-between h-4">
                      Company Name
                      <AnimatePresence>
                        {companyStatus !== "idle" && companyStatus !== "checking" && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                              companyStatus === "available" ? "text-green-600" : "text-red-600"
                            )}
                          >
                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", companyStatus === "available" ? "bg-green-500" : "bg-red-500")} />
                            {companyStatus === "available" ? "Available" : "Registered"}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </label>
                    <div className="relative">
                      <input
                        name="newCompanyName"
                        required={companyMode === "new"}
                        placeholder="Official registered company name"
                        onChange={() => {
                          setCompanyStatus("idle");
                        }}
                        onBlur={(e) => checkCompanyName(e.target.value)}
                        className={cn(
                          "w-full h-11 px-4 bg-slate-50 dark:bg-white/5 border rounded-xl outline-none transition-all text-[13px] text-slate-900 dark:text-white",
                          companyStatus === "available" ? "border-green-500/50 focus:ring-green-500/20" : 
                          companyStatus === "taken" ? "border-red-500/50 focus:ring-red-500/20" : 
                          "border-slate-200 dark:border-white/10 focus:border-primary/50 focus:ring-primary/20"
                        )}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {companyStatus === "checking" && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                      </div>
                    </div>
                    {generatedEmail && companyStatus === "available" && (
                      <p className="mt-1.5 text-[9px] text-slate-400 font-serif italic">
                        System Identity: <span className="text-primary/70">{generatedEmail}</span>
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-serif flex items-center justify-between h-4">
                      Industry Sector
                    </label>
                    <input
                      name="industry"
                      required={companyMode === "new"}
                      placeholder="e.g. Manufacturing, Technology, IT"
                      className="w-full h-11 px-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-[13px] text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-serif flex items-center justify-between h-4">
                      Official Website
                      <span className="text-[9px] text-slate-400 font-normal lowercase tracking-normal font-serif">(Institutional Presence)</span>
                    </label>
                    <input
                      name="websiteUrl"
                      type="url"
                      placeholder="https://yourcompany.com"
                      className="w-full h-11 px-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-[13px] text-slate-900 dark:text-white"
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-serif flex items-center h-4">
                      Company Description
                    </label>
                    <textarea
                      name="description"
                      required={companyMode === "new"}
                      placeholder="Describe the company's core operations, specialization, and student training environment..."
                      className="w-full h-32 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white resize-none font-serif text-sm"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5 relative group/location">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-serif flex items-center h-4">
                      Corporate Locations
                    </label>
                    <textarea
                      name="location"
                      required={companyMode === "new"}
                      placeholder="Enter each location on a new line..."
                      className="w-full h-32 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white resize-none font-serif text-sm"
                      onChange={(e) => {
                        const lines = e.target.value.split('\n').filter(l => l.trim() !== "");
                        setLocationLines(lines);
                      }}
                    />
                    
                    {/* Floating Location Manifest */}
                    <AnimatePresence>
                      {locationLines.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="absolute -right-72 top-0 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-2xl shadow-primary/10 hidden xl:block"
                        >
                          <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Location Manifest
                          </h4>
                          <div className="space-y-3">
                            <ul className="space-y-3">
                              {locationLines.map((line, idx) => (
                                <motion.li 
                                  key={idx}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-3 group"
                                >
                                  <div className="mt-1 w-4 h-4 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-[8px] font-bold text-slate-400 border border-slate-200 dark:border-white/10 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                                    {idx + 1}
                                  </div>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-serif leading-relaxed">
                                    {line}
                                  </p>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <p className="text-[10px] text-slate-400 italic">Press Enter for each additional branch or office location.</p>
                  </div>

                  {/* Logo and Banner Upload */}
                  <div className="md:col-span-2 space-y-4 pt-2">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif flex items-center gap-2">
                          Company Logo
                          <span className="text-[10px] text-slate-400 font-normal lowercase tracking-normal">(Optional)</span>
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-xl bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 overflow-hidden flex items-center justify-center group/logo">
                            {logoPreview ? (
                              <Image 
                                src={logoPreview} 
                                alt="Logo preview" 
                                fill 
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="text-slate-400 group-hover/logo:text-primary transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                            <input
                              type="file"
                              name="logo"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, "logo")}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-[11px] text-slate-500 leading-relaxed font-serif">
                              Select a square PNG or JPG file. Max size 2MB.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-serif flex items-center gap-2">
                          Company Banner
                          <span className="text-[10px] text-slate-400 font-normal lowercase tracking-normal">(Optional)</span>
                        </label>
                        <div className="flex flex-col gap-3">
                          <div className="relative w-full h-16 rounded-xl bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 overflow-hidden flex items-center justify-center group/banner">
                            {bannerPreview ? (
                              <Image 
                                src={bannerPreview} 
                                alt="Banner preview" 
                                fill 
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="text-slate-400 group-hover/banner:text-primary transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                            <input
                              type="file"
                              name="banner"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, "banner")}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-serif">
                            High-resolution banner for your profile. 1200x400 recommended.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-serif flex items-center h-4">
                    Security Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="Create a secure password"
                    className="w-full h-11 px-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-[13px] text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-serif flex items-center h-4">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="Re-enter your password"
                    className="w-full h-11 px-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-[13px] text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={authStatus === "loading" || emailStatus === "taken" || (companyMode === "new" && companyStatus === "taken")}
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
