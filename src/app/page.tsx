"use client";
import Link from "next/link";
import Login from "../components/Login";
import { useUserContext } from "@/contexts/UserContext";

export default function Home() {
  const { userId } = useUserContext();

  if (userId === null) return <Login />;

  return (
    <section className="flex flex-col justify-center items-center h-full w-full">
      <h1>The __________ Project</h1>
      <div className="flex flex-col gap-2">
        <Link href="./parents">Parents</Link>
        <Link href="./kids">Kids</Link>
      </div>
    </section>
  );
}
