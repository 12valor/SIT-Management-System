"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireCoordinator } from "@/lib/auth-guards";

interface SystemSetting {
  id: string;
  key: string;
  value: string;
  updatedAt: Date;
}

function isAllowedDataImage(value: string) {
  return /^data:image\/(png|jpe?g|webp);base64,/i.test(value) && value.length <= 1_200_000;
}

export async function updateHeroSlides(formData: FormData) {
  await requireCoordinator();

  try {
    const slide1 = formData.get("slide1") as string;
    const slide2 = formData.get("slide2") as string;
    const slide3 = formData.get("slide3") as string;

    // Use raw query to avoid runtime error if Prisma hasn't been regenerated
    const existingSetting = await prisma.$queryRaw<SystemSetting[]>`SELECT * FROM "SystemSetting" WHERE key = 'hero_slides' LIMIT 1`;
    
    let currentSlides = [];
    if (existingSetting && existingSetting.length > 0) {
        currentSlides = JSON.parse(existingSetting[0].value);
    } else {
        currentSlides = [
            { image: "/images/hero/industrial-1.webp", title: "The Digital Bridge to Industrial Excellence", description: "The official platform for managing Supervised Industrial Training at the Technological University of the Philippines Visayas." },
            { image: "/images/hero/industrial-2.webp", title: "Transitioning Classroom Logic to Practice", description: "Standardized industrial immersion programs designed for professional engineering excellence and institutional integrity." },
            { image: "/images/hero/industrial-3.webp", title: "Centralized Oversight for Global Partners", description: "A secure archival ecosystem for trainee verification, progress monitoring, and cross-sectoral coordination." }
        ];
    }

    if (slide1 && isAllowedDataImage(slide1)) currentSlides[0].image = slide1;
    if (slide2 && isAllowedDataImage(slide2)) currentSlides[1].image = slide2;
    if (slide3 && isAllowedDataImage(slide3)) currentSlides[2].image = slide3;

    const newValue = JSON.stringify(currentSlides);
    
    if (existingSetting && existingSetting.length > 0) {
       await prisma.$executeRaw`UPDATE "SystemSetting" SET value = ${newValue}, "updatedAt" = NOW() WHERE key = 'hero_slides'`;
    } else {
       // Insert with cuid, raw uuid gen not available, use simple timestamp string as ID fallback
       const newId = `hero_slides_${Date.now()}`;
       await prisma.$executeRaw`INSERT INTO "SystemSetting" (id, key, value, "updatedAt") VALUES (${newId}, 'hero_slides', ${newValue}, NOW())`;
    }

    revalidatePath("/");
    revalidatePath("/coordinator/settings");
    
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error updating settings:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

export async function getHeroSlides() {
    try {
        const setting = await prisma.$queryRaw<SystemSetting[]>`SELECT * FROM "SystemSetting" WHERE key = 'hero_slides' LIMIT 1`;
        if (setting && setting.length > 0) return JSON.parse(setting[0].value);
        return null;
    } catch (error) {
        console.error("Error fetching settings:", error);
        return null;
    }
}

export async function getMarqueeSettings() {
    try {
        const setting = await prisma.$queryRaw<SystemSetting[]>`SELECT * FROM "SystemSetting" WHERE key = 'marquee_settings' LIMIT 1`;
        if (setting && setting.length > 0) return JSON.parse(setting[0].value);
        return {
            enabled: true,
            title: "Trusted by Leading Organizations",
            label: "Industrial Network",
            speed: 50,
            showInAbout: true
        };
    } catch (error) {
        console.error("Error fetching marquee settings:", error);
        return null;
    }
}

export async function updateMarqueeSettings(data: {
    enabled: boolean;
    title: string;
    label: string;
    speed: number;
    showInAbout: boolean;
}) {
    await requireCoordinator();

    try {
        if (data.speed < 10 || data.speed > 200) {
            return { success: false, error: "Marquee speed must be between 10 and 200." };
        }

        const newValue = JSON.stringify(data);
        const existingSetting = await prisma.$queryRaw<SystemSetting[]>`SELECT * FROM "SystemSetting" WHERE key = 'marquee_settings' LIMIT 1`;
        
        if (existingSetting && existingSetting.length > 0) {
            await prisma.$executeRaw`UPDATE "SystemSetting" SET value = ${newValue}, "updatedAt" = NOW() WHERE key = 'marquee_settings'`;
        } else {
            const newId = `marquee_${Date.now()}`;
            await prisma.$executeRaw`INSERT INTO "SystemSetting" (id, key, value, "updatedAt") VALUES (${newId}, 'marquee_settings', ${newValue}, NOW())`;
        }

        revalidatePath("/");
        revalidatePath("/about");
        revalidatePath("/coordinator/settings");
        return { success: true };
    } catch (error) {
        console.error("Error updating marquee settings:", error);
        return { success: false };
    }
}
