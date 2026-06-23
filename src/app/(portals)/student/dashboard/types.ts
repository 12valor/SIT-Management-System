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
  { id: "personal_data", name: "Personal Data Form", description: "Student's basic profile and information", required: true },
  { id: "resume", name: "Resume", description: "Comprehensive professional manifest", required: true },
  { id: "police", name: "Police Clearance", description: "Legal background check and clearance", required: true },
  { id: "medical", name: "Medical Certificate", description: "Fitness and health validation", required: true },
  { id: "waiver", name: "Parent's Waiver", description: "Guardian legal consent and clearance", required: true },
];
