"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateHeroSlides(formData: FormData) {
  try {
    const slide1 = formData.get("slide1") as string;
    const slide2 = formData.get("slide2") as string;
    const slide3 = formData.get("slide3") as string;

    // Use raw query to avoid runtime error if Prisma hasn't been regenerated
    const existingSetting: any[] = await prisma.$queryRaw`SELECT * FROM "SystemSetting" WHERE key = 'hero_slides' LIMIT 1`;
    
    let currentSlides = [];
    if (existingSetting && existingSetting.length > 0) {
        currentSlides = JSON.parse(existingSetting[0].value);
    } else {
        currentSlides = [
            { image: "/images/hero/industrial-1.png", title: "The Digital Bridge to Industrial Excellence", description: "The official platform for managing Supervised Industrial Training at the Technological University of the Philippines Visayas." },
            { image: "/images/hero/industrial-2.png", title: "Transitioning Classroom Logic to Practice", description: "Standardized industrial immersion programs designed for professional engineering excellence and institutional integrity." },
            { image: "/images/hero/industrial-3.png", title: "Centralized Oversight for Global Partners", description: "A secure archival ecosystem for trainee verification, progress monitoring, and cross-sectoral coordination." }
        ];
    }

    if (slide1 && slide1.startsWith('data:')) currentSlides[0].image = slide1;
    if (slide2 && slide2.startsWith('data:')) currentSlides[1].image = slide2;
    if (slide3 && slide3.startsWith('data:')) currentSlides[2].image = slide3;

    const newValue = JSON.stringify(currentSlides);
    
    if (existingSetting && existingSetting.length > 0) {
       await prisma.$executeRaw`UPDATE "SystemSetting" SET value = ${newValue}, "updatedAt" = NOW() WHERE key = 'hero_slides'`;
    } else {
       // Insert with cuid, raw uuid gen not available, use simple timestamp string as ID fallback
       const newId = `hero_slides_${Date.now()}`;
       await prisma.$executeRaw`INSERT INTO "SystemSetting" (id, key, value, "updatedAt") VALUES (${newId}, 'hero_slides', ${newValue}, NOW())`;
    }

    revalidatePath("/");
    revalidatePath("/coordinator/settings/general");
    
    return { success: true };
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return { success: false, error: error.message };
  }
}

export async function getHeroSlides() {
    try {
        const setting: any[] = await prisma.$queryRaw`SELECT * FROM "SystemSetting" WHERE key = 'hero_slides' LIMIT 1`;
        if (setting && setting.length > 0) return JSON.parse(setting[0].value);
        return null;
    } catch (error) {
        return null;
    }
}
