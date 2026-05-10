"use client";

import { useState } from "react";
import { 
  FileText, 
  Trash2, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Loader2
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
    <div className="space-y-16 max-w-7xl mx-auto pb-32">
      {/* Header Section — Editorial Style */}
      <div className="relative border-b-2 border-foreground/5 pb-12 pt-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-foreground/[0.03] rounded-full border border-foreground/5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/60">Institutional Archive</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground leading-[0.85]">
                Credential<br />Vault<span className="text-primary">.</span>
              </h1>
              <p className="text-base text-muted-foreground max-w-lg font-medium leading-relaxed italic">
                A centralized repository for verified institutional manifests. These documents serve as the primary validation for industrial placement candidacy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 lg:pb-2">
            <div className="group relative">
               <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative flex flex-col items-end">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Archive Compliance</span>
                 <span className="text-7xl font-black tabular-nums text-foreground flex items-baseline">
                   {Math.round((documents.filter(d => REQUIRED_CREDENTIALS.find(r => r.name === d.name)?.required).length / REQUIRED_CREDENTIALS.filter(r => r.required).length) * 100)}
                   <span className="text-2xl text-primary font-bold ml-1">%</span>
                 </span>
               </div>
            </div>
            <div className="h-16 w-px bg-foreground/10 mx-4" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Manifests</span>
              <span className="text-4xl font-black tabular-nums text-foreground">{documents.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-primary rounded-full" />
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground/40">Requirement Manifest</h3>
              </div>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {REQUIRED_CREDENTIALS.map((cred) => {
                const doc = findDoc(cred.name);
                const isItemUploading = activeUploadType === cred.name;
 
                return (
                  <div 
                    key={cred.id}
                    className={cn(
                      "group relative p-8 rounded-none border-l-4 transition-all duration-500 overflow-hidden",
                      doc 
                        ? "bg-card border-primary" 
                        : "bg-muted/5 border-foreground/10 hover:border-foreground/30"
                    )}
                  >
                    {/* Folder Tab Effect */}
                    <div className="absolute top-0 right-0 h-12 w-12 bg-foreground/[0.02] border-b border-l border-foreground/10 -mr-6 -mt-6 rotate-45" />
                    
                    <div className="flex flex-col h-full gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={cn(
                            "h-10 w-10 flex items-center justify-center transition-colors",
                            doc ? "text-primary" : "text-foreground/20"
                          )}>
                            <FileText className="h-7 w-7 stroke-[1.5]" />
                          </div>
                          {cred.required && (
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 px-2 py-1">
                              Mandatory
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-black text-lg tracking-tight leading-none group-hover:text-primary transition-colors">
                            {cred.name}
                          </h4>
                          <p className="text-xs text-muted-foreground font-medium italic">
                            {cred.description}
                          </p>
                        </div>
                      </div>
 
                      <div className="mt-auto pt-6 border-t border-foreground/5 flex items-center justify-between">
                        <AnimatePresence mode="wait">
                          {doc ? (
                            <motion.div 
                              key="status-complete"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-4 w-full"
                            >
                              <div className="flex-1">
                                <p className="text-[9px] font-black text-primary uppercase tracking-widest">Archived</p>
                                <p className="text-[9px] font-medium text-muted-foreground">{new Date(doc.uploadedAt).toLocaleDateString()}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => doc.url && window.open(doc.url, '_blank')}
                                  className="h-9 w-9 border border-foreground/10 bg-card hover:bg-foreground hover:text-background flex items-center justify-center transition-all"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleDelete(doc.id)}
                                  className="h-9 w-9 border border-foreground/10 bg-card hover:bg-destructive hover:text-white flex items-center justify-center transition-all"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="status-action"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="w-full"
                            >
                              <button 
                                onClick={() => setActiveUploadType(cred.name)}
                                disabled={isUploading}
                                className="w-full h-11 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                              >
                                {isItemUploading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Clock className="h-4 w-4" />
                                )}
                                Submit Manifest
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
                        className="mt-6 pt-6 border-t border-foreground/10"
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
        <div className="lg:col-span-4 space-y-12">
          <div className="p-10 bg-foreground text-background space-y-10 sticky top-24">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-background/30" />
                <h4 className="font-black text-sm uppercase tracking-[0.3em] opacity-60">Protocol</h4>
              </div>
              <h3 className="text-3xl font-black tracking-tight leading-none">Security Standards</h3>
            </div>
 
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  "Files must be in PDF or standard Image format",
                  "Maximum individual manifest size: 5MB",
                  "Verify digital signatures before archiving",
                  "Credentials are visible to industry partners"
                ].map((rule, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="mt-1 h-5 w-5 shrink-0 border border-background/20 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <p className="text-xs font-medium leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{rule}</p>
                  </div>
                ))}
              </div>
 
              <div className="p-6 bg-background/5 border border-background/10 space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Notice</span>
                </div>
                <p className="text-[11px] font-medium italic opacity-60 leading-relaxed">
                  Fraudulent manifest submissions are subject to university disciplinary review. All archives are timestamped and logged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
