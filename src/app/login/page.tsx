"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import GetProviders from "@/components/component/GetProvider";
import { IoLogoGithub } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // セッションがロードされ、ユーザーがログインしているか確認
    if (status === "authenticated") {
      router.push("/account");
    }
  }, [session, status, router]);
  return (
    <div>
      {!session && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
          <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg dark:bg-gray-800">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
              オムそばどん予約システム
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400">
              登録してください
            </p>
            <div className="mt-4 text-center">
              <GetProviders providers="github">
                <IoLogoGithub className="mr-2" />
                Githubでログイン
              </GetProviders>
              <GetProviders providers="google">
                <FcGoogle className="mr-2" />
                Googleでログイン
              </GetProviders>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label
                  className="text-gray-900 dark:text-gray-100"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input className="w-full" id="email" required type="email" />
              </div>
              <div className="space-y-2">
                <Label
                  className="text-gray-900 dark:text-gray-100"
                  htmlFor="password"
                >
                  Password
                </Label>
                <Input
                  className="w-full"
                  id="password"
                  required
                  type="password"
                />
              </div>
              <Button
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={() => signIn("credentials")}
              >
                Log In
              </Button>
            </form>
            <div className="mt-4 text-center">
              <a href="/register" className="text-gray-600 dark:text-gray-400">
                既にアカウントをお持ちの方は
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
