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
        'rounded-large h-auto overflow-hidden relative flex flex-col text-foreground box-border bg-content1 outline-none p-2',
        className,
      )}
    >
      {children}
    </div>
  );
}
