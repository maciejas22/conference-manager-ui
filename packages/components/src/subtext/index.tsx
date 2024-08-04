import React, { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@repo/shared/nextui';

interface SubtextProps extends ComponentPropsWithoutRef<'p'> {
  children: React.ReactNode;
}

function Subtext({ children, className, ...props }: SubtextProps) {
  return (
    <p
      className={cn(
        'comps-my-2',
        'comps-text-sm',
        'comps-text-gray-500',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export { Subtext };
