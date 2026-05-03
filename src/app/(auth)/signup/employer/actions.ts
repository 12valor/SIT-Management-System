"use server";

import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { z } from "zod";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

const employerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  companyMode: z.enum(["existing", "new"]),
  companyId: z.string().optional(),
  newCompanyName: z.string().optional(),
  industry: z.string().optional(),
});

async function saveFile(file: File | null, prefix: string): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  if (file.size > MAX_SIZE) {
    throw new Error(`${prefix.charAt(0).toUpperCase() + prefix.slice(1)} file exceeds the 2MB limit.`);
  }
  
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const extension = file.name.split('.').pop() || 'png';
    const fileName = `${prefix}_${crypto.randomUUID()}.${extension}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const publicPath = path.join(uploadsDir, fileName);
    
    // Ensure directory exists
    await mkdir(uploadsDir, { recursive: true });
    
    await writeFile(publicPath, buffer);
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error(`Error saving ${prefix}:`, error);
    throw new Error(`Failed to save ${prefix} image. Please try again.`);
  }
}

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

      try {
        const logoFile = formData.get("logo") as File | null;
        const bannerFile = formData.get("banner") as File | null;
        
        const logoUrl = await saveFile(logoFile, "logo");
        const bannerUrl = await saveFile(bannerFile, "banner");

        const newCompany = await prisma.company.create({
          data: {
            name: validatedData.newCompanyName,
            email: `${validatedData.newCompanyName.toLowerCase().replace(/\s+/g, '.')}@partner.v1`, // Placeholder
            industry: validatedData.industry,
            logoUrl,
            bannerUrl,
            isVerified: false,
          },
        });
        finalCompanyId = newCompany.id;
        
        // Revalidate coordinator paths to show new company/registration
        revalidatePath("/coordinator/registrations");
        revalidatePath("/coordinator/companies");
      } catch (fileError) {
        const message = fileError instanceof Error ? fileError.message : "File upload failed.";
        return { success: false, error: message };
      }
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
