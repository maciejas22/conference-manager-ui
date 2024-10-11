import { type ReactNode } from 'react';

import { SubHeader as SharedSubHeader } from '@/components/sub-header';

type SubHeaderProps = {
  children: ReactNode;
};

export function SubHeader({ children }: SubHeaderProps) {
  return <SharedSubHeader>{children}</SharedSubHeader>;
}
