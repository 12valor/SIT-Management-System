import type { Metadata } from "next";
import PlacementsContent from "./PlacementsContent";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Placements Registry | SIT Management System",
  description: "Official registry of approved industrial placements for the Supervised Industrial Training program.",
};

export default async function PlacementsPage() {
  // Fetch only OPEN postings from verified companies (assuming company has isVerified, but let's just use status OPEN for now)
  const postings = await prisma.sITPosting.findMany({
    where: { 
      status: "OPEN",
      company: {
        isVerified: true
      }
    },
    include: {
      company: {
        select: { name: true, logoUrl: true, industry: true },
      },
    },
    orderBy: { postedAt: "desc" },
  });

  return <PlacementsContent initialPostings={postings} />;
}
