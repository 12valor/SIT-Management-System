"use server";

import prisma from "@/lib/prisma";
import { Prisma, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

function isAllowedDataImage(value: string | null) {
  if (!value) return true;
  return /^data:image\/(png|jpe?g|webp);base64,/i.test(value) && value.length <= 1_200_000;
}

export async function getCompanies() {
  return await prisma.company.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function registerEmployer(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const name = String(formData.get("name") || "").trim();
  console.log(`[Registration] Initializing partnership request for ${name} (${email})`);

  try {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email.includes("@")) {
      return { success: false, error: "Please provide a valid name and email address." };
    }

    if (!password || password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters." };
    }

    if (password !== confirmPassword) {
      return { success: false, error: "Security validation failed: Passwords do not match." };
    }

    const companyMode = formData.get("companyMode") as "existing" | "new";
    const location = formData.get("location") as string | null;

    // Base64 strings sent from the client
    const logo = formData.get("logo") as string | null;
    const banner = formData.get("banner") as string | null;

    if (companyMode !== "existing" && companyMode !== "new") {
      return { success: false, error: "Invalid company registration mode." };
    }

    if (!isAllowedDataImage(logo) || !isAllowedDataImage(banner)) {
      return { success: false, error: "Company images must be PNG, JPG, or WebP files under 1.2MB." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const companyName = String(formData.get("newCompanyName") || "").trim();
    const industry = String(formData.get("industry") || "").trim();
    const sanitizedName = companyName?.trim().toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.').replace(/(^\.|\.$)/g, '');
    const companyEmail = `${sanitizedName}@partner.sit`;
    const companyId = String(formData.get("companyId") || "");

    if (companyMode === "new" && (!companyName || !industry || !sanitizedName)) {
      return { success: false, error: "Company name and industry are required." };
    }

    if (companyMode === "existing" && !companyId) {
      return { success: false, error: "Please select an existing company." };
    }

    const registrationData = {
      name,
      email,
      password: hashedPassword,
      role: UserRole.EMPLOYER,
      isApproved: false,
      company: companyMode === "new" ? {
        create: {
          name: companyName,
          email: companyEmail,
          industry,
          description: formData.get("description") as string | null,
          location: location,
          websiteUrl: formData.get("websiteUrl") as string | null,
          logoUrl: (logo as unknown) instanceof File ? null : logo,
          bannerUrl: (banner as unknown) instanceof File ? null : banner,
          isVerified: false,
        },
      } : {
        connect: { id: companyId },
      },
    };

    console.log("[Registration] Executing database creation with data:", JSON.stringify({ ...registrationData, password: "[REDACTED]" }, null, 2));
    
    await prisma.user.create({
      data: registrationData,
    });

    revalidatePath("/coordinator/registrations");
    revalidatePath("/coordinator/companies");
    return { success: true };
  } catch (error) {
    console.log("[Registration] Detailed Error Log:", error);
    console.error("Registration error details:", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target;
        
        if (Array.isArray(target) && target.includes('email')) {
          // Prisma often reports 'User' even for nested 'Company' collisions
          // We manually verify the user existence to be certain of the collision source
          const userExists = await prisma.user.findUnique({ where: { email } });
          
          if (userExists) {
            return { success: false, error: "An account with this email address already exists. Please use a different email or log in." };
          } else {
            return { success: false, error: "This company name results in a duplicate system email. Please use a more specific name or join the existing company." };
          }
        }
        return { success: false, error: "A registration conflict occurred. This email or company name may already be in use." };
      }
    }

    if (error instanceof Error) {
      if (error.message.includes("timed out") || error.message.includes("connection")) {
        return { success: false, error: "The system is having trouble connecting to the registry. Please try again in a moment." };
      }
      // Return the actual error message in a sanitized way if possible, or a more descriptive fallback
      return { success: false, error: `System encountered a registration error: ${error.message.substring(0, 50)}...` };
    }

    return { success: false, error: "System encountered an unexpected registration error. Please contact administration." };
  }
}

export async function checkAvailability(type: "user" | "company", value: string) {
  try {
    if (type === "user") {
      const existing = await prisma.user.findUnique({
        where: { email: value.trim().toLowerCase() }
      });
      return { available: !existing };
    } else {
      const sanitized = value.trim().toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.').replace(/(^\.|\.$)/g, '');
      const email = `${sanitized}@partner.sit`;
      const existing = await prisma.company.findUnique({
        where: { email }
      });
      return { available: !existing, generatedEmail: email };
    }
  } catch (error) {
    console.error("Availability check failed:", error);
    return { available: false };
  }
}
