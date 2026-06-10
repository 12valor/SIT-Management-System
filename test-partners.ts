import { getPublicPartners } from "./src/app/(portals)/coordinator/companies/actions";

async function main() {
  const partners = await getPublicPartners();
  console.log(`Successfully fetched ${partners.length} partners.`);
  if (partners.length > 0) {
    partners.forEach(p => console.log(`- ${p.name} (Verified: ${p.isVerified}, Marquee: ${p.showInMarquee})`));
  }
}

main().catch(console.error);
