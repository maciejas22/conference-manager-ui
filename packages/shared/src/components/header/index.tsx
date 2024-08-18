import React, { type ComponentPropsWithoutRef } from 'react';

import { cn } from '#libs/nextui/index.ts';

type HeaderProps = ComponentPropsWithoutRef<'h2'> & {
  children: React.ReactNode;
};

function Header({ children, className, ...props }: HeaderProps) {
  return (
    <h2
      {...props}
      className={cn('my-4', 'text-4xl', 'font-bold', className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export { Header };
