"use client";

import { useState } from "react";
import { 
  FileText, 
  Trash2, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  FileBadge,
  AlertCircle,
  ExternalLink,
  Loader2,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { uploadDocumentMetadata, deleteDocument } from "@/app/(portals)/student/documents/actions";
import { DocumentUploadZone } from "./DocumentUploadZone";
import { REQUIRED_CREDENTIALS } from "@/app/(portals)/student/dashboard/types";

interface SITDocument {
  id: string;
  name: string;
  type: string;
  url: string | null;
  uploadedAt: Date;
}


export function CredentialHub({ initialData }: { initialData: SITDocument[] | null }) {
  const [documents, setDocuments] = useState<SITDocument[]>(initialData || []);
  const [isUploading, setIsUploading] = useState(false);
  const [activeUploadType, setActiveUploadType] = useState<string | null>(null);

  const handleUpload = async (file: File, docName: string) => {
    setIsUploading(true);
    setActiveUploadType(docName);
    
    // Simulate industrial processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you'd upload the file to Vercel Blob/S3 here
    // const { url } = await upload(file);
    const mockUrl = `https://archive.sit.tupv.edu.ph/manifests/${file.name.replace(/\s+/g, '_')}`;

    const result = await uploadDocumentMetadata({
      name: docName,
      type: file.type.includes("image") ? "IMAGE" : "PDF",
      url: mockUrl
    });

    if (result.success && result.data) {
      setDocuments(prev => [result.data as SITDocument, ...prev]);
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

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-border pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em]">
            <ShieldCheck className="h-4 w-4" /> Secure Repository
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">Credential Vault</h1>
          <p className="text-muted-foreground text-sm max-w-md font-medium leading-relaxed">
            Upload and manage your institutional credentials. These documents will be reviewed by industrial partners during the application process.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-card border border-border shadow-sm flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Manifests</span>
            <span className="text-2xl font-black tabular-nums">{documents.length}</span>
          </div>
          <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 flex flex-col gap-1">
            <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Compliance</span>
            <span className="text-2xl font-black tabular-nums">
              {Math.round((documents.filter(d => REQUIRED_CREDENTIALS.find(r => r.name === d.name)?.required).length / REQUIRED_CREDENTIALS.filter(r => r.required).length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-7 space-y-10">
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <FileBadge className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold tracking-tight">Requirement Manifest</h3>
            </div>

            <div className="space-y-4">
              {REQUIRED_CREDENTIALS.map((cred) => {
                const doc = findDoc(cred.name);
                const isItemUploading = activeUploadType === cred.name;

                return (
                  <div 
                    key={cred.id}
                    className={cn(
                      "group p-6 rounded-2xl border transition-all duration-300",
                      doc 
                        ? "bg-card border-border shadow-sm" 
                        : "bg-muted/10 border-dashed border-border hover:border-primary/30"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "h-12 w-12 rounded-xl flex items-center justify-center transition-colors shrink-0",
                          doc ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground"
                        )}>
                          <FileText className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm leading-none">{cred.name}</h4>
                            {cred.required && (
                              <span className="px-1.5 py-0.5 rounded-md bg-destructive/5 text-destructive text-[8px] font-black uppercase tracking-widest border border-destructive/10">
                                Mandatory
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground font-medium">{cred.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <AnimatePresence mode="wait">
                          {doc ? (
                            <motion.div 
                              key="status-complete"
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-3"
                            >
                              <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Validated</p>
                                <p className="text-[10px] font-medium text-muted-foreground">{new Date(doc.uploadedAt).toLocaleDateString()}</p>
                              </div>
                              <button 
                                onClick={() => doc.url && window.open(doc.url, '_blank')}
                                className="h-9 w-9 rounded-lg border border-border bg-card hover:border-primary/30 hover:text-primary flex items-center justify-center transition-all"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(doc.id)}
                                className="h-9 w-9 rounded-lg border border-border bg-card hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20 flex items-center justify-center transition-all"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="status-action"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                            >
                              <button 
                                onClick={() => setActiveUploadType(cred.name)}
                                disabled={isUploading}
                                className="h-10 px-5 rounded-xl bg-foreground text-background text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                              >
                                {isItemUploading ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Clock className="h-3.5 w-3.5" />
                                )}
                                Submit File
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {isItemUploading && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-6 pt-6 border-t border-border"
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
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-card border border-border shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                <Info className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-lg tracking-tight">Institutional Protocol</h4>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Compliance Checklist</p>
                <div className="space-y-3">
                  {[
                    "Files must be in PDF or standard Image format",
                    "Maximum individual manifest size: 5MB",
                    "Verify digital signatures before archiving",
                    "Credentials are visible to industry partners"
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                      </div>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-muted/50 border border-border flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-primary shrink-0" />
                <p className="text-[10px] font-medium text-muted-foreground italic leading-relaxed">
                  Notice: Fraudulent manifest submissions are subject to university disciplinary review. All archives are timestamped and logged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
