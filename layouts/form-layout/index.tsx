import type React from 'react';

import { Footer } from '@/components';

type FormLayoutProps = {
  children: React.ReactNode;
  footerChildren?: React.ReactNode;
};

export function FormLayout({ children, footerChildren }: FormLayoutProps) {
  return (
    <div className="mx-auto max-w-full space-y-4 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
      {children}
      <Footer>{footerChildren}</Footer>
    </div>
  );
}
