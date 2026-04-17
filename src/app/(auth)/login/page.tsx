"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMockStore } from "@/store/mock-store";
import { LogIn, Loader2, ShieldCheck, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = useMockStore((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === "student@tupv.edu.ph" && password === "TUPV-0909") {
      login(email, 'student', "John Doe Diaz");
      router.push("/student/dashboard");
    } else if (email === "employer@company.com" && password === "admin123") {
      login(email, 'employer', "HR Manager");
      router.push("/employer/dashboard");
    } else {
      setError("Invalid email or password. Please use the credentials provided below.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in-fade">
      <div className="space-y-2 text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gradient">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your SIT account to manage your progress
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {error && (
          <div className="p-4 text-sm font-medium text-destructive bg-destructive/10 rounded-xl border border-destructive/20 text-center">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              placeholder="name@tupv.edu.ph"
              type="email"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-semibold" htmlFor="password">
              Password
            </label>
            <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-70 active:scale-95"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Sign In
              <LogIn className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground font-medium">Test Credentials</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button 
          onClick={() => { setEmail("student@tupv.edu.ph"); setPassword("TUPV-0909"); }}
          className="flex flex-col items-start p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted transition-colors text-left"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Student Access</span>
          <span className="text-sm font-medium">student@tupv.edu.ph</span>
          <span className="text-xs text-muted-foreground">Password: TUPV-0909</span>
        </button>
        <button 
          onClick={() => { setEmail("employer@company.com"); setPassword("admin123"); }}
          className="flex flex-col items-start p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted transition-colors text-left"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Employer Access</span>
          <span className="text-sm font-medium">employer@company.com</span>
          <span className="text-xs text-muted-foreground">Password: admin123</span>
        </button>
      </div>

      <div className="text-center">
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
