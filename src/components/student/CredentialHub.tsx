"use client";

import { useState } from "react";
import { 
  FileText, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Loader2,
  Upload,
  Pencil
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getStudentDocumentUrl, uploadDocumentMetadata, deleteDocument } from "@/app/(portals)/student/documents/actions";
import { DocumentUploadZone } from "./DocumentUploadZone";
import { REQUIRED_CREDENTIALS } from "@/app/(portals)/student/dashboard/types";
import { fileToOptimizedDataUrl } from "@/lib/client-media";

interface SITDocument {
  id: string;
  name: string;
  type: string;
  hasFile?: boolean;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  feedback: string | null;
  uploadedAt: Date;
}

export function CredentialHub({ initialData }: { initialData: SITDocument[] | null }) {
  const [documents, setDocuments] = useState<SITDocument[]>(initialData || []);
  const [isUploading, setIsUploading] = useState(false);
  const [activeUploadType, setActiveUploadType] = useState<string | null>(null);

  const handleUpload = async (file: File, docName: string) => {
    setIsUploading(true);
    setActiveUploadType(docName);
    
    // If a document with the same name exists, delete it first (Modification)
    const existingDoc = findDoc(docName);
    if (existingDoc) {
      await deleteDocument(existingDoc.id);
    }
    
    const fileUrl = await fileToOptimizedDataUrl(file, {
      maxWidth: 1400,
      maxHeight: 1800,
      quality: 0.7,
    });

    const result = await uploadDocumentMetadata({
      name: docName,
      type: file.type.includes("image") ? "IMAGE" : "PDF",
      url: fileUrl
    });

    if (result.success && result.data) {
      if (existingDoc) {
        setDocuments(prev => [result.data as SITDocument, ...prev.filter(d => d.id !== existingDoc.id)]);
      } else {
        setDocuments(prev => [result.data as SITDocument, ...prev]);
      }
    }

    setIsUploading(false);
    setActiveUploadType(null);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteDocument(id);
    if (result.success) {
      setDocuments(prev => prev.filter(d => d.id !== id));
    }
  };

  const findDoc = (name: string) => documents.find(d => d.name === name);
  const handleViewDocument = async (doc: SITDocument) => {
    const result = await getStudentDocumentUrl(doc.id);
    if (!result.success || !result.url) return;

    if (result.url.includes("example.com/manifests")) {
      alert("This is a mock document. In a real environment, this would open the uploaded file.");
    } else if (result.url.startsWith("data:")) {
      const a = document.createElement("a");
      a.href = result.url;
      a.download = doc.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(result.url, "_blank");
    }
  };
  const requiredDocs = REQUIRED_CREDENTIALS.filter((credential) => credential.required);
  const verifiedRequiredCount = requiredDocs.filter((credential) =>
    documents.some((doc) => doc.name === credential.name && doc.status === "VERIFIED")
  ).length;

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Simplified Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-b">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Documents & Credentials</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage your training documents and professional certifications.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Compliance</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500" 
                  style={{ width: `${(verifiedRequiredCount / requiredDocs.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {Math.round((verifiedRequiredCount / requiredDocs.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {REQUIRED_CREDENTIALS.map((cred) => {
          const doc = findDoc(cred.name);
          const isItemUploading = activeUploadType === cred.name;

          return (
            <div 
              key={cred.id}
              className={cn(
                "p-6 rounded-xl border bg-white dark:bg-white/[0.02] transition-all",
                doc ? "border-slate-200 dark:border-white/10" : "border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-transparent"
              )}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className={cn(
                    "p-3 rounded-lg",
                    doc ? "bg-primary/10 text-primary" : "bg-slate-100 dark:bg-white/5 text-slate-400"
                  )}>
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{cred.name}</h3>
                      {cred.required && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-2 py-0.5 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                      {cred.description}
                    </p>
                    {doc && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-slate-400 flex items-center gap-1.5">
                          <CheckCircle2 className={cn(
                            "h-3 w-3",
                            doc.status === "VERIFIED" ? "text-emerald-500" : doc.status === "REJECTED" ? "text-red-500" : "text-amber-500"
                          )} />
                          Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()} · {doc.status.toLowerCase()}
                        </p>
                        {doc.feedback && (
                          <p className="text-xs text-red-500">{doc.feedback}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <AnimatePresence mode="wait">
                    {doc ? (
                      <motion.div 
                        key="actions"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <button 
                          onClick={() => handleViewDocument(doc)}
                          className="h-10 px-4 text-xs font-bold border border-border rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center gap-2 shadow-sm"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          View
                        </button>
                        <button 
                          onClick={() => setActiveUploadType(activeUploadType === cred.name ? null : cred.name)}
                          className={cn(
                            "h-10 px-4 text-xs font-bold border rounded-xl transition-all flex items-center gap-2",
                            activeUploadType === cred.name 
                            ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900"
                            : "bg-white text-slate-600 border-border hover:bg-slate-50 dark:bg-white/5 dark:text-slate-300 shadow-sm"
                          )}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Modify
                        </button>
                        <button 
                          onClick={() => handleDelete(doc.id)}
                          className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all rounded-xl border border-transparent hover:border-red-200 dark:hover:border-red-500/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="upload"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <button 
                          onClick={() => setActiveUploadType(activeUploadType === cred.name ? null : cred.name)}
                          disabled={isUploading && !isItemUploading}
                          className={cn(
                            "px-6 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2",
                            activeUploadType === cred.name 
                              ? "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-white"
                              : "bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20"
                          )}
                        >
                          {isItemUploading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="h-4 w-4" />
                          )}
                          {activeUploadType === cred.name ? "Cancel" : "Upload Document"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {activeUploadType === cred.name && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5"
                >
                  <DocumentUploadZone 
                    onUpload={(file) => handleUpload(file, cred.name)}
                    isUploading={isUploading}
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-2xl bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-slate-200 dark:bg-white/10 rounded-lg text-slate-500">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white">Security Protocol</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Only PDF and image formats are accepted. Documents must be reviewed by the coordinator before completion clearance.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-slate-400 bg-white dark:bg-white/[0.03] border px-4 py-2 rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Coordinator Review</span>
        </div>
      </div>
    </div>
  );
}
