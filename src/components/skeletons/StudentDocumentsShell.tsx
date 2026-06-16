"use client";

import { Skeleton } from "boneyard-js/react";
import { useState, useEffect } from "react";
import { 
  FileText, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  FileUp,
  Plus,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadDocumentMetadata, deleteDocument } from "@/app/(portals)/student/documents/actions";
import type { DocumentStatus } from "@prisma/client";

type StudentDocument = {
  id: string;
  name: string;
  type: string;
  status: DocumentStatus;
  feedback: string | null;
  uploadedAt: Date;
  url: string | null;
  hasFile?: boolean;
};

const REQUIRED_DOCS = [
  { name: "SIT Intent Form", type: "Application" },
  { name: "Student Resume / CV", type: "Identification" },
  { name: "Liability Waiver", type: "Legal" },
  { name: "SIT Recommendation Letter", type: "Reference" },
];

export function StudentDocumentsShell({ data }: { data: StudentDocument[] | null }) {
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);

  // Sync server data to client state once loaded
  useEffect(() => {
    if (data) {
      setDocuments(data);
    }
  }, [data]);

  const handleUpload = async (docName: string) => {
    setSelectedDocType(docName);
    setIsUploading(true);
    
    // Simulate industrial processing delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = await uploadDocumentMetadata({
      name: docName,
      type: "PDF",
    });

    if (result.success && result.data) {
      setDocuments(prev => [result.data, ...prev]);
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

  return (
    <Skeleton 
      name="student-documents" 
      loading={!data}
      animate="shimmer"
      stagger={80}
      transition={300}
      snapshotConfig={{
        excludeSelectors: ["svg", "[data-no-skeleton]"],
        excludeTags: ["nav", "footer"],
      }}
      fallback={
        <div className="animate-pulse space-y-10 max-w-5xl mx-auto">
          <div className="flex items-end justify-between pb-8">
             <div className="space-y-4">
                <div className="h-8 w-64 bg-slate-200 rounded-lg" />
                <div className="h-4 w-96 bg-slate-100 rounded-lg" />
             </div>
             <div className="h-12 w-48 bg-slate-200 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 space-y-4 text-center items-center justify-center">
                 {[1,2,3,4].map(i => <div key={i} className="h-20 w-full bg-slate-100 rounded-xl" />)}
             </div>
             <div className="h-64 bg-slate-100 rounded-xl" />
          </div>
        </div>
      }
    >
    <div className="space-y-10 max-w-5xl mx-auto pb-20 animate-in-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Document Hub</h2>
          <p className="text-sm text-slate-500 font-medium">Manage and submit all your mandatory SIT requirements.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
           <div className="flex -space-x-1.5">
              {REQUIRED_DOCS.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-6 h-6 rounded-full border border-white flex items-center justify-center text-[9px] font-bold transition-colors",
                    i < documents.length ? "bg-[#800000] text-white" : "bg-slate-100 text-slate-400"
                  )}
                >
                  {i + 1}
                </div>
              ))}
           </div>
           <div className="h-6 w-px bg-slate-100" />
           <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completion</p>
              <p className="text-xs font-bold text-slate-700">{documents.length} / {REQUIRED_DOCS.length} Required</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Requirement List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <FileUp className="h-4 w-4 text-[#800000]" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Mandatory Submissions</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {REQUIRED_DOCS.map((req) => {
              const uploadedDoc = getDocStatus(req.name);
              return (
                <div key={req.name} className={cn(
                  "p-5 rounded-xl border transition-all flex items-center justify-between gap-4 bg-white shadow-sm",
                  uploadedDoc 
                    ? "border-emerald-100 bg-emerald-50/10" 
                    : "border-slate-200 hover:border-[#800000]/20"
                )}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-11 h-11 rounded-lg flex items-center justify-center transition-colors",
                      uploadedDoc ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-300"
                    )}>
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 leading-tight">{req.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{req.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {uploadedDoc ? (
                      <>
                        <div className="hidden sm:flex flex-col items-end mr-2">
                           <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Validated</p>
                           <p className="text-[10px] font-medium text-slate-400">{new Date(uploadedDoc.uploadedAt).toLocaleDateString()}</p>
                        </div>
                        <button 
                          onClick={() => handleDelete(uploadedDoc.id)}
                          className="h-8 w-8 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="h-8 px-3 rounded-lg bg-emerald-500 text-white flex items-center gap-1.5 font-bold text-[9px] uppercase tracking-wider shadow-sm">
                          <CheckCircle2 className="h-3 w-3" />
                          Complete
                        </div>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleUpload(req.name)}
                        disabled={isUploading}
                        className="px-4 h-9 rounded-lg bg-[#800000] text-white font-bold text-[10px] uppercase tracking-widest shadow-md shadow-red-900/10 hover:bg-red-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isUploading && selectedDocType === req.name ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Upload className="h-3.5 w-3.5" />
                        )}
                        {isUploading && selectedDocType === req.name ? "WAITING" : "SUBMIT PDF"}
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
           <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-slate-50 rounded-lg text-[#800000]">
                    <AlertCircle className="h-4 w-4" />
                 </div>
                 <h4 className="font-bold text-sm text-slate-800 uppercase tracking-widest">Submission Protocol</h4>
              </div>
              <ul className="space-y-3">
                 {[
                   "Format: PDF Document only",
                   "Limit: 5MB maximum file size",
                   "Validation: Signature required",
                   "Review: 48-hour audit window"
                 ].map((rule, i) => (
                   <li key={i} className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#800000]/20" />
                     {rule}
                   </li>
                 ))}
              </ul>
              <div className="pt-2">
                <div className="p-3 bg-slate-50 rounded-lg text-[10px] font-medium text-slate-400 italic leading-relaxed text-center">
                   Official regulatory compliance required for SIT module progression.
                </div>
              </div>
           </div>

           <button className="w-full h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all border-dashed">
             <Plus className="h-3.5 w-3.5" /> Add Optional Manifest
           </button>
        </div>
      </div>
    </div>
    </Skeleton>
  );
}
