import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Testing company creation...");
  try {
    const company = await prisma.company.create({
      data: {
        name: "Test Company " + Date.now(),
        email: "test" + Date.now() + "@example.com",
        industry: "Testing",
        location: "Test Location",
        description: "Test Description",
        slots: 10,
        isVerified: true,
      },
    });
    console.log("✅ Success! Created company:", company.id);
  } catch (error) {
    console.error("❌ Failed to create company:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
