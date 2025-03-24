"use client";
import { useUserContext } from "@/contexts/UserContext";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Login() {
  const { setUserId } = useUserContext();
  const { data: session } = useSession();
  const userId = session?.user?.userId ?? null;

  useEffect(() => {
    if (userId != null) {
      setUserId(userId);
    }
  }, [userId, setUserId]);

  return (
    <section className="flex flex-col justify-center items-center h-full w-full">
      <h1>The __________ Project</h1>
      <div className="flex flex-col gap-2">
        {userId != null ? (
          <>
            <Link href="./parents">Parents</Link>
            <Link href="./kids">Kids</Link>
          </>
        ) : (
          <button onClick={() => signIn()}>Sign In with Google</button>
        )}
      </div>
    </section>
  );
}
