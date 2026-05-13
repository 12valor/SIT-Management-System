"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useTransition, useEffect } from "react";
import { 
  User as UserIcon, 
  Save, 
  Loader2, 
  ShieldCheck, 
  Camera,
} from "lucide-react";
import { updateStudentProfile, updateStudentOwnImage } from "@/app/(portals)/student/profile/actions";
import { cn } from "@/lib/utils";
import { COURSES, isCourseCode } from "@/lib/courses";
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
    >
    <div className="max-w-4xl mx-auto space-y-12 animate-in-fade pb-32 pt-8">
      {/* Header */}
      <div className="pb-8 border-b border-border/60 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Account Profile</h1>
          <div className={cn(
            "mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border w-fit",
            safeProfile.isApproved 
              ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20" 
              : "bg-amber-500/5 text-amber-500 border-amber-500/20"
          )}>
            {safeProfile.isApproved ? "Verified Candidate" : "Pending Audit"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left: Identity */}
        <div className="md:col-span-1 space-y-4">
           <div className="relative aspect-square w-full rounded-2xl border border-border bg-muted overflow-hidden group shadow-sm">
              {imagePreview ? (
                <Image 
                  src={imagePreview} 
                  alt={safeProfile.name || "Student"} 
                  fill 
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-foreground/10">
                  <UserIcon className="h-20 w-20" />
                </div>
              )}
              {isImageUploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}
              <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                  disabled={isImageUploading}
                />
              </label>
           </div>
           <div className="space-y-1 px-1">
              <p className="text-sm font-bold text-foreground tracking-tight">{safeProfile.name}</p>
              <p className="text-xs text-muted-foreground font-medium">{safeProfile.email}</p>
           </div>
        </div>

        {/* Right: Info & Form */}
        <div className="md:col-span-2 space-y-12">
          {/* Simple Metrics */}
          <div className="grid grid-cols-3 gap-8 py-6 border-y border-border/40">
             <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider mb-1">Training Hours</p>
                <p className="text-xl font-bold text-foreground tracking-tight">
                  {totalHours.toFixed(0)}<span className="text-[10px] opacity-30 ml-0.5">/300</span>
                </p>
             </div>
             <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider mb-1">Submissions</p>
                <p className="text-xl font-bold text-foreground tracking-tight">{appCount}</p>
             </div>
             <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider mb-1">Admitted</p>
                <p className="text-xl font-bold text-foreground tracking-tight">{new Date(safeProfile.createdAt).getFullYear()}</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {error && <div className="text-xs text-red-500 font-bold mb-4">{error}</div>}
            
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-foreground/50 tracking-[0.2em] ml-0.5">Full Name</label>
                <input
                  name="name"
                  required
                  defaultValue={safeProfile.name ?? ""}
                  className="w-full h-11 border-b border-border/60 bg-transparent text-sm font-medium text-foreground outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-foreground/50 tracking-[0.2em] ml-0.5">Academic Program</label>
                <div className="relative">
                  <select
                    name="course"
                    defaultValue={safeProfile.course ?? ""}
                    className="w-full h-11 border-b border-border/60 bg-transparent text-sm font-medium text-foreground outline-none appearance-none cursor-pointer transition-colors focus:border-primary"
                  >
                    <option value="" disabled>Select program...</option>
                    {hasLegacyCourse && (
                      <option value={safeProfile.course ?? ""}>Current: {safeProfile.course}</option>
                    )}
                    {COURSES.map((course) => (
                      <option key={course.code} value={course.code}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-primary hover:text-primary/80 transition-all active:scale-95 disabled:opacity-50"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
              </button>
              {success && (
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest animate-in fade-in">Sync Complete</p>
              )}
            </div>
          </form>

          <div className="flex items-center gap-4 px-1 opacity-40">
             <ShieldCheck className="h-4 w-4" />
             <p className="text-[10px] font-medium leading-relaxed">
               Identity verification is managed by the SIT Administration Desk. 
               Contact support to modify restricted records.
             </p>
          </div>
        </div>
      </div>
    </div>
    </Skeleton>
  );
}
