import Image from 'next/image';

import { type User } from '@/actions/get-user';

import { SidebarLink } from './link';
import { bottomLinks, topLinks } from './navigation-config';

type SidebarProps = {
  userRole: NonNullable<User>['role'];
};

export function Sidebar({ userRole }: SidebarProps) {
  return (
    <nav className="z-40 fixed top-0 left-0 flex flex-col h-full w-sidebar border-r border-zinc-900 px-6">
      <div className="w-full h-16 flex items-center justify-center relative">
        <Image src="/logo.svg" alt="logo" fill />
      </div>

      <div className="flex-grow py-24 flex flex-col justify-between">
        <div>
          {topLinks
            .filter((link) => !link.role || link.role === userRole)
            .map(({ href, label, icon }) => (
              <SidebarLink key={href} href={href} label={label} icon={icon} />
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
