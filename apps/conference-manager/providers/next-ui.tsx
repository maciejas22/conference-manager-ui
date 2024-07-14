"use client";

import { NextUIProvider as SystemProvider } from '@repo/libs/nextui';
import { useRouter } from "next/navigation";
import React from "react";

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