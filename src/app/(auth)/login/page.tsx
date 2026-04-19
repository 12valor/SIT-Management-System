import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

const roles = [
  {
    key: "student",
    label: "Student",
    sub: "Track your SIT hours and logbook",
    icon: GraduationCap,
    href: "/login/student",
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
    accent: "text-blue-600",
    border: "hover:border-blue-500/60",
    bg: "hover:bg-blue-500/5",
  },
  {
    key: "coordinator",
    label: "Coordinator",
    sub: "Manage students and companies",
    icon: ShieldCheck,
    href: "/login/coordinator",
    accent: "text-amber-600",
    border: "hover:border-amber-500/60",
    bg: "hover:bg-amber-500/5",
  },
];

export default function LoginGatePage() {
  return (
    <div className="flex min-h-screen overflow-hidden bg-white">
      {/* Left side - Visual Experience (Light Edition) */}
      <div className="relative hidden lg:flex lg:w-3/5 xl:w-[60%] bg-slate-50 flex-col justify-between p-12 overflow-hidden border-r border-slate-200">
        {/* Subtle Background Pattern or Faded Image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/auth/gate.png" 
            alt="University Campus" 
            fill
            className="object-cover opacity-10 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-transparent" />
        </div>

        {/* Branding Overlay */}
        <div className="relative z-10 flex items-center">
          <img src="/des_UIPEN.png" alt="UIPEN Logo" className="h-12 w-auto object-contain" />
        </div>

        <div className="relative z-10 max-w-2xl mt-12">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4 font-heading">Institutional Portal</p>
          <h1 className="text-7xl font-bold text-slate-900 tracking-tight leading-[1] mb-8 font-heading">
            Academic <br /><span className="text-primary">&</span> Industry <br />Excellence.
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg font-sans">
            Connecting TUP-V students with premier industrial partners through a unified digital management ecosystem.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-12 text-slate-400">
           <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Official Registry</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight">TUP-Visayas</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Infrastructure</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight">UIPEN Network</span>
           </div>
        </div>
      </div>

      {/* Right side - Interaction Logic */}
      <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-24 bg-white relative z-20">
        <div className="max-w-md mx-auto w-full lg:mx-0">
          <div className="mb-12 text-left">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-3 font-heading uppercase">Sign In</h2>
            <p className="text-base text-slate-500 font-medium font-sans">Select your designated portal to continue.</p>
          </div>

          <div className="space-y-3">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Link
                  key={role.key}
                  href={role.href}
                  className={`flex items-center gap-5 p-6 rounded-xl border border-slate-200 bg-white ${role.border} ${role.bg} transition-all group cursor-pointer`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 bg-slate-50 group-hover:border-inherit transition-all shadow-sm`}>
                    <Icon className={`h-6 w-6 ${role.accent}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-slate-900 tracking-tight font-heading uppercase">{role.label}</p>
                    <p className="text-xs text-slate-500 mt-1 font-sans">{role.sub}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 space-y-6">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-heading">New registration</span>
              <div className="flex-1 border-t border-slate-100" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/signup/student" className="h-14 flex items-center justify-center rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 hover:border-primary/30 transition-all font-heading">
                Student
              </Link>
              <Link href="/signup/employer" className="h-14 flex items-center justify-center rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 hover:border-primary/30 transition-all font-heading">
                Employer
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 font-heading">
              <ArrowRight className="h-3 w-3 rotate-180" /> Back to landing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
