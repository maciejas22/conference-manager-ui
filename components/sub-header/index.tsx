import React, { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@nextui-org/theme';

type SubHeaderProps = ComponentPropsWithoutRef<'h2'> & {
  children: React.ReactNode;
};

function SubHeader({ children, className, ...props }: SubHeaderProps) {
  return (
    <h2
      {...props}
      className={cn('my-4', 'text-xl', 'text-gray-400', className)}
    >
      {children}
    </h2>
  );
}

export { SubHeader };
