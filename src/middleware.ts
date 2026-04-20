import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // Temporarily disabled for boneyard build
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/disable-middleware-temporarily"],
};
