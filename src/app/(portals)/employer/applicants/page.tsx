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


  return (
    <Skeleton 
      name="employer-applicants" 
      loading={isLoading}
      fallback={
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="h-10 w-10 text-[#800000] animate-spin opacity-20" />
        </div>
      }
    >
    <div className="space-y-8 max-w-6xl mx-auto pb-20 animate-in-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Applicant Tracker</h1>
          <p className="text-sm text-slate-500 font-medium">Review and manage candidates specifically aligned with your industrial roles.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search candidate index..." 
              className="pl-9 pr-4 h-11 w-full md:w-64 rounded-xl border border-slate-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-[#800000]/5 focus:border-[#800000] text-sm transition-all"
            />
          </div>
          <button className="h-11 px-4 rounded-xl border border-slate-200 bg-white flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider hover:bg-slate-50 transition-colors text-slate-500 shadow-sm">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {columns.map((col) => {
          const colApps = filteredApps.filter(a => a.status === col.id);
          const isMaroon = col.id === 'PENDING' || col.id === 'ACCEPTED';
          return (
            <div key={col.id} className="flex flex-col gap-6">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                  <div className={cn("px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border", 
                    col.id === 'PENDING' ? "bg-slate-50 text-slate-500 border-slate-200" :
                    col.id === 'ACCEPTED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    "bg-red-50 text-red-600 border-red-100"
                  )}>
                    {col.label}
                  </div>
                  <span className="text-xs font-bold text-slate-300 tabular-nums">{colApps.length}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 min-h-[600px] p-2 rounded-2xl bg-slate-50/50 border border-slate-100 transition-all">
                {colApps.map((app) => (
                  <div 
                    key={app.id} 
                    className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#800000]/30 transition-all cursor-pointer relative"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-sm group-hover:bg-[#800000] transition-colors">
                        {app.student.name?.split(' ').filter(Boolean).map(n => n[0]).join('') || '?'}
                      </div>
                      <button className="h-8 w-8 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-300 hover:text-slate-600 transition-all">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-1.5 mb-5 text-left">
                      <h4 className="font-bold text-[15px] text-slate-800 leading-tight">{app.student.name || 'Anonymous Student'}</h4>
                      <p className="text-[11px] font-bold text-[#800000] uppercase tracking-wider opacity-80">{app.posting.title}</p>
                      <div className="flex items-center text-[10px] text-slate-400 font-medium pt-1">
                        <Clock className="h-3 w-3 mr-1.5" />
                        Inscribed {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                      {app.status === 'PENDING' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'ACCEPTED')}
                            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg bg-[#800000] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-red-900 transition-all shadow-sm shadow-red-900/10"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Vet
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'REJECTED')}
                            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg bg-white border border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-wider hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Decline
                          </button>
                        </>
                      )}
                      {app.status !== 'PENDING' && (
                        <button className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-white border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider hover:text-[#800000] hover:border-[#800000] transition-all shadow-sm">
                          Inspect Credentials <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {colApps.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-20 filter grayscale">
                     <Users className="h-10 w-10 text-slate-400 mb-3" />
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Zero Manifests</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </Skeleton>
  );
}
