"use client";
import { useUserContext } from "@/contexts/UserContext";
import { signIn, signOut, useSession } from "next-auth/react";
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

  if (session) {
    return (
      <div>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}
