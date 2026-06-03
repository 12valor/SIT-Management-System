"use client";

import { useState } from "react";
import { 
  UserX, 
  Building2, 
  Mail, 
  Calendar, 
  Loader2, 
  CheckCircle2, 
  GraduationCap,
  Briefcase,
  User
} from "lucide-react";
import { approveUser, rejectUser, verifyCompany, verifyPartnership } from "./actions";
import { cn } from "@/lib/utils";
import { RegistrationData, PendingUser } from "./types";
import { Company } from "@prisma/client";
import Image from "next/image";

interface RegistrationsClientProps {
  initialData: RegistrationData;
}

export default function RegistrationsClient({ initialData }: RegistrationsClientProps) {
  const [data, setData] = useState<RegistrationData>(initialData);
  const [actionId, setActionId] = useState<string | null>(null);

  function removeUser(userId: string) {
    setData((prev) => ({
      users: prev.users.filter((user) => user.id !== userId),
      companies: prev.companies,
    }));
  }

  function removeCompany(companyId: string) {
    setData((prev) => ({
      users: prev.users,
      companies: prev.companies.filter((company) => company.id !== companyId),
    }));
  }

  async function handleApproveUser(id: string) {
    setActionId(id);
    const result = await approveUser(id);
    if (result.success) removeUser(id);
    setActionId(null);
  }

  async function handleRejectUser(id: string) {
    setActionId(id);
    const companyId = data.users.find((user) => user.id === id)?.companyId;
    const result = await rejectUser(id);
    if (result.success) {
      removeUser(id);
      if (companyId && !data.users.some((user) => user.id !== id && user.companyId === companyId)) {
        removeCompany(companyId);
      }
    }
    setActionId(null);
  }

  async function handleVerifyCompany(id: string) {
    setActionId(id);
    const result = await verifyCompany(id);
    if (result.success) removeCompany(id);
    setActionId(null);
  }

  async function handleVerifyPartnership(userId: string, companyId: string) {
    setActionId(userId);
    const result = await verifyPartnership(userId, companyId);
    if (result.success) {
      removeUser(userId);
      removeCompany(companyId);
    }
    setActionId(null);
  }

  const pendingUsers = data?.users || [];
  const pendingStudents = pendingUsers.filter(u => u.role === 'STUDENT');
  const partnerApplications = pendingUsers.filter(u => u.role === 'EMPLOYER' && u.company && !u.company.isVerified);
  const staffAccessRequests = pendingUsers.filter(u => u.role === 'EMPLOYER' && (u.company?.isVerified));
  const orphanedCompanies = data?.companies.filter(c => !partnerApplications.some(app => app.companyId === c.id)) || [];

  const renderUserCard = (user: PendingUser) => (
    <div key={user.id} className="bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col h-full space-y-6 transition-all hover:border-primary/20">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-foreground/70 border border-border/50">
            {user.role === 'STUDENT' ? <GraduationCap className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground tracking-tight">{user.name}</h4>
            <span className={cn("text-[9px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded border mt-1 inline-block", user.role === 'STUDENT' ? "bg-primary/5 text-primary border-primary/10" : "bg-muted text-muted-foreground border-border")}>{user.role}</span>
          </div>
        </div>
      </div>
      <div className="space-y-3 flex-1">
        <div className="flex items-center gap-2 text-xs text-foreground/70"><Mail className="h-3.5 w-3.5 opacity-50" /><span className="truncate">{user.email}</span></div>
        {user.course && <div className="flex items-center gap-2 text-xs text-foreground/70"><GraduationCap className="h-3.5 w-3.5 opacity-50" />{user.course}</div>}
        {user.company && <div className="flex items-center gap-2 text-xs text-foreground/70"><Building2 className="h-3.5 w-3.5 opacity-50" />{user.company.name}</div>}
        <div className="flex items-center gap-2 text-[10px] font-medium text-foreground/50 pt-1"><Calendar className="h-3.5 w-3.5 opacity-50" />Applied {new Date(user.createdAt).toLocaleDateString()}</div>
      </div>
      <div className="pt-4 flex items-center gap-2">
        <button onClick={() => handleRejectUser(user.id)} disabled={actionId === user.id} className="flex-1 py-2 rounded-lg bg-muted hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-[10px] font-semibold uppercase tracking-wider transition-all border border-transparent hover:border-destructive/20 flex items-center justify-center gap-1.5"><UserX className="h-3.5 w-3.5" /> Reject</button>
        <button onClick={() => handleApproveUser(user.id)} disabled={actionId === user.id} className="flex-[2] py-2 rounded-lg bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider transition-all shadow-sm hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-1.5">{actionId === user.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><CheckCircle2 className="h-3.5 w-3.5" /> Approve</>}</button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 space-y-12">
      <div className="pb-6 border-b border-border/50 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div><h2 className="text-xl font-semibold text-foreground uppercase tracking-tight">Account Requests</h2><p className="text-sm text-foreground/80 mt-1">Validate and approve new industrial trainees and partners</p></div>
        <div className="text-[10px] font-semibold text-foreground/70 bg-muted px-2 py-0.5 rounded border border-border/50 uppercase tracking-wider">{pendingUsers.length + (data?.companies?.length || 0)} Actions Required</div>
      </div>

      <div className="space-y-12 pb-24">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4"><h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Pending Student Access</h3><div className="p-1 bg-primary/10 rounded-lg text-primary"><GraduationCap className="h-4 w-4" /></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingStudents.length > 0 ? pendingStudents.map(renderUserCard) : <div className="col-span-full py-16 text-center rounded-xl border border-dashed border-border bg-muted/30"><p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">No pending students</p></div>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4"><div className="flex items-center gap-3"><h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">New Partner Applications</h3><span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 uppercase tracking-widest">Priority</span></div><div className="p-1 bg-primary/10 rounded-lg text-primary"><Building2 className="h-4 w-4" /></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerApplications.length > 0 ? partnerApplications.map((user: PendingUser) => (
              <div key={user.id} className="bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col h-full space-y-6 transition-all hover:border-primary/20 ring-1 ring-primary/5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-card border border-border/50 flex items-center justify-center overflow-hidden relative shadow-sm">{user.company?.logoUrl ? <Image src={user.company.logoUrl} alt={user.company.name} fill className="object-cover" unoptimized /> : <Building2 className="h-6 w-6 text-primary/40" />}</div>
                    <div><h4 className="text-sm font-semibold text-foreground tracking-tight">{user.company?.name}</h4><span className="text-[9px] font-semibold uppercase tracking-widest text-primary/60">New Entity Registration</span></div>
                  </div>
                </div>
                {user.company?.bannerUrl && <div className="relative h-20 w-full rounded-lg overflow-hidden border border-border/50 bg-muted"><Image src={user.company.bannerUrl} alt="Banner Preview" fill className="object-cover" unoptimized /></div>}
                <div className="space-y-4 flex-1">
                  <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                    <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">Requesting Employer</p>
                    <div className="flex items-center gap-2 mb-1"><User className="h-3 w-3 text-primary/60" /><span className="text-xs font-semibold text-foreground">{user.name}</span></div>
                    <div className="flex items-center gap-2"><Mail className="h-3 w-3 text-foreground/40" /><span className="text-[10px] text-foreground/60">{user.email}</span></div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-medium text-foreground/50"><Calendar className="h-3.5 w-3.5 opacity-50" />Submitted {new Date(user.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="pt-4 flex items-center gap-2">
                  <button onClick={() => handleRejectUser(user.id)} disabled={actionId === user.id} className="flex-1 py-2 rounded-lg bg-muted hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-[10px] font-semibold uppercase tracking-wider transition-all border border-transparent hover:border-destructive/20 flex items-center justify-center gap-1.5"><UserX className="h-3.5 w-3.5" /> Reject</button>
                  <button onClick={() => handleVerifyPartnership(user.id, user.companyId!)} disabled={actionId === user.id} className="flex-[2] py-2 rounded-lg bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider transition-all shadow-sm hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-1.5">{actionId === user.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><CheckCircle2 className="h-3.5 w-3.5" /> Verify Partnership</>}</button>
                </div>
              </div>
            )) : <div className="col-span-full py-16 text-center rounded-xl border border-dashed border-border bg-muted/30"><p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">No new partner applications</p></div>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4"><h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Staff Access Requests</h3><div className="p-1 bg-muted rounded-lg text-foreground/70"><Briefcase className="h-4 w-4" /></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffAccessRequests.length > 0 ? staffAccessRequests.map(renderUserCard) : <div className="col-span-full py-16 text-center rounded-xl border border-dashed border-border bg-muted/30"><p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">No pending staff requests</p></div>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4"><h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Other Partner Verifications</h3><div className="p-1 bg-primary/10 rounded-lg text-primary"><Building2 className="h-4 w-4" /></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orphanedCompanies.length > 0 ? orphanedCompanies.map((company: Company) => (
              <div key={company.id} className="bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col space-y-6 transition-all hover:border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-card border border-border/50 flex items-center justify-center overflow-hidden relative shadow-sm">{company.logoUrl ? <Image src={company.logoUrl} alt={company.name} fill className="object-cover" unoptimized /> : <Building2 className="h-6 w-6 text-foreground/20" />}</div>
                  <div><h4 className="text-sm font-semibold text-foreground tracking-tight">{company.name}</h4><span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/50">{company.industry}</span></div>
                </div>
                <div className="flex-1 space-y-3"><p className="text-xs text-foreground/60 leading-relaxed font-medium">Requesting industrial partnership verification for SIT placement program.</p><div className="flex items-center gap-2 text-xs text-foreground/70"><Mail className="h-3.5 w-3.5 opacity-50" />{company.email}</div></div>
                <button onClick={() => handleVerifyCompany(company.id)} disabled={actionId === company.id} className="w-full py-2 rounded-lg bg-foreground text-background dark:bg-primary dark:text-primary-foreground text-[10px] font-semibold uppercase tracking-wider transition-all shadow-sm hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-1.5">{actionId === company.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><CheckCircle2 className="h-3.5 w-3.5" /> Verify Entity</>}</button>
              </div>
            )) : <div className="col-span-full py-16 text-center rounded-xl border border-dashed border-border bg-muted/30"><p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">No pending companies</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
