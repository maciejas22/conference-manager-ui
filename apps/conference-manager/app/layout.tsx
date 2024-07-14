import type { Metadata } from 'next';

import { Navbar } from '@/components/navbar';

import './globals.css';

import { type ReactNode } from 'react';

import { Providers } from '@/providers';
import { inter } from '@/public/fonts';

export const metadata: Metadata = {
  title: 'Conference Manager',
  description: 'App to manage conferences',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} main-dark bg-background text-foreground dark`}
    >
      <body className="main-container main-mx-auto main-px-4 main-sm:px-6 main-lg:px-8">
        <Providers>
          <main className="main-min-h-screen main-flex main-flex-col">
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
