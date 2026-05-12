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
  Hash,
  CalendarDays,
  Sparkles
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
            <div className="h-4 w-96 bg-muted/50 rounded-lg animate-pulse" />
          </div>
          <div className="h-32 bg-muted rounded-2xl animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-28 bg-muted rounded-2xl animate-pulse" />)}
          </div>
        </div>
      }
    >
    <div className="max-w-6xl mx-auto space-y-12 animate-in-fade pb-32">
      {/* 1. Enhanced Hero Section */}
      <div className="relative pt-12 pb-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="relative flex flex-col md:flex-row items-center md:items-end justify-between gap-8 px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
             <div className="relative">
                <div className="h-32 w-32 rounded-3xl bg-card border-[3px] border-border overflow-hidden relative shadow-2xl ring-4 ring-primary/5 transition-transform hover:scale-[1.02] duration-500">
                  {imagePreview ? (
                    <Image 
                      src={imagePreview} 
                      alt={safeProfile.name || "Student"} 
                      fill 
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-border/50 text-primary/20">
                      <UserIcon className="h-14 w-14" />
                    </div>
                  )}
                  {isImageUploading && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                      <Loader2 className="h-8 w-8 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 h-10 w-10 bg-primary text-primary-foreground rounded-2xl border-[3px] border-background flex items-center justify-center cursor-pointer hover:bg-primary/90 hover:scale-110 transition-all shadow-xl z-20 group">
                  <Camera className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                    disabled={isImageUploading}
                  />
                </label>
             </div>

             <div className="text-center md:text-left space-y-3">
                <div className="space-y-1">
                   <div className="flex items-center justify-center md:justify-start gap-3">
                      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{safeProfile.name}</h1>
                      <Sparkles className="h-5 w-5 text-primary opacity-50 hidden md:block" />
                   </div>
                   <p className="text-lg text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2 italic">
                     <Mail className="h-4 w-4 opacity-40" />
                     {safeProfile.email}
                   </p>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                   <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg shadow-lg shadow-primary/20">
                      {safeProfile.course || "No Program"}
                   </span>
                   <div className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md",
                    safeProfile.isApproved 
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  )}>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {safeProfile.isApproved ? "Verified Candidate" : "Pending Audit"}
                  </div>
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-4 bg-card/40 backdrop-blur-xl border border-border/50 p-2 rounded-2xl shadow-xl">
             <div className="px-6 py-3 text-center">
                <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2">
                   <div className={cn("w-2 h-2 rounded-full", safeProfile.isApproved ? "bg-emerald-500 animate-pulse" : "bg-amber-500")} />
                   <p className="text-sm font-bold uppercase tracking-tighter">{safeProfile.isApproved ? "Active" : "On Hold"}</p>
                </div>
             </div>
             <div className="w-[1px] h-10 bg-border/50" />
             <div className="px-6 py-3 text-center">
                <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-1">ID Ref</p>
                <p className="text-sm font-bold font-mono tracking-tighter opacity-70">#{safeProfile.id.slice(-6).toUpperCase()}</p>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
        {[
          { label: "Industrial Hours", value: totalHours.toFixed(0), target: "/300", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Active Applications", value: appCount, target: "Submissions", icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "Admission Year", value: new Date(safeProfile.createdAt).getFullYear(), target: "Entry", icon: CalendarDays, color: "text-orange-500", bg: "bg-orange-500/10" },
        ].map((s) => (
          <div key={s.label} className="group bg-card/60 backdrop-blur-sm border border-border p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] -mr-16 -mt-16 rounded-full opacity-20", s.bg)} />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={cn("p-3 rounded-2xl border border-white/5", s.bg)}>
                 <s.icon className={cn("h-5 w-5", s.color)} />
              </div>
              <p className="text-[10px] font-black uppercase text-muted-foreground/40 tracking-[0.2em]">{s.label}</p>
            </div>
            <div className="flex items-baseline gap-1 relative z-10">
               <p className="text-4xl font-black tracking-tighter text-foreground">{s.value}</p>
               <span className="text-sm font-bold text-muted-foreground/40 uppercase tracking-widest">{s.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Configuration Panel */}
      <div className="px-4">
        <div className="bg-card/40 backdrop-blur-2xl rounded-[2.5rem] border border-border shadow-2xl overflow-hidden">
          <div className="px-10 py-8 border-b border-border bg-muted/10 flex items-center justify-between">
            <div className="space-y-1">
               <h3 className="text-lg font-bold tracking-tight text-foreground">Identity Configuration</h3>
               <p className="text-xs text-muted-foreground font-medium">Update your academic and personal identification details.</p>
            </div>
            <div className="p-3 bg-card rounded-2xl border border-border shadow-sm">
               <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-10">
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-xs text-destructive font-bold animate-in zoom-in-95">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-[0.3em] ml-2">Display Name</label>
                <div className="relative group/input">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-focus-within/input:text-primary transition-colors" />
                  <input
                    name="name"
                    required
                    defaultValue={safeProfile.name ?? ""}
                    className="w-full pl-12 pr-6 h-14 rounded-2xl border border-border bg-card/50 text-sm font-bold text-foreground outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-[0.3em] ml-2">Email Identity (Locked)</label>
                <div className="relative group/input opacity-60">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30" />
                  <input
                    value={safeProfile.email ?? ""}
                    disabled
                    className="w-full pl-12 pr-6 h-14 rounded-2xl border border-border bg-muted/40 text-sm font-bold text-muted-foreground/60 cursor-not-allowed"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase tracking-widest text-muted-foreground/30 bg-muted/50 px-2 py-1 rounded-md">
                     Immutable
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-[0.3em] ml-2">Academic Program Enrollment</label>
              <div className="relative group/input">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-focus-within/input:text-primary pointer-events-none transition-colors" />
                <select
                  name="course"
                  defaultValue={safeProfile.course ?? ""}
                  className="w-full pl-12 pr-12 h-14 rounded-2xl border border-border bg-card/50 text-sm font-bold text-foreground outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary appearance-none cursor-pointer transition-all shadow-inner"
                >
                  <option value="" disabled className="bg-card">Select program...</option>
                  {hasLegacyCourse && (
                    <option value={safeProfile.course ?? ""} className="bg-card">Current: {safeProfile.course}</option>
                  )}
                  {COURSE_OPTIONS.map((course) => (
                    <option key={course} value={course} className="bg-card">{course}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 border-l border-border/50 pl-4 pointer-events-none">
                  <Sparkles className="h-4 w-4 text-primary/30" />
                </div>
              </div>
            </div>

            <div className={cn("flex flex-col sm:flex-row items-center gap-6 border-t border-border/50 pt-10", success ? "justify-between" : "justify-end")}>
              {success && (
                <div className="flex items-center gap-3 text-emerald-500 font-black text-xs uppercase tracking-widest animate-in slide-in-from-left-4">
                  <CheckCircle2 className="h-5 w-5" /> 
                  Changes synchronized successfully
                </div>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto flex items-center justify-center gap-3 h-14 px-10 rounded-2xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50"
              >
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                Commit Identification
              </button>
            </div>
          </form>
        </div>

        {/* 4. Support Footer */}
        <div className="mt-8 p-6 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6 group transition-all hover:bg-card/40">
           <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 group-hover:scale-110 transition-transform">
              <Hash className="h-5 w-5 text-primary opacity-60" />
           </div>
           <p className="text-xs text-muted-foreground font-medium text-center sm:text-left leading-relaxed">
             Need to modify sensitive records like your <span className="text-foreground font-bold underline decoration-primary/30 decoration-2 underline-offset-4">Student ID</span> or <span className="text-foreground font-bold underline decoration-primary/30 decoration-2 underline-offset-4">Institutional Role</span>? 
             Please submit a formal request to the <span className="text-foreground font-black uppercase tracking-tighter bg-primary/10 px-2 py-0.5 rounded text-[10px]">SIT Administration Desk</span>.
           </p>
        </div>
      </div>
    </div>
    </Skeleton>
  );
}
