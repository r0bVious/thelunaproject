"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-between absolute w-full">
      <Link href="./">Home</Link>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default NavBar;
