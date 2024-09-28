'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { publicRoutes } from '@/config/public-routes';

type AuthBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function AuthBoundary({ children, fallback }: AuthBoundaryProps) {
  const pathname = usePathname();
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
