import { type ReactNode } from 'react';

import { NextUIProvider } from '@/providers/next-ui';

function Providers({ children }: { children: ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export { Providers };
