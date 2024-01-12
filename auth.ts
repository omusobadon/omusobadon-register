import NextAuth from "next-auth";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  theme: {
    colorScheme: "auto", 
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  pages: {
    signIn: "/login",  // ← 追加
    error: "/login",    // ← 追加
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

  providers: [
    GitHub,
    Google,
    CredentialsProvider({
      credentials: {
        mail: {
          name: "mail",
          label: "メールアドレス",
          type: "email",
          placeholder: "メールアドレス",
        },
        password: { name: "password", label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        const email = "admin@example.com";

        return credentials.mail === email && credentials.password === "admin"
          ? { id: "userId", email, name: "Admin", role: "admin" }
          : null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
