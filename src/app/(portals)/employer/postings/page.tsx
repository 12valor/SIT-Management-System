"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useEffect, useCallback } from "react";
import { 
  Plus, 
  Search, 
  MapPin, 
  Clock, 
  X, 
  Loader2, 
  ChevronDown, 
  Building2, 
  Users, 
  Trash2, 
  Eye, 
  EyeOff, 
  LayoutGrid, 
  Table as TableIcon,
  Image as ImageIcon
} from "lucide-react";
import { getEmployerPostings, createSITPosting, togglePostingStatus, deleteSITPosting } from "./actions";
import { SITPosting, PlacementType, PostingStatus } from "@/generated/client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  const [respInput, setRespInput] = useState("");
  const [resps, setResps] = useState<string[]>([]);
  const [reqInput, setReqInput] = useState("");
  const [reqs, setReqs] = useState<string[]>([]);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const loadPostings = useCallback(async () => {
    const res = await getEmployerPostings();
    if (res.success && res.data) setPostings(res.data as PostingWithCount[]);
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

  const handleRespKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && respInput.trim()) {
      e.preventDefault();
      if (!resps.includes(respInput.trim())) setResps([...resps, respInput.trim()]);
      setRespInput("");
    }
  };

  const handleReqKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && reqInput.trim()) {
      e.preventDefault();
      if (!reqs.includes(reqInput.trim())) setReqs([...reqs, reqInput.trim()]);
      setReqInput("");
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
    fd.append("responsibilities", resps.join("\n"));
    fd.append("requirements", reqs.join("\n"));
    if (posterPreview) fd.append("poster", posterPreview);
    const res = await createSITPosting(fd);
    if (res.success) {
      setShowModal(false);
      setTags([]);
      setResps([]);
      setReqs([]);
      setPosterPreview(null);
      await loadPostings();
    } else {
      setError(res.error || "Failed to create posting.");
    }
    setIsSubmitting(false);
  };

  const handleToggleStatus = async (id: string, current: PostingStatus) => {
    const res = await togglePostingStatus(id, current);
    if (res.success) await loadPostings();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to decommission this industrial opportunity? This action is irreversible.")) {
      const res = await deleteSITPosting(id);
      if (res.success) await loadPostings();
    }
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
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Industrial Registry</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage and broadcast strategic training opportunities for students.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
             <button 
              onClick={() => setViewMode('cards')}
              className={cn("p-2 rounded-md transition-all", viewMode === 'cards' ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}
             >
               <LayoutGrid className="h-4 w-4" />
             </button>
             <button 
              onClick={() => setViewMode('table')}
              className={cn("p-2 rounded-md transition-all", viewMode === 'table' ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}
             >
               <TableIcon className="h-4 w-4" />
             </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/10 hover:brightness-110 transition-all active:scale-95 shrink-0"
          >
            <Plus className="h-4 w-4" /> New Opportunity
          </button>
        </div>
      </div>

      {/* Search + summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <input
            type="text"
            placeholder="Filter by position or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-12 rounded-2xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest bg-card px-4 py-2 rounded-xl border border-border shadow-sm">
            {filtered.length} Active Listings
          </p>
        </div>
      </div>

      {/* Display Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'cards' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          >
            {filtered.length === 0 && !isLoading ? (
              <div className="col-span-full py-32 text-center rounded-2xl border-2 border-dashed border-border bg-muted/5">
                <p className="text-sm text-slate-300 font-bold uppercase tracking-widest">No matching industrial roles</p>
              </div>
            ) : (
              filtered.map((p) => (
                <div key={p.id} className="group bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/20 transition-all flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-lg font-bold text-muted-foreground/40 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                        {p.company.name[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground leading-tight">{p.title}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mt-1">
                          <Building2 className="h-3 w-3 opacity-40" /> {p.company.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <button 
                        onClick={() => handleToggleStatus(p.id, p.status)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border transition-all",
                          p.status === 'OPEN' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"
                        )}
                       >
                         {p.status === 'OPEN' ? <span className="flex items-center gap-1.5"><Eye className="h-3 w-3" /> Visible</span> : <span className="flex items-center gap-1.5"><EyeOff className="h-3 w-3" /> Hidden</span>}
                       </button>
                       <button 
                        onClick={() => handleDelete(p.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                       >
                         <Trash2 className="h-3.5 w-3.5" />
                       </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/50 rounded-lg border border-border text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                       <MapPin className="h-3 w-3 opacity-40" /> {p.location}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/50 rounded-lg border border-border text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                       <Clock className="h-3 w-3 opacity-40" /> {p.requiredHours}h
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/5 rounded-lg border border-primary/10 text-[10px] font-black text-primary uppercase tracking-widest">
                       {TYPE_LABEL[p.type]}
                    </div>
                  </div>

                  {/* Bulleted Lists Section */}
                  {((p.responsibilities?.length || 0) > 0 || (p.requirements?.length || 0) > 0) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 p-5 bg-muted/30 rounded-xl border border-border/50 flex-1">
                      {(p.responsibilities?.length || 0) > 0 && (
                        <div className="space-y-2.5">
                          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-primary/70">Strategic Role</p>
                          <ul className="space-y-1.5">
                            {p.responsibilities.slice(0, 3).map((r, i) => (
                              <li key={i} className="flex gap-2 text-[10px] text-muted-foreground leading-tight">
                                <span className="text-primary mt-0.5">•</span> {r}
                              </li>
                            ))}
                            {(p.responsibilities?.length || 0) > 3 && (
                              <li className="text-[9px] font-bold text-muted-foreground/40 italic ml-3">+ {p.responsibilities.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                      {(p.requirements?.length || 0) > 0 && (
                        <div className="space-y-2.5">
                          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground/60">Candidate Prerequisites</p>
                          <ul className="space-y-1.5">
                            {p.requirements.slice(0, 3).map((r, i) => (
                              <li key={i} className="flex gap-2 text-[10px] text-muted-foreground leading-tight">
                                <span className="text-muted-foreground/30 mt-0.5">•</span> {r}
                              </li>
                            ))}
                            {(p.requirements?.length || 0) > 3 && (
                              <li className="text-[9px] font-bold text-muted-foreground/40 italic ml-3">+ {p.requirements.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <div className="flex items-center gap-3">
                       <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                         <Users className="h-4 w-4 text-muted-foreground/30" />
                         {p._count.applications} <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">Applicants</span>
                       </div>
                    </div>
                    {p.posterUrl && (
                      <button 
                        onClick={() => setSelectedPoster(p.posterUrl)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm hover:brightness-110 active:scale-95 transition-all"
                      >
                        <ImageIcon className="h-3 w-3" /> Job Poster
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left">Position Title</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left hidden md:table-cell">Modality</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left hidden md:table-cell">Duration</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left">Applications</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-32 text-center text-sm font-bold text-muted-foreground/40 uppercase tracking-widest">No Active Postings</td>
                    </tr>
                  ) : (
                    filtered.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/20 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-bold text-foreground">{p.title}</p>
                          <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5"><MapPin className="h-3 w-3 opacity-30" /> {p.location}</p>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">{TYPE_LABEL[p.type]}</span>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell font-bold text-muted-foreground">{p.requiredHours}h</td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted border border-border text-[11px] font-bold text-foreground">
                            {p._count.applications}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                              onClick={() => handleToggleStatus(p.id, p.status)}
                              className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all"
                              title={p.status === 'OPEN' ? "Hide Posting" : "Make Visible"}
                             >
                               {p.status === 'OPEN' ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                             </button>
                             <button 
                              onClick={() => handleDelete(p.id)}
                              className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-all"
                             >
                               <Trash2 className="h-4 w-4" />
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm animate-in fade-in transition-all">
          <div className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground leading-none">Broadcast SIT Opportunity</h3>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Industrial Training Registry</p>
              </div>
              <button onClick={() => setShowModal(false)} className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground/40 hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500 font-bold flex items-center gap-2">
                  <X className="h-4 w-4" /> {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Opportunity Title *</label>
                  <input name="title" required placeholder="e.g. Software Systems Intern"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Site Location *</label>
                  <input name="location" required placeholder="e.g. Metro Manila"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Clock Requirement</label>
                  <input name="requiredHours" type="number" defaultValue={300} min={1}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Training Modality</label>
                  <div className="relative">
                    <select name="type" defaultValue="ON_SITE"
                      className="w-full h-12 pl-4 pr-10 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary appearance-none cursor-pointer transition-all">
                      <option value="ON_SITE">On-site Presence</option>
                      <option value="REMOTE">Remote Operations</option>
                      <option value="HYBRID">Hybrid Engagement</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 pointer-events-none" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Industrial Scope *</label>
                  <textarea name="description" required rows={2} placeholder="Define duties, technical expectations, and academic requirements..."
                    className="w-full p-4 h-24 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary resize-none transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Strategic Responsibilities (Press Enter)</label>
                  <div className="min-h-[140px] border border-border rounded-2xl bg-muted/20 p-3 flex flex-col transition-all">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {resps.map((r) => (
                        <span key={r} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-card text-muted-foreground text-[10px] font-bold rounded-lg border border-border shadow-sm">
                          {r} <X className="h-3 w-3 cursor-pointer text-muted-foreground/40 hover:text-destructive" onClick={() => setResps(resps.filter(x => x !== r))} />
                        </span>
                      ))}
                    </div>
                    <input value={respInput} onChange={(e) => setRespInput(e.target.value)} onKeyDown={handleRespKey}
                      placeholder="e.g. System maintenance..." className="bg-transparent outline-none text-xs text-foreground w-full px-2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Candidate Prerequisites (Press Enter)</label>
                  <div className="min-h-[140px] border border-border rounded-2xl bg-muted/20 p-3 flex flex-col transition-all">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {reqs.map((r) => (
                        <span key={r} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-card text-muted-foreground text-[10px] font-bold rounded-lg border border-border shadow-sm">
                          {r} <X className="h-3 w-3 cursor-pointer text-muted-foreground/40 hover:text-destructive" onClick={() => setReqs(reqs.filter(x => x !== r))} />
                        </span>
                      ))}
                    </div>
                    <input value={reqInput} onChange={(e) => setReqInput(e.target.value)} onKeyDown={handleReqKey}
                      placeholder="e.g. BSCS Student..." className="bg-transparent outline-none text-xs text-foreground w-full px-2" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Technical Taxonomy (press Enter)</label>
                  <div className="min-h-[52px] border border-border rounded-xl bg-muted/20 p-2.5 flex flex-wrap gap-2 transition-all">
                    {tags.map((t) => (
                      <span key={t} className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded-lg border border-primary/10 shadow-sm">
                        {t} <X className="h-3 w-3 cursor-pointer text-primary/40 hover:text-destructive" onClick={() => setTags(tags.filter(x => x !== t))} />
                      </span>
                    ))}
                    <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKey}
                      placeholder={tags.length === 0 ? "e.g. React, CAD..." : ""} className="flex-1 bg-transparent outline-none text-xs text-foreground min-w-[120px] ml-1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider ml-1">Visual Job Poster (Optional)</label>
                  <div className="relative h-[52px] rounded-xl border border-dashed border-border bg-muted/10 overflow-hidden flex items-center px-4 group/poster hover:border-primary/50 transition-all">
                    {posterPreview ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                           <img src={posterPreview} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Poster Attached</p>
                        <button type="button" onClick={() => setPosterPreview(null)} className="ml-2 text-destructive hover:scale-110 transition-transform"><X className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-muted-foreground/40 group-hover/poster:text-primary transition-colors">
                        <ImageIcon className="h-4 w-4" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Attach Marketing Visual</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button type="submit" disabled={isSubmitting}
                  className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/10 hover:brightness-110 transition-all disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-3">
                  {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Broadcast Opportunity <Plus className="h-4 w-4" /></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Poster Modal */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPoster(null)}
            className="fixed inset-0 z-[200] bg-background/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedPoster} 
                alt="Job Poster" 
                className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-2xl border border-white/10"
              />
              
              <button 
                onClick={() => setSelectedPoster(null)}
                className="fixed top-8 right-8 h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary transition-all hover:scale-110 active:scale-95 z-[210] border border-primary/20"
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </Skeleton>
  );
}
