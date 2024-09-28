import { type ReactNode } from 'react';

import { cn } from '@nextui-org/theme';

type RootLayoutProps = {
  font: string;
  children: ReactNode;
};

export function RootLayout({ font, children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(font, 'bg-background text-foreground dark')}
      data-theme="dark"
    >
      <body>{children}</body>
    </html>
  );
}
