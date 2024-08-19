import { type ReactNode } from 'react';

import type { Metadata } from 'next';

import { MainLayout } from '@repo/shared/layouts';
import { cn } from '@repo/shared/nextui';

import { Providers } from '@/providers';
import { inter } from '@/public/fonts';
import { Trackers } from '@/trackers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Conference Manager',
  description: 'App to manage conferences',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(inter.className, 'bg-background text-foreground dark')}
      data-theme="dark"
    >
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
        <Trackers />
      </body>
    </html>
  );
}
