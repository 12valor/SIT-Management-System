export interface EvaluationData {
  id: string;
  technicalSkills: number;
  professionalism: number;
  punctuality: number;
  qualityOfWork: number;
  overallGrade: number;
  comments: string;
  recommendForHire: boolean;
  submittedAt: Date;
}

export interface Trainee {
  id: string;
  studentId: string;
  studentName: string | null;
  studentEmail: string | null;
  totalHours: number;
  evaluation: EvaluationData | null;
  companyName: string | undefined;
}
