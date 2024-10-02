import { type ReactNode } from 'react';

import { type Metadata } from 'next';

import { Header } from '@/components';

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
      <div className="space-y-8">
        <Header className="text-3xl">Agenda</Header>
        {agenda}
      </div>
      <div className="space-y-8">
        <Header className="text-3xl">Attachments</Header>
        {files}
      </div>
      {actions}
    </>
  );
}
