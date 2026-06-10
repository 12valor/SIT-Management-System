"use server";

import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { z } from "zod";
import { isCourseCode } from "@/lib/courses";

const studentSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  course: z.string().refine(isCourseCode, "Course must be one of T01-T09"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

import { UserRole } from "@prisma/client";

export async function registerStudent(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    if (typeof rawData.email === "string") {
      rawData.email = rawData.email.trim().toLowerCase();
    }
    const validatedData = studentSchema.parse(rawData);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { success: false, error: "Email already registered." };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        course: validatedData.course,
        role: UserRole.STUDENT,
        isApproved: false, // Explicitly false for new registrations
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Student registration error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Registration failed. Please try again." };
  }
}
