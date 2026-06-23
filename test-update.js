const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const c = await prisma.company.findFirst({ where: { name: 'SM' } });
  if (!c) return console.log("Company not found.");
  
  const longString = 'data:image/webp;base64,' + 'A'.repeat(2500);
  try {
    const updated = await prisma.company.update({
      where: { id: c.id },
      data: { bannerUrl: longString }
    });
    console.log("Updated successfully!");
    const fetched = await prisma.company.findUnique({ where: { id: c.id } });
    console.log("Fetched bannerUrl length:", fetched.bannerUrl.length);
  } catch (e) {
    console.error("Error updating:", e.message);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
