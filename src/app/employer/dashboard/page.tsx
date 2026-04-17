"use client";

import { useMockStore } from "@/store/mock-store";
import { Briefcase, Users, FileText } from "lucide-react";

export default function EmployerDashboardPage() {
  const postings = useMockStore((state) => state.postings);
  const applications = useMockStore((state) => state.applications);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Postings</h3>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-primary">{postings.length}</div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Applicants</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{applications.length}</div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Pending Review</h3>
            <FileText className="h-4 w-4 text-amber-600" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-amber-600">
              {applications.filter(a => a.status === 'Pending').length}
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Recent Applicants</h3>
            <p className="text-sm text-muted-foreground">Students who recently applied to your postings.</p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-8">
              {applications.length === 0 ? (
                <p className="text-sm text-muted-foreground">No applicants yet.</p>
              ) : (
                applications.map((app) => (
                  <div className="flex items-center" key={app.id}>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{app.studentEmail}</p>
                      <p className="text-sm text-muted-foreground">Applied for: {postings.find(p => p.id === app.postingId)?.title}</p>
                    </div>
                    <div className={`ml-auto font-medium text-sm ${app.status === 'Pending' ? 'text-amber-500' : app.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>
                      {app.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
    </div>
  );
}
