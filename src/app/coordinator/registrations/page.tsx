"use client";

import { useState, useEffect } from "react";
import { 
  UserCheck, 
  UserX, 
  Building2, 
  Mail, 
  Calendar, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  ShieldAlert,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { getPendingRegistrations, approveUser, rejectUser, verifyCompany } from "./actions";
import { cn } from "@/lib/utils";

export default function CoordinatorRegistrationsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  async function loadData() {
    setIsLoading(true);
    const result = await getPendingRegistrations();
    setData(result);
    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleApproveUser(id: string) {
    setActionId(id);
    await approveUser(id);
    await loadData();
    setActionId(null);
  }

  async function handleRejectUser(id: string) {
    setActionId(id);
    await rejectUser(id);
    await loadData();
    setActionId(null);
  }

  async function handleVerifyCompany(id: string) {
    setActionId(id);
    await verifyCompany(id);
    await loadData();
    setActionId(null);
  }

  if (isLoading && !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-black uppercase tracking-widest text-xs animate-pulse underline decoration-primary decoration-2 underline-offset-8">
          Accessing Security Vault...
        </p>
      </div>
    );
  }

  const pendingUsers = data?.users || [];
  const pendingCompanies = data?.companies || [];

  return (
    <div className="space-y-12 pb-24 animate-in-fade">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase italic">Account Requests</h1>
          <p className="text-muted-foreground font-bold text-lg">Validate and approve new industrial trainees and partners.</p>
        </div>
        <div className="flex items-center gap-4 px-6 py-4 rounded-[1.5rem] bg-primary/10 border border-primary/20 shadow-xl shadow-primary/5">
           <ShieldAlert className="h-6 w-6 text-primary" />
           <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Security Alert</span>
              <span className="text-sm font-black text-foreground">{pendingUsers.length + pendingCompanies.length} Actions Required</span>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-1 gap-12">
        {/* User Registrations */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
             <div className="p-2 bg-primary rounded-xl text-primary-foreground shadow-lg shadow-primary/30">
                <UserCheck className="h-5 w-5" />
             </div>
             <h2 className="text-2xl font-black tracking-tight text-foreground uppercase">Pending Users</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingUsers.length > 0 ? pendingUsers.map((user: any) => (
              <div key={user.id} className="group p-6 rounded-[2.5rem] bg-card border border-border/60 hover:border-primary/30 transition-all relative overflow-hidden flex flex-col h-full shadow-sm hover:shadow-2xl hover:shadow-primary/5">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg border border-primary/20">
                      {user.role === 'STUDENT' ? <GraduationCap className="h-6 w-6" /> : <Briefcase className="h-6 w-6" />}
                    </div>
                    <div>
                      <h4 className="font-black text-foreground tracking-tight leading-none text-lg">{user.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border",
                          user.role === 'STUDENT' ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground border-border"
                        )}>
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  {user.course && (
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground italic">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {user.course}
                    </div>
                  )}
                  {user.company && (
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      {user.company.name}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground pt-2">
                    <Calendar className="h-3.5 w-3.5" />
                    Applied {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="pt-8 flex items-center gap-3">
                  <button 
                    onClick={() => handleRejectUser(user.id)}
                    disabled={actionId === user.id}
                    className="flex-1 py-4 rounded-2xl bg-muted/50 hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-[10px] font-black uppercase tracking-widest transition-all border border-transparent hover:border-destructive/20 flex items-center justify-center gap-2"
                  >
                    <UserX className="h-4 w-4" /> Reject
                  </button>
                  <button 
                    onClick={() => handleApproveUser(user.id)}
                    disabled={actionId === user.id}
                    className="flex-[2] py-4 rounded-2xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {actionId === user.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <><CheckCircle2 className="h-4 w-4" /> Approve Access</>}
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full p-20 text-center rounded-[3rem] border-2 border-dashed border-border/60 bg-muted/20 opacity-40">
                <CheckCircle2 className="h-10 w-10 text-muted-foreground mx-auto mb-6" />
                <p className="font-black text-muted-foreground uppercase tracking-widest text-sm">Clear Manifest</p>
                <p className="text-xs text-muted-foreground mt-2 font-medium italic">No new users are currently awaiting validation.</p>
              </div>
            )}
          </div>
        </div>

        {/* Company Registrations */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
             <div className="p-2 bg-primary rounded-xl text-primary-foreground shadow-lg shadow-primary/30">
                <Building2 className="h-5 w-5" />
             </div>
             <h2 className="text-2xl font-black tracking-tight text-foreground uppercase">Partner Companies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingCompanies.length > 0 ? pendingCompanies.map((company: any) => (
              <div key={company.id} className="p-8 rounded-[2.5rem] bg-card border border-border/60 relative overflow-hidden flex flex-col shadow-sm">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                       <Building2 className="h-8 w-8" />
                    </div>
                    <div>
                       <h4 className="font-black text-xl text-foreground tracking-tight">{company.name}</h4>
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{company.industry}</span>
                    </div>
                 </div>

                 <div className="flex-1 space-y-3">
                    <p className="text-sm font-bold text-muted-foreground italic mb-4">Requesting industrial partnership verification.</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      {company.email}
                    </div>
                 </div>

                 <button 
                  onClick={() => handleVerifyCompany(company.id)}
                  disabled={actionId === company.id}
                  className="mt-8 w-full py-4 rounded-2xl bg-foreground text-background dark:bg-primary dark:text-primary-foreground text-[10px] font-black uppercase tracking-widest transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {actionId === company.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <><CheckCircle2 className="h-4 w-4" /> Verify Legal Entity</>}
                </button>
              </div>
            )) : (
              <div className="col-span-full p-20 text-center rounded-[3rem] border-2 border-dashed border-border/60 bg-muted/20 opacity-40">
                <ShieldAlert className="h-10 w-10 text-muted-foreground mx-auto mb-6" />
                <p className="font-black text-muted-foreground uppercase tracking-widest text-sm">Compliance Target Met</p>
                <p className="text-xs text-muted-foreground mt-2 font-medium italic">All partner companies are currently verified.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
