'use client';

import { type ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { Providers as SharedProviders } from '@repo/shared/providers';

function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <SharedProviders
      navigate={(...args) => {
        router.push(...args);
      }}
    >
      {children}
    </SharedProviders>
  );
}

export { Providers };
