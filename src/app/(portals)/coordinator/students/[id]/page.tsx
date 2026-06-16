import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { 
  GraduationCap, 
  Building2, 
  Clock, 
  CheckCircle2, 
  Calendar,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import StudentProfileHeader from "../StudentProfileHeader";
import { updateStudentDocumentStatus } from "../actions";

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const student = await prisma.user.findUnique({
    where: { id },
    include: {
      logbookEntries: {
        orderBy: { date: "desc" },
      },
      placements: {
        where: { status: "ACTIVE" },
        include: {
          posting: {
            include: { company: true },
          },
        },
        orderBy: { startedAt: "desc" },
        take: 1,
      },
      applications: {
        where: { status: "ACCEPTED" },
        include: {
          posting: {
            include: { company: true },
          },
        },
        orderBy: { appliedAt: "desc" },
        take: 1,
      },
      documents: {
        select: {
          id: true,
          name: true,
          type: true,
          status: true,
          feedback: true,
          uploadedAt: true,
        },
        orderBy: { uploadedAt: "desc" },
      },
    },
  });

  if (!student) notFound();

  const totalHours = student.logbookEntries
    .filter(e => e.status === "APPROVED")
    .reduce((sum, e) => sum + e.hours, 0);
  
  const activePlacement = student.placements[0];
  const acceptedApplication = student.applications[0];
  const placementPosting = activePlacement?.posting ?? acceptedApplication?.posting;
  const requiredHours = placementPosting?.requiredHours || 300;

  return (
    <div className="flex-1 space-y-8 pb-24">
      {/* Dynamic Header with Image Upload */}
      <StudentProfileHeader 
        student={{
          id: student.id,
          name: student.name,
          image: student.image,
          course: student.course
        }} 
        isHired={!!placementPosting}
        isCompleted={totalHours >= requiredHours}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
             <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border pb-2">Institutional Profile</h3>
                <div className="space-y-3">
                   <div className="flex items-center gap-3 text-sm text-foreground">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>{student.course}</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm text-foreground">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>{student.email}</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(student.createdAt).toLocaleDateString()}</span>
                   </div>
                </div>
             </div>

             {placementPosting && (
                <div className="space-y-4 pt-4 border-t border-border">
                   <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border pb-2">Industrial Placement</h3>
                   <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-foreground">
                         <Building2 className="h-4 w-4 text-primary" />
                         <span className="font-semibold">{placementPosting.company.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground ml-7">
                         <span>{placementPosting.title}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground ml-7">
                         <span>{placementPosting.location}</span>
                      </div>
                   </div>
                </div>
             )}
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-2">
             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Training Completion</p>
             <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-foreground tabular-nums">{totalHours} <span className="text-sm font-medium text-muted-foreground">/ {requiredHours}h</span></span>
                <span className="text-sm font-bold text-primary">{Math.round((totalHours/requiredHours)*100)}%</span>
             </div>
             <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${Math.min((totalHours/requiredHours)*100, 100)}%` }} />
             </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Document Review</h3>
              <span className="text-[10px] font-bold text-muted-foreground">{student.documents.length} Files</span>
            </div>
            {student.documents.length === 0 ? (
              <p className="text-xs text-muted-foreground">No submitted credentials yet.</p>
            ) : (
              <div className="space-y-4">
                {student.documents.map((doc) => (
                  <div key={doc.id} className="space-y-3 rounded-lg border border-border/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                          {doc.type} - {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border",
                        doc.status === "VERIFIED" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                        doc.status === "REJECTED" && "bg-red-500/10 text-red-600 border-red-500/20",
                        doc.status === "PENDING" && "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      )}>
                        {doc.status}
                      </span>
                    </div>

                    {doc.feedback && (
                      <p className="text-xs text-red-500">{doc.feedback}</p>
                    )}

                    <div className="flex flex-col gap-2">
                      <form action={updateStudentDocumentStatus.bind(null, doc.id, "VERIFIED")}>
                        <button
                          type="submit"
                          disabled={doc.status === "VERIFIED"}
                          className="w-full rounded-md bg-primary px-3 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
                        >
                          Verify Document
                        </button>
                      </form>
                      <form action={updateStudentDocumentStatus.bind(null, doc.id, "REJECTED")} className="space-y-2">
                        <input
                          name="feedback"
                          placeholder="Feedback for rejection"
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                        />
                        <button
                          type="submit"
                          disabled={doc.status === "REJECTED"}
                          className="w-full rounded-md border border-red-200 px-3 py-2 text-xs font-bold text-red-600 disabled:opacity-50"
                        >
                          Reject Document
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logbooks */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Industrial Logbook</h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                 <Clock className="h-3 w-3" />
                 {student.logbookEntries.length} Total Entries
              </div>
           </div>

           <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                 <thead>
                    <tr className="bg-muted/50 border-b border-border">
                       <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hours</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border/50">
                    {student.logbookEntries.length === 0 ? (
                       <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic text-xs uppercase tracking-widest">No logbook entries found</td>
                       </tr>
                    ) : (
                       student.logbookEntries.map((entry) => (
                          <tr key={entry.id} className="hover:bg-muted/30 transition-colors">
                             <td className="px-6 py-4 font-medium whitespace-nowrap">{new Date(entry.date).toLocaleDateString()}</td>
                             <td className="px-6 py-4 text-muted-foreground line-clamp-1 max-w-xs">{entry.tasks}</td>
                             <td className="px-6 py-4 font-bold tabular-nums">{entry.hours}h</td>
                             <td className="px-6 py-4 text-right">
                                <span className={cn(
                                   "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border",
                                   entry.status === "APPROVED" ? "bg-primary/5 text-primary border-primary/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                )}>
                                   {entry.status === "APPROVED" ? <CheckCircle2 className="h-2.5 w-2.5" /> : <Clock className="h-2.5 w-2.5" />}
                                   {entry.status}
                                </span>
                             </td>
                          </tr>
                       ))
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}
