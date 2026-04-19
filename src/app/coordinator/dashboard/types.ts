export interface RecentPlacement {
  id: string;
  studentName: string | null;
  studentEmail: string | null;
  postingTitle: string;
  companyName: string;
}

export interface PendingCompany {
  id: string;
  name: string;
  industry: string;
  joinedAt: string;
}

export interface CoordinatorStats {
  totalStudents: number;
  hiredStudents: number;
  totalCompanies: number;
  verifiedCompanies: number;
  graduationReady: number;
  recentPlacements: RecentPlacement[];
  pendingCompanies: PendingCompany[];
}
