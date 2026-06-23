export interface OpportunityCompany {
  id: string;
  name: string;
  industry: string | null;
}

export interface OpportunityApplication {
  id: string;
  status: string;
  studentId: string;
}

export interface SITOpportunity {
  id: string;
  title: string;
  description: string;
  requiredHours: number;
  location: string;
  type: string;
  requirements: string[];
  responsibilities: string[];
  posterUrl: string | null;
  postedAt: Date;
  companyId: string;
  company: OpportunityCompany;
  applications: OpportunityApplication[];
  tags: string[];
}
