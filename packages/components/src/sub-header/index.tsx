import React, { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@repo/shared/nextui';

interface SubHeaderProps extends ComponentPropsWithoutRef<'h2'> {
  children: React.ReactNode;
}

function SubHeader({ children, className, ...props }: SubHeaderProps) {
  return (
    <h2
      {...props}
      className={cn(
        'comps-my-4',
        'comps-text-xl',
        'comps-text-gray-400',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export { SubHeader };
