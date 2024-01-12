import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          オムそばどん予約システム
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          登録してください
        </p>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-gray-100" htmlFor="name">
              名前
            </Label>
            <Input className="w-full" id="name" required />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-gray-100" htmlFor="email">
              メールアドレス
            </Label>
            <Input className="w-full" id="email" required type="email" />
          </div>
          <div className="space-y-2">
            <Label
              className="text-gray-900 dark:text-gray-100"
              htmlFor="password"
            >
              電話番号
            </Label>
            <Input className="w-full" id="password" required type="password" />
          </div>
          <div className="space-y-2">
            <Label
              className="text-gray-900 dark:text-gray-100"
              htmlFor="password"
            >
              Password
            </Label>
            <Input className="w-full" id="password" required type="password" />
          </div>
          <Button
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
            type="submit"
          >
            Sign Up
          </Button>
          <div className="mt-4 text-center">
            <a href="/login" className="text-gray-600 dark:text-gray-400">
              既にアカウントをお持ちの方は
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
