"use client";

import { useState, useTransition } from "react";
import { 
  FileText, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Loader2, 
  Maximize2, 
  Download,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { updateStudentDocumentStatus } from "../actions";

export type SITDocumentReview = {
  id: string;
  name: string;
  type: string;
  url: string | null;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  feedback: string | null;
  uploadedAt: Date;
};

interface DocumentReviewListProps {
  documents: SITDocumentReview[];
}

export default function DocumentReviewList({ documents }: DocumentReviewListProps) {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [fullscreenId, setFullscreenId] = useState<string | null>(null);
  const [rejectionId, setRejectionId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState<{ [key: string]: string }>({});
  const [isPending, startTransition] = useTransition();
  const [loadingMedia, setLoadingMedia] = useState<{ [key: string]: boolean }>({});

  const togglePreview = (id: string) => {
    setPreviewId(prev => {
      const isOpening = prev !== id;
      if (isOpening) {
        const doc = documents.find(d => d.id === id);
        setLoadingMedia(prevLoad => ({ ...prevLoad, [id]: doc?.type === "IMAGE" }));
      }
      return isOpening ? id : null;
    });
  };

  const handleVerify = (id: string) => {
    startTransition(async () => {
      await updateStudentDocumentStatus(id, "VERIFIED");
    });
  };

  const handleReject = (id: string) => {
    const feedback = feedbackText[id] || "";
    const formData = new FormData();
    formData.append("feedback", feedback);

    startTransition(async () => {
      await updateStudentDocumentStatus(id, "REJECTED", formData);
      setRejectionId(null);
    });
  };

  const handleOpenExternal = (doc: SITDocumentReview) => {
    if (!doc.url) return;

    if (doc.url.startsWith("data:")) {
      const a = document.createElement("a");
      a.href = doc.url;
      a.download = doc.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(doc.url, "_blank");
    }
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => {
        const isPreviewing = previewId === doc.id;
        const isFullscreen = fullscreenId === doc.id;
        const isRejecting = rejectionId === doc.id;
        const isMediaLoading = loadingMedia[doc.id] !== false;

        return (
          <div 
            key={doc.id} 
            className={cn(
              "rounded-xl border border-border/70 bg-card p-4 transition-all duration-300 shadow-sm hover:shadow-md",
              isPreviewing && "ring-1 ring-primary/20 border-primary/30"
            )}
          >
            {/* Document Details Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground tracking-tight">{doc.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                  {doc.type} · {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <span className={cn(
                "rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border transition-colors",
                doc.status === "VERIFIED" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
                doc.status === "REJECTED" && "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
                doc.status === "PENDING" && "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400"
              )}>
                {doc.status}
              </span>
            </div>

            {/* Rejection Feedback display */}
            {doc.status === "REJECTED" && doc.feedback && (
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-500/5 border border-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{doc.feedback}</p>
              </div>
            )}

            {/* Document Action Panel */}
            <div className="mt-4 flex flex-wrap gap-2">
              {doc.url ? (
                <button
                  onClick={() => togglePreview(doc.id)}
                  disabled={isPending}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all shadow-sm",
                    isPreviewing 
                      ? "bg-foreground text-background" 
                      : "bg-muted text-foreground hover:bg-muted/80 border border-border/50"
                  )}
                >
                  {isPreviewing ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {isPreviewing ? "Hide Document" : "View Document"}
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border/40 px-3 py-2 rounded-lg bg-muted/20">
                  <AlertCircle className="h-3.5 w-3.5" />
                  No file uploaded
                </div>
              )}

              <button
                onClick={() => handleVerify(doc.id)}
                disabled={doc.status === "VERIFIED" || isPending}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
              >
                {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                Verify Document
              </button>

              <button
                onClick={() => setRejectionId(isRejecting ? null : doc.id)}
                disabled={doc.status === "REJECTED" || isPending}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold border disabled:opacity-50 transition-all shadow-sm",
                  isRejecting 
                    ? "bg-red-500/10 text-red-600 border-red-500/20" 
                    : "border-red-200 text-red-600 hover:bg-red-50/50 dark:border-red-500/20 dark:hover:bg-red-500/10"
                )}
              >
                <X className="h-3.5 w-3.5" />
                Reject
              </button>
            </div>

            {/* Rejection Feedback Form */}
            {isRejecting && (
              <div className="mt-4 space-y-3 rounded-lg border border-border/60 bg-muted/30 p-3 transition-all">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Provide rejection feedback</p>
                <textarea
                  placeholder="Explain why this document is being rejected (e.g. incorrect file, blurry image, expired date)..."
                  value={feedbackText[doc.id] || ""}
                  onChange={(e) => setFeedbackText(prev => ({ ...prev, [doc.id]: e.target.value }))}
                  className="w-full min-h-[70px] rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary transition-all resize-none shadow-inner"
                  rows={2}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setRejectionId(null)}
                    className="rounded-lg px-3 py-1.5 text-xs font-bold text-muted-foreground hover:bg-muted transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReject(doc.id)}
                    disabled={isPending || !(feedbackText[doc.id] || "").trim()}
                    className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50 transition-all shadow-sm"
                  >
                    {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    Confirm Rejection
                  </button>
                </div>
              </div>
            )}

            {/* Collapsible Inline Document Preview */}
            {isPreviewing && doc.url && (
              <div className="mt-4 rounded-lg border border-border/50 bg-muted/40 p-2 space-y-2">
                <div className="flex items-center justify-between border-b border-border/40 pb-2 px-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Inline Preview
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setFullscreenId(doc.id)}
                      className="inline-flex items-center gap-1 p-1 text-[10px] font-semibold text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-all"
                      title="Fullscreen Preview"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenExternal(doc)}
                      className="inline-flex items-center gap-1 p-1 text-[10px] font-semibold text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-all"
                      title="Open in new window / Download"
                    >
                      {doc.url.startsWith("data:") ? <Download className="h-3.5 w-3.5" /> : <ExternalLink className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="relative min-h-[300px] flex items-center justify-center rounded-md overflow-hidden bg-muted border border-border/30">
                  {isMediaLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/80 z-10">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>
                  )}

                  {doc.type === "IMAGE" ? (
                    <img 
                      src={doc.url} 
                      alt={doc.name} 
                      className="max-w-full max-h-[500px] object-contain rounded-md shadow-sm"
                      onLoad={() => setLoadingMedia(prev => ({ ...prev, [doc.id]: false }))}
                      onError={() => setLoadingMedia(prev => ({ ...prev, [doc.id]: false }))}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">Openable PDF Document</p>
                        <p className="text-xs text-muted-foreground max-w-sm">
                          This is an openable file. Kindly download the document to view or view in another panel (pop up panel).
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setFullscreenId(doc.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 shadow-sm transition-all cursor-pointer"
                        >
                          <Maximize2 className="h-3.5 w-3.5" />
                          View in Pop-up
                        </button>
                        <button
                          onClick={() => handleOpenExternal(doc)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-bold text-foreground hover:bg-muted transition-all cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download File
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Fullscreen Overlay Modal */}
      {fullscreenId && (() => {
        const doc = documents.find(d => d.id === fullscreenId);
        if (!doc || !doc.url) return null;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 md:p-8 animate-fade-in">
            <div className="relative w-full max-w-5xl h-[85vh] bg-background border border-border rounded-2xl flex flex-col shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{doc.name}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                    {doc.type} · {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenExternal(doc)}
                    className="inline-flex items-center justify-center rounded-lg border border-border bg-card p-2 text-foreground/70 hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                    title={doc.url.startsWith("data:") ? "Download" : "Open in new window"}
                  >
                    {doc.url.startsWith("data:") ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setFullscreenId(null)}
                    className="inline-flex items-center justify-center rounded-lg border border-border bg-card p-2 text-foreground/70 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                    title="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 bg-muted/20 relative flex items-center justify-center p-4 overflow-hidden">
                {doc.type === "IMAGE" ? (
                  <div className="w-full h-full flex items-center justify-center overflow-auto">
                    <img 
                      src={doc.url} 
                      alt={doc.name} 
                      className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                    />
                  </div>
                ) : (
                  <iframe
                    src={doc.url}
                    className="w-full h-full rounded-lg border border-border"
                    title={doc.name}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
