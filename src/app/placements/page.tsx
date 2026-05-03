import type { Metadata } from "next";
import PlacementsContent from "./PlacementsContent";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Placements Registry | SIT Management System",
  description: "Official registry of approved industrial placements for the Supervised Industrial Training program.",
};

export default async function PlacementsPage() {
  // Fetch only OPEN postings from verified companies
  const postings = await prisma.sITPosting.findMany({
    where: { 
      status: "OPEN",
      company: {
        isVerified: true
      }
    },
    include: {
      company: {
        select: { 
          name: true, 
          logoUrl: true, 
          industry: true,
          location: true
        },
      },
    },
    orderBy: { postedAt: "desc" },
  });

  const normalized = postings.map(p => ({
    ...p,
    requirements: p.requirements || [],
    responsibilities: p.responsibilities || [],
    tags: p.tags || []
  }));

  return <PlacementsContent initialPostings={normalized} />;
}
