"use client";

import { useState, useEffect, useTransition } from "react";
import { User as UserIcon, Mail, GraduationCap, Save, CheckCircle2, Loader2, ShieldCheck, Clock } from "lucide-react";
import { getStudentProfile, updateStudentProfile } from "./actions";
import { cn } from "@/lib/utils";

type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  course: string | null;
  createdAt: Date;
  isApproved: boolean;
  applications: { status: string }[];
  logbookEntries: { hours: number }[];
};

export default function StudentProfilePage() {

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getStudentProfile().then((res) => {
      setProfile(res as Profile | null);
      setIsLoading(false);
    });
  }, []);

  const totalHours = profile?.logbookEntries.reduce((a, e) => a + e.hours, 0) ?? 0;
  const appCount = profile?.applications.length ?? 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateStudentProfile(fd);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        const updated = await getStudentProfile();
        setProfile(updated as Profile | null);
      } else {
        setError(res.error || "Update failed.");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3">
        <Loader2 className="h-5 w-5 text-primary animate-spin" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-8 border-b border-slate-100 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Account Profile</h1>
        <p className="text-sm text-slate-500 font-medium">Manage your industrial training identity and academic credentials.</p>
      </div>

      <div className="space-y-8">
        {/* Identity Strip */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl font-bold text-[#800000] shrink-0">
            {profile.name?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-800 truncate">{profile.name}</h2>
            <p className="text-sm text-slate-400 font-medium">{profile.email}</p>
          </div>
          <div className={cn(
            "shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm",
            profile.isApproved ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
          )}>
            <ShieldCheck className="h-3.5 w-3.5" />
            {profile.isApproved ? "Verified Candidate" : "Pending Audit"}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Logbook Hours",   value: `${totalHours.toFixed(0)}/300`, icon: Clock },
            { label: "Applications",    value: appCount, icon: GraduationCap },
            { label: "Registration",    value: new Date(profile.createdAt).getFullYear(), icon: UserIcon },
          ].map((s) => (
            <div key={s.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{s.label}</p>
                <s.icon className="h-3.5 w-3.5 text-slate-200" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800">Edit Personal Information</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600 font-bold">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <input
                    name="name"
                    required
                    defaultValue={profile.name ?? ""}
                    className="w-full pl-10 pr-4 h-11 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider ml-1">Email (Immutable)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <input
                    value={profile.email ?? ""}
                    disabled
                    className="w-full pl-10 pr-4 h-11 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 text-sm cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider ml-1">Academic Program</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
                <select
                  name="course"
                  defaultValue={profile.course ?? ""}
                  className="w-full pl-10 pr-10 h-11 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] appearance-none cursor-pointer transition-all"
                >
                  <option value="">Select program...</option>
                  <option value="BS in Information Technology text-slate-800">BS in Information Technology</option>
                  <option value="BS in Computer Science">BS in Computer Science</option>
                  <option value="BS in Civil Engineering">BS in Civil Engineering</option>
                  <option value="BS in Electronics Engineering">BS in Electronics Engineering</option>
                  <option value="BS in Electrical Engineering">BS in Electrical Engineering</option>
                  <option value="BS in Mechanical Engineering">BS in Mechanical Engineering</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 border-l border-slate-100 pl-3 pointer-events-none">
                  <Save className="h-3.5 w-3.5 text-slate-300" />
                </div>
              </div>
            </div>

            <div className={cn("flex items-center gap-4 border-t border-slate-50 pt-6", success ? "justify-between" : "justify-end")}>
              {success && (
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs animate-in slide-in-from-left-2">
                  <CheckCircle2 className="h-4 w-4" /> Identification updated successfully.
                </div>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 h-11 px-6 rounded-lg bg-[#800000] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-red-900/10 hover:bg-red-900 transition-all disabled:opacity-50 active:scale-95"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Commit Changes
              </button>
            </div>
          </form>
        </div>

        {/* Support Note */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-4">
           <div className="p-2 bg-white rounded-lg border border-slate-100">
              <Mail className="h-4 w-4 text-slate-400" />
           </div>
           <p className="text-[11px] text-slate-500 font-medium">
             To modify critical records (Student ID, Institutional Role), please contact the <span className="text-slate-800 font-bold uppercase tracking-tighter">SIT Administration Desk</span>.
           </p>
        </div>
      </div>
    </div>
  );
}
