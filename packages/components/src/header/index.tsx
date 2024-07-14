import React, { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@repo/libs/nextui';

interface HeaderProps extends ComponentPropsWithoutRef<'h2'> {
  children: React.ReactNode;
}

function Header({ children, className, ...props }: HeaderProps) {
  return (
    <h2
      {...props}
      className={cn('comps-my-4', 'comps-text-2xl', className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export { Header };
