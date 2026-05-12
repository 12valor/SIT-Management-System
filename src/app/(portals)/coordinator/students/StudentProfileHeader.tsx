"use client";

import { useState } from "react";
import { 
  Camera, 
  ArrowLeft,
  Loader2,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { updateStudentImage } from "./actions";

interface StudentProfileHeaderProps {
  student: {
    id: string;
    name: string | null;
    image: string | null;
    course: string | null;
  };
  isHired: boolean;
}

export default function StudentProfileHeader({ student, isHired }: StudentProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-6">
      <div className="flex items-center gap-6">
        <Link 
          href="/coordinator/students"
          className="h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-card hover:bg-muted transition-colors shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-muted border border-border overflow-hidden relative shadow-sm">
            {student.image ? (
              <Image 
                src={student.image} 
                alt={student.name || "Student"} 
                fill 
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-foreground/20">
                <UserIcon className="h-8 w-8" />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-tight">{student.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold bg-muted px-2 py-0.5 rounded">
                {student.course || "No Course"}
              </p>
              <span className={cn(
                "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border",
                isHired ? "bg-primary/5 text-primary border-primary/20" : "bg-muted text-muted-foreground border-border"
              )}>
                {isHired ? "Interning" : "Seeking"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
