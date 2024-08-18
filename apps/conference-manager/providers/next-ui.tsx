import React from 'react';

import { useRouter } from 'next/navigation';

import { NextUIProvider as SystemProvider } from '@repo/shared/nextui';

type NextUIProviderProps = {
  children: React.ReactNode;
};

export function NextUIProvider({ children }: NextUIProviderProps) {
  const router = useRouter();

  return (
    <SystemProvider
      locale="en-GB"
      navigate={(...args) => {
        router.push(...args);
      }}
    >
      {children}
    </SystemProvider>
  );
}
