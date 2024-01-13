"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const Detalis = () => {
    console.log(session);
  };
  const router = useRouter();
  React.useEffect(() => {
    if (!session) {
      signIn();
    }
  }, [session]);

  return (
    <div className="h-screen">
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <h1>ようこそ, {session.user && session.user.email}</h1>
            <p>あなたの名前は{session.user && session.user.name}です</p>
            {session.user && session.user.image && (
              <img src={session.user.image} />
            )}

            <div>
              <button onClick={Detalis}>詳細情報を見る</button>
            </div>
            <button onClick={() => signOut()}>ログアウト</button>
          </div>
        )
      }
    </div>
  );
}
