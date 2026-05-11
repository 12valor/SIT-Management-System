"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useEffect } from "react";
import { 
  Search, 
  MoreVertical, 
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
  const [searchQuery, setSearchQuery] = useState("");
  
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
      studentName: app.student.name || "Student",
      applicationId: app.id
    });
    setIsInspectorOpen(true);
  };

  const filteredApps = applications.filter(app => 
    app.student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.posting.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { id: 'PENDING', label: 'New', color: 'text-primary', bg: 'bg-primary/5' },
    { id: 'ACCEPTED', label: 'Shortlisted', color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
    { id: 'REJECTED', label: 'Rejected', color: 'text-rose-500', bg: 'bg-rose-500/5' },
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
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header - Simple */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/60">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Applicants</h1>
          <p className="text-sm text-muted-foreground font-medium italic">Review and manage student applications.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 h-10 w-full md:w-64 rounded-xl border border-border/60 bg-card text-sm outline-none focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {columns.map((col) => {
          const colApps = filteredApps.filter(a => a.status === col.id);
          return (
            <div key={col.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border", 
                    col.id === 'PENDING' ? "bg-muted text-muted-foreground border-border" :
                    col.id === 'ACCEPTED' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                    "bg-rose-500/10 text-rose-600 border-rose-500/20"
                  )}>
                    {col.label}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground/30">{colApps.length}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 min-h-[500px] p-3 rounded-2xl bg-muted/20 border border-border/40">
                {colApps.map((app) => (
                  <div key={app.id} className="group bg-card border border-border/60 rounded-xl p-4 shadow-sm hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center font-bold text-[10px] text-muted-foreground/40 group-hover:text-primary transition-colors">
                        {app.student.name?.split(' ').filter(Boolean).map(n => n[0]).join('') || '?'}
                      </div>
                      <button className="text-muted-foreground/20 hover:text-foreground transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-1 mb-4">
                      <h4 className="font-bold text-sm text-foreground truncate">{app.student.name || 'Anonymous'}</h4>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-tight truncate">{app.posting.title}</p>
                      <div className="flex items-center text-[9px] text-muted-foreground/60 font-medium">
                        Applied {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-3 border-t border-border/40">
                      {app.status === 'PENDING' && (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'ACCEPTED')}
                            className="flex-1 h-8 rounded-lg bg-primary text-white text-[9px] font-bold uppercase tracking-wider hover:brightness-110 transition-all"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'REJECTED')}
                            className="flex-1 h-8 rounded-lg bg-muted text-muted-foreground text-[9px] font-bold uppercase tracking-wider hover:text-rose-500 transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      
                      <button 
                        onClick={() => openInspector(app)}
                        className="w-full h-8 rounded-lg border border-border/60 text-muted-foreground hover:text-primary hover:border-primary text-[9px] font-bold uppercase tracking-wider transition-all"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}

                 {colApps.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20">
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Empty</p>
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
