import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


export const { handlers, auth, signIn, signOut } = NextAuth({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any, // Type cast to avoid NextAuth beta Adapter mismatch with custom fields
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          let email = String(credentials.email).trim();
          const tupvIdRegex = /^TUPV-[A-Za-z0-9]{2}-[A-Za-z0-9]{4}$/i;
          if (tupvIdRegex.test(email)) {
            email = email.toUpperCase();
          } else {
            email = email.toLowerCase();
          }
          const password = String(credentials.password);
          const adminPassword = process.env.ADMIN_PASSWORD;
          
          if (email === "coordinator@tupv.edu.ph" && adminPassword && password === adminPassword) {
            let admin = await prisma.user.findUnique({ where: { email: "coordinator@tupv.edu.ph" } });
            if (!admin) {
              admin = await prisma.user.create({
                data: {
                  email: "coordinator@tupv.edu.ph",
                  name: "SIT Coordinator",
                  password: await bcrypt.hash(adminPassword, 10),
                  role: "COORDINATOR",
                  isApproved: true,
                }
              });
            }
            return {
              id: admin.id,
              name: admin.name,
              email: admin.email,
              role: admin.role,
            };
          }

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) return null;

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordCorrect) return null;

          // Approval check for Students and Employers
          if (user.role !== "COORDINATOR" && !user.isApproved) {
            return null; // Pending approval
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth Error:", error);
          return null;
        }
      },
    }),
  ],
});
