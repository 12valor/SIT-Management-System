"use server";

import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { z } from "zod";

const studentSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  course: z.string().min(2, "Course is required"),
});

export async function registerStudent(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
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
        role: "STUDENT",
        isApproved: false, // Explicitly false for new registrations
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "Registration failed. Please try again." };
  }
}
