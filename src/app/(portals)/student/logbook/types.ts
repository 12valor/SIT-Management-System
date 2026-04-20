export interface LogbookEntry {
  id: string;
  date: Date;
  hours: number;
  tasks: string;
  status: string;
  studentId: string;
  feedback?: string | null;
}

export interface LogbookData {
  entries: LogbookEntry[];
  totalApprovedHours: number;
}
