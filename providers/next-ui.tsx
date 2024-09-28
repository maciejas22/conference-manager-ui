import { useRouter } from 'next/navigation';

import { NextUIProvider as SystemProvider } from '@nextui-org/system';

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
