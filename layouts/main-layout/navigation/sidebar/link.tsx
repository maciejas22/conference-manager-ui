'use client';

import { usePathname } from 'next/navigation';

import { Icon } from '@iconify/react';
import { Link } from '@nextui-org/link';
import { cn } from '@nextui-org/theme';

type SidebarLinkProps = {
  href: string;
  label: string;
  icon: string;
};

export function SidebarLink({ href, label, icon }: SidebarLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        'px-3',
        'py-3',
        'rounded-2xl',
        'flex',
        'gap-2',
        'hover:bg-zinc-900',
        pathname === href ? 'text-gray-200' : 'text-gray-400',
        { 'main-bg-zinc-800': pathname === href },
      )}
    >
      <Icon icon={icon} className="text-2xl" />
      {label}
    </Link>
  );
}
