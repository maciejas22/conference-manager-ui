import Logo from '#assets/logo.svg';

import { SidebarLink } from './link';
import { bottomLinks, topLinks } from './navigation-config';

export function Sidebar() {
  return (
    <nav className="z-40 fixed top-0 left-0 flex flex-col h-full w-sidebar border-r border-zinc-900 px-6">
      <div className="w-full h-16 flex items-center justify-center">
        <Logo />
      </div>

      <div className="flex-grow py-24 flex flex-col justify-between">
        <div>
          {topLinks.map(({ href, label, icon }) => (
            <SidebarLink key={href} href={href} label={label} icon={icon} />
          ))}
        </div>
        <div>
          {bottomLinks.map(({ href, label, icon }) => (
            <SidebarLink key={href} href={href} label={label} icon={icon} />
          ))}
        </div>
      </div>
    </nav>
  );
}
