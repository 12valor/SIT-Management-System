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

export interface SITDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  studentEmail: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  industry: string;
  isVerified: boolean;
  joinedAt: string;
}

export interface User {
  email: string;
  name: string;
  role: 'student' | 'employer' | 'coordinator';
  course?: string;
  company?: string;
}

interface MockStore {
  user: User | null;
  postings: SITPosting[];
  companies: Company[];
  applications: Application[];
  logbookEntries: LogbookEntry[];
  documents: SITDocument[];
  login: (email: string, role: User['role'], name: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  createPosting: (posting: Omit<SITPosting, 'id' | 'status' | 'postedAt'>) => void;
  verifyCompany: (companyId: string, isVerified: boolean) => void;
  applyForSIT: (postingId: string, studentEmail: string, studentName: string) => void;
  updateApplicationStatus: (applicationId: string, status: Application['status']) => void;
  addLogbookEntry: (entry: Omit<LogbookEntry, 'id' | 'status'>) => void;
  updateLogbookStatus: (entryId: string, status: LogbookEntry['status'], feedback?: string) => void;
  uploadDocument: (doc: Omit<SITDocument, 'id' | 'uploadedAt'>) => void;
  deleteDocument: (id: string) => void;
}

export const useMockStore = create<MockStore>()(
  persist(
    (set) => ({
      user: null,
      postings: [],
      companies: [
        { id: 'c1', name: 'Tech Solutions Inc.', email: 'hr@techsol.com', industry: 'Software Dev', isVerified: true, joinedAt: '2026-01-15' },
        { id: 'c2', name: 'BuildRight Construction', email: 'admin@buildright.com', industry: 'Civil Engineering', isVerified: false, joinedAt: '2026-03-10' },
        { id: 'c3', name: 'DataStream Logistics', email: 'ops@datastream.com', industry: 'Logistics/IT', isVerified: true, joinedAt: '2026-02-20' },
      ],
      applications: [],
      logbookEntries: [],
      documents: [],
      login: (email, role, name) => set({ user: { email, role, name } }),
      logout: () => set({ user: null }),
      updateProfile: (data) => set((state) => ({ 
        user: state.user ? { ...state.user, ...data } : null 
      })),
      verifyCompany: (companyId, isVerified) => 
        set((state) => ({
          companies: state.companies.map(c => c.id === companyId ? { ...c, isVerified } : c)
        })),
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
      uploadDocument: (docData) => 
        set((state) => ({
          documents: [
            ...state.documents,
            {
              ...docData,
              id: Math.random().toString(36).substr(2, 9),
              uploadedAt: new Date().toISOString(),
            }
          ]
        })),
      deleteDocument: (id) => 
        set((state) => ({
          documents: state.documents.filter(d => d.id !== id)
        })),
    }),
    {
      name: 'sit-mock-storage',
    }
  )
);
