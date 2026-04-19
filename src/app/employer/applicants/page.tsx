"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  MoreVertical, 
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  ArrowRight,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getEmployerApplicants, updateApplicationStatus } from "./actions";

type Application = {
  id: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  appliedAt: Date;
  student: {
    id: string;
    name: string | null;
    email: string | null;
  };
  posting: {
    id: string;
    title: string;
  };
};

export default function ApplicantsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      const result = await getEmployerApplicants();
      if (result.success && result.data) {
        setApplications(result.data as Application[]);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'ACCEPTED' | 'REJECTED') => {
    const result = await updateApplicationStatus(id, status);
    if (result.success) {
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
    }
  };

  const filteredApps = applications.filter(app => 
    app.student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.posting.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { id: 'PENDING', label: 'New Applied', color: 'text-amber-600', bg: 'bg-amber-100', dot: 'bg-amber-500' },
    { id: 'ACCEPTED', label: 'Shortlisted', color: 'text-emerald-600', bg: 'bg-emerald-100', dot: 'bg-emerald-500' },
    { id: 'REJECTED', label: 'Not Suitable', color: 'text-rose-600', bg: 'bg-rose-100', dot: 'bg-rose-500' },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Scanning Applicant Matrix...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-gradient">Applicant Tracking</h2>
          <p className="text-muted-foreground font-medium">Manage and review candidates for your open positions.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search applicants..." 
              className="pl-9 pr-4 h-11 w-full md:w-64 rounded-lg border border-border bg-card shadow-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
            />
          </div>
          <button className="h-11 px-4 rounded-lg border border-border bg-card flex items-center gap-2 font-bold text-xs hover:bg-muted transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colApps = filteredApps.filter(a => a.status === col.id);
          return (
            <div key={col.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className={cn("w-2 h-2 rounded-full", col.dot)} />
                  <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">{col.label}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-black">{colApps.length}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 min-h-[500px] p-2 rounded-xl bg-muted/30 border border-dashed border-border/50">
                {colApps.map((app) => (
                  <div 
                    key={app.id} 
                    className="group bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-600/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                        {app.student.name?.split(' ').filter(Boolean).map(n => n[0]).join('') || '?'}
                      </div>
                      <button className="h-8 w-8 rounded-md hover:bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>

                    <div className="space-y-1 mb-4">
                      <h4 className="font-bold text-base leading-tight">{app.student.name || 'Unknown Student'}</h4>
                      <p className="text-xs font-bold text-blue-600">Apply for: {app.posting.title}</p>
                      <div className="flex items-center text-[11px] text-muted-foreground mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        Applied {new Date(app.appliedAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                      {app.status === 'PENDING' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'ACCEPTED')}
                            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 text-[11px] font-black uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition-all outline-none"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Shortlist
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'REJECTED')}
                            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg bg-rose-500/10 text-rose-600 text-[11px] font-black uppercase tracking-wider hover:bg-rose-500 hover:text-white transition-all outline-none"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </button>
                        </>
                      )}
                      {app.status !== 'PENDING' && (
                        <button className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-muted text-muted-foreground text-[11px] font-black uppercase tracking-wider hover:bg-muted/80 transition-colors">
                          View Profile <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {colApps.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                     <Users className="h-8 w-8 text-muted-foreground/20 mb-2" />
                     <p className="text-xs font-bold text-muted-foreground/50 italic capitalize">Empty Stage</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
