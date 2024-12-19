import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luna Data Time",
  description: "Luna's First Webapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
