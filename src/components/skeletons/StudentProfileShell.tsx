"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useTransition, useEffect } from "react";
import { User as UserIcon, Mail, GraduationCap, Save, CheckCircle2, Loader2, ShieldCheck, Clock } from "lucide-react";
import { updateStudentProfile } from "@/app/(portals)/student/profile/actions";
import { cn } from "@/lib/utils";

export type ProfileData = {
  id: string;
  name: string | null;
  email: string | null;
  course: string | null;
  createdAt: Date;
  isApproved: boolean;
  applications: { status: string }[];
  logbookEntries: { hours: number }[];
};

export function StudentProfileShell({ initialData }: { initialData: ProfileData | null }) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) setProfile(initialData);
  }, [initialData]);

  const totalHours = profile?.logbookEntries?.reduce((a, e) => a + e.hours, 0) ?? 0;
  const appCount = profile?.applications?.length ?? 0;

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
        // Optimistically update
        setProfile(prev => prev ? {
          ...prev,
          name: typeof fd.get("name") === "string" ? fd.get("name") as string : prev.name,
          course: typeof fd.get("course") === "string" ? fd.get("course") as string : prev.course
        } : null);
      } else {
        setError(res.error || "Update failed.");
      }
    });
  };

  const safeProfile = profile || {
    name: 'Student Name',
    email: 'student@example.com',
    course: 'BS in Information Technology',
    createdAt: new Date(),
    isApproved: true,
    applications: [],
    logbookEntries: []
  };

  return (
    <Skeleton 
      name="student-profile" 
      loading={!initialData}
      animate="shimmer"
      stagger={80}
      transition={300}
      snapshotConfig={{
        excludeSelectors: ["svg", "[data-no-skeleton]"],
        excludeTags: ["nav", "footer"],
      }}
      fallback={
        <div className="space-y-8 max-w-5xl mx-auto pb-24">
          <div className="pb-8 border-b border-slate-100 mb-8 space-y-4">
            <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-4 w-96 bg-slate-100 rounded-lg animate-pulse" />
          </div>

          <div className="space-y-8">
             <div className="h-28 bg-slate-100 rounded-xl animate-pulse" />
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {[1,2,3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />)}
             </div>
             <div className="h-96 bg-slate-100 rounded-xl animate-pulse" />
          </div>
        </div>
      }
    >
    <div className="space-y-8 animate-in-fade">
      {/* Header */}
      <div className="pb-8 border-b border-border mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Account Profile</h1>
        <p className="text-sm text-muted-foreground font-medium">Manage your industrial training identity and academic credentials.</p>
      </div>

      <div className="space-y-8">
        {/* Identity Strip */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-muted border border-border flex items-center justify-center text-2xl font-bold text-primary shrink-0">
            {safeProfile.name?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-foreground truncate">{safeProfile.name}</h2>
            <p className="text-sm text-muted-foreground font-medium">{safeProfile.email}</p>
          </div>
          <div className={cn(
            "shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-sm",
            safeProfile.isApproved ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
          )}>
            <ShieldCheck className="h-3.5 w-3.5" />
            {safeProfile.isApproved ? "Verified Candidate" : "Pending Audit"}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Logbook Hours",   value: `${totalHours.toFixed(0)}/300`, icon: Clock },
            { label: "Applications",    value: appCount, icon: GraduationCap },
            { label: "Registration",    value: new Date(safeProfile.createdAt).getFullYear(), icon: UserIcon },
          ].map((s) => (
            <div key={s.label} className="bg-card p-5 rounded-xl border border-border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider">{s.label}</p>
                <s.icon className="h-3.5 w-3.5 text-muted-foreground/20" />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Edit Form */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Edit Personal Information</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600 font-bold">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                  <input
                    name="name"
                    required
                    defaultValue={safeProfile.name ?? ""}
                    className="w-full pl-10 pr-4 h-11 rounded-lg border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Email (Immutable)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                  <input
                    value={safeProfile.email ?? ""}
                    disabled
                    className="w-full pl-10 pr-4 h-11 rounded-lg border border-border bg-muted/30 text-muted-foreground/40 text-sm cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Academic Program</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 pointer-events-none" />
                <select
                  name="course"
                  defaultValue={safeProfile.course ?? ""}
                  className="w-full pl-10 pr-10 h-11 rounded-lg border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary appearance-none cursor-pointer transition-all"
                >
                  <option value="" className="text-foreground bg-card">Select program...</option>
                  <option value="BS in Information Technology" className="text-foreground bg-card">BS in Information Technology</option>
                  <option value="BS in Computer Science" className="text-foreground bg-card">BS in Computer Science</option>
                  <option value="BS in Civil Engineering" className="text-foreground bg-card">BS in Civil Engineering</option>
                  <option value="BS in Electronics Engineering" className="text-foreground bg-card">BS in Electronics Engineering</option>
                  <option value="BS in Electrical Engineering" className="text-foreground bg-card">BS in Electrical Engineering</option>
                  <option value="BS in Mechanical Engineering" className="text-foreground bg-card">BS in Mechanical Engineering</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 border-l border-border pl-3 pointer-events-none">
                  <Save className="h-3.5 w-3.5 text-muted-foreground/40" />
                </div>
              </div>
            </div>

            <div className={cn("flex items-center gap-4 border-t border-border/50 pt-6", success ? "justify-between" : "justify-end")}>
              {success && (
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs animate-in slide-in-from-left-2">
                  <CheckCircle2 className="h-4 w-4" /> Identification updated successfully.
                </div>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-md shadow-primary/10 hover:bg-primary/90 transition-all disabled:opacity-50 active:scale-95"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Commit Changes
              </button>
            </div>
          </form>
        </div>

        {/* Support Note */}
        <div className="p-4 rounded-xl border border-border bg-muted/30 flex items-center gap-4">
           <div className="p-2 bg-card rounded-lg border border-border">
              <Mail className="h-4 w-4 text-muted-foreground/40" />
           </div>
           <p className="text-[11px] text-muted-foreground font-medium">
             To modify critical records (Student ID, Institutional Role), please contact the <span className="text-foreground font-bold uppercase tracking-tighter">SIT Administration Desk</span>.
           </p>
        </div>
      </div>
    </div>
    </Skeleton>
  );
}
