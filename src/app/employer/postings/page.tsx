"use client";

import { useState } from "react";
import { useMockStore, SITPosting } from "@/store/mock-store";
import { 
  Plus, 
  Search, 
  MapPin, 
  Clock, 
  Briefcase, 
  Filter, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  X,
  Target,
  Send,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmployerPostingsPage() {
  const { postings, createPosting, applications } = useMockStore();
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    company: "Your Company Name", // Generic placeholder for new users
    description: "",
    requiredHours: 300,
    location: "",
    type: "On-site" as SITPosting['type'],
    tags: [] as string[],
  });

  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    createPosting(formData);
    setIsLoading(false);
    setIsAdding(false);
    setFormData({
      title: "",
      company: "Your Company Name",
      description: "",
      requiredHours: 300,
      location: "",
      type: "On-site",
      tags: [],
    });
  };

  const filteredPostings = postings.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-gradient">Manage Postings</h2>
          <p className="text-muted-foreground font-medium">Create and monitor your internship opportunities.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Create New Role
        </button>
      </div>

      {/* Metrics Mini-Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
         <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1">Total Active</p>
            <p className="text-xl font-black">{postings.length}</p>
         </div>
         <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1">Applications</p>
            <p className="text-xl font-black text-blue-600">
               {applications.filter(a => a.status === 'Pending').length} Pending
            </p>
         </div>
         <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1">Avg. Views</p>
            <p className="text-xl font-black">0</p>
         </div>
         <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1">Status</p>
            <p className="text-xl font-black text-green-600">Active</p>
         </div>
      </div>

      {/* Search & List */}
      <div className="space-y-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search through your postings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 h-12 rounded-2xl border border-border bg-card shadow-sm outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-sm font-medium"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredPostings.length > 0 ? (
            filteredPostings.reverse().map((posting) => (
              <div key={posting.id} className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-card border border-border hover:border-blue-600/50 transition-all hover:shadow-xl hover:shadow-blue-600/5">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 transition-colors">
                      <Target className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">{posting.title}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center text-xs font-semibold text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" /> {posting.location}
                        </span>
                        <span className="flex items-center text-xs font-semibold text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" /> {posting.requiredHours}h
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-black uppercase tracking-tight">
                          {posting.type}
                        </span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0 w-full md:w-auto">
                   <div className="text-right hidden sm:block mr-4">
                      <p className="text-[10px] font-black text-muted-foreground uppercase">Candidates</p>
                      <p className="text-sm font-bold">
                        {applications.filter(a => a.postingId === posting.id).length} Applied
                      </p>
                   </div>
                   <button className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-muted font-bold text-xs hover:bg-muted/80 transition-colors">
                      Manage Role
                   </button>
                   <button className="h-10 w-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <MoreVertical className="h-4 w-4" />
                   </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl">
              <p className="font-bold text-muted-foreground">No postings match your search</p>
            </div>
          )}
        </div>
      </div>

      {/* Creation Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsAdding(false)} />
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-border/50 flex justify-between items-center bg-muted/30">
              <div>
                <h3 className="text-2xl font-black tracking-tight">Post Opportunity</h3>
                <p className="text-sm text-muted-foreground font-medium">Reach top TUP-V students within minutes.</p>
              </div>
              <button 
                onClick={() => setIsAdding(false)}
                className="h-10 w-10 rounded-xl hover:bg-muted flex items-center justify-center transition-colors border border-border"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Job Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Backend Engineer Trainee"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 h-12 rounded-xl border border-border bg-muted/20 focus:bg-background focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Bacolod City"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 h-12 rounded-xl border border-border bg-muted/20 focus:bg-background focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Placement Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                    className="w-full px-4 h-12 rounded-xl border border-border bg-muted/20 focus:bg-background outline-none transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Required SIT Hours</label>
                  <input 
                    type="number" 
                    value={formData.requiredHours}
                    onChange={(e) => setFormData({...formData, requiredHours: parseInt(e.target.value)})}
                    className="w-full px-4 h-12 rounded-xl border border-border bg-muted/20 focus:bg-background outline-none transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Detailed Description</label>
                <textarea 
                  placeholder="What will the intern do? What are your expectations?"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-4 h-32 rounded-xl border border-border bg-muted/20 focus:bg-background outline-none transition-all font-medium resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Target Skills (Tags)</label>
                <div className="min-h-[50px] p-2 rounded-xl border border-border bg-muted/20 flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer hover:bg-white/20 rounded" onClick={() => removeTag(tag)} />
                    </span>
                  ))}
                  <input 
                    type="text" 
                    placeholder="Type and press Enter..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="flex-1 bg-transparent outline-none text-sm font-medium px-2 min-w-[120px]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex h-14 items-center justify-center rounded-2xl bg-blue-600 px-4 text-base font-black text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70"
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>Publish Opportunity <Send className="ml-3 h-5 w-5" /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
