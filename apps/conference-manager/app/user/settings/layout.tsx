'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { Tab, Tabs } from '@repo/shared/nextui';

const tabs = [
  {
    id: '/user/settings/account',
    href: '/user/settings/account',
    title: 'Account',
  },
  {
    id: '/user/settings/password',
    href: '/user/settings/password',
    title: 'Password',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="main-space-y-6">
      <div className="main-flex main-justify-center">
        <Tabs
          selectedKey={pathname}
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
