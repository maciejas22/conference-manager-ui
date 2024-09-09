'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

type AuthBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function AuthBoundary({ children, fallback }: AuthBoundaryProps) {
  const pathname = usePathname();
  if (pathname.startsWith('/login') || pathname.startsWith('/sign-up')) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
