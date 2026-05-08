"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  FileText, 
  ExternalLink, 
  User, 
  Mail, 
  BookOpen, 
  Calendar,
  ChevronRight,
  ShieldCheck,
  FileBadge,
  Loader2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStudentCredentials } from "@/app/(portals)/employer/applicants/actions";

interface CredentialInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  applicationId: string;
}

export function CredentialInspector({ 
  isOpen, 
  onClose, 
  studentId, 
  studentName,
  applicationId 
}: CredentialInspectorProps) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && studentId) {
      async function fetchData() {
        setIsLoading(true);
        setError(null);
        const result = await getStudentCredentials(studentId, applicationId);
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || "Failed to load credentials");
        }
        setIsLoading(false);
      }
      fetchData();
    }
  }, [isOpen, studentId, applicationId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Credential Manifest</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Verification Protocol: {applicationId.slice(-8).toUpperCase()}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="h-8 w-8 text-primary animate-spin opacity-40" />
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Decrypting Dossier...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-20 px-10 text-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">Access Restricted</h4>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto">{error}</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-8 space-y-10">
                  {/* Profile Section */}
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center md:items-start gap-4">
                      <div className="h-32 w-32 rounded-2xl bg-foreground/5 border-2 border-dashed border-border flex items-center justify-center text-muted-foreground overflow-hidden">
                        {data?.image ? (
                          <img src={data.image} alt={studentName} className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-12 w-12 opacity-20" />
                        )}
                      </div>
                      <div className="text-center md:text-left space-y-1">
                        <h4 className="text-2xl font-bold tracking-tight">{studentName}</h4>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
                          Validated Student
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Mail className="h-4 w-4 text-primary mt-0.5" />
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email Address</p>
                            <p className="text-sm font-medium">{data?.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <BookOpen className="h-4 w-4 text-primary mt-0.5" />
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Academic Course</p>
                            <p className="text-sm font-medium">{data?.course || 'No course specified'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="h-4 w-4 text-primary mt-0.5" />
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Member Since</p>
                            <p className="text-sm font-medium">{new Date(data?.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Documents Section */}
                  <section className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                        <FileBadge className="h-4 w-4 text-primary" /> Verified Documents
                      </h5>
                      <span className="text-[10px] font-bold tabular-nums text-muted-foreground/50">{data?.documents?.length || 0} Total</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {data?.documents && data.documents.length > 0 ? (
                        data.documents.map((doc: any) => (
                          <div 
                            key={doc.id} 
                            className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer"
                            onClick={() => doc.url && window.open(doc.url, '_blank')}
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="h-10 w-10 shrink-0 rounded-lg bg-foreground/5 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-xs font-bold truncate pr-2">{doc.name}</p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{doc.type}</p>
                              </div>
                            </div>
                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center border border-dashed border-border rounded-2xl bg-muted/10 opacity-40">
                           <FileText className="h-8 w-8 mb-3" />
                           <p className="text-[10px] font-bold uppercase tracking-widest">No Documents Uploaded</p>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Past Performance / Feedback (Simulated from evaluations) */}
                  <section className="space-y-4 pb-4">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" /> Performance History
                      </h5>
                    </div>
                    
                    {data?.evaluations && data.evaluations.length > 0 ? (
                      <div className="space-y-4">
                        {data.evaluations.map((evalData: any) => (
                          <div key={evalData.id} className="p-4 rounded-xl border border-border bg-muted/10">
                            <div className="flex justify-between items-start mb-2">
                              <h6 className="text-xs font-bold">{evalData.companyName}</h6>
                              <div className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">
                                Grade: {evalData.overallGrade.toFixed(1)}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 italic">"{evalData.comments}"</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center border border-dashed border-border rounded-2xl opacity-30">
                        <p className="text-[10px] font-bold uppercase tracking-widest">No Prior Evaluations Available</p>
                      </div>
                    )}
                  </section>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 h-10 rounded-lg bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Close Dossier
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
