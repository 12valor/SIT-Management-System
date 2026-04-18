import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding...");

  // Hashes for the users
  const salt = 12;
  const password = await bcrypt.hash("admin123", salt);
  const studentPassword = await bcrypt.hash("TUPV-0909", salt);
  const adminPassword = await bcrypt.hash("admin-sit", salt);

  // 1. Create a Company (Industrial Partner)
  const company = await prisma.company.upsert({
    where: { email: "contact@techcorp.com" },
    update: {},
    create: {
      name: "TechCorp Industries",
      email: "contact@techcorp.com",
      industry: "Software Engineering",
      isVerified: true,
    },
  });
  console.log("✅ Company created:", company.name);

  // 2. Create Student
  const student = await prisma.user.upsert({
    where: { email: "student@tupv.edu.ph" },
    update: {},
    create: {
      email: "student@tupv.edu.ph",
      name: "John Doe Diaz",
      password: studentPassword,
      role: "STUDENT",
      course: "BS in Computer Science",
    },
  });
  console.log("✅ Student created:", student.email);

  // 3. Create Employer
  const employer = await prisma.user.upsert({
    where: { email: "employer@company.com" },
    update: {},
    create: {
      email: "employer@company.com",
      name: "HR Manager",
      password: password,
      role: "EMPLOYER",
      companyId: company.id,
    },
  });
  console.log("✅ Employer created:", employer.email);

  // 4. Create Coordinator (Admin)
  const coordinator = await prisma.user.upsert({
    where: { email: "coordinator@tupv.edu.ph" },
    update: {},
    create: {
      email: "coordinator@tupv.edu.ph",
      name: "SIT Office Admin",
      password: adminPassword,
      role: "COORDINATOR",
    },
  });
  console.log("✅ Coordinator created:", coordinator.email);

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
