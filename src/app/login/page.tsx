"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import GetProviders from "@/components/component/GetProvider";
import { IoLogoGithub } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function authenticate(
    prevState: string | undefined,
    formData: FormData
  ) {
    const { mail, password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", {
        mail,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      return "success"
    } catch (err) {
      return "Wrong Credentials!" + err + " " + mail + " " + password;
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/account");
    }
  }, [session, status, router]);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("mail", email);
    formData.append("password", password);
    const result = await authenticate(undefined, formData);
    console.log(result);
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  className="text-gray-900 dark:text-gray-100"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  className="w-full"
                  id="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                type="submit"
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
