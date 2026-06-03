/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkUser() {
  const user = await prisma.user.findUnique({
    where: { email: "coordinator@tupv.edu.ph" },
  });
  console.log("User found:", user ? user.email : "NO USER FOUND");
  if (user) {
    console.log("Role:", user.role);
  }
  await prisma.$disconnect();
}

checkUser();
