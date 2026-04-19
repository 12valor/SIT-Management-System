"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signIn } from "next-auth/react";
import { LogIn, Loader2, ShieldCheck, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. If you just registered, your account might still be pending coordinator approval.");
        setIsLoading(false);
        return;
      }

      // Fetch session to get user role for selective redirection
      const response = await fetch("/api/auth/session");
      const session = await response.json();
      const role = session?.user?.role;

      if (role) {
        router.push(`/${role.toLowerCase()}/dashboard`);
      } else {
        router.push("/");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in-fade">
      <div className="space-y-2 text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gradient">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your SIT account to manage your progress
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {error && (
          <div className="p-4 text-sm font-medium text-destructive bg-destructive/10 rounded-lg border border-destructive/20 text-center">
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
              className="flex h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
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
              className="flex h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex h-11 w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-70 active:scale-95"
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

      <div className="text-center space-y-4">
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground font-medium">New to the platform?</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Link 
            href="/signup/student"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Students</span>
            <span className="text-xs font-bold text-foreground group-hover:text-primary">Register Here</span>
          </Link>
          <Link 
            href="/signup/employer"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Employers</span>
            <span className="text-xs font-bold text-foreground group-hover:text-primary">Join as Partner</span>
          </Link>
        </div>

        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 pt-4">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
