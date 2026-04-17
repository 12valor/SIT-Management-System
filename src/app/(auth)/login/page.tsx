"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "evangelista.agdiaz@tupv.edu.ph" && password === "TUPV-0909") {
      router.push("/student/dashboard");
    } else if (email === "employer@company.com" && password === "admin123") {
      router.push("/employer/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">TUP-V SIT</h1>
        <p className="text-sm text-muted-foreground">
          Enter credentials to access the system
        </p>
        <div className="text-xs text-muted-foreground p-3 border border-border rounded-md bg-muted/30 flex flex-col gap-1 text-left mt-4">
          <p><strong>Student:</strong> evangelista.agdiaz@tupv.edu.ph / TUPV-0909</p>
          <p><strong>Employer:</strong> employer@company.com / admin123</p>
        </div>
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 text-sm font-medium text-red-500 bg-red-50 rounded-md text-center border border-red-200">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="student@tupv.edu.ph"
            type="email"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full cursor-pointer"
        >
          Sign In
        </button>
      </form>
      <div className="text-center text-sm">
        <Link href="/" className="text-muted-foreground hover:text-primary hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}
