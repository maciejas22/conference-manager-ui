import Image from 'next/image';

import { getUser } from '@/actions/get-user';

import { SidebarLink } from './link';
import { bottomLinks, topLinks } from './navigation-config';

export async function Sidebar() {
  const { user } = await getUser();
  const userRole = user?.role;

  return (
    <nav className="fixed left-0 top-0 z-40 flex h-full w-sidebar flex-col border-r border-zinc-900 px-6">
      <div className="relative flex h-16 w-full items-center justify-center">
        <Image src="/logo.svg" alt="logo" fill priority />
      </div>

      <div className="flex flex-grow flex-col justify-between py-24">
        <div>
          {topLinks
            .filter((link) => !link.role || link.role === userRole)
            .map(({ href, label, icon, isExternal }) => (
              <SidebarLink
                key={href}
                href={href}
                label={label}
                icon={icon}
                isExternal={isExternal}
              />
            ))}
        </div>
        <div>
          {bottomLinks
            .filter((link) => !link.role || link.role === userRole)
            .map(({ href, label, icon }) => (
              <SidebarLink key={href} href={href} label={label} icon={icon} />
            ))}
        </div>
      </div>
    </nav>
  );
}
