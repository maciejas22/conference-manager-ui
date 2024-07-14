'use client';

import { usePathname } from 'next/navigation';

import { Link, NavbarItem } from '@repo/libs/nextui';

import { Role } from '@/types/role';

interface NavigationLinksProps {
  userRole: Role;
}

interface ILink {
  href: string;
  label: string;
  role?: Role;
}

const links: ILink[] = [
  { href: '/conferences/list', label: 'Conferences' },
  {
    href: '/conference/create',
    label: 'Create conference',
    role: 'Organizer',
  },
];

function HomeLink() {
  const pathname = usePathname();

  return (
    <NavbarItem isActive={pathname === '/'}>
      <Link href="/" color={pathname === '/' ? 'primary' : 'foreground'}>
        Conference Manager
      </Link>
    </NavbarItem>
  );
}

function NavigationLinks({ userRole }: NavigationLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, label, role }) => {
        const shouldShowLink = !role || userRole === role;

        return (
          shouldShowLink && (
            <NavbarItem key={href} isActive={pathname === href}>
              <Link
                href={href}
                color={pathname === href ? 'primary' : 'foreground'}
              >
                {label}
              </Link>
            </NavbarItem>
          )
        );
      })}
    </>
  );
}

export { HomeLink, NavigationLinks };
