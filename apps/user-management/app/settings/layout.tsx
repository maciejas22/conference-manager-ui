'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { Tab, Tabs } from '@repo/shared/nextui';

const tabs = [
  {
    id: '/user/settings/personal',
    href: '/user/settings/personal',
    title: 'Account',
  },
  {
    id: '/user/settings/change-password',
    href: '/user/settings/change-password',
    title: 'Password',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Tabs
          selectedKey={`/user${pathname}`}
          color="primary"
          aria-label="User setting options"
          items={tabs}
        >
          {(tab) => <Tab key={tab.id} title={tab.title} href={tab.href} />}
        </Tabs>
      </div>
      <div>{children}</div>
    </div>
  );
}
