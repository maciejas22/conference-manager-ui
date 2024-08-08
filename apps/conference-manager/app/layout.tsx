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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.className} bg-background text-foreground dark`}
      data-theme="dark"
    >
      <body className="main-container main-mx-auto main-px-4 main-sm:px-6 main-lg:px-8">
        <Providers>
          <main className="main-min-h-screen main-flex main-flex-col">
            <Navbar />
            <div className="main-mt-10">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
