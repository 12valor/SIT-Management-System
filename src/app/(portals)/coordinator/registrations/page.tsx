"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useEffect } from "react";
import { 
  UserCheck, 
  UserX, 
  Building2, 
  Mail, 
  Calendar, 
  Loader2, 
  CheckCircle2, 
  GraduationCap,
  Briefcase
} from "lucide-react";
import { getPendingRegistrations, approveUser, rejectUser, verifyCompany } from "./actions";
import { cn } from "@/lib/utils";
import { RegistrationData, PendingUser } from "./types";
import { Company } from "@prisma/client";

export default function CoordinatorRegistrationsPage() {
  const [data, setData] = useState<RegistrationData | null>(null);
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

  const pendingUsers = data?.users || [];
  const pendingCompanies = data?.companies || [];

  return (
    <Skeleton 
      name="coordinator-registrations" 
      loading={isLoading && !data}
      fallback={
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-muted rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-48 bg-muted rounded-xl border border-border" />
            <div className="h-48 bg-muted rounded-xl border border-border" />
          </div>
          <div className="h-96 bg-muted rounded-xl border border-border" />
        </div>
      }
    >
      <div className="flex-1 space-y-12">
        {/* 1. Header Section */}
        <div className="pb-6 border-b border-border/50 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground uppercase tracking-tight">
              Account Requests
            </h2>
            <p className="text-sm text-foreground/80 mt-1">
              Validate and approve new industrial trainees and partners
            </p>
          </div>
          <div className="text-[10px] font-semibold text-foreground/70 bg-muted px-2 py-0.5 rounded border border-border/50 uppercase tracking-wider">
            {pendingUsers.length + pendingCompanies.length} Actions Required
          </div>
        </div>

        {/* 2. Main Content Sections */}
        <div className="space-y-12 pb-24">
          {/* User Registrations */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Pending User Access</h3>
              <div className="p-1 bg-primary/10 rounded-lg text-primary">
                <UserCheck className="h-4 w-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingUsers.length > 0 ? pendingUsers.map((user: PendingUser) => (
                <div key={user.id} className="bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col h-full space-y-6 transition-all hover:border-primary/20">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-foreground/70 border border-border/50">
                        {user.role === 'STUDENT' ? <GraduationCap className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground tracking-tight">{user.name}</h4>
                        <span className={cn(
                          "text-[9px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded border mt-1 inline-block",
                          user.role === 'STUDENT' ? "bg-primary/5 text-primary border-primary/10" : "bg-muted text-muted-foreground border-border"
                        )}>
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <Mail className="h-3.5 w-3.5 opacity-50" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    {user.course && (
                      <div className="flex items-center gap-2 text-xs text-foreground/70">
                        <GraduationCap className="h-3.5 w-3.5 opacity-50" />
                        {user.course}
                      </div>
                    )}
                    {user.company && (
                      <div className="flex items-center gap-2 text-xs text-foreground/70">
                        <Building2 className="h-3.5 w-3.5 opacity-50" />
                        {user.company.name}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[10px] font-medium text-foreground/50 pt-1">
                      <Calendar className="h-3.5 w-3.5 opacity-50" />
                      Applied {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-2">
                    <button 
                      onClick={() => handleRejectUser(user.id)}
                      disabled={actionId === user.id}
                      className="flex-1 py-2 rounded-lg bg-muted hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-[10px] font-semibold uppercase tracking-wider transition-all border border-transparent hover:border-destructive/20 flex items-center justify-center gap-1.5"
                    >
                      <UserX className="h-3.5 w-3.5" /> Reject
                    </button>
                    <button 
                      onClick={() => handleApproveUser(user.id)}
                      disabled={actionId === user.id}
                      className="flex-[2] py-2 rounded-lg bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider transition-all shadow-sm hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-1.5"
                    >
                      {actionId === user.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><CheckCircle2 className="h-3.5 w-3.5" /> Approve</>}
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-16 text-center rounded-xl border border-dashed border-border bg-muted/30">
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">No pending users</p>
                </div>
              )}
            </div>
          </div>

          {/* Company Registrations */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Partner Verifications</h3>
              <div className="p-1 bg-primary/10 rounded-lg text-primary">
                <Building2 className="h-4 w-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingCompanies.length > 0 ? pendingCompanies.map((company: Company) => (
                <div key={company.id} className="bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col space-y-6 transition-all hover:border-primary/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-foreground/70 border border-border/50">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground tracking-tight">{company.name}</h4>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/50">{company.industry}</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <p className="text-xs text-foreground/60 leading-relaxed font-medium">Requesting industrial partnership verification for SIT placement program.</p>
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <Mail className="h-3.5 w-3.5 opacity-50" />
                      {company.email}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleVerifyCompany(company.id)}
                    disabled={actionId === company.id}
                    className="w-full py-2 rounded-lg bg-foreground text-background dark:bg-primary dark:text-primary-foreground text-[10px] font-semibold uppercase tracking-wider transition-all shadow-sm hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-1.5"
                  >
                    {actionId === company.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><CheckCircle2 className="h-3.5 w-3.5" /> Verify Entity</>}
                  </button>
                </div>
              )) : (
                <div className="col-span-full py-16 text-center rounded-xl border border-dashed border-border bg-muted/30">
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">No pending companies</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}

