"use client";

import { Skeleton } from "boneyard-js/react";
import Image from "next/image";
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
  Image as ImageIcon,
  Briefcase
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
      const MAX_SIZE = 3 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        setError("Image size exceeds 3MB limit.");
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
      setError(res.error || "Failed to post opening.");
    }
    setIsSubmitting(false);
  };

  const handleToggleStatus = async (id: string, current: PostingStatus) => {
    const res = await togglePostingStatus(id, current);
    if (res.success) await loadPostings();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this posting? This cannot be undone.")) {
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
    <div className="space-y-8 pb-24 max-w-7xl mx-auto">
      {/* Header - Simple */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/60">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Postings</h1>
          <p className="text-sm text-muted-foreground font-medium italic">Manage openings for student trainees.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted p-1 rounded-xl border border-border/40">
             <button 
              onClick={() => setViewMode('cards')}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'cards' ? "bg-card text-primary shadow-sm" : "text-muted-foreground/40 hover:text-foreground")}
             >
               <LayoutGrid className="h-4 w-4" />
             </button>
             <button 
              onClick={() => setViewMode('table')}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'table' ? "bg-card text-primary shadow-sm" : "text-muted-foreground/40 hover:text-foreground")}
             >
               <TableIcon className="h-4 w-4" />
             </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4" /> Post Opening
          </button>
        </div>
      </div>

      {/* Filters - Simple */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <input
            type="text"
            placeholder="Search positions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-11 rounded-xl border border-border/60 bg-card text-sm outline-none focus:border-primary transition-all shadow-sm"
          />
        </div>
        <div className="px-4 py-2 bg-muted/30 rounded-xl border border-border/40 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          {filtered.length} Active Listings
        </div>
      </div>

      {/* Grid Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'cards' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.length === 0 && !isLoading ? (
              <div className="col-span-full py-24 text-center rounded-3xl border-2 border-dashed border-border/40 bg-muted/5">
                <p className="text-xs text-muted-foreground/40 font-bold uppercase tracking-widest">No matching openings</p>
              </div>
            ) : (
              filtered.map((p) => (
                <div key={p.id} className="group bg-card border border-border/50 rounded-2xl p-5 shadow-sm hover:border-primary/20 transition-all flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-muted-foreground/30 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {p.title[0]}
                    </div>
                    <div className="flex items-center gap-1.5">
                       <button 
                        onClick={() => handleToggleStatus(p.id, p.status)}
                        className={cn(
                          "px-2 py-1 rounded-lg text-[8px] font-bold uppercase tracking-widest border transition-all",
                          p.status === 'OPEN' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground/40 border-border"
                        )}
                       >
                         {p.status === 'OPEN' ? "Visible" : "Hidden"}
                       </button>
                       <button 
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"
                       >
                         <Trash2 className="h-3.5 w-3.5" />
                       </button>
                    </div>
                  </div>

                  <div className="space-y-1 mb-4 flex-1">
                    <h3 className="font-bold text-foreground truncate">{p.title}</h3>
                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 truncate">
                      <MapPin className="h-3 w-3 opacity-30" /> {p.location}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <div className="px-2 py-0.5 bg-muted rounded-md text-[9px] font-bold text-muted-foreground flex items-center gap-1">
                       <Clock className="h-2.5 w-2.5" /> {p.requiredHours}h
                    </div>
                    <div className="px-2 py-0.5 bg-primary/10 rounded-md text-[9px] font-bold text-primary uppercase">
                       {TYPE_LABEL[p.type]}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                      <Users className="h-3.5 w-3.5 text-muted-foreground/20" />
                      {p._count.applications} <span className="text-[9px] text-muted-foreground font-medium">Applicants</span>
                    </div>
                    {p.posterUrl && (
                      <button 
                        onClick={() => setSelectedPoster(p.posterUrl)}
                        className="text-[9px] font-bold text-primary hover:underline uppercase tracking-widest"
                      >
                        View Poster
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
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left">Title</th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left hidden md:table-cell">Type</th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left hidden md:table-cell">Hours</th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 text-left">Applied</th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-24 text-center text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest">No Postings</td>
                    </tr>
                  ) : (
                    filtered.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/10 transition-colors group">
                        <td className="px-6 py-3">
                          <p className="font-bold text-foreground text-xs">{p.title}</p>
                          <p className="text-[10px] text-muted-foreground font-medium truncate max-w-[150px]">{p.location}</p>
                        </td>
                        <td className="px-6 py-3 hidden md:table-cell">
                          <span className="text-[9px] font-bold text-primary uppercase">{TYPE_LABEL[p.type]}</span>
                        </td>
                        <td className="px-6 py-3 hidden md:table-cell font-bold text-muted-foreground text-xs">{p.requiredHours}h</td>
                        <td className="px-6 py-3">
                          <span className="text-xs font-bold text-foreground">{p._count.applications}</span>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                              onClick={() => handleToggleStatus(p.id, p.status)}
                              className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
                             >
                               {p.status === 'OPEN' ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                             </button>
                             <button 
                              onClick={() => handleDelete(p.id)}
                              className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-all"
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

      {/* Modal - Simple Form */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm animate-in fade-in transition-all">
          <div className="relative w-full max-w-3xl bg-card border border-border/60 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-5 border-b border-border/40 flex items-center justify-between bg-muted/20">
              <h3 className="text-lg font-bold text-foreground tracking-tight">Post Job Opening</h3>
              <button onClick={() => setShowModal(false)} className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground/30 hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-600 font-bold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Job Title *</label>
                  <input name="title" required type="text" placeholder="e.g. Intern Engineer"
                    className="w-full h-11 px-4 rounded-xl border border-border/60 bg-muted/20 text-sm outline-none focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Location *</label>
                  <input name="location" required type="text" placeholder="City or Office"
                    className="w-full h-11 px-4 rounded-xl border border-border/60 bg-muted/20 text-sm outline-none focus:border-primary transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Location Type *</label>
                  <div className="relative">
                    <select name="type" defaultValue="ON_SITE"
                      className="w-full h-11 pl-4 pr-10 rounded-xl border border-border/60 bg-muted/20 text-sm appearance-none cursor-pointer focus:border-primary transition-all">
                      <option value="ON_SITE">On-site</option>
                      <option value="REMOTE">Remote</option>
                      <option value="HYBRID">Hybrid</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Training Hours *</label>
                  <input name="requiredHours" required type="number" defaultValue={300}
                    className="w-full h-11 px-4 rounded-xl border border-border/60 bg-muted/20 text-sm outline-none focus:border-primary transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Summary *</label>
                <textarea name="description" required rows={3} placeholder="Briefly describe the role..."
                  className="w-full p-4 rounded-xl border border-border/60 bg-muted/20 text-sm outline-none focus:border-primary resize-none transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Responsibilities (Enter)</label>
                  <div className="min-h-[100px] border border-border/60 rounded-xl bg-muted/10 p-3 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {resps.map((r) => (
                        <span key={r} className="px-2 py-1 bg-card text-[10px] font-bold rounded-lg border border-border flex items-center gap-1.5">
                          {r} <X className="h-3 w-3 cursor-pointer text-muted-foreground/40" onClick={() => setResps(resps.filter(x => x !== r))} />
                        </span>
                      ))}
                    </div>
                    <input value={respInput} onChange={(e) => setRespInput(e.target.value)} onKeyDown={handleRespKey}
                      placeholder="Add task..." className="bg-transparent outline-none text-sm w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Requirements (Enter)</label>
                  <div className="min-h-[100px] border border-border/60 rounded-xl bg-muted/10 p-3 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {reqs.map((r) => (
                        <span key={r} className="px-2 py-1 bg-card text-[10px] font-bold rounded-lg border border-border flex items-center gap-1.5">
                          {r} <X className="h-3 w-3 cursor-pointer text-muted-foreground/40" onClick={() => setReqs(reqs.filter(x => x !== r))} />
                        </span>
                      ))}
                    </div>
                    <input value={reqInput} onChange={(e) => setReqInput(e.target.value)} onKeyDown={handleReqKey}
                      placeholder="Add skill..." className="bg-transparent outline-none text-sm w-full" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Marketing Poster (Optional)</label>
                <div className="relative h-14 rounded-xl border-2 border-dashed border-border/40 flex items-center px-4 hover:border-primary/50 transition-all cursor-pointer bg-muted/10">
                  {posterPreview ? (
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg relative overflow-hidden">
                         <Image src={posterPreview} alt="Preview" fill className="object-cover" unoptimized />
                      </div>
                      <span className="text-[10px] font-bold text-primary uppercase">Image Attached</span>
                      <button type="button" onClick={() => setPosterPreview(null)} className="ml-auto text-rose-500"><X className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground/40">
                      <ImageIcon className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Select Image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-primary text-white text-sm font-bold uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Post Job Opening"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Poster Preview */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedPoster(null)}
            className="fixed inset-0 z-[200] bg-background/95 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedPoster} alt="Job Poster" width={800} height={1200} className="rounded-2xl shadow-2xl" unoptimized />
              <button onClick={() => setSelectedPoster(null)} className="fixed top-8 right-8 text-primary bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center border border-primary/20"><X className="h-5 w-5" /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </Skeleton>
  );
}
