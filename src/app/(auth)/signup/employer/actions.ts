"use server";

import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function getCompanies() {
  return await prisma.company.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function registerEmployer(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const companyMode = formData.get("companyMode") as "existing" | "new";
    const location = formData.get("location") as string | null;

    // Base64 strings sent from the client
    const logo = formData.get("logo") as string | null;
    const banner = formData.get("banner") as string | null;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (companyMode === "new") {
      const companyName = formData.get("newCompanyName") as string;
      const industry = formData.get("industry") as string;

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
                email: `${companyName.toLowerCase().replace(/\s+/g, '.')}@partner.sit`,
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
    console.error("Registration error:", error);
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return { success: false, error: "An account with this email already exists." };
    }
    return { success: false, error: "System encountered a registration conflict. Please try again." };
  }
}
