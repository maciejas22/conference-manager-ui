import React from 'react';

import { getUser } from '@/actions/get-user';

import { Navbar } from './navigation/navbar';
import { Sidebar } from './navigation/sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export async function MainLayout({ children }: LayoutProps) {
  const isAuthenticated = await getUser().catch(() => null);

  return isAuthenticated ? (
    <>
      <Navbar />
      <Sidebar />
      <main className="my-16 ml-72 space-y-4 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </>
  ) : (
    <>{children}</>
  );
}
