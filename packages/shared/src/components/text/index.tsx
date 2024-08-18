import React from 'react';

import { cn } from '#libs/nextui/index.ts';

type TextProps = React.ComponentPropsWithoutRef<'p'> & {
  children: React.ReactNode;
};

function Text({ children, className, ...props }: TextProps) {
  return (
    <p className={cn('my-2', 'text-lg', className)} {...props}>
      {children}
    </p>
  );
}

export { Text };
