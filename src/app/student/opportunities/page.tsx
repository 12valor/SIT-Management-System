"use client";

import { useState } from "react";
import { useMockStore } from "@/store/mock-store";
import { Send } from "lucide-react";

export default function StudentOpportunitiesPage() {
  const postings = useMockStore((state) => state.postings);
  const applications = useMockStore((state) => state.applications);
  const applyForSIT = useMockStore((state) => state.applyForSIT);

  // Mocking the logged-in student email
  const studentEmail = "evangelista.agdiaz@tupv.edu.ph";

  const handleApply = (postingId: string) => {
    applyForSIT(postingId, studentEmail);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Available SIT Opportunities</h2>
        <p className="text-sm text-muted-foreground">Find and apply for supervised industrial training required for your module.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {postings.filter(p => p.status === 'Open').map((posting) => {
          const hasApplied = applications.some(a => a.postingId === posting.id && a.studentEmail === studentEmail);
          const applicationDetails = applications.find(a => a.postingId === posting.id && a.studentEmail === studentEmail);

          return (
            <div key={posting.id} className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 flex flex-col">
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{posting.title}</h3>
                  <p className="text-sm font-medium text-primary">{posting.company}</p>
                </div>
                <p className="text-sm text-muted-foreground">{posting.description}</p>
                <div className="text-sm font-medium bg-muted/50 w-max px-3 py-1 rounded-md">
                  ⏱️ {posting.requiredHours} hrs required
                </div>
              </div>
              <div className="pt-6 mt-auto">
                {hasApplied ? (
                  <div className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-muted text-muted-foreground justify-center">
                    <span className={
                        applicationDetails?.status === 'Pending' ? 'text-amber-500' : 
                        applicationDetails?.status === 'Accepted' ? 'text-green-500' : 'text-red-500'
                    }>
                      Application {applicationDetails?.status}
                    </span>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleApply(posting.id)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {postings.filter(p => p.status === 'Open').length === 0 && (
          <div className="col-span-full p-8 text-center text-muted-foreground border border-dashed rounded-xl">
            No open opportunities at this time. Check back later!
          </div>
        )}
      </div>
    </div>
  );
}
