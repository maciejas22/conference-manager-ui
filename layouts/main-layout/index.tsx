import React from 'react';

import { type User } from '@/graphql/get-user';

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
      <main className="ml-72 my-16 p-4 sm:p-6 lg:p-8 space-y-4">
        {children}
      </main>
    </AuthBoundary>
  );
}
