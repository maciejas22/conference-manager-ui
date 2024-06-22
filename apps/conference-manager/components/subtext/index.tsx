import React, { type ComponentPropsWithoutRef } from "react";
import { cn } from '@repo/libs/cn'

interface SubtextProps extends ComponentPropsWithoutRef<"p"> {
  children: React.ReactNode;
}

function Subtext({ children, className, ...props }: SubtextProps) {
  return (
    <p className={cn("my-2", "text-sm", "text-gray-500", className)} {...props}>
      {children}
    </p>
  );
}

export { Subtext };
