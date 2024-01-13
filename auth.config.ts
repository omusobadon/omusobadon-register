/* auth.config.ts */
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
    async authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const userEmail = auth?.user?.email; // ログインユーザーのメールアドレス
      const isOnDashboard = request.nextUrl.pathname.startsWith("/");

      if (isLoggedIn && !userEmail) {
        return false;
      }

      if (isLoggedIn && userEmail) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/get_customer`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const customerData = await response.json();

          // userEmailに該当する顧客を検索
          const customer = customerData.customer.find(
            (c: { mail: string }) => c.mail === userEmail
          );

          // 該当する顧客が見つかれば /account にリダイレクト
          if (!customer) {
            // 見つからなければ /register にリダイレクト
            return Response.redirect(new URL("/register", request.nextUrl));
          }
        } catch (error) {
          console.error("Error:", error);
          return true; // エラーが発生した場合は通常のフローを続ける
        }
      }

      if (isOnDashboard && !isLoggedIn) {
        return false;
      }
      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
