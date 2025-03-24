"use client";
import { useUserContext } from "@/contexts/UserContext";
import { signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { userId } = useUserContext();
  if (userId === null) return;

  return (
    <div className="flex justify-between absolute w-full">
      <Link href="./">Home</Link>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default NavBar;
