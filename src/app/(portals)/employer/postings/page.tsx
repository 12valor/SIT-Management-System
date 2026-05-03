"use client";

import { Skeleton } from "boneyard-js/react";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, MapPin, Clock, X, Loader2, ChevronDown } from "lucide-react";
import { getEmployerPostings, createSITPosting } from "./actions";
import { SITPosting, PlacementType } from "@prisma/client";
import { cn } from "@/lib/utils";

type PostingWithCount = SITPosting & {
  _count: { applications: number };
  company: { name: string };
};

const TYPE_LABEL: Record<PlacementType, string> = {
  ON_SITE: "On-site",
  REMOTE:  "Remote",
  HYBRID:  "Hybrid",
};

export default function EmployerPostingsPage() {
  const [postings, setPostings] = useState<PostingWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadPostings = useCallback(async () => {
    const res = await getEmployerPostings();
    if (res.success && res.data) setPostings(res.data);
    setIsLoading(false);
  }, []);

  useEffect(() => { loadPostings(); }, [loadPostings]);

  const handleTagKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const MAX_SIZE = 3 * 1024 * 1024; // 3MB limit for posters
      if (file.size > MAX_SIZE) {
        setError("Poster file exceeds 3MB industrial limit.");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPosterPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    fd.append("tags", tags.join(","));
    if (posterPreview) fd.append("poster", posterPreview);
    const res = await createSITPosting(fd);
    if (res.success) {
      setShowModal(false);
      setTags([]);
      setPosterPreview(null);
      await loadPostings();
    } else {
      setError(res.error || "Failed to create posting.");
    }
    setIsSubmitting(false);
  };

  const filtered = postings.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Skeleton 
      name="employer-postings" 
      loading={isLoading}
      fallback={
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin opacity-20" />
        </div>
      }
    >
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">SIT Opportunities</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage and monitor your active industrial training roles.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground text-xs font-black uppercase tracking-wider shadow-md shadow-primary/10 hover:brightness-90 transition-all active:scale-95 shrink-0"
        >
          <Plus className="h-4 w-4" /> Post New Role
        </button>
      </div>

      {/* Search + summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <input
            type="text"
            placeholder="Filter opportunities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-11 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
          />
        </div>
        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest bg-card px-3 py-1.5 rounded-lg border border-border shadow-sm">
          {filtered.length} Displaying results
        </p>
      </div>

      {/* Postings table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left">Position Title</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left hidden md:table-cell">Modality</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left hidden md:table-cell">Duration</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left">Applications</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-right">Visibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={5} className="py-32 text-center">
                    <p className="text-sm text-slate-300 font-bold uppercase tracking-widest">
                      {postings.length === 0 ? "No Active Postings" : "No results match query"}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-foreground leading-tight">{p.title}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] font-medium text-muted-foreground/60">
                        <MapPin className="h-3 w-3" /> {p.location}
                        {p.posterUrl && (
                          <span className="ml-2 px-1.5 py-0.5 bg-primary/5 text-primary border border-primary/10 rounded uppercase tracking-tighter text-[8px] font-black">Poster attached</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs font-bold text-muted-foreground">{TYPE_LABEL[p.type]}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/60">
                        <Clock className="h-3.5 w-3.5" /> {p.requiredHours}h Target
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center justify-center min-w-8 h-8 rounded-lg bg-muted border border-border text-sm font-bold text-foreground tabular-nums">
                        {p._count.applications}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border shadow-sm",
                        p.status === 'OPEN' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground/60 border-border"
                      )}>
                        <div className={cn("w-1 h-1 rounded-full mr-1.5", p.status === 'OPEN' ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/40")} />
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm animate-in fade-in transition-all">
          <div className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">Post New SIT Opportunity</h3>
                <p className="text-xs text-muted-foreground font-medium">Define parameters for student internships.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground/40 hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600 font-bold">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Opportunity Title *</label>
                  <input name="title" required placeholder="e.g. Software Systems Intern"
                    className="w-full h-11 px-4 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Site Location *</label>
                  <input name="location" required placeholder="e.g. Metro Manila"
                    className="w-full h-11 px-4 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Training Modality</label>
                  <div className="relative">
                    <select name="type" defaultValue="ON_SITE"
                      className="w-full h-11 pl-4 pr-10 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary appearance-none cursor-pointer transition-all">
                      <option value="ON_SITE">On-site Presence</option>
                      <option value="REMOTE">Remote Operations</option>
                      <option value="HYBRID">Hybrid Engagement</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Clock Requirement</label>
                  <input name="requiredHours" type="number" defaultValue={300} min={1}
                    className="w-full h-11 px-4 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Industrial Scope *</label>
                <textarea name="description" required rows={3} placeholder="Define duties, technical expectations, and academic requirements..."
                  className="w-full p-4 h-32 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary resize-none shadow-sm transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Key Responsibilities</label>
                  <textarea name="responsibilities" rows={4} placeholder="• Develop software modules&#10;• Maintain system records&#10;• Coordinate with team leads..."
                    className="w-full p-4 h-40 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary resize-none shadow-sm transition-all" />
                  <p className="text-[9px] text-muted-foreground/60 italic ml-1">Enter each responsibility on a new line.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Academic / Technical Requirements</label>
                  <textarea name="requirements" rows={4} placeholder="• Enrolled in BSIT / BSCS&#10;• Proficient in TypeScript&#10;• Basic Git knowledge..."
                    className="w-full p-4 h-40 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary resize-none shadow-sm transition-all" />
                  <p className="text-[9px] text-muted-foreground/60 italic ml-1">Enter each requirement on a new line.</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Technical Taxonomy (press Enter)</label>
                <div className="min-h-[44px] border border-border rounded-xl bg-muted/30 p-2.5 flex flex-wrap gap-2 transition-all">
                  {tags.map((t) => (
                    <span key={t} className="flex items-center gap-1.5 px-2.5 py-1 bg-card text-muted-foreground text-[10px] font-bold rounded-lg border border-border shadow-sm">
                      {t} <X className="h-3 w-3 cursor-pointer text-muted-foreground/40 hover:text-destructive" onClick={() => setTags(tags.filter(x => x !== t))} />
                    </span>
                  ))}
                  <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKey}
                    placeholder={tags.length === 0 ? "e.g. React, Logistics, CAD..." : ""} className="flex-1 bg-transparent outline-none text-sm text-foreground min-w-[120px] ml-2" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Visual Job Poster (Optional)</label>
                <div className="flex items-center gap-4">
                  <div className="relative w-full h-32 rounded-xl border-2 border-dashed border-border bg-muted/20 overflow-hidden flex items-center justify-center group/poster hover:border-primary/50 transition-all">
                    {posterPreview ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={posterPreview} 
                          alt="Poster preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/poster:opacity-100 flex items-center justify-center transition-opacity">
                           <p className="text-[10px] font-bold text-white uppercase tracking-widest">Change Image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground/40 group-hover/poster:text-primary transition-colors">
                        <Plus className="h-6 w-6" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Upload Marketing Poster</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="max-w-[200px] space-y-1">
                    <p className="text-[9px] text-muted-foreground leading-relaxed font-medium">
                      An industrial-grade visual representation of the role. PNG, JPG recommended. Max 3MB.
                    </p>
                    {posterPreview && (
                      <button 
                        type="button" 
                        onClick={() => setPosterPreview(null)}
                        className="text-[9px] font-bold text-destructive uppercase tracking-widest hover:underline"
                      >
                        Remove Poster
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#800000] text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-red-900/10 hover:bg-red-900 transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Broadcast Opportunity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </Skeleton>
  );
}
