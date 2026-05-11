"use client";

import { useState, useRef } from "react";
import { 
  Upload, 
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
          "relative group border-2 border-dashed rounded-xl p-10 transition-all flex flex-col items-center justify-center text-center",
          dragActive 
            ? "border-primary bg-primary/5" 
            : "border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.01] hover:border-slate-300 dark:hover:border-white/20",
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Uploading document...</p>
                <p className="text-xs text-slate-500">This will only take a moment.</p>
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
              <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <Upload className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500">PDF, PNG, or JPG (max. {maxSize}MB)</p>
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 px-4 py-2 text-xs font-bold border rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                Select File
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-2 text-red-500"
          >
            <AlertCircle className="h-4 w-4" />
            <span className="text-xs font-medium">{error}</span>
            <button onClick={() => setError(null)} className="ml-2 hover:text-slate-900 dark:hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
