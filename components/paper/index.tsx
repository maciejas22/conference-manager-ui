import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { cn } from '@nextui-org/theme';

type PaperProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
};

export function Paper({ children, className, ...props }: PaperProps) {
  return (
    <div
      {...props}
      className={cn(
        'relative box-border flex h-auto flex-col overflow-hidden rounded-large bg-content1 p-2 text-foreground outline-none',
        className,
      )}
    >
      {children}
    </div>
  );
}
