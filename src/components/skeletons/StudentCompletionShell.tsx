"use client";

import { useState } from "react";
import { Skeleton } from "boneyard-js/react";
import { 
  Trophy, 
  Award, 
  Download 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateSITCertificate } from "@/lib/pdf-generator";
import { getCourseName } from "@/lib/courses";
import { issueCompletionCertificate } from "@/app/(portals)/student/completion/actions";

export interface CompletionData {
  totalHours: number;
  hourGoal: number;
  hasEvaluation: boolean;
  evaluationData: {
    overallGrade: number;
    comments: string;
    companyName: string;
  } | null;
  documentsUploaded: number;
  totalRequiredDocs: number;
  isFullyComplete: boolean;
  certificateId: string | null;
  studentName: string;
  studentCourse: string;
}

export function StudentCompletionShell({ data, userName }: { data: CompletionData | null, userName?: string }) {
  const [isIssuing, setIsIssuing] = useState(false);
  const [issueError, setIssueError] = useState("");
  const safeData = data || {
    totalHours: 0,
    hourGoal: 300,
    hasEvaluation: false,
    evaluationData: null,
    documentsUploaded: 0,
    totalRequiredDocs: 4,
    isFullyComplete: false,
    certificateId: null,
    studentName: userName || 'Student Name',
    studentCourse: 'Course'
  };

  const { totalHours, hourGoal, hasEvaluation, documentsUploaded, totalRequiredDocs, isFullyComplete, certificateId } = safeData;
  const isHoursComplete = totalHours >= hourGoal;
  const isDocsComplete = documentsUploaded >= totalRequiredDocs;

  const handleDownloadCertificate = async () => {
    if (!isFullyComplete || isIssuing) return;
    setIsIssuing(true);
    setIssueError("");

    const issuance = await issueCompletionCertificate();
    setIsIssuing(false);

    if (!issuance.success || !issuance.data) {
      setIssueError(issuance.error || "Certificate could not be issued.");
      return;
    }

    let base64data = "";
    try {
      const response = await fetch('/tup-seal-96.png');
      const blob = await response.blob();
      base64data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error("Failed to load logo", e);
    }
    
    generateSITCertificate({
       studentName: issuance.data.studentName,
       course: getCourseName(issuance.data.course),
       companyName: issuance.data.companyName,
       totalHours: issuance.data.totalHours,
       grade: issuance.data.grade,
       date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
       certificateId: issuance.data.certificateId,
       logoBase64: base64data
    });
  };

  const progressPercentage = Math.min((totalHours / hourGoal) * 100, 100);

  return (
    <Skeleton 
      name="student-completion" 
      loading={!data}
      animate="shimmer"
      stagger={80}
      transition={300}
      snapshotConfig={{
        excludeSelectors: ["svg", "[data-no-skeleton]"],
        excludeTags: ["nav", "footer"],
      }}
      fallback={
        <div className="animate-pulse space-y-8 max-w-4xl mx-auto py-12">
          <div className="h-8 w-64 bg-slate-200 rounded-lg mx-auto" />
          <div className="h-4 w-96 bg-slate-100 rounded-lg mx-auto" />
          <div className="h-64 bg-slate-100 rounded-xl border border-slate-200 mt-8" />
        </div>
      }
    >
      <div className="max-w-4xl mx-auto py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-500",
            isFullyComplete ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
          )}>
             {isFullyComplete ? <Award className="h-8 w-8" /> : <Trophy className="h-8 w-8" />}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Accreditation Status</h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Track your industrial training hours. Once you reach your required {hourGoal} hours, you can generate your certificate.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Industrial Hours</h2>
              <p className="text-slate-500 text-sm">Your approved logbook entries</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-slate-900 tracking-tight">
                {totalHours}<span className="text-slate-400 text-xl font-medium ml-1">/ {hourGoal}</span>
              </div>
              <p className="text-emerald-600 text-sm font-medium mt-1">{Math.round(progressPercentage)}% Completed</p>
            </div>
          </div>

          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-8">
            <div 
              className={cn(
                "h-full transition-all duration-1000 rounded-full",
                isHoursComplete ? "bg-emerald-500" : "bg-[#800000]"
              )}
              style={{ width: `${progressPercentage}%` }} 
            />
          </div>

          {/* Action Area */}
          <div className={cn(
            "rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left transition-colors",
            isFullyComplete ? "bg-emerald-50 border border-emerald-100" : "bg-slate-50 border border-slate-100"
          )}>
            <div>
              <h3 className={cn("font-bold mb-1", isFullyComplete ? "text-emerald-900" : "text-slate-700")}>
                {isFullyComplete ? "Ready for Accreditation" : "Verification In Progress"}
              </h3>
              <p className={cn("text-sm", isFullyComplete ? "text-emerald-700" : "text-slate-500")}>
                {isFullyComplete
                  ? certificateId
                    ? `Certificate ${certificateId} is ready for download.`
                    : "Your hours, documents, and final evaluation are verified."
                  : `Requirements: ${isHoursComplete ? "hours complete" : `${Math.max(0, hourGoal - totalHours)} hours remaining`}, ${isDocsComplete ? "documents verified" : "documents awaiting verification"}, ${hasEvaluation ? "evaluation submitted" : "evaluation pending"}.`}
              </p>
              {issueError && <p className="mt-2 text-xs font-semibold text-red-600">{issueError}</p>}
            </div>
            
            <button 
              onClick={handleDownloadCertificate}
              disabled={!isFullyComplete || isIssuing}
              className={cn(
                "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap",
                isFullyComplete
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              )}
            >
              <Download className="h-4 w-4" />
              {isIssuing ? "Issuing..." : "Download Certificate"}
            </button>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
