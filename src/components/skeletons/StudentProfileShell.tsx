"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useTransition, useEffect } from "react";
import { 
  User as UserIcon, 
  Mail, 
  GraduationCap, 
  Save, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  Clock,
  Camera,
  CalendarDays
} from "lucide-react";
import { updateStudentProfile, updateStudentOwnImage } from "@/app/(portals)/student/profile/actions";
import { cn } from "@/lib/utils";
import { COURSE_OPTIONS, isCourseCode } from "@/lib/courses";
import Image from "next/image";

export type ProfileData = {
  id: string;
  name: string | null;
  email: string | null;
  course: string | null;
  image: string | null;
  createdAt: Date;
  isApproved: boolean;
  applications: { status: string }[];
  logbookEntries: { hours: number }[];
};

export function StudentProfileShell({ initialData }: { initialData: ProfileData | null }) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setProfile(initialData);
      setImagePreview(initialData.image);
    }
  }, [initialData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImageUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      try {
        await updateStudentOwnImage(base64);
      } catch (err) {
        console.error("Image update failed", err);
      } finally {
        setIsImageUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

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
    id: '...',
    name: 'Student Name',
    email: 'student@example.com',
    course: 'T01',
    createdAt: new Date(),
    isApproved: true,
    applications: [],
    logbookEntries: []
  };
  const hasLegacyCourse = !!safeProfile.course && !isCourseCode(safeProfile.course);

  return (
    <Skeleton 
      name="student-profile" 
      loading={!initialData}
      animate="shimmer"
      stagger={80}
      transition={300}
      fallback={
        <div className="space-y-8 max-w-5xl mx-auto pb-24">
          <div className="pb-8 border-b border-border/50 mb-8 space-y-4">
            <div className="h-10 w-64 bg-muted rounded-lg animate-pulse" />
          </div>
          <div className="h-32 bg-muted rounded-2xl animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-28 bg-muted rounded-2xl animate-pulse" />)}
          </div>
        </div>
      }
    >
    <div className="max-w-5xl mx-auto space-y-12 animate-in-fade pb-32">
      {/* 1. Simple, Clean Header */}
      <div className="pb-8 border-b border-border mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Account Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your industrial training identity and academic credentials.</p>
      </div>

      <div className="space-y-8">
        {/* 2. Identity Section */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row items-center gap-8">
           <div className="relative">
              <div className="h-24 w-24 rounded-2xl bg-muted border border-border overflow-hidden relative shadow-sm">
                {imagePreview ? (
                  <Image 
                    src={imagePreview} 
                    alt={safeProfile.name || "Student"} 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-foreground/20">
                    <UserIcon className="h-10 w-10" />
                  </div>
                )}
                {isImageUploading && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 className="h-5 w-5 text-white animate-spin" />
                  </div>
                )}
              </div>
              <label className="absolute -bottom-1 -right-1 h-7 w-7 bg-primary text-primary-foreground rounded-lg border-2 border-background flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-all shadow-md">
                <Camera className="h-3.5 w-3.5" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                  disabled={isImageUploading}
                />
              </label>
           </div>

           <div className="flex-1 text-center md:text-left space-y-2">
              <div>
                <h2 className="text-2xl font-bold text-foreground tracking-tight">{safeProfile.name}</h2>
                <p className="text-sm text-muted-foreground font-medium">{safeProfile.email}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                 <span className="px-2 py-0.5 bg-muted text-foreground/60 text-[10px] font-bold uppercase tracking-widest rounded border border-border">
                    {safeProfile.course || "No Course"}
                 </span>
                 <div className={cn(
                  "flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border",
                  safeProfile.isApproved 
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                    : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                )}>
                  <ShieldCheck className="h-3 w-3" />
                  {safeProfile.isApproved ? "Verified Candidate" : "Pending Audit"}
                </div>
              </div>
           </div>
        </div>

        {/* 3. Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Logbook Hours", value: `${totalHours.toFixed(0)}/300`, icon: Clock },
            { label: "Applications", value: appCount, icon: GraduationCap },
            { label: "Registration", value: new Date(safeProfile.createdAt).getFullYear(), icon: CalendarDays },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-bold uppercase text-muted-foreground/50 tracking-wider">{s.label}</p>
                <s.icon className="h-3.5 w-3.5 text-muted-foreground/30" />
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums tracking-tight">{s.value}</p>
            </div>
          ))}
        </div>

        {/* 4. Configuration Form */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-8 py-4 border-b border-border bg-muted/20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/60">Edit Profile Information</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive font-bold">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <input
                    name="name"
                    required
                    defaultValue={safeProfile.name ?? ""}
                    className="w-full pl-10 pr-4 h-12 rounded-xl border border-border bg-card text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Email (Immutable)</label>
                <div className="relative opacity-60">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                  <input
                    value={safeProfile.email ?? ""}
                    disabled
                    className="w-full pl-10 pr-4 h-12 rounded-xl border border-border bg-muted/30 text-sm font-medium text-muted-foreground/60 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Academic Program</label>
              <div className="relative group">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 pointer-events-none transition-colors" />
                <select
                  name="course"
                  defaultValue={safeProfile.course ?? ""}
                  className="w-full pl-10 pr-10 h-12 rounded-xl border border-border bg-card text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary appearance-none cursor-pointer transition-all"
                >
                  <option value="" disabled>Select program...</option>
                  {hasLegacyCourse && (
                    <option value={safeProfile.course ?? ""}>Current: {safeProfile.course}</option>
                  )}
                  {COURSE_OPTIONS.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                  <Save className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>

            <div className={cn("flex flex-col sm:flex-row items-center gap-4 border-t border-border pt-8", success ? "justify-between" : "justify-end")}>
              {success && (
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider animate-in fade-in duration-300">
                  <CheckCircle2 className="h-4 w-4" /> Changes saved successfully
                </div>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* 5. Support Info */}
        <div className="p-5 rounded-2xl border border-border bg-muted/10 flex items-center gap-4">
           <Mail className="h-4 w-4 text-muted-foreground/30 shrink-0" />
           <p className="text-[11px] text-muted-foreground leading-relaxed">
             Need to modify sensitive data like your <strong>Student ID</strong>? 
             Please contact the <strong>SIT Administration Desk</strong>.
           </p>
        </div>
      </div>
    </div>
    </Skeleton>
  );
}
