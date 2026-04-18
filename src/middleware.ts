import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const user = req.auth?.user as { role?: string } | undefined;

  // Protect portal routes
  if (nextUrl.pathname.startsWith("/student") && user?.role !== "STUDENT") {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  if (nextUrl.pathname.startsWith("/employer") && user?.role !== "EMPLOYER") {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  if (nextUrl.pathname.startsWith("/coordinator") && user?.role !== "COORDINATOR") {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/student/:path*", "/employer/:path*", "/coordinator/:path*"],
};
