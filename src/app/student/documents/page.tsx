"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileUp,
  Plus,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStudentDocuments, uploadDocumentMetadata, deleteDocument } from "./actions";
import { SITDocument } from "@prisma/client";

const REQUIRED_DOCS = [
  { name: "SIT Intent Form", type: "Application" },
  { name: "Student Resume / CV", type: "Identification" },
  { name: "Liability Waiver", type: "Legal" },
  { name: "SIT Recommendation Letter", type: "Reference" },
];

export default function StudentDocumentsPage() {
  const [documents, setDocuments] = useState<SITDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const result = await getStudentDocuments();
      if (result.success && result.data) {
        setDocuments(result.data);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleUpload = async (docName: string) => {
    setSelectedDocType(docName);
    setIsUploading(true);
    
    // Simulate industrial processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = await uploadDocumentMetadata({
      name: docName,
      type: "PDF",
    });

    if (result.success && result.data) {
      setDocuments(prev => [result.data as SITDocument, ...prev]);
    }

    setIsUploading(false);
    setSelectedDocType(null);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteDocument(id);
    if (result.success) {
      setDocuments(prev => prev.filter(d => d.id !== id));
    }
  };

  const getDocStatus = (docName: string) => {
    return documents.find(d => d.name === docName);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Synchronizing Document Vault...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20 animate-in-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-gradient uppercase">Document Hub</h2>
          <p className="text-slate-500 font-bold">Manage and submit all your mandatory SIT requirements.</p>
        </div>
        <div className="p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20 flex items-center gap-4">
           <div className="flex -space-x-2">
              {REQUIRED_DOCS.map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[10px] font-black">
                  {i + 1}
                </div>
              ))}
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Completion</p>
              <p className="text-sm font-black text-slate-900 dark:text-white">{documents.length} / {REQUIRED_DOCS.length} Uploaded</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Requirement List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white">
            <FileUp className="h-5 w-5 text-indigo-600" />
            Required Documents
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {REQUIRED_DOCS.map((req) => {
              const uploadedDoc = getDocStatus(req.name);
              return (
                <div key={req.name} className={cn(
                  "p-8 rounded-[2rem] border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
                  uploadedDoc 
                    ? "bg-white dark:bg-slate-900 border-emerald-500/20 shadow-xl shadow-emerald-500/5" 
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 shadow-sm"
                )}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                      uploadedDoc ? "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600" : "bg-slate-50 dark:bg-slate-800/50 text-slate-400"
                    )}>
                      <FileText className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-slate-900 dark:text-white">{req.name}</h4>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{req.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {uploadedDoc ? (
                      <>
                        <div className="flex flex-col items-end mr-4 hidden sm:flex">
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Uploaded</p>
                          <p className="text-[11px] font-bold text-slate-400">{new Date(uploadedDoc.uploadedAt).toLocaleDateString()}</p>
                        </div>
                        <button 
                          onClick={() => handleDelete(uploadedDoc.id)}
                          className="h-10 w-10 rounded-xl hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-all ml-auto sm:ml-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="h-10 px-5 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest border border-emerald-500/20">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Validated
                        </div>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleUpload(req.name)}
                        disabled={isUploading}
                        className="w-full sm:w-auto px-6 h-12 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 group"
                      >
                        {isUploading && selectedDocType === req.name ? (
                          <Clock className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                        )}
                        {isUploading && selectedDocType === req.name ? "Processing..." : "Submit PDF"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
           <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-all" />
              <div className="relative z-10 space-y-6">
                 <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-indigo-400" />
                 </div>
                 <h4 className="font-black text-xl tracking-tight">Submission Rules</h4>
                 <ul className="space-y-4">
                    {[
                      "All files must be in PDF format",
                      "Max file size is 5MB per document",
                      "Ensure digital signatures are valid",
                      "Coordinators will verify within 48h"
                    ].map((rule, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs font-bold text-slate-400 leading-relaxed">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        {rule}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <h4 className="font-black text-sm text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-center">Other Files</h4>
              <button className="w-full h-14 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all group">
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" /> Add Optional File
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
