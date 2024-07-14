'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { NextUIProvider as SystemProvider } from '@repo/libs/nextui';

export interface NextUIProviderProps {
  children: React.ReactNode;
}

export function NextUIProvider({ children }: NextUIProviderProps) {
  const router = useRouter();

  return (
    <SystemProvider locale="en-GB" navigate={router.push}>
      {children}
    </SystemProvider>
  );
}
