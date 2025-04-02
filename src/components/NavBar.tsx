"use client";
import { useUserContext } from "@/contexts/UserContext";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const { userId } = useUserContext();
  if (userId === null) return;

  return (
    <div className="flex justify-between w-full md:h-12 h-10 items-center pt-3 px-2">
      <Link
        href="./"
        className="h-full flex flex-col items-center justify-center"
      >
        <Image
          src="/media/home.png"
          height={256}
          width={256}
          alt="Home"
          className="h-full w-auto object-contain"
        />
        <p className="font-mono text-xs">home</p>
      </Link>
      <button
        onClick={() => signOut()}
        className="h-full flex flex-col items-center justify-center"
      >
        <Image
          src="/media/signout.png"
          height={256}
          width={256}
          alt="Signout"
          className="h-full w-auto object-contain"
        />
        <p className="font-mono text-xs">sign-out</p>
      </button>
    </div>
  );
};

export default NavBar;
