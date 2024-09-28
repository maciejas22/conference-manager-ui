import { type ReactNode } from 'react';

import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conferences List | Conference Manager',
};

type LayoutProps = {
  metrics: ReactNode;
  conferencesList: ReactNode;
};

export default function Layout({ metrics, conferencesList }: LayoutProps) {
  return (
    <div className="space-y-4">
      {metrics}
      {conferencesList}
    </div>
  );
}
