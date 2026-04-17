import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SITPosting {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredHours: number;
  status: 'Open' | 'Closed';
}

export interface Application {
  id: string;
  postingId: string;
  studentEmail: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedAt: string;
}

interface MockStore {
  postings: SITPosting[];
  applications: Application[];
  createPosting: (posting: Omit<SITPosting, 'id' | 'status'>) => void;
  applyForSIT: (postingId: string, studentEmail: string) => void;
  updateApplicationStatus: (applicationId: string, status: Application['status']) => void;
}

export const useMockStore = create<MockStore>()(
  persist(
    (set) => ({
      postings: [
        {
          id: '1',
          title: 'Frontend Developer Trainee',
          company: 'Tech Solutions Inc.',
          description: 'Help build modern web applications using React and Next.js.',
          requiredHours: 300,
          status: 'Open',
        }
      ],
      applications: [],
      createPosting: (postingData) =>
        set((state) => ({
          postings: [
            ...state.postings,
            {
              ...postingData,
              id: Math.random().toString(36).substr(2, 9),
              status: 'Open',
            },
          ],
        })),
      applyForSIT: (postingId, studentEmail) =>
        set((state) => {
          // Prevent duplicate applications
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
    }),
    {
      name: 'sit-mock-storage',
    }
  )
);
