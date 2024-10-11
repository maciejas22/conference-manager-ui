import { type ReactNode } from 'react';

import { Header as SharedHeader } from '@/components/header';

type HeaderProps = {
  children: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return <SharedHeader className="text-5xl">{children}</SharedHeader>;
}
