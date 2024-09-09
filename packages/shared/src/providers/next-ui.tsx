import React from 'react';

import { NextUIProvider as SystemProvider } from '#libs/nextui/index.ts';

type NextUIProviderProps = {
  navigate: (url: string) => void;
  children: React.ReactNode;
};

export function NextUIProvider({ navigate, children }: NextUIProviderProps) {
  return (
    <SystemProvider locale="en-GB" navigate={navigate}>
      {children}
    </SystemProvider>
  );
}
