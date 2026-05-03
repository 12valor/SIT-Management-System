"use server";

import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { z } from "zod";
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

    // These are now Base64 strings sent from the client
    const logo = formData.get("logo") as string | null;
    const banner = formData.get("banner") as string | null;

    if (companyMode === "new") {
      const companyName = formData.get("newCompanyName") as string;
      const industry = formData.get("industry") as string;

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "EMPLOYER",
          employer: {
            create: {
              company: {
                create: {
                  name: companyName,
                  email: `${companyName.toLowerCase().replace(/\s+/g, '.')}@partner.sit`,
                  industry,
                  logoUrl: logo,
                  bannerUrl: banner,
                  isVerified: false,
                },
              },
            },
          },
        },
      });
    } else {
      const companyId = formData.get("companyId") as string;
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "EMPLOYER",
          employer: {
            create: {
              company: {
                connect: { id: companyId },
              },
            },
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
