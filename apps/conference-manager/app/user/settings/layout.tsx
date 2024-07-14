'use client';

import { usePathname } from 'next/navigation';

import { Tab, Tabs } from '@repo/libs/nextui';

const tabs = [
  {
    id: '/user/settings/personal',
    href: '/user/settings/personal',
    title: 'Personal',
  },
  {
    id: '/user/settings/change-password',
    href: '/user/settings/change-password',
    title: 'Change password',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div className="main-flex main-justify-center main-mt-10">
        <Tabs
          selectedKey={pathname}
          color="primary"
          aria-label="User setting options"
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} title={tab.title} href={tab.href} />
          ))}
        </Tabs>
      </div>
      {children}
    </>
  );
}
