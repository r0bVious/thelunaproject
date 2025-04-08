"use client";
import { useUserContext } from "@/contexts/UserContext";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import NameScroller from "./NameScroller";
import Image from "next/image";

export default function Login() {
  const [childName, setChildName] = useState<string>("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [tempName, setTempName] = useState("");
  const { setUserId } = useUserContext();
  const { data: session, update } = useSession();

  const userId = session?.user?.userId;
  let isNewUser = session?.user?.isNew;

  useEffect(() => {
    if (userId != null && session?.user?.name) {
      setUserId(userId);
      setChildName(session.user.childname || "");
    }
  }, [userId, session]);

  useEffect(() => {
    if (isNewUser && !childName) {
      setShowPrompt(true);
    }
  }, [isNewUser]);

  const handleSubmitChildName = async () => {
    if (!tempName || !userId) return;

    try {
      const res = await fetch("/api/parents/setChildName", {
        method: "POST",
        body: JSON.stringify({ userId, childName: tempName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const newSession = await update({
          ...session,
          user: {
            ...session?.user,
            isNew: false,
            childname: tempName,
          },
        });

        // Log the new session data
        console.log("Updated session:", newSession?.user);

        // Update local state
        setChildName(tempName);
        setShowPrompt(false);
      }
    } catch (err) {
      console.error("Failed to set child name:", err);
    }
  };

  return (
    <>
      <NavBar />
      <section className="relative flex flex-col justify-evenly items-center h-full w-full">
        <div className="relative w-full">
          <NameScroller childName={childName} />
        </div>

        <div className="flex flex-col gap-2 w-full justify-center items-center">
          {userId != null ? (
            <div className="w-full md:h-24 h-42 text-white text-2xl mt-2 flex md:flex-row flex-col gap-10 justify-evenly px-10">
              <Link
                href="/parents"
                className="rounded-2xl bg-red-500 shadow-[4px_4px_0px_rgba(0,0,0,5)] flex-1 flex justify-center items-center"
              >
                Parents
              </Link>
              <Link
                href="/kids"
                className="rounded-2xl bg-blue-400 shadow-[4px_4px_0px_rgba(0,0,0,5)] flex-1 flex justify-center items-center"
              >
                Kids
              </Link>
            </div>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="md:w-1/2 md:h-24 text-white md:text-2xl mt-2 flex justify-center items-center gap-4 md:p-10 p-4 bg-[#4285F4] shadow-[4px_4px_0px_rgba(0,0,0,5)] rounded-2xl hover:bg-[#3367D6] transition-colors"
            >
              <div className="bg-white rounded-full p-2">
                <Image
                  src="/media/google.webp"
                  alt="Google logo"
                  width={96}
                  height={96}
                  className="w-8 h-8"
                />
              </div>
              <span className="text-white font-semibold">
                Sign in with Google
              </span>
            </button>
          )}
        </div>

        <a
          className="absolute bottom-0 right-0 text-sm"
          href="https://www.vecteezy.com/free-vector/cartoon-eyes"
        >
          Cartoon Eyes Vectors by Vecteezy
        </a>
      </section>
      {showPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl w-11/12 max-w-md text-center space-y-4">
            <h2 className="text-lg font-bold">Welcome!</h2>
            <p>Please enter your child’s name to get started:</p>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Child's Name"
            />
            <button
              onClick={handleSubmitChildName}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
