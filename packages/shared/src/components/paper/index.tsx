import { type ReactNode } from 'react';

type PaperProps = {
  children: ReactNode;
};

export function Paper({ children }: PaperProps) {
  return (
    <div className="rounded-large h-auto overflow-hidden relative flex flex-col text-foreground box-border bg-content1 outline-none p-2">
      {children}
    </div>
  );
}
