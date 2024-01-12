"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkEmail = async (mail: string) => {
    try {
      const response = await axios.get('http://localhost:8080/get_customer');
      const customers = response.data.customer;

      // 顧客データが空の場合はメールアドレスが使用されていないと見なす
      if (customers.length === 0) {
          return true;
      }

      const isEmailUsed = customers.some((customer: { mail: any; }) => customer.mail === mail);
      if (isEmailUsed) {
          setErrorMessage('このメールアドレスは既に使用されています。');
          return false;
      }
      return true;
  } catch (error) {
      console.error('Error:', error);
      // エラー処理
  }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isEmailValid = await checkEmail(formData.mail);
    if (!isEmailValid) return;

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("パスワードが一致しません。");
      return;
    }

    try {
      const hash = hashSync(formData.password, 12);
      formData.password = hash;
      const confirmPasswords = compareSync(formData.confirmPassword, hash);
      if (!confirmPasswords) {
        setErrorMessage("パスワードが一致しません。");
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/post_customer",
        formData
      );
      console.log("Response:", response.data);
      // 必要に応じてさらに処理を行います
    } catch (error) {
      console.error("Error:", error);
      // エラー処理
    }

    console.log("Form Data:", JSON.stringify(formData, null, 2));
    // ここでフォームデータの送信やその他の処理を行います
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          オムそばどん予約システム
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          登録してください
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-gray-100" htmlFor="name">
              名前
            </Label>
            <Input
              className="w-full"
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-900 dark:text-gray-100" htmlFor="email">
              メールアドレス
            </Label>
            <Input
              className="w-full"
              id="mail"
              name="mail"
              onChange={handleChange}
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label
              className="text-gray-900 dark:text-gray-100"
              htmlFor="password"
            >
              電話番号
            </Label>
            <Input
              className="w-full"
              id="phone"
              name="phone"
              type="text"
              onChange={handleChange}
              required
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
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="パスワード"
            />
          </div>
          <div className="space-y-2">
            <Label
              className="text-gray-900 dark:text-gray-100"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </Label>
            <Input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="パスワードの再入力"
            />

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
