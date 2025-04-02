import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import { AuthProvider } from "@/contexts/AuthProvider";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "The ________ Project",
  description: "for the kids!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <AuthProvider>
          <UserProvider>
            {/* <NavBar /> */}
            {children}
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
