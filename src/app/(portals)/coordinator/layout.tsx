import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

import CoordinatorShell from "./CoordinatorShell";

export default async function CoordinatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const role = session?.user?.role?.toLowerCase();

  if (!session?.user || !role) {
    redirect("/login");
  }

  if (role !== "coordinator") {
    redirect(`/${role}/dashboard`);
  }

  return <CoordinatorShell session={session}>{children}</CoordinatorShell>;
}
