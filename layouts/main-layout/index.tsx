import React from 'react';

import { type User } from '@/actions/get-user';

import { AuthBoundary } from './auth-boundary';
import { Navigation } from './navigation';

type LayoutProps = {
  user?: User | null;
  children: React.ReactNode;
};

export function MainLayout({ user, children }: LayoutProps) {
  return (
    <AuthBoundary fallback={<>{children}</>}>
      <Navigation user={user} />
      <main className="my-16 ml-72 space-y-4 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </AuthBoundary>
  );
}
