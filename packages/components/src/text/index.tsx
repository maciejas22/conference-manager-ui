import { cn } from '@repo/libs/nextui';
import React from 'react';

interface TextProps extends React.ComponentPropsWithoutRef<'p'> {
  children: React.ReactNode;
}

function Text({ children, className, ...props }: TextProps) {
  return (
    <p className={cn('comps-my-2', 'comps-text-lg', className)} {...props}>
      {children}
    </p>
  );
}

export { Text };
