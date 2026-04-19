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

export interface StudentDashboardData {
  totalHours: number;
  totalLogs: number;
  approvedLogs: number;
  applications: StudentApplication[];
  hiredPlacement: HiredPlacement | null;
}
