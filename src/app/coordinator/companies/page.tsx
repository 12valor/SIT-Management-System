"use client";

import { useMockStore, Company } from "@/store/mock-store";
import { 
  Building2, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Mail, 
  ExternalLink,
  Plus,
  CheckCircle2,
  XCircle,
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search partners by name or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>
        <button className="h-11 px-6 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="group p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 relative overflow-hidden">
             {/* Status Badge Positioning */}
             <div className={cn(
               "absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
               company.isVerified ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
             )}>
                {company.isVerified ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                {company.isVerified ? 'Verified' : 'Pending Verification'}
             </div>

             <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                  {company.name[0]}
                </div>
                <div className="flex-1 space-y-4">
                   <div className="space-y-1">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{company.name}</h3>
                      <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                         <Globe className="h-3 w-3" />
                         {company.industry}
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                         <Mail className="h-4 w-4 text-slate-400" />
                         <span className="text-[11px] font-bold text-slate-500 truncate">{company.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Clock className="h-4 w-4 text-slate-400" />
                         <span className="text-[11px] font-bold text-slate-500">Joined {new Date(company.joinedAt).toLocaleDateString()}</span>
                      </div>
                   </div>

                   <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center gap-2">
                      {!company.isVerified ? (
                        <button
                          onClick={() => handleVerify(company.id, true)}
                          disabled={isProcessing === company.id}
                          className="flex-1 h-10 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                          {isProcessing === company.id ? <Clock className="h-3 w-3 animate-spin" /> : <ShieldCheck className="h-3 w-3" />}
                          Approve MOU
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVerify(company.id, false)}
                          disabled={isProcessing === company.id}
                          className="flex-1 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-all flex items-center justify-center gap-2"
                        >
                          Revoke Verification
                        </button>
                      )}
                      <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-colors">
                         <MoreVertical className="h-4 w-4" />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        ))}

        {filteredCompanies.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <Building2 className="h-12 w-12 mx-auto text-slate-200 mb-4" />
            <p className="font-black text-slate-400 uppercase tracking-widest">No companies found matching your search</p>
          </div>
        )}
      </div>

      {/* Verification Policy Sidebar/Note */}
      <div className="p-8 rounded-[2.5rem] bg-indigo-900 text-white relative overflow-hidden group">
         <div className="absolute top-[-30%] left-[-10%] w-[50%] h-[150%] bg-white/5 skew-x-12 group-hover:translate-x-10 transition-transform duration-1000" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
               <h4 className="text-xl font-black">Industrial MOU Auditing</h4>
               <p className="text-sm font-medium opacity-70 max-w-xl">
                 Verification confirms that the industry partner has signed the **Memorandum of Understanding (MOU)** with TUP-Visayas and strictly adheres to CHED/industrial training standards.
               </p>
            </div>
            <button className="px-8 py-3 rounded-xl bg-white text-indigo-900 font-black text-xs uppercase tracking-widest whitespace-nowrap shadow-xl hover:scale-105 transition-all">
               View Protocol Docs
            </button>
         </div>
      </div>
    </div>
  );
}
