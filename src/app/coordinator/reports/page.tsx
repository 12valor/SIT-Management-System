"use client";

import { FileSearch, Download, FileText, CheckCircle2 } from "lucide-react";

export default function CoordinatorReportsPage() {
  const reportTypes = [
    { title: "Monthly Student Participation", description: "Aggregate hours and active trainees for the current month.", icon: FileSearch },
    { title: "MOU Compliance Report", description: "List of all verified vs legacy industry partners.", icon: FileText },
    { title: "Placement Completion Status", description: "Students nearing the 300-hour requirement.", icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-8 animate-in-fade">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Generated Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <div key={report.title} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 group">
             <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-all">
                <report.icon className="h-7 w-7 text-indigo-600 group-hover:text-white transition-all" />
             </div>
             <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{report.title}</h3>
             <p className="text-sm font-bold text-slate-500 leading-relaxed mb-8">{report.description}</p>
             <button className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white dark:hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> Export Latest PDF
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}
