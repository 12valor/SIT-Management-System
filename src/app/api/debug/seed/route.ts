import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";

export async function GET() {
  try {
    const coordinatorPassword = await bcrypt.hash("tupvisayascoor", 12);

    // 1. Create Official Coordinator
    await prisma.user.upsert({
      where: { email: "tupvsitcoor2k26@tupv.edu.ph" },
      update: {
        password: coordinatorPassword,
        name: "SIT Coordinator",
        role: "COORDINATOR",
        isApproved: true,
      },
      create: {
        email: "tupvsitcoor2k26@tupv.edu.ph",
        name: "SIT Coordinator",
        password: coordinatorPassword,
        role: "COORDINATOR",
        isApproved: true,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Database initialized with Official Coordinator account." 
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
