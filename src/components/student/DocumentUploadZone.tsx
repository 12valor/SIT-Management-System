"use client";

import { useState, useRef } from "react";
import { 
  Upload, 
  FileText, 
  X, 
  Loader2, 
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DocumentUploadZoneProps {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
}

export function DocumentUploadZone({ 
  onUpload, 
  isUploading, 
  acceptedTypes = ["application/pdf", "image/png", "image/jpeg", "image/webp"], 
  maxSize = 5 
}: DocumentUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File) => {
    if (!acceptedTypes.includes(file.type)) {
      setError("Invalid file type. Please upload a PDF or Image.");
      return false;
    }
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File too large. Maximum size is ${maxSize}MB.`);
      return false;
    }
    return true;
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        await onUpload(file);
      }
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        await onUpload(file);
      }
    }
  };

  return (
    <div className="w-full">
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative group border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center text-center bg-muted/30",
          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/20",
          isUploading && "pointer-events-none opacity-60"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes.join(",")}
          onChange={handleChange}
        />

        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div 
              key="uploading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Upload className="h-4 w-4 text-primary opacity-50" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">Archiving Document</p>
                <p className="text-[10px] text-muted-foreground">Digital signature protocol in progress...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <FileText className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-foreground">Drop your credential manifest here</p>
                <p className="text-[11px] text-muted-foreground font-medium">Supported formats: PDF, PNG, JPG (Max {maxSize}MB)</p>
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 h-10 px-6 rounded-lg bg-foreground text-background text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Select System File
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-destructive"
          >
            <AlertCircle className="h-3.5 w-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{error}</span>
            <button onClick={() => setError(null)} className="ml-2 hover:text-foreground">
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
