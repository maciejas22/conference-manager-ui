import { type ReactNode } from 'react';

import type { Metadata } from 'next';

import { MainLayout } from '@repo/shared/layouts/main-layout/index';
import { RootLayout } from '@repo/shared/layouts/root-layout/index';

import { Providers } from '@/providers';
import { asap } from '@/public/fonts';
import { Trackers } from '@/trackers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Conference Manager',
  description: 'App to manage conferences',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootLayout font={asap.className}>
      <Providers>
        <MainLayout>{children}</MainLayout>
      </Providers>
      <Trackers />
    </RootLayout>
  );
}
