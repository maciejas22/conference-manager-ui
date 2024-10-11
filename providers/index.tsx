'use client';

import { type ReactNode } from 'react';

import { Toaster } from 'sonner';

import { NextUIProvider } from './next-ui';
import { TanstackQueryProvider } from './tanstack-query';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
      <Toaster theme="dark" position="bottom-left" />
    </NextUIProvider>
  );
}
