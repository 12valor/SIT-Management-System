"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Loader2, Mail, Lock, User, CheckCircle2, ArrowLeft, Briefcase, Factory } from "lucide-react";
import { registerEmployer, getCompanies } from "./actions";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
      setTimeout(() => router.push("/login/employer"), 3000);
    } else {
      setError(result.error || "Something went wrong");
    }
    setIsLoading(false);
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-6">
        <div className="text-center space-y-6 max-w-sm animate-in-fade">
          <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-blue-50/50">
            <CheckCircle2 className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 font-heading lowercase uppercase">Success!</h1>
          <p className="text-slate-600 font-medium font-sans">
            Your partnership request has been submitted. The <span className="text-primary font-bold">SIT Coordinator</span> will review your credentials and company details.
          </p>
          <div className="pt-8">
             <Link href="/login/employer" className="inline-flex h-14 items-center justify-center px-8 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
               Return to Login
             </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-white">
      {/* Left side - Institutional Branding */}
      <div className="relative hidden lg:flex lg:w-2/5 xl:w-[45%] bg-slate-50 flex-col justify-between p-12 overflow-hidden border-r border-slate-200 min-w-0">
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image 
            src="/images/auth/employer.png" 
            alt="Corporate Environment" 
            fill
            className="object-cover transition-opacity duration-1000"
            style={{ opacity: 0.4, filter: 'grayscale(100%) brightness(0.95)' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 flex items-center">
          <img src="/Technological_University_of_the_Philippines_Seal.svg.png" alt="TUP Seal" className="h-12 w-auto object-contain" />
        </div>

        <div className="relative z-10 max-w-lg mt-12 px-2">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-6 font-heading">Partner Intake</p>
          <h1 className="text-6xl font-bold text-slate-900 tracking-tighter leading-[0.9] mb-10 font-heading">
            Secure <br />Future <br /> 
            <span className="text-primary italic">Talent.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed font-sans">
            Onboard your organization to the TUP-Visayas Supervised Industrial Training network and discover the next generation of engineering professionals.
          </p>
        </div>

        <div className="relative z-10">
           <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-heading">Network Node</span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-tight font-sans">UIPEN Industrial</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-heading">Protocol</span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-tight font-sans">TUP-V Standard</span>
              </div>
           </div>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-24 bg-white relative z-20 overflow-y-auto">
        <div className="max-w-md mx-auto w-full lg:mx-0">
          <div className="mb-8 text-left">
            <Link href="/login/employer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mb-10 font-heading group">
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> Back to Login
            </Link>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-3 font-heading uppercase">Employer Registration</h2>
            <p className="text-base text-slate-500 font-medium font-sans">Partner with TUP-V for industrial training.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl uppercase tracking-wider font-heading">
                {error}
              </div>
            )}

            <div className="bg-slate-50 p-1 rounded-xl flex gap-1 border border-slate-100 mb-6">
              <button
                type="button"
                onClick={() => setCompanyMode("existing")}
                className={cn(
                  "flex-1 h-12 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all font-heading",
                  companyMode === "existing" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                Existing Partner
              </button>
              <button
                type="button"
                onClick={() => setCompanyMode("new")}
                className={cn(
                  "flex-1 h-12 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all font-heading",
                  companyMode === "new" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                New Company
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <input
                    name="name"
                    required
                    placeholder="Jane Smith"
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading ml-1">Institutional Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900"
                  />
                </div>
              </div>

              {companyMode === "existing" ? (
                <div className="space-y-2 animate-in-fade">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading ml-1">Associated Company</label>
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <select
                      name="companyId"
                      required
                      className="w-full h-14 pl-12 pr-10 rounded-xl border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 appearance-none"
                    >
                      <option value="">Select partner company</option>
                      {companies.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in-slide-up">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading ml-1">Company Name</label>
                    <div className="relative group">
                      <Factory className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                      <input
                        name="newCompanyName"
                        required={companyMode === "new"}
                        placeholder="TechCorp Solutions Inc."
                        className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading ml-1">Industry Sector</label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                      <input
                        name="industry"
                        required={companyMode === "new"}
                        placeholder="Manufacturing / IT"
                        className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading ml-1">Security Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 font-heading mt-6 active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Establish Partnership"
              )}
            </button>
          </form>

          <footer className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-heading">Already Enrolled?</span>
            <Link href="/login/employer" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline underline-offset-4 font-heading">
              Partner Access
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
