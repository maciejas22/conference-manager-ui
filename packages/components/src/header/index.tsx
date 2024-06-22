import { cn } from '@repo/libs/cn';
import React, { type ComponentPropsWithoutRef } from 'react';

interface HeaderProps extends ComponentPropsWithoutRef<'h2'> {
  children: React.ReactNode;
}

function Header({ children, className, ...props }: HeaderProps) {
  return (
    <h2 {...props} className={cn('my-4', 'text-2xl', className)} {...props}>
      {children}
    </h2>
  );
}

export { Header };
