"use client";

import { useState } from "react";
import { useMockStore } from "@/store/mock-store";
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  User as UserIcon,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoordinatorStudentsPage() {
  const { applications, logbookEntries, postings } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique students from applications
  const studentEmails = Array.from(new Set(applications.map(a => a.studentEmail)));
  
  const students = studentEmails.map(email => {
    const studentApps = applications.filter(a => a.studentEmail === email);
    const hiredApp = studentApps.find(a => a.status === 'Accepted');
    const studentLogs = logbookEntries.filter(e => e.studentEmail === email && e.status === 'Approved');
    const totalHours = studentLogs.reduce((acc, curr) => acc + curr.hours, 0);
    const studentName = studentApps[0]?.studentName || "Unknown Student";
    
    return {
      email,
      name: studentName,
      status: hiredApp ? 'Hired' : 'Seeking',
      company: hiredApp ? (postings.find(p => p.id === hiredApp.postingId)?.company || 'Company') : 'N/A',
      hours: totalHours,
      progress: (totalHours / 300) * 100
    };
  });

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in-fade">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-11 rounded-xl border border-border bg-card text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="h-11 px-4 rounded-xl border border-border bg-card flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Students List Container */}
      <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Student Profile</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">SIT Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Current Placement</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Accumulated Hours</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.email} className="group hover:bg-muted transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                          {student.name[0]}
                        </div>
                        <div>
                          <p className="font-black text-foreground leading-none">{student.name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground mt-1.5">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Circle className={cn(
                          "h-2 w-2 fill-current",
                          student.status === 'Hired' ? "text-primary" : "text-destructive"
                        )} />
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          student.status === 'Hired' ? "text-primary" : "text-destructive"
                        )}>
                          {student.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                       <p className="text-sm font-bold text-foreground">{student.company}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-2 max-w-[140px]">
                         <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-primary">{student.hours.toFixed(1)} <span className="text-muted-foreground font-bold">/ 300</span></span>
                            <span className="text-[10px] font-black text-muted-foreground">{Math.round(student.progress)}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-500" 
                              style={{ width: `${Math.min(student.progress, 100)}%` }}
                            />
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="max-w-xs mx-auto space-y-3 opacity-40">
                         <UserIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                         <p className="font-black uppercase tracking-widest text-sm">No Students Found</p>
                         <p className="text-xs font-bold leading-relaxed">Adjust your search or filter to find specific student records.</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-5 border-t border-border bg-muted/30 flex items-center justify-between">
           <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Showing {filteredStudents.length} of {students.length} Total Records
           </p>
           <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-border text-[10px] font-black uppercase tracking-widest disabled:opacity-30 cursor-not-allowed">Prev</button>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">1</button>
              <button className="px-3 py-1.5 rounded-lg border border-border text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-colors">Next</button>
           </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="p-8 rounded-[2rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
               <CheckCircle2 className="h-32 w-32" />
            </div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-70">Graduation Readiness</h4>
            <div className="text-4xl font-black mb-2">12 <span className="text-xl opacity-60 font-medium">Students</span></div>
            <p className="text-sm font-bold opacity-80 leading-relaxed max-w-xs">
               Number of trainees who have completed at least 80% of their required SIT hours.
            </p>
         </div>
         <div className="p-8 rounded-[2rem] bg-card border border-border shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform text-muted-foreground">
               <Clock className="h-32 w-32" />
            </div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-primary">Audit Alert</h4>
            <div className="text-4xl font-black text-foreground mb-2">05 <span className="text-xl text-muted-foreground font-medium">Low Activity</span></div>
            <p className="text-sm font-bold text-muted-foreground leading-relaxed max-w-xs">
               Students with no logged activity in the last 7 days through the portal.
            </p>
         </div>
      </div>
    </div>
  );
}
