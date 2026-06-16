import { PartnersContent } from "./PartnersContent";
import { getVerifiedPartners } from "@/app/(portals)/coordinator/companies/actions";
import { getPublicImageUrl } from "@/lib/public-media";

export const revalidate = 900;

export default async function PartnersPage() {
  const partners = await getVerifiedPartners();

  return (
    <PartnersContent
      initialPartners={partners.map((partner) => ({
        id: partner.id,
        name: partner.name,
        industry: partner.industry,
        location: partner.location,
        slots: partner.slots,
        description: partner.description,
        logoUrl: getPublicImageUrl(partner.logoUrl),
        bannerUrl: getPublicImageUrl(partner.bannerUrl),
      }))}
    />
  );
}
