"use server";

import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { z } from "zod";
import { isCourseCode } from "@/lib/courses";
import crypto from "crypto";
import { sendActivationEmail } from "@/lib/email";

const studentSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().refine(
    (val) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?tup\.edu\.ph$/i;
      const tupvIdRegex = /^TUPV-[A-Za-z0-9]{2}-[A-Za-z0-9]{4}$/i;
      return emailRegex.test(val) || tupvIdRegex.test(val);
    },
    {
      message: "Must be a valid TUPV ID (TUPV-XX-XXXX) or a tup.edu.ph email",
    }
  ),
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
      const trimmed = rawData.email.trim();
      const tupvIdRegex = /^TUPV-[A-Za-z0-9]{2}-[A-Za-z0-9]{4}$/i;
      if (tupvIdRegex.test(trimmed)) {
        rawData.email = trimmed.toUpperCase();
      } else {
        rawData.email = trimmed.toLowerCase();
      }
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

    if (validatedData.email.includes("@")) {
      try {
        const token = crypto.randomUUID();
        await prisma.verificationToken.create({
          data: {
            identifier: validatedData.email,
            token,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
          },
        });

        const baseUrl = process.env.NEXTAUTH_URL || process.env.AUTH_URL || "http://localhost:3000";
        const activationLink = `${baseUrl}/activate?token=${token}`;

        const result = await sendActivationEmail(validatedData.email, activationLink);
        if (!result.success) {
          throw result.error || new Error("Failed to send activation email");
        }
      } catch (emailError) {
        console.error("Failed to generate token or send activation email:", emailError);
      }
    }

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
