"use client";

import { useMockStore } from "@/store/mock-store";
import { 
  Building2, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Mail, 
  Plus,
  MoreVertical,
  Globe
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CoordinatorCompaniesPage() {
  const { companies, verifyCompany } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleVerify = async (id: string, status: boolean) => {
    setIsProcessing(id);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 800));
    verifyCompany(id, status);
    setIsProcessing(null);
  };

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in-fade">
      {/* Search & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search partners by name or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-11 rounded-xl border border-border bg-card text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
          />
        </div>
        <button className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="group p-6 rounded-[2rem] bg-card border border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden">
             {/* Status Badge Positioning */}
             <div className={cn(
               "absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
               company.isVerified ? "bg-primary/10 text-primary border border-primary/20" : "bg-destructive/10 text-destructive border border-destructive/20"
             )}>
                {company.isVerified ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                {company.isVerified ? 'Verified' : 'Pending Verification'}
             </div>

             <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-2xl font-black text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-inner">
                   {company.name[0]}
                </div>
                <div className="flex-1 space-y-4">
                   <div className="space-y-1">
                      <h3 className="text-xl font-black text-foreground leading-tight">{company.name}</h3>
                      <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                         <Globe className="h-3 w-3" />
                         {company.industry}
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                         <Mail className="h-4 w-4 text-muted-foreground" />
                         <span className="text-[11px] font-bold text-muted-foreground truncate">{company.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Clock className="h-4 w-4 text-muted-foreground" />
                         <span className="text-[11px] font-bold text-muted-foreground">Joined {new Date(company.joinedAt).toLocaleDateString()}</span>
                      </div>
                   </div>

                   <div className="pt-4 border-t border-border flex items-center gap-2">
                      {!company.isVerified ? (
                        <button
                          onClick={() => handleVerify(company.id, true)}
                          disabled={isProcessing === company.id}
                          className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                          {isProcessing === company.id ? <Clock className="h-3 w-3 animate-spin" /> : <ShieldCheck className="h-3 w-3" />}
                          Approve MOU
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVerify(company.id, false)}
                          disabled={isProcessing === company.id}
                          className="flex-1 h-10 rounded-xl bg-muted text-muted-foreground text-[10px] font-black uppercase tracking-widest hover:bg-destructive hover:text-destructive-foreground transition-all flex items-center justify-center gap-2"
                        >
                          Revoke Verification
                        </button>
                      )}
                      <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-muted text-muted-foreground hover:text-primary transition-colors">
                         <MoreVertical className="h-4 w-4" />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        ))}

        {filteredCompanies.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
            <p className="font-black text-muted-foreground uppercase tracking-widest">No companies found matching your search</p>
          </div>
        )}
      </div>

      {/* Verification Policy Sidebar/Note */}
      <div className="p-8 rounded-[2.5rem] bg-primary text-primary-foreground relative overflow-hidden group">
         <div className="absolute top-[-30%] left-[-10%] w-[50%] h-[150%] bg-white/5 skew-x-12 group-hover:translate-x-10 transition-transform duration-1000" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
               <h4 className="text-xl font-black">Industrial MOU Auditing</h4>
               <p className="text-sm font-medium opacity-70 max-w-xl">
                 Verification confirms that the industry partner has signed the **Memorandum of Understanding (MOU)** with TUP-Visayas and strictly adheres to CHED/industrial training standards.
               </p>
            </div>
            <button className="px-8 py-3 rounded-xl bg-background text-primary font-black text-xs uppercase tracking-widest whitespace-nowrap shadow-xl hover:scale-105 transition-all">
               View Protocol Docs
            </button>
         </div>
      </div>
    </div>
  );
}
