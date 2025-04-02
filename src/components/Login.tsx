"use client";
import { useUserContext } from "@/contexts/UserContext";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import NavBar from "./NavBar";

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
    <>
      <NavBar />
      <section className="flex flex-col justify-center items-center h-full w-full">
        <h1>The __________ Project</h1>
        <div className="flex flex-col gap-2 w-full">
          {userId != null ? (
            <div className="w-full md:h-24 h-18 text-white text-2xl mt-2 flex gap-5 justify-center">
              <Link
                href="./parents"
                className="rounded-2xl bg-red-500 shadow-[4px_4px_0px_rgba(0,0,0,5)] flex-1 max-w-1/4 flex justify-center items-center"
              >
                Parents
              </Link>
              <Link
                href="./kids"
                className="rounded-2xl bg-blue-400 shadow-[4px_4px_0px_rgba(0,0,0,5)] flex-1 max-w-1/4 flex justify-center items-center"
              >
                Kids
              </Link>
            </div>
          ) : (
            <button onClick={() => signIn()}>Sign In with Google</button>
          )}
        </div>
      </section>
    </>
  );
}
