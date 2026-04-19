"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Loader2, Mail, Lock, User, CheckCircle2, ArrowLeft, Briefcase, Factory } from "lucide-react";
import { registerEmployer, getCompanies } from "./actions";
import { cn } from "@/lib/utils";

export default function EmployerSignupPage() {
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("companyMode", companyMode);
    
    const result = await registerEmployer(formData);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } else {
      setError(result.error || "Something went wrong");
    }
    setIsLoading(false);
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-6 py-12 animate-in-fade">
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Partnership Requested</h1>
        <p className="text-muted-foreground font-medium max-w-sm mx-auto">
          Your industrial partner registration has been recorded. The **SIT Coordinator** will review your credentials and company details.
        </p>
        <div className="pt-8">
           <Link href="/login" className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
             Return to Login
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in-fade pb-12">
      <Link href="/login" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-3 w-3" /> Back to Login
      </Link>

      <div className="space-y-2 text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-foreground">Employer Registration</h1>
        <p className="text-sm font-medium text-muted-foreground">
          Onboard your company to the SIT Partner Network
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 text-sm font-bold text-destructive bg-destructive/10 rounded-xl border border-destructive/20 text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
           <div className="flex gap-2 p-1 bg-muted rounded-xl">
              <button
                type="button"
                onClick={() => setCompanyMode("existing")}
                className={cn(
                  "flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  companyMode === "existing" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Existing Partner
              </button>
              <button
                type="button"
                onClick={() => setCompanyMode("new")}
                className={cn(
                  "flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  companyMode === "new" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                New Company
              </button>
           </div>
        </div>
        
        <div className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <input
                    name="name"
                    className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium"
                    placeholder="Jane Smith"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Institutional Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <input
                    name="email"
                    type="email"
                    className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium"
                    placeholder="jane@company.com"
                    required
                  />
                </div>
              </div>
           </div>

           {companyMode === "existing" ? (
             <div className="space-y-1.5">
               <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Associated Company</label>
               <div className="relative">
                 <Briefcase className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                 <select
                   name="companyId"
                   className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium appearance-none"
                   required
                 >
                   <option value="">Select partner company</option>
                   {companies.map(c => (
                     <option key={c.id} value={c.id}>{c.name}</option>
                   ))}
                 </select>
               </div>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in-slide-up">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Company Name</label>
                  <div className="relative">
                    <Factory className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                      name="newCompanyName"
                      className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium placeholder:text-muted-foreground/50"
                      placeholder="TechCorp Solutions Inc."
                      required={companyMode === "new"}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Industry Sector</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                      name="industry"
                      className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium placeholder:text-muted-foreground/50"
                      placeholder="Manufacturing / IT"
                      required={companyMode === "new"}
                    />
                  </div>
                </div>
             </div>
           )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <input
                  name="password"
                  type="password"
                  className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex h-14 w-full items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-primary-foreground shadow-2xl shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-70 active:scale-95"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Register Partnership Account
            </>
          )}
        </button>
      </form>
    </div>
  );
}
