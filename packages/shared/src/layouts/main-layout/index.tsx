import React from 'react';

import { AuthBoundary } from './auth-boundary';
import { Navigation } from './navigation';

type LayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: LayoutProps) {
  return (
    <AuthBoundary fallback={<>{children}</>}>
      <Navigation />
      <main className="ml-72 my-16 p-4 sm:p-6 lg:p-8 space-y-4">
        {children}
      </main>
    </AuthBoundary>
  );
}
