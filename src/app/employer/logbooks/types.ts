import { LogbookEntry } from "../../student/logbook/types";

export interface TraineeWithLogs {
  id: string;
  studentId: string;
  studentName: string | null;
  studentEmail: string | null;
  logs: LogbookEntry[];
}
