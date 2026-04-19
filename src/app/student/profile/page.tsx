"use client";

import { useState, useEffect, useTransition } from "react";
import { User as UserIcon, Mail, GraduationCap, Save, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
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
    <div className="max-w-3xl space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Account</p>
        <h1 className="text-2xl font-black tracking-tight text-foreground">Profile</h1>
      </div>

      {/* Identity strip */}
      <div className="p-5 rounded-lg bg-primary border border-primary/80 text-primary-foreground flex items-center gap-5">
        <div className="w-14 h-14 rounded-md bg-white/20 flex items-center justify-center text-xl font-black shrink-0">
          {profile.name?.charAt(0).toUpperCase() ?? "?"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-lg leading-tight truncate">{profile.name}</p>
          <p className="text-[11px] font-mono opacity-70">{profile.email}</p>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 bg-white/20 border border-white/20 px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest">
          <ShieldCheck className="h-3.5 w-3.5" />
          {profile.isApproved ? "Approved" : "Pending"}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Logbook Hours",   value: `${totalHours.toFixed(0)}/300` },
          { label: "Applications",    value: appCount },
          { label: "Member Since",    value: new Date(profile.createdAt).getFullYear() },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-lg bg-card border border-border">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <p className="text-xl font-black font-mono tabular-nums text-foreground mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Edit form */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-muted/30">
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground">Edit Personal Information</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {error && (
            <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded px-3 py-2 font-bold">
              {error}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  name="name"
                  required
                  defaultValue={profile.name ?? ""}
                  className="w-full pl-9 pr-3 h-9 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Email (read-only)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={profile.email ?? ""}
                  disabled
                  className="w-full pl-9 pr-3 h-9 rounded-md border border-border bg-muted/30 text-muted-foreground text-sm cursor-not-allowed"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Course / Specialization</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                name="course"
                defaultValue={profile.course ?? ""}
                className="w-full pl-9 pr-3 h-9 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
              >
                <option value="">Select course...</option>
                <option value="BS in Information Technology">BS in Information Technology</option>
                <option value="BS in Computer Science">BS in Computer Science</option>
                <option value="BS in Civil Engineering">BS in Civil Engineering</option>
                <option value="BS in Electronics Engineering">BS in Electronics Engineering</option>
                <option value="BS in Electrical Engineering">BS in Electrical Engineering</option>
                <option value="BS in Mechanical Engineering">BS in Mechanical Engineering</option>
              </select>
            </div>
          </div>
          <div className={cn("flex items-center", success ? "justify-between" : "justify-end")}>
            {success && (
              <p className="text-xs text-primary font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Profile updated successfully.
              </p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 h-9 px-5 rounded-md bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Help note */}
      <p className="text-[11px] text-muted-foreground font-mono border border-border rounded-md px-4 py-3 bg-muted/20">
        To change your school ID, student number, or role, contact the TUP-V SIT Coordinator.
      </p>
    </div>
  );
}
