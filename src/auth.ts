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
          const adminPassword = process.env.ADMIN_PASSWORD || "admin-sit";
          
          if (credentials.email === "coordinator@tupv.edu.ph" && credentials.password === adminPassword) {
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
            where: { email: credentials.email as string },
          });

          if (!user || !user.password) return null;

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
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
