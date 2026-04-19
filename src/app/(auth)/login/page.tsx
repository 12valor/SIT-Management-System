"use client";

import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck, ArrowRight } from "lucide-react";

const roles = [
  {
    key: "student",
    label: "Student",
    sub: "Track your SIT hours and logbook",
    icon: GraduationCap,
    href: "/login/student",
    signup: "/signup/student",
    signupLabel: "Register as Student",
    accent: "text-primary",
    border: "hover:border-primary/60",
    bg: "hover:bg-primary/5",
  },
  {
    key: "employer",
    label: "Employer",
    sub: "Post roles and manage trainees",
    icon: Building2,
    href: "/login/employer",
    signup: "/signup/employer",
    signupLabel: "Register as Employer",
    accent: "text-blue-600",
    border: "hover:border-blue-500/60",
    bg: "hover:bg-blue-500/5",
  },
  {
    key: "coordinator",
    label: "Coordinator",
    sub: "Manage students, companies, and reports",
    icon: ShieldCheck,
    href: "/login/coordinator",
    signup: null,
    signupLabel: null,
    accent: "text-amber-600",
    border: "hover:border-amber-500/60",
    bg: "hover:bg-amber-500/5",
  },
];

export default function LoginGatePage() {
  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-black text-sm">T</span>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">TUP-V SIT System</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-foreground mb-2">Sign In</h1>
        <p className="text-sm text-muted-foreground">Select your role to continue</p>
      </div>

      {/* Role cards */}
      <div className="space-y-3">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Link
              key={role.key}
              href={role.href}
              className={`flex items-center gap-5 p-5 rounded-lg bg-card border border-border ${role.border} ${role.bg} transition-all group cursor-pointer`}
            >
              <div className={`w-11 h-11 rounded-md border border-border bg-muted flex items-center justify-center shrink-0 group-hover:border-inherit transition-colors ${role.border.replace("hover:", "group-hover:")}`}>
                <Icon className={`h-5 w-5 ${role.accent}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-foreground">{role.label}</p>
                <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{role.sub}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          );
        })}
      </div>

      {/* Register links */}
      <div className="mt-8 pt-6 border-t border-border flex items-center justify-center gap-6">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">New here?</span>
        <Link href="/signup/student" className="text-xs font-bold text-primary hover:underline underline-offset-2">
          Student Sign-up
        </Link>
        <Link href="/signup/employer" className="text-xs font-bold text-primary hover:underline underline-offset-2">
          Employer Sign-up
        </Link>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
