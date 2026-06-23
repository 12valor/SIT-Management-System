const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const companies = await prisma.company.findMany({
    where: { name: 'SM' },
    select: { name: true, logoUrl: true, bannerUrl: true }
  });
  
  if (companies.length > 0) {
    const c = companies[0];
    console.log("Name:", c.name);
    console.log("Logo length:", c.logoUrl ? c.logoUrl.length : 0);
    console.log("Logo start:", c.logoUrl ? c.logoUrl.substring(0, 50) : "null");
    console.log("Banner length:", c.bannerUrl ? c.bannerUrl.length : 0);
    console.log("Banner start:", c.bannerUrl ? c.bannerUrl.substring(0, 50) : "null");
  } else {
    console.log("Company not found.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
