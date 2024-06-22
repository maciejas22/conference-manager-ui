import { cn } from '@repo/libs/cn';
import React from 'react';

interface TextProps extends React.ComponentPropsWithoutRef<'p'> {
  children: React.ReactNode;
}

function Text({ children, className, ...props }: TextProps) {
  return (
    <p className={cn('my-2', 'text-lg', className)} {...props}>
      {children}
    </p>
  );
}

export { Text };
