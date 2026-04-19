"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Loader2, Mail, Lock, BookOpen, CheckCircle2, ArrowLeft } from "lucide-react";
import { registerStudent } from "./actions";

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
        <h1 className="text-3xl font-black tracking-tight text-foreground">Registration Submitted</h1>
        <p className="text-muted-foreground font-medium max-w-sm mx-auto">
          Your account has been created successfully. Please wait for the **SIT Coordinator** to approve your access.
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
          <User className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-foreground">Student Registration</h1>
        <p className="text-sm font-medium text-muted-foreground">
          Join the Supervised Industrial Training manifest
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-4 text-sm font-bold text-destructive bg-destructive/10 rounded-xl border border-destructive/20 text-center">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              name="name"
              className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium"
              placeholder="Juan Dela Cruz"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Course / Program</label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <select
              name="course"
              className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium appearance-none"
              required
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
          <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Institutional Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              name="email"
              type="email"
              className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium"
              placeholder="id@tupv.edu.ph"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Security Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              name="password"
              type="password"
              className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-medium"
              placeholder="••••••••"
              required
            />
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
              Register Student Account
            </>
          )}
        </button>
      </form>
    </div>
  );
}
