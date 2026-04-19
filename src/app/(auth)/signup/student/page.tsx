"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Loader2, Mail, Lock, BookOpen, CheckCircle2, ArrowLeft } from "lucide-react";
import { registerStudent } from "./actions";
import Image from "next/image";

export default function StudentSignupPage() {
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await registerStudent(formData);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => router.push("/login/student"), 3000);
    } else {
      setError(result.error || "Something went wrong");
    }
    setIsLoading(false);
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-6">
        <div className="text-center space-y-6 max-w-sm animate-in-fade">
          <div className="mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50/50">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 font-heading">Success!</h1>
          <p className="text-slate-600 font-medium font-sans">
            Your registration has been submitted. The <span className="text-primary font-bold">SIT Coordinator</span> will review and approve your account shortly.
          </p>
          <div className="pt-8">
             <Link href="/login/student" className="inline-flex h-14 items-center justify-center px-8 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
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
            src="/images/auth/student.png" 
            alt="Academic Environment" 
            fill
            className="object-cover transition-opacity duration-1000"
            style={{ opacity: 0.4, filter: 'grayscale(100%) brightness(0.9)' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 flex items-center">
          <img src="/Technological_University_of_the_Philippines_Seal.svg.png" alt="TUP Seal" className="h-12 w-auto object-contain" />
        </div>

        <div className="relative z-10 max-w-lg mt-12 px-2">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-6 font-heading">Onboarding Manifest</p>
          <h1 className="text-6xl font-bold text-slate-900 tracking-tighter leading-[0.9] mb-10 font-heading">
            Your First <br />Step to <br /> 
            <span className="text-primary italic">Excellence.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed font-sans">
            Securely register your academic credentials to join the TUP-Visayas Supervised Industrial Training network.
          </p>
        </div>

        <div className="relative z-10">
           <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-heading">Authorized By</span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-tight font-sans">TUP-V Registry</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-heading">Network</span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-tight font-sans">UIPEN Strategic</span>
              </div>
           </div>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-24 bg-white relative z-20 overflow-y-auto">
        <div className="max-w-md mx-auto w-full lg:mx-0">
          <div className="mb-10 text-left">
            <Link href="/login/student" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mb-10 font-heading group">
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> Back to Login
            </Link>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-3 font-heading uppercase">Student Registration</h2>
            <p className="text-base text-slate-500 font-medium font-sans">Create your platform access credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl uppercase tracking-wider font-heading">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Juan Dela Cruz"
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading ml-1">Course / Program</label>
              <div className="relative group">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                <select
                  name="course"
                  required
                  className="w-full h-14 pl-12 pr-10 rounded-xl border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 appearance-none"
                >
                  <option value="">Select your course</option>
                  <option value="BS in Computer Engineering">BS in Computer Engineering</option>
                  <option value="BS in Electronics Engineering">BS in Electronics Engineering</option>
                  <option value="BS in Mechanical Engineering">BS in Mechanical Engineering</option>
                  <option value="BS in Information Technology">BS in Information Technology</option>
                  <option value="BS in Chemical Engineering">BS in Chemical Engineering</option>
                </select>
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
                  placeholder="id@tupv.edu.ph"
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-medium font-sans outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900"
                />
              </div>
            </div>

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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 font-heading mt-4 active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Enroll in Platform"
              )}
            </button>
          </form>

          <footer className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-heading">Existing User?</span>
            <Link href="/login/student" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline underline-offset-4 font-heading">
              Portal Access
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
