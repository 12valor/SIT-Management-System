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

type DarkTheme = "zinc" | "slate" | "oceanic" | "obsidian";

const THEMES: { id: DarkTheme; name: string; color: string }[] = [
  { id: "zinc", name: "Zinc", color: "bg-zinc-500" },
  { id: "slate", name: "Slate", color: "bg-slate-500" },
  { id: "oceanic", name: "Oceanic", color: "bg-sky-500" },
  { id: "obsidian", name: "Obsidian", color: "bg-emerald-500" },
];

export function StudentProfileShell({ initialData }: { initialData: ProfileData | null }) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [activeTheme, setActiveTheme] = useState<DarkTheme>("zinc");
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

  // Theme Style Mapping
  const themeStyles = {
    zinc: {
      wrapper: "bg-zinc-950 text-zinc-100",
      card: "bg-zinc-900/50 border-zinc-800",
      input: "border-zinc-800 focus:border-zinc-400",
      accent: "text-zinc-400",
      badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    },
    slate: {
      wrapper: "bg-slate-950 text-slate-100",
      card: "bg-slate-900/50 border-slate-800",
      input: "border-slate-800 focus:border-slate-400",
      accent: "text-slate-400",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    oceanic: {
      wrapper: "bg-[#020817] text-sky-100",
      card: "bg-[#051124] border-sky-900/30",
      input: "border-sky-900/50 focus:border-sky-500",
      accent: "text-sky-500",
      badge: "bg-sky-500/10 text-sky-400 border-sky-500/20"
    },
    obsidian: {
      wrapper: "bg-black text-white",
      card: "bg-[#0a0a0a] border-white/5",
      input: "border-white/10 focus:border-emerald-500",
      accent: "text-emerald-500",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    }
  }[activeTheme];

  return (
    <Skeleton 
      name="student-profile" 
      loading={!initialData}
      animate="shimmer"
      stagger={80}
      transition={300}
    >
    <div className={cn("min-h-screen -mt-8 -mx-8 px-8 py-16 transition-colors duration-500", themeStyles.wrapper)}>
      <div className="max-w-4xl mx-auto space-y-12 animate-in-fade">
        
        {/* Header & Theme Control */}
        <div className="pb-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Account Profile</h1>
            <div className={cn("mt-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-[0.2em] border w-fit", themeStyles.badge)}>
              {safeProfile.isApproved ? "Verified Candidate" : "Pending Audit"}
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
             {THEMES.map((t) => (
               <button
                 key={t.id}
                 onClick={() => setActiveTheme(t.id)}
                 className={cn(
                   "w-6 h-6 rounded-lg transition-all",
                   t.color,
                   activeTheme === t.id ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110" : "opacity-40 hover:opacity-100"
                 )}
               />
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: Identity Card */}
          <div className="md:col-span-1 space-y-6">
             <div className={cn("relative aspect-square w-full rounded-2xl border overflow-hidden group shadow-2xl transition-colors duration-500", themeStyles.card)}>
                {imagePreview ? (
                  <Image 
                    src={imagePreview} 
                    alt={safeProfile.name || "Student"} 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-10">
                    <UserIcon className="h-20 w-20" />
                  </div>
                )}
                {isImageUploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  </div>
                )}
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="h-6 w-6 text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isImageUploading} />
                </label>
             </div>
             <div className="px-1">
                <p className="text-sm font-bold tracking-tight">{safeProfile.name}</p>
                <p className="text-xs opacity-50 font-medium">{safeProfile.email}</p>
             </div>
          </div>

          {/* Right: Themed Cards & Form */}
          <div className="md:col-span-2 space-y-12">
            
            {/* Quick Metrics (Simplified Cards) */}
            <div className="grid grid-cols-3 gap-6">
               {[
                 { label: "Hours", val: totalHours.toFixed(0), target: "/300" },
                 { label: "Apps", val: appCount, target: "" },
                 { label: "Year", val: new Date(safeProfile.createdAt).getFullYear(), target: "" },
               ].map((m) => (
                 <div key={m.label} className={cn("p-5 rounded-2xl border transition-colors duration-500", themeStyles.card)}>
                    <p className="text-[9px] font-bold uppercase opacity-40 tracking-[0.2em] mb-2">{m.label}</p>
                    <p className="text-xl font-bold tracking-tight">
                      {m.val}<span className="text-[10px] opacity-20 ml-0.5">{m.target}</span>
                    </p>
                 </div>
               ))}
            </div>

            {/* Main Configuration Form */}
            <form onSubmit={handleSubmit} className={cn("p-8 rounded-3xl border transition-colors duration-500 space-y-10", themeStyles.card)}>
              {error && <div className="text-xs text-red-500 font-bold mb-4">{error}</div>}
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase opacity-40 tracking-[0.2em] ml-1">Full Name</label>
                  <input
                    name="name"
                    required
                    defaultValue={safeProfile.name ?? ""}
                    className={cn(
                      "w-full h-12 px-4 rounded-xl border bg-black/20 text-sm font-medium outline-none transition-all duration-300",
                      themeStyles.input
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase opacity-40 tracking-[0.2em] ml-1">Academic Program</label>
                  <div className="relative">
                    <select
                      name="course"
                      defaultValue={safeProfile.course ?? ""}
                      className={cn(
                        "w-full h-12 px-4 rounded-xl border bg-black/20 text-sm font-medium outline-none appearance-none cursor-pointer transition-all duration-300",
                        themeStyles.input
                      )}
                    >
                      <option value="" disabled className="bg-black">Select program...</option>
                      {hasLegacyCourse && <option value={safeProfile.course ?? ""} className="bg-black">Current: {safeProfile.course}</option>}
                      {COURSE_OPTIONS.map((course) => <option key={course} value={course} className="bg-black">{course}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                <button
                  type="submit"
                  disabled={isPending}
                  className={cn(
                    "flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:opacity-80 active:scale-95 disabled:opacity-50",
                    themeStyles.accent
                  )}
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Identity
                </button>
                {success && <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest animate-in fade-in">Synchronized</p>}
              </div>
            </form>

            <div className="flex items-center gap-4 px-2 opacity-30">
               <ShieldCheck className="h-4 w-4" />
               <p className="text-[10px] font-medium leading-relaxed tracking-wide">
                 Identity verification is managed by the SIT Administration Desk. 
                 Contact support to modify restricted records.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Skeleton>
  );
}
