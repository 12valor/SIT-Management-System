import { User, Company, UserRole } from "@prisma/client";

export interface PendingUser extends User {
  company: Company | null;
}

export interface RegistrationData {
  users: PendingUser[];
  companies: Company[];
}
