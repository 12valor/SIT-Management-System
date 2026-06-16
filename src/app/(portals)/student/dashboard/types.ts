export interface StudentApplication {
  id: string;
  status: string;
  appliedAt: string;
  postingTitle: string;
  companyName: string;
}

export interface HiredPlacement {
  title: string;
  company: string;
  location: string;
}

export interface StudentDocument {
  name: string;
  url: string | null;
  status?: string;
}

export interface StudentDashboardData {
  totalHours: number;
  totalLogs: number;
  approvedLogs: number;
  applications: StudentApplication[];
  hiredPlacement: HiredPlacement | null;
  documents: StudentDocument[];
}

export const REQUIRED_CREDENTIALS = [
  { id: "resume", name: "Student Resume / CV", description: "Comprehensive professional manifest", required: true },
  { id: "intent", name: "SIT Intent Form", description: "Official declaration of training intent", required: true },
  { id: "waiver", name: "Liability Waiver", description: "Institutional legal clearance", required: true },
  { id: "recommendation", name: "SIT Recommendation Letter", description: "Coordinator-issued institutional endorsement", required: true },
  { id: "cert", name: "Training Certificate", description: "Verified competency validation", required: false },
];
