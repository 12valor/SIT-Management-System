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
    { id: 'PENDING', label: 'New Applied', color: 'text-primary', bg: 'bg-primary/5', dot: 'bg-primary/40' },
    { id: 'ACCEPTED', label: 'Shortlisted', color: 'text-primary', bg: 'bg-primary/10', dot: 'bg-primary' },
    { id: 'REJECTED', label: 'Not Suitable', color: 'text-destructive', bg: 'bg-destructive/5', dot: 'bg-destructive' },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-widest text-xs">Scanning Applicant Matrix...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20 animate-in-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Applicant Tracking</h2>
          <p className="text-muted-foreground font-medium">Manage and review candidates for your open positions.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search applicants..." 
              className="pl-9 pr-4 h-11 w-full md:w-64 rounded-lg border border-border bg-card shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
            />
          </div>
          <button className="h-11 px-4 rounded-lg border border-border bg-card flex items-center gap-2 font-bold text-xs hover:bg-muted transition-colors text-foreground">
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
                  <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-black text-foreground">{colApps.length}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 min-h-[500px] p-2 rounded-xl bg-muted/20 border border-dashed border-border/50 transition-all">
                {colApps.map((app) => (
                  <div 
                    key={app.id} 
                    className="group bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-start mb-3 relative z-10">
                      <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
                        {app.student.name?.split(' ').filter(Boolean).map(n => n[0]).join('') || '?'}
                      </div>
                      <button className="h-8 w-8 rounded-md hover:bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>

                    <div className="space-y-1 mb-4 relative z-10">
                      <h4 className="font-bold text-base leading-tight text-foreground">{app.student.name || 'Unknown Student'}</h4>
                      <p className="text-xs font-bold text-primary">Apply for: {app.posting.title}</p>
                      <div className="flex items-center text-[11px] text-muted-foreground mt-2 italic">
                        <Clock className="h-3 w-3 mr-1" />
                        Applied {new Date(app.appliedAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-border/50 relative z-10">
                      {app.status === 'PENDING' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'ACCEPTED')}
                            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg bg-primary/10 text-primary text-[11px] font-black uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all outline-none shadow-sm"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Shortlist
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'REJECTED')}
                            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg bg-destructive/10 text-destructive text-[11px] font-black uppercase tracking-wider hover:bg-destructive hover:text-white transition-all outline-none shadow-sm"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </button>
                        </>
                      )}
                      {app.status !== 'PENDING' && (
                        <button className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-muted text-muted-foreground text-[11px] font-black uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all border border-border/50">
                          View Profile <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {colApps.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-40">
                     <Users className="h-8 w-8 text-muted-foreground mb-2" />
                     <p className="text-xs font-bold text-muted-foreground italic capitalize tracking-widest uppercase">Empty Stage</p>
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
