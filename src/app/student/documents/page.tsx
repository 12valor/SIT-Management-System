"use client";

import { useState } from "react";
import { useMockStore, SITDocument } from "@/store/mock-store";
import { 
  FileText, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileUp,
  X,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const REQUIRED_DOCS = [
  { name: "SIT Intent Form", type: "Application" },
  { name: "Student Resume / CV", type: "Identification" },
  { name: "Liability Waiver", type: "Legal" },
  { name: "SIT Recommendation Letter", type: "Reference" },
];

export default function StudentDocumentsPage() {
  const { user, documents, uploadDocument, deleteDocument } = useMockStore();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState(REQUIRED_DOCS[0].name);

  const studentDocs = documents.filter(d => d.studentEmail === user?.email);

  const handleUpload = async () => {
    if (!user) return;
    setIsUploading(true);
    
    // Simulate a bit of delay for the upload feeling
    await new Promise(resolve => setTimeout(resolve, 1500));

    uploadDocument({
      name: selectedDocType,
      type: "PDF",
      studentEmail: user.email,
    });

    setIsUploading(false);
  };

  const getDocStatus = (docName: string) => {
    return studentDocs.find(d => d.name === docName);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-gradient">Document Hub</h2>
          <p className="text-muted-foreground font-medium">Manage and submit all your mandatory SIT requirements.</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-4">
           <div className="flex -space-x-2">
              {REQUIRED_DOCS.map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-[10px] font-bold">
                  {i + 1}
                </div>
              ))}
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Completion</p>
              <p className="text-sm font-bold">{studentDocs.length} / {REQUIRED_DOCS.length} Uploaded</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Requirement List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FileUp className="h-5 w-5 text-primary" />
            Required Documents
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {REQUIRED_DOCS.map((req) => {
              const uploadedDoc = getDocStatus(req.name);
              return (
                <div key={req.name} className={cn(
                  "p-5 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
                  uploadedDoc 
                    ? "bg-card border-green-500/20 shadow-sm" 
                    : "bg-card border-border hover:border-primary/30"
                )}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center",
                      uploadedDoc ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                    )}>
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base">{req.name}</h4>
                      <p className="text-xs font-medium text-muted-foreground">{req.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {uploadedDoc ? (
                      <>
                        <div className="flex flex-col items-end mr-2 hidden sm:flex">
                          <p className="text-[10px] font-black text-green-600 uppercase">Uploaded</p>
                          <p className="text-[11px] font-medium text-muted-foreground">{new Date(uploadedDoc.uploadedAt).toLocaleDateString()}</p>
                        </div>
                        <button 
                          onClick={() => deleteDocument(uploadedDoc.id)}
                          className="h-9 w-9 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors ml-auto sm:ml-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="h-9 px-4 rounded-lg bg-green-500/10 text-green-600 flex items-center gap-2 font-bold text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Accepted
                        </div>
                      </>
                    ) : (
                      <button 
                        onClick={() => {
                          setSelectedDocType(req.name);
                          // We use a small hack here to trigger the "upload" feeling
                          handleUpload();
                        }}
                        disabled={isUploading}
                        className="w-full sm:w-auto px-5 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                      >
                        {isUploading && selectedDocType === req.name ? (
                          <Clock className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Upload className="h-3.5 w-3.5" />
                        )}
                        Upload PDF
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
           <div className="p-6 rounded-xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-4">
                 <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-primary" />
                 </div>
                 <h4 className="font-bold text-lg">Submission Rules</h4>
                 <ul className="space-y-3">
                    {[
                      "All files must be in PDF format",
                      "Max file size is 5MB per document",
                      "Ensure digital signatures are valid",
                      "Coordinators will verify within 48h"
                    ].map((rule, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm opacity-80">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {rule}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>

           <div className="p-6 rounded-xl border border-dashed border-border bg-card">
              <h4 className="font-bold text-sm mb-4">Other Files</h4>
              <button className="w-full h-12 rounded-lg border border-border flex items-center justify-center gap-2 text-xs font-bold hover:bg-muted transition-colors">
                <Plus className="h-4 w-4" /> Add Optional File
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
