import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
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
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/get_customer`
          );
          const customerData = response.data;

          // 顧客データが存在し、少なくとも1つの顧客がいることを確認
          if (customerData.customer && customerData.customer.length > 0) {
            const customer = customerData.customer[0]; // 最初の顧客を取得

            const hashedPassword = customer.password; // ハッシュされたパスワード
            const password = credentials.password;

            // パスワードを比較
            const isPasswordCorrect = await bcrypt.compare(
              `${password}`,
              hashedPassword
            );

            if (isPasswordCorrect) {
              return {
                id: customer.id,
                mail: customer.mail,
                name: customer.name,
                // 他の必要なユーザー情報をここに追加
              };
            }
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
});
