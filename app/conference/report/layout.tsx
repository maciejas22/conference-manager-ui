import { type ReactNode } from 'react';

import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reporting | Conference Manager',
};

type ReportingPageProps = {
  chart: ReactNode;
  conferencesList: ReactNode;
  metrics: ReactNode;
};

export default function Layout({
  chart,
  conferencesList,
  metrics,
}: ReportingPageProps) {
  return (
    <>
      {metrics}
      {chart}
      {conferencesList}
    </>
  );
}
