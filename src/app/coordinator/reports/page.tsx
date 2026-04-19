"use client";

import { useState, useEffect } from "react";
import { FileSearch, Download, FileText, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { getReportsData } from "./actions";
import { generateCoordinatorReport } from "@/lib/pdf-generator";

export default function CoordinatorReportsPage() {
  const [reportsData, setReportsData] = useState<{
    participation: string[][];
    compliance: string[][];
    completion: string[][];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await getReportsData();
      if (result.success && result.data) {
        setReportsData(result.data);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleExport = (type: string) => {
    if (!reportsData) return;

    if (type === "Participation") {
      generateCoordinatorReport(
        "Student Participation Matrix",
        reportsData.participation,
        ["Student Name", "Course", "Approved Hours", "Status"]
      );
    } else if (type === "Compliance") {
      generateCoordinatorReport(
        "Industrial Partner Compliance",
        reportsData.compliance,
        ["Company Name", "Industry", "Vetting Status", "Onboarded Date"]
      );
    } else if (type === "Completion") {
      generateCoordinatorReport(
        "Placement Completion Audit",
        reportsData.completion,
        ["Student Name", "Course", "Progress (Hrs)", "Percentage"]
      );
    }
  };

  const reportTypes = [
    { 
      id: "Participation",
      title: "Monthly Student Participation", 
      description: "Aggregate hours and active trainees for the current month.", 
      icon: FileSearch 
    },
    { 
      id: "Compliance",
      title: "MOU Compliance Report", 
      description: "List of all verified vs legacy industry partners.", 
      icon: FileText 
    },
    { 
      id: "Completion",
      title: "Placement Completion Status", 
      description: "Students nearing the 300-hour requirement.", 
      icon: CheckCircle2 
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Compiling Strategic Intelligence...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in-fade">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Strategic Intelligence</h1>
          <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.4em] mt-2">Executive Export Portal</p>
        </div>
        <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
           <AlertCircle className="h-4 w-4 text-slate-400" />
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time Data Sync Active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <div key={report.title} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 group">
             <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-all">
                <report.icon className="h-7 w-7 text-indigo-600 group-hover:text-white transition-all" />
             </div>
             <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{report.title}</h3>
             <p className="text-sm font-bold text-slate-500 leading-relaxed mb-8">{report.description}</p>
             <button 
               onClick={() => handleExport(report.id)}
               className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white dark:hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
             >
                <Download className="h-4 w-4" /> Export Latest PDF
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}
