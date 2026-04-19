"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, MapPin, Clock, X, Loader2, ChevronDown } from "lucide-react";
import { getEmployerPostings, createSITPosting } from "./actions";
import { SITPosting, PlacementType, PostingStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

type PostingWithCount = SITPosting & {
  _count: { applications: number };
  company: { name: string };
};

const STATUS_STYLE: Record<PostingStatus, string> = {
  OPEN:   "bg-primary/10 text-primary border-primary/20",
  CLOSED: "bg-muted text-muted-foreground border-border",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    fd.append("tags", tags.join(","));
    const res = await createSITPosting(fd);
    if (res.success) {
      setShowModal(false);
      setTags([]);
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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Manage</p>
          <h1 className="text-2xl font-black tracking-tight text-foreground">SIT Postings</h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Posting
        </button>
      </div>

      {/* Search + summary */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search postings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 h-9 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">{filtered.length} of {postings.length} postings</span>
      </div>

      {/* Postings table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left">
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Position</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden md:table-cell">Type</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden md:table-cell">Hours</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Applicants</th>
                <th className="px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-xs text-muted-foreground font-mono">
                    {postings.length === 0 ? "No postings yet. Create your first SIT role." : "No results match your search."}
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-bold text-foreground leading-tight">{p.title}</p>
                      <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {p.location}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs font-medium text-muted-foreground">{TYPE_LABEL[p.type]}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                        <Clock className="h-3 w-3" /> {p.requiredHours}h
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-black font-mono text-foreground tabular-nums">{p._count.applications}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                        STATUS_STYLE[p.status]
                      )}>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-xl bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest">Post SIT Role</h3>
              <button onClick={() => setShowModal(false)} className="h-8 w-8 rounded-md hover:bg-muted flex items-center justify-center transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2 font-bold">
                  {error}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Job Title *</label>
                  <input name="title" required placeholder="e.g. Backend Engineer Trainee"
                    className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Location *</label>
                  <input name="location" required placeholder="e.g. Bacolod City"
                    className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Placement Type</label>
                  <div className="relative">
                    <select name="type" defaultValue="ON_SITE"
                      className="w-full h-9 pl-3 pr-8 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none">
                      <option value="ON_SITE">On-site</option>
                      <option value="REMOTE">Remote</option>
                      <option value="HYBRID">Hybrid</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Required Hours</label>
                  <input name="requiredHours" type="number" defaultValue={300} min={1}
                    className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Description *</label>
                <textarea name="description" required rows={3} placeholder="Duties, expectations, requirements..."
                  className="w-full p-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Tags (press Enter)</label>
                <div className="min-h-[38px] border border-border rounded-md bg-background p-2 flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span key={t} className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded border border-primary/20">
                      {t} <X className="h-2.5 w-2.5 cursor-pointer" onClick={() => setTags(tags.filter(x => x !== t))} />
                    </span>
                  ))}
                  <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKey}
                    placeholder={tags.length === 0 ? "e.g. React, Python..." : ""} className="flex-1 bg-transparent outline-none text-sm min-w-[100px]" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full h-10 rounded-md bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish Posting"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
