import { type ReactNode } from 'react';

import { Toaster } from 'sonner';

import { NextUIProvider } from '@/providers/next-ui';

function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      {children}
      <Toaster theme="dark" position="bottom-left" />
    </NextUIProvider>
  );
}

export { Providers };
