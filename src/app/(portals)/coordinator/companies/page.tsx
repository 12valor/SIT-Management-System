"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useEffect, useCallback } from "react";
import { Search, ShieldCheck, ShieldAlert, Mail, Globe, Clock, Loader2, Plus, X, Building2, Edit, Trash2 } from "lucide-react";
import { getCompanies, setCompanyVerification, addCompany, updateCompany, deleteCompany } from "./actions";
import { cn } from "@/lib/utils";

type Company = {
  id: string;
  name: string;
  email: string;
  industry: string;
  location?: string | null;
  slots: number;
  description?: string | null;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  isVerified: boolean;
  joinedAt: Date;
  _count: { employers: number; postings: number };
};

export default function CoordinatorCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Add Partner Modal State
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    location: "",
    description: "",
    slots: 0,
    logoUrl: "",
    bannerUrl: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await getCompanies();
    setCompanies(res as Company[]);
    setIsLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleVerify = async (id: string, status: boolean) => {
    setProcessing(id);
    await setCompanyVerification(id, status);
    await load();
    setProcessing(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove ${name}? This action cannot be undone.`)) return;
    setProcessing(id);
    try {
      await deleteCompany(id);
      await load();
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(null);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "banner") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result as string;
      const compressed = await compressImage(dataUrl, type === "logo" ? 400 : 1200, 0.8);
      
      if (type === "logo") setFormData(prev => ({ ...prev, logoUrl: compressed }));
      else setFormData(prev => ({ ...prev, bannerUrl: compressed }));
    };
    reader.readAsDataURL(file);
  };

  // Helper to compress and convert to WebP
  const compressImage = (dataUrl: string, maxWidth: number, quality: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/webp", quality));
      };
    });
  };

  const handleEdit = (company: Company) => {
    setFormData({
      name: company.name,
      email: company.email,
      industry: company.industry,
      location: company.location || "",
      description: company.description || "",
      slots: company.slots,
      logoUrl: company.logoUrl || "",
      bannerUrl: company.bannerUrl || "",
    });
    setEditingId(company.id);
    setIsAdding(true);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateCompany(editingId, formData);
      } else {
        await addCompany(formData);
      }
      setIsAdding(false);
      setEditingId(null);
      setFormData({ name: "", email: "", industry: "", location: "", description: "", slots: 0, logoUrl: "", bannerUrl: "" });
      await load();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const verifiedCount  = companies.filter((c) => c.isVerified).length;
  const pendingCount   = companies.filter((c) => !c.isVerified).length;

  return (
    <Skeleton 
      name="coordinator-companies" 
      loading={isLoading}
      fallback={
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-muted rounded-lg" />
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-muted rounded-xl border border-border" />
            ))}
          </div>
          <div className="h-96 bg-muted rounded-xl border border-border" />
        </div>
      }
    >
      <div className="flex-1 space-y-12 relative">
        {/* Add Modal */}
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 md:pt-16">
            <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
              <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/30">
                <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">{editingId ? "Edit Partner" : "Add New Partner"}</h3>
                <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-foreground/50 hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleAddSubmit} className="p-5 overflow-y-auto flex flex-col gap-5">
                
                {/* Media Upload Section */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center justify-center gap-3 py-3 border-2 border-dashed border-border rounded-xl bg-muted/10">
                    {formData.logoUrl ? (
                      <div className="relative group">
                        <img src={formData.logoUrl} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-border" />
                        <button 
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, logoUrl: "" }))}
                          className="absolute -top-2 -right-2 bg-destructive text-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center">
                        <Building2 className="h-6 w-6 text-foreground/30" />
                        <p className="text-[10px] font-medium text-foreground/50 uppercase tracking-widest">Logo</p>
                      </div>
                    )}
                    <label className="cursor-pointer">
                      <input type="file" accept="image/*" onChange={e => handleImageUpload(e, "logo")} className="hidden" />
                      <div className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-[10px] font-bold uppercase tracking-widest rounded-md border border-border transition-colors">
                        Upload Logo
                      </div>
                    </label>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-3 py-3 border-2 border-dashed border-border rounded-xl bg-muted/10">
                    {formData.bannerUrl ? (
                      <div className="relative group w-full px-4">
                        <img src={formData.bannerUrl} alt="Preview" className="w-full h-16 rounded-lg object-cover border border-border" />
                        <button 
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, bannerUrl: "" }))}
                          className="absolute top-0 right-2 bg-destructive text-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="w-16 h-6 bg-foreground/10 rounded" />
                        <p className="text-[10px] font-medium text-foreground/50 uppercase tracking-widest">Banner</p>
                      </div>
                    )}
                    <label className="cursor-pointer">
                      <input type="file" accept="image/*" onChange={e => handleImageUpload(e, "banner")} className="hidden" />
                      <div className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-[10px] font-bold uppercase tracking-widest rounded-md border border-border transition-colors">
                        Upload Banner
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-semibold text-foreground/70 uppercase tracking-widest">Company Name</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-semibold text-foreground/70 uppercase tracking-widest">Email Address</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-foreground/70 uppercase tracking-widest">Industry</label>
                    <input required value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-foreground/70 uppercase tracking-widest">Available Slots</label>
                    <input required type="number" min="0" value={formData.slots} onChange={e => setFormData({...formData, slots: parseInt(e.target.value) || 0})} className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-semibold text-foreground/70 uppercase tracking-widest">Location</label>
                    <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-semibold text-foreground/70 uppercase tracking-widest">Description</label>
                    <textarea required rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2.5 rounded-md border border-border bg-background text-sm outline-none focus:border-primary resize-none" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3 mt-4 border-t border-border/50">
                  <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground/60 hover:text-foreground">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded-md hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (editingId ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />)}
                    {editingId ? "Update Partner" : "Add Partner"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 1. Header Section */}
        <div className="pb-6 border-b border-border/50 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground uppercase tracking-tight">
              Industrial Partners
            </h2>
            <p className="text-sm text-foreground/80 mt-1">
              Management of institutional industrial affiliations and MOU status
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[10px] font-semibold text-foreground/70 bg-muted px-2 py-0.5 rounded border border-border/50 uppercase tracking-wider hidden md:block">
              {companies.length} Registered Entities
            </div>
            <button onClick={() => setIsAdding(true)} className="h-9 px-4 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider rounded-md hover:opacity-90 transition-all flex items-center gap-2">
              <Plus className="h-3.5 w-3.5" />
              Add Partner
            </button>
          </div>
        </div>

        {/* 2. Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Total Partners",  value: companies.length },
            { label: "MOU Verified",    value: verifiedCount },
            { label: "Pending Review",  value: pendingCount },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-2">
              <p className="text-[10px] font-semibold uppercase text-foreground/50 tracking-wider">{s.label}</p>
              <p className="text-3xl font-semibold text-foreground tracking-tight">{s.value}</p>
            </div>
          ))}
        </div>

        {/* 3. Table & Toolbar Section */}
        <div className="space-y-6 pb-24">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Partner Registry</h3>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/30" />
                <input
                  type="text"
                  placeholder="Search partners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 h-9 rounded-lg border border-border bg-card text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.length === 0 && !isLoading ? (
                <div className="col-span-full py-24 flex flex-col items-center justify-center border border-border border-dashed rounded-xl bg-card">
                  <Building2 className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                  <p className="text-sm font-medium text-foreground/50 uppercase tracking-widest">
                    {companies.length === 0 ? "No partners registered" : "No results found"}
                  </p>
                </div>
              ) : (
                filtered.map((c) => (
                  <div key={c.id} className="group flex flex-col bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:border-primary/30 transition-all duration-300">
                    {/* Banner */}
                    <div className="h-28 w-full relative bg-muted border-b border-border">
                      {c.bannerUrl ? (
                        <img src={c.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-muted to-muted/50" />
                      )}
                      {/* Status Badge Top Right */}
                      <div className="absolute top-3 right-3">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider border shadow-sm backdrop-blur-md",
                          c.isVerified
                            ? "bg-primary/90 text-primary-foreground border-primary"
                            : "bg-amber-500/90 text-white border-amber-600"
                        )}>
                          {c.isVerified ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                          {c.isVerified ? "Verified" : "Pending"}
                        </span>
                      </div>
                    </div>

                    {/* Profile Body */}
                    <div className="px-5 pb-5 flex-1 flex flex-col relative pt-12">
                      {/* Logo (Overlapping) */}
                      <div className="absolute -top-10 left-5 h-20 w-20 rounded-xl bg-card border-4 border-card shadow-sm flex items-center justify-center overflow-hidden">
                        {c.logoUrl ? (
                          <img src={c.logoUrl} alt={c.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="h-8 w-8 text-foreground/20" />
                        )}
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="font-bold text-foreground text-base leading-tight truncate">{c.name}</h3>
                        <p className="text-[10px] font-medium text-foreground/60 mt-1 uppercase tracking-wider truncate">
                          {c.industry}
                        </p>
                        
                        <div className="mt-3 space-y-1.5">
                          <div className="flex items-center gap-2 text-[11px] text-foreground/70">
                            <Mail className="h-3 w-3 opacity-50" />
                            <span className="truncate">{c.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-foreground/70">
                            <Globe className="h-3 w-3 opacity-50" />
                            <span className="truncate">{c.location || "Multiple Locations"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1" /> {/* Spacer */}

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-border/50">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">Personnel</span>
                          <span className="text-sm font-bold text-foreground">{c._count?.employers ?? 0}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">Postings</span>
                          <span className="text-sm font-bold text-foreground">{c._count?.postings ?? 0}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(c)}
                          disabled={processing === c.id}
                          className="h-8 w-8 rounded-lg border border-border bg-card text-foreground/60 hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center disabled:opacity-50"
                          title="Edit Partner"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(c.id, c.name)}
                          disabled={processing === c.id}
                          className="h-8 w-8 rounded-lg border border-border bg-card text-foreground/60 hover:text-destructive hover:border-destructive/30 transition-all flex items-center justify-center disabled:opacity-50"
                          title="Remove Partner"
                        >
                          {processing === c.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                        </button>

                        {!c.isVerified ? (
                          <button
                            onClick={() => handleVerify(c.id, true)}
                            disabled={processing === c.id}
                            className="flex-1 h-8 rounded-lg border border-primary bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                          >
                            {processing === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShieldCheck className="h-3 w-3" />}
                            Verify
                          </button>
                        ) : (
                          <button
                            onClick={() => handleVerify(c.id, false)}
                            disabled={processing === c.id}
                            className="flex-1 h-8 rounded-lg border border-border bg-muted text-foreground/60 text-[10px] font-semibold uppercase tracking-wider hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                          >
                            {processing === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Clock className="h-3 w-3" />}
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {filtered.length > 0 && (
              <div className="mt-6 flex justify-center">
                <p className="text-[10px] font-medium text-foreground/40 uppercase tracking-widest bg-muted/50 px-4 py-1.5 rounded-full border border-border/50">
                  Showing {filtered.length} of {companies.length} Partners
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
