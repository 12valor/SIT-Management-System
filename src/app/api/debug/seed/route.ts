import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";

export async function GET() {
  try {
    const password = await bcrypt.hash("admin123", 12);
    const studentPassword = await bcrypt.hash("TUPV-0909", 12);
    const adminPassword = await bcrypt.hash("admin-sit", 12);

    // 1. Create a Company
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

    // 2. Create Student
    await prisma.user.upsert({
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

    // 3. Create Employer
    await prisma.user.upsert({
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

    // 4. Create Admin
    await prisma.user.upsert({
      where: { email: "coordinator@tupv.edu.ph" },
      update: {},
      create: {
        email: "coordinator@tupv.edu.ph",
        name: "SIT Office Admin",
        password: adminPassword,
        role: "COORDINATOR",
      },
    });

    return NextResponse.json({ success: true, message: "Database seeded successfully!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
