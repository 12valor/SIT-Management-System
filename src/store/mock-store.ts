import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SITPosting {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredHours: number;
  status: 'Open' | 'Closed';
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  tags: string[];
  postedAt: string;
}

export interface Application {
  id: string;
  postingId: string;
  studentEmail: string;
  studentName: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedAt: string;
  notes?: string;
}

export interface LogbookEntry {
  id: string;
  studentEmail: string;
  date: string;
  hours: number;
  tasks: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  feedback?: string;
}

export interface User {
  email: string;
  name: string;
  role: 'student' | 'employer';
}

interface MockStore {
  user: User | null;
  postings: SITPosting[];
  applications: Application[];
  logbookEntries: LogbookEntry[];
  login: (email: string, role: User['role'], name: string) => void;
  logout: () => void;
  createPosting: (posting: Omit<SITPosting, 'id' | 'status' | 'postedAt'>) => void;
  applyForSIT: (postingId: string, studentEmail: string, studentName: string) => void;
  updateApplicationStatus: (applicationId: string, status: Application['status']) => void;
  addLogbookEntry: (entry: Omit<LogbookEntry, 'id' | 'status'>) => void;
  updateLogbookStatus: (entryId: string, status: LogbookEntry['status'], feedback?: string) => void;
}

export const useMockStore = create<MockStore>()(
  persist(
    (set) => ({
      user: null,
      postings: [
        {
          id: '1',
          title: 'Frontend Developer Trainee',
          company: 'Tech Solutions Inc.',
          description: 'Help build modern web applications using React and Next.js. You will work closely with our senior developers to implement UI components.',
          requiredHours: 300,
          status: 'Open',
          location: 'Talisay, Negros Occidental',
          type: 'On-site',
          tags: ['React', 'Next.js', 'Tailwind CSS'],
          postedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'UI/UX Design Intern',
          company: 'Creative Studio',
          description: 'Assist in creating user-centered designs for mobile and web applications. Proficiency in Figma is required.',
          requiredHours: 250,
          status: 'Open',
          location: 'Remote',
          type: 'Remote',
          tags: ['Figma', 'UI Design', 'UX Research'],
          postedAt: new Date().toISOString(),
        }
      ],
      applications: [],
      logbookEntries: [],
      login: (email, role, name) => set({ user: { email, role, name } }),
      logout: () => set({ user: null }),
      createPosting: (postingData) =>
        set((state) => ({
          postings: [
            ...state.postings,
            {
              ...postingData,
              id: Math.random().toString(36).substr(2, 9),
              status: 'Open',
              postedAt: new Date().toISOString(),
            },
          ],
        })),
      applyForSIT: (postingId, studentEmail, studentName) =>
        set((state) => {
          if (state.applications.find(a => a.postingId === postingId && a.studentEmail === studentEmail)) {
            return state;
          }
          return {
            applications: [
              ...state.applications,
              {
                id: Math.random().toString(36).substr(2, 9),
                postingId,
                studentEmail,
                studentName,
                status: 'Pending',
                appliedAt: new Date().toISOString(),
              },
            ],
          };
        }),
      updateApplicationStatus: (applicationId, status) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === applicationId ? { ...app, status } : app
          ),
        })),
      addLogbookEntry: (entryData) =>
        set((state) => ({
          logbookEntries: [
            ...state.logbookEntries,
            {
              ...entryData,
              id: Math.random().toString(36).substr(2, 9),
              status: 'Pending',
            },
          ],
        })),
      updateLogbookStatus: (entryId, status, feedback) =>
        set((state) => ({
          logbookEntries: state.logbookEntries.map((entry) =>
            entry.id === entryId ? { ...entry, status, feedback } : entry
          ),
        })),
    }),
    {
      name: 'sit-mock-storage',
    }
  )
);
