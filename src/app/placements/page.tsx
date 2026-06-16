import type { Metadata } from "next";
import PlacementsContent from "./PlacementsContent";
import prisma from "@/lib/prisma";
import { getPublicImageUrl } from "@/lib/public-media";

export const metadata: Metadata = {
  title: "Placements Registry | SIT Management System",
  description: "Official registry of approved industrial placements for the Supervised Industrial Training program.",
};

export const revalidate = 900;

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
          location: true,
          description: true,
          websiteUrl: true,
          facebookUrl: true,
          linkedinUrl: true,
          twitterUrl: true,
          instagramUrl: true
        },
      },
    },
    orderBy: { postedAt: "desc" },
  });

  const normalized = postings.map(p => ({
    ...p,
    posterUrl: getPublicImageUrl(p.posterUrl),
    requirements: p.requirements || [],
    responsibilities: p.responsibilities || [],
    tags: p.tags || [],
    company: {
      ...p.company,
      logoUrl: getPublicImageUrl(p.company.logoUrl),
    },
  }));

  return <PlacementsContent initialPostings={normalized} />;
}
