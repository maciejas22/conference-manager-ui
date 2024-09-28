import type { Metadata } from 'next';

import { getUser } from '@/actions/get-user';
import { MainLayout } from '@/layouts/main-layout';
import { RootLayout } from '@/layouts/root-layout';
import { Providers } from '@/providers';
import { asap } from '@/public/fonts';
import { Trackers } from '@/trackers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Conference Manager',
  description: 'App to manage conferences',
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getUser().catch(() => null);

  return (
    <RootLayout font={asap.className}>
      <Providers>
        <MainLayout user={userData?.user}>{children}</MainLayout>
      </Providers>
      <Trackers />
    </RootLayout>
  );
}
