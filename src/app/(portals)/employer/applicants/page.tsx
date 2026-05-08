"use client";

import { Skeleton } from "boneyard-js/react";

import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  MoreVertical, 
  CheckCircle2,
  XCircle,
  Clock,
  SlidersHorizontal,
  ArrowRight,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getEmployerApplicants, updateApplicationStatus } from "./actions";
import { CredentialInspector } from "@/components/employer/CredentialInspector";

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
  
  // Inspector State
  const [selectedApp, setSelectedApp] = useState<{ studentId: string; studentName: string; applicationId: string } | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

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

  const openInspector = (app: Application) => {
    setSelectedApp({
      studentId: app.student.id,
      studentName: app.student.name || "Anonymous Student",
      applicationId: app.id
    });
    setIsInspectorOpen(true);
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


  return (
    <Skeleton 
      name="employer-applicants" 
      loading={isLoading}
      fallback={
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin opacity-20" />
        </div>
      }
    >
    <div className="space-y-8 max-w-6xl mx-auto pb-20 animate-in-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Applicant Tracker</h1>
          <p className="text-sm text-muted-foreground font-medium">Review and manage candidates specifically aligned with your industrial roles.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
            <input 
              type="text" 
              placeholder="Search candidate index..." 
              className="pl-9 pr-4 h-11 w-full md:w-64 rounded-xl border border-border bg-card text-foreground shadow-sm outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary text-sm transition-all"
            />
          </div>
          <button className="h-11 px-4 rounded-xl border border-border bg-card flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider hover:bg-muted transition-colors text-muted-foreground/60 shadow-sm">
            <SlidersHorizontal className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {columns.map((col) => {
          const colApps = filteredApps.filter(a => a.status === col.id);
          return (
            <div key={col.id} className="flex flex-col gap-6">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                  <div className={cn("px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border", 
                    col.id === 'PENDING' ? "bg-muted text-muted-foreground/60 border-border" :
                    col.id === 'ACCEPTED' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                    "bg-destructive/10 text-destructive border-destructive/20"
                  )}>
                    {col.label}
                  </div>
                  <span className="text-xs font-bold text-muted-foreground/40 tabular-nums">{colApps.length}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 min-h-[600px] p-2 rounded-2xl bg-muted/30 border border-border transition-all">
                {colApps.map((app) => (
                  <div 
                    key={app.id} 
                    className="group bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer relative"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-10 w-10 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground font-bold text-xs shadow-sm group-hover:bg-primary transition-colors">
                        {app.student.name?.split(' ').filter(Boolean).map(n => n[0]).join('') || '?'}
                      </div>
                      <button className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground/40 hover:text-foreground transition-all">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-1.5 mb-5 text-left">
                      <h4 className="font-bold text-[15px] text-foreground leading-tight">{app.student.name || 'Anonymous Student'}</h4>
                      <p className="text-[11px] font-bold text-primary uppercase tracking-wider opacity-80">{app.posting.title}</p>
                      <div className="flex items-center text-[10px] text-muted-foreground/60 font-medium pt-1">
                        <Clock className="h-3 w-3 mr-1.5" />
                        Inscribed {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                      {app.status === 'PENDING' && (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'ACCEPTED')}
                            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-sm shadow-primary/10"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Vet
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'REJECTED')}
                            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg bg-card border border-border text-muted-foreground/60 text-[10px] font-bold uppercase tracking-wider hover:text-destructive hover:border-destructive/20 transition-all shadow-sm"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Decline
                          </button>
                        </div>
                      )}
                      
                      <button 
                        onClick={() => openInspector(app)}
                        className={cn(
                          "w-full flex items-center justify-center gap-2 h-9 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm",
                          app.status === 'PENDING' 
                            ? "bg-muted text-muted-foreground hover:bg-muted/80" 
                            : "bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary"
                        )}
                      >
                        Inspect Credentials <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                 {colApps.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-20 filter grayscale">
                     <Users className="h-10 w-10 text-muted-foreground mb-3" />
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Zero Manifests</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <CredentialInspector 
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        studentId={selectedApp?.studentId || ""}
        studentName={selectedApp?.studentName || ""}
        applicationId={selectedApp?.applicationId || ""}
      />
    </div>
    </Skeleton>
  );
}
