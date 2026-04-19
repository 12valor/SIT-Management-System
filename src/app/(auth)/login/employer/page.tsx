"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Building2, Mail, Lock, Loader2, ArrowLeft } from "lucide-react";

export default function EmployerLoginPage() {
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
        setError("Incorrect credentials, or your company account is still pending verification.");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/auth/session");
      const session = await res.json();
      const role = session?.user?.role;

      if (role === "EMPLOYER") {
        router.push("/employer/dashboard");
      } else if (role) {
        router.push(`/${role.toLowerCase()}/dashboard`);
      } else {
        router.push("/");
      }
    } catch {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      {/* Role header strip — blue accent for employers */}
      <div className="bg-blue-600 px-6 py-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center shrink-0">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/60">Authentication</p>
          <h1 className="text-base font-black text-white leading-tight">Employer Sign In</h1>
        </div>
        <Link href="/login" className="ml-auto text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="px-6 py-7 space-y-5">
        {/* Context note */}
        <div className="p-3 rounded-md bg-muted border border-border">
          <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
            Sign in with your registered company email. Your company must be approved and MOU-verified by the TUP-V coordinator before accessing the partner portal.
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs font-bold text-destructive bg-destructive/10 rounded-md border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Company Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hr@company.com"
                className="w-full h-10 pl-9 pr-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 pl-9 pr-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 rounded-md bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="pt-2 flex items-center justify-between text-xs">
          <Link href="/signup/employer" className="font-bold text-blue-600 hover:underline underline-offset-2">
            Register your company
          </Link>
          <Link href="/login" className="font-mono text-muted-foreground hover:text-foreground transition-colors">
            Other roles
          </Link>
        </div>
      </div>
    </div>
  );
}
