import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  theme: {
    colorScheme: "auto",
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  pages: {
    signIn: "/login", // ← 追加
    error: "/login", // ← 追加
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
