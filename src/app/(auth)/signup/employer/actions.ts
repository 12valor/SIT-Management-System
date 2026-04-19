"use server";

import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { z } from "zod";

const employerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  companyMode: z.enum(["existing", "new"]),
  companyId: z.string().optional(),
  newCompanyName: z.string().optional(),
  industry: z.string().optional(),
});

export async function getCompanies() {
  return await prisma.company.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function registerEmployer(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = employerSchema.parse(rawData);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { success: false, error: "Email already registered." };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    let finalCompanyId = validatedData.companyId;

    // Handle new company creation
    if (validatedData.companyMode === "new") {
      if (!validatedData.newCompanyName || !validatedData.industry) {
        return { success: false, error: "Company details are required for new registrations." };
      }

      // Check if company email (placeholder) or name already exists? 
      // For simplicity, we'll just create it. 
      // In a real app we'd need a company email too.
      const newCompany = await prisma.company.create({
        data: {
          name: validatedData.newCompanyName,
          email: `${validatedData.newCompanyName.toLowerCase().replace(/\s+/g, '.')}@partner.v1`, // Placeholder
          industry: validatedData.industry,
          isVerified: false,
        },
      });
      finalCompanyId = newCompany.id;
    }

    if (!finalCompanyId) {
      return { success: false, error: "Company selection is required." };
    }

    await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: "EMPLOYER",
        isApproved: false,
        companyId: finalCompanyId,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Employer Registration Error:", error);
    return { success: false, error: "Registration failed. Please check company details." };
  }
}
