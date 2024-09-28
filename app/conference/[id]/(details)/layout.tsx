import { type ReactNode } from 'react';

import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conference Details | Conference Manager',
};

type ConferencePageProps = {
  actions: ReactNode;
  agenda: ReactNode;
  files: ReactNode;
  conference: ReactNode;
};

export default function ConferencePage({
  actions,
  agenda,
  files,
  conference,
}: ConferencePageProps) {
  return (
    <>
      {conference}
      {agenda}
      {files}
      {actions}
    </>
  );
}
