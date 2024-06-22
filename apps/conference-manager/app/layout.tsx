import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";

import "./globals.css";

import { ReactNode } from "react";

import { Providers } from "@/providers";
import { inter } from "@/public/fonts";

export const metadata: Metadata = {
  title: "Conference Manager",
  description: "App to manage conferences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} bg-background text-foreground dark`}
    >
      <body className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Providers>
          <main className="min-h-screen flex flex-col">
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
