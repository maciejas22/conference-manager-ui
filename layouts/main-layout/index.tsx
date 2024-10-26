import React from 'react';

import { headers } from 'next/headers';

import { headersNames } from '@/config/headers';

import { Navbar } from './navigation/navbar';
import { Sidebar } from './navigation/sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: LayoutProps) {
  const isAuthenticated =
    headers().get(headersNames.isUserAuthenticated) === 'true';

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
