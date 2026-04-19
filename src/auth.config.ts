import type { NextAuthConfig } from "next-auth";

export default {
  providers: [], // Providers are added in the main auth.ts to keep this edge-compatible
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role?.toLowerCase();
      
      const isStudentRoute = nextUrl.pathname.startsWith("/student");
      const isEmployerRoute = nextUrl.pathname.startsWith("/employer");
      const isCoordinatorRoute = nextUrl.pathname.startsWith("/coordinator");
      const isAuthRoute = nextUrl.pathname.startsWith("/login");

      if (isStudentRoute || isEmployerRoute || isCoordinatorRoute) {
        if (!isLoggedIn) return false;
        
        // Role check
        if (isStudentRoute && userRole !== "student") return Response.redirect(new URL(`/${userRole}/dashboard`, nextUrl));
        if (isEmployerRoute && userRole !== "employer") return Response.redirect(new URL(`/${userRole}/dashboard`, nextUrl));
        if (isCoordinatorRoute && userRole !== "coordinator") return Response.redirect(new URL(`/${userRole}/dashboard`, nextUrl));
        
        return true;
      }

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL(`/${userRole}/dashboard`, nextUrl));
      }
      
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
