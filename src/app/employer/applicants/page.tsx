"use client";

import { useMockStore } from "@/store/mock-store";
import { 
  Users, 
  Search, 
  MoreVertical, 
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ApplicantsPage() {
  const { applications, postings, updateApplicationStatus } = useMockStore();

  // In a real app, we'd filter applications for postings belonging to this employer
  const allApplicants = applications;

  const getPostingTitle = (id: string) => postings.find(p => p.id === id)?.title || "Unknown Position";

  const columns = [
    { id: 'Pending', label: 'New Applied', color: 'text-amber-600', bg: 'bg-amber-100', dot: 'bg-amber-500' },
    { id: 'Accepted', label: 'Shortlisted', color: 'text-green-600', bg: 'bg-green-100', dot: 'bg-green-500' },
    { id: 'Rejected', label: 'Not Suitable', color: 'text-red-600', bg: 'bg-red-100', dot: 'bg-red-500' },
  ];

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
          const colApps = allApplicants.filter(a => a.status === col.id);
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
                        {app.studentName?.split(' ').filter(Boolean).map(n => n[0]).join('') || '?'}
                      </div>
                      <button className="h-8 w-8 rounded-md hover:bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>

                    <div className="space-y-1 mb-4">
                      <h4 className="font-bold text-base leading-tight">{app.studentName || 'Unknown Student'}</h4>
                      <p className="text-xs font-bold text-blue-600">Apply for: {getPostingTitle(app.postingId)}</p>
                      <div className="flex items-center text-[11px] text-muted-foreground mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        Applied {new Date(app.appliedAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                      {app.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => updateApplicationStatus(app.id, 'Accepted')}
                            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg bg-green-500/10 text-green-600 text-[11px] font-black uppercase tracking-wider hover:bg-green-500 hover:text-white transition-all"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Shortlist
                          </button>
                          <button 
                            onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg bg-red-500/10 text-red-600 text-[11px] font-black uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </button>
                        </>
                      )}
                      {app.status !== 'Pending' && (
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
