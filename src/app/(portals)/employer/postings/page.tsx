"use client";

import { Skeleton } from "boneyard-js/react";

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
    <Skeleton 
      name="employer-postings" 
      loading={isLoading}
      fallback={
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="h-10 w-10 text-[#800000] animate-spin opacity-20" />
        </div>
      }
    >
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">SIT Opportunities</h1>
          <p className="text-sm text-slate-500 font-medium">Manage and monitor your active industrial training roles.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 h-11 px-6 rounded-lg bg-[#800000] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-red-900/10 hover:bg-red-900 transition-all active:scale-95 shrink-0"
        >
          <Plus className="h-4 w-4" /> Post New Role
        </button>
      </div>

      {/* Search + summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
          <input
            type="text"
            placeholder="Filter opportunities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-11 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] transition-all shadow-sm"
          />
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          {filtered.length} Displaying results
        </p>
      </div>

      {/* Postings table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left">Position Title</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left hidden md:table-cell">Modality</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left hidden md:table-cell">Duration</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-left">Applications</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Visibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
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
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 leading-tight">{p.title}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] font-medium text-slate-400">
                        <MapPin className="h-3 w-3" /> {p.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs font-bold text-slate-500">{TYPE_LABEL[p.type]}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <Clock className="h-3.5 w-3.5" /> {p.requiredHours}h Target
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center justify-center min-w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 tabular-nums">
                        {p._count.applications}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border shadow-sm",
                        p.status === 'OPEN' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-200"
                      )}>
                        <div className={cn("w-1 h-1 rounded-full mr-1.5", p.status === 'OPEN' ? "bg-emerald-500 animate-pulse" : "bg-slate-400")} />
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in transition-all">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Post New SIT Opportunity</h3>
                <p className="text-xs text-slate-500 font-medium">Define parameters for student internships.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-400 hover:text-slate-600">
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
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider ml-1">Opportunity Title *</label>
                  <input name="title" required placeholder="e.g. Software Systems Intern"
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider ml-1">Site Location *</label>
                  <input name="location" required placeholder="e.g. Metro Manila"
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider ml-1">Training Modality</label>
                  <div className="relative">
                    <select name="type" defaultValue="ON_SITE"
                      className="w-full h-11 pl-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] appearance-none cursor-pointer transition-all">
                      <option value="ON_SITE">On-site Presence</option>
                      <option value="REMOTE">Remote Operations</option>
                      <option value="HYBRID">Hybrid Engagement</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider ml-1">Clock Requirement</label>
                  <input name="requiredHours" type="number" defaultValue={300} min={1}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider ml-1">Industrial Scope *</label>
                <textarea name="description" required rows={3} placeholder="Define duties, technical expectations, and academic requirements..."
                  className="w-full p-4 h-32 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] resize-none shadow-sm transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider ml-1">Technical Taxonomy (press Enter)</label>
                <div className="min-h-[44px] border border-slate-200 rounded-xl bg-slate-50/50 p-2.5 flex flex-wrap gap-2 transition-all">
                  {tags.map((t) => (
                    <span key={t} className="flex items-center gap-1.5 px-2.5 py-1 bg-white text-slate-600 text-[10px] font-bold rounded-lg border border-slate-100 shadow-sm">
                      {t} <X className="h-3 w-3 cursor-pointer text-slate-300 hover:text-red-500" onClick={() => setTags(tags.filter(x => x !== t))} />
                    </span>
                  ))}
                  <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKey}
                    placeholder={tags.length === 0 ? "e.g. React, Logistics, CAD..." : ""} className="flex-1 bg-transparent outline-none text-sm min-w-[120px] ml-2" />
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
