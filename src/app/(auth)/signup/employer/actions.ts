"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function getCompanies() {
  return await prisma.company.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function registerEmployer(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  console.log(`[Registration] Initializing partnership request for ${name} (${email})`);

  try {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      return { success: false, error: "Security validation failed: Passwords do not match." };
    }

    const companyMode = formData.get("companyMode") as "existing" | "new";
    const location = formData.get("location") as string | null;

    // Base64 strings sent from the client
    const logo = formData.get("logo") as string | null;
    const banner = formData.get("banner") as string | null;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (companyMode === "new") {
      const companyName = formData.get("newCompanyName") as string;
      const industry = formData.get("industry") as string;
      
      const sanitizedName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.').replace(/(^\.|\.$)/g, '');
      const companyEmail = `${sanitizedName}@partner.sit`;

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "EMPLOYER",
          isApproved: false,
          company: {
              create: {
                name: companyName,
                email: companyEmail,
                industry,
                location: location,
                logoUrl: logo,
                bannerUrl: banner,
                isVerified: false,
              },
          },
        },
      });
    } else {
      const companyId = formData.get("companyId") as string;

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "EMPLOYER",
          isApproved: false,
          company: {
            connect: { id: companyId },
          },
        },
      });
    }

    revalidatePath("/coordinator/registrations");
    revalidatePath("/coordinator/companies");
    return { success: true };
  } catch (error) {
    console.log("[Registration] Detailed Error Log:", error);
    console.error("Registration error details:", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target;
        const modelName = error.meta?.modelName;
        
        if (Array.isArray(target) && target.includes('email')) {
          if (modelName === 'User') {
            return { success: false, error: "An account with this corporate email already exists." };
          }
          if (modelName === 'Company') {
            return { success: false, error: "A company with this name (or a very similar one) is already registered." };
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
