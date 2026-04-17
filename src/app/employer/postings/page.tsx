"use client";

import { useState } from "react";
import { useMockStore } from "@/store/mock-store";
import { PlusCircle } from "lucide-react";

export default function EmployerPostingsPage() {
  const postings = useMockStore((state) => state.postings);
  const createPosting = useMockStore((state) => state.createPosting);
  
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [requiredHours, setRequiredHours] = useState(300);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createPosting({ title, company, description, requiredHours });
    setIsCreating(false);
    setTitle("");
    setCompany("");
    setDescription("");
    setRequiredHours(300);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">SIT Postings</h2>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <PlusCircle className="h-4 w-4" />
          {isCreating ? "Cancel" : "Create Posting"}
        </button>
      </div>

      {isCreating && (
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-4">New SIT Opportunity</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Position Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus:ring-2 focus:ring-ring"
                  required
                  placeholder="e.g., Software Engineering Trainee"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus:ring-2 focus:ring-ring"
                  required
                  placeholder="e.g., Acme Corp"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Required Hours</label>
              <input
                type="number"
                value={requiredHours}
                onChange={(e) => setRequiredHours(Number(e.target.value))}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus:ring-2 focus:ring-ring"
                required
                min={1}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus:ring-2 focus:ring-ring"
                required
                placeholder="Describe the roles and responsibilities..."
              />
            </div>
            <button type="submit" className="h-10 px-6 rounded-md bg-primary text-primary-foreground text-sm font-medium">
              Publish Posting
            </button>
          </form>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {postings.map((posting) => (
          <div key={posting.id} className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{posting.title}</h3>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-transparent">
                  {posting.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{posting.company}</p>
            </div>
            <p className="text-sm line-clamp-3">{posting.description}</p>
            <div className="text-sm font-medium">
              Hours Required: <span className="text-muted-foreground">{posting.requiredHours} hrs</span>
            </div>
          </div>
        ))}
        {postings.length === 0 && !isCreating && (
          <div className="col-span-full p-8 text-center text-muted-foreground border border-dashed rounded-xl">
            No postings created yet.
          </div>
        )}
      </div>
    </div>
  );
}
