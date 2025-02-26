import React, { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@nextui-org/theme';

type SubtextProps = ComponentPropsWithoutRef<'p'> & {
  children: React.ReactNode;
};

function Subtext({ children, className, ...props }: SubtextProps) {
  return (
    <p className={cn('my-2', 'text-sm', 'text-gray-500', className)} {...props}>
      {children}
    </p>
  );
}

export { Subtext };
