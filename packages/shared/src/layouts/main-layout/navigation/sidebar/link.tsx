'use client';

import { usePathname } from 'next/navigation';

import { Icon } from '@iconify/react';

import { cn } from '#libs/nextui/index.ts';

type SidebarLinkProps = {
  href: string;
  localHref?: string;
  label: string;
  icon: string;
};

export function SidebarLink({
  href,
  localHref,
  label,
  icon,
}: SidebarLinkProps) {
  const pathname = usePathname();

  return (
    <a
      key={href}
      href={href}
      className={cn(
        'px-3',
        'py-3',
        'rounded-2xl',
        'flex',
        'gap-2',
        'hover:bg-zinc-900',
        pathname === (localHref ?? href) ? 'text-gray-200' : 'text-gray-400',
        { 'main-bg-zinc-800': pathname === (localHref ?? href) },
      )}
    >
      <Icon icon={icon} className="text-2xl" />
      {label}
    </a>
  );
}
