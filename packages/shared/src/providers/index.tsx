'use client';

import { type ReactNode } from 'react';

import { Toaster } from 'sonner';

import { NextUIProvider } from './next-ui';

type ProvidersProps = {
  navigate: (url: string) => void;
  children: ReactNode;
};

export function Providers({ navigate, children }: ProvidersProps) {
  return (
    <NextUIProvider navigate={navigate}>
      {children}
      <Toaster theme="dark" position="bottom-left" />
    </NextUIProvider>
  );
}
