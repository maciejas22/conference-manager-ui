import { type User } from '../../get-user';

type NavLink = {
  href: string;
  localHref?: string;
  label: string;
  icon: string;
  role?: NonNullable<User>['role'];
};

export const topLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: 'solar:home-2-outline' },
  {
    href: '/conference/list',
    localHref: '/list',
    label: 'Conferences',
    icon: 'solar:videocamera-outline',
  },
  {
    href: '/conference/create',
    localHref: '/create',
    label: 'Create conference',
    role: 'Organizer',
    icon: 'solar:add-square-outline',
  },
  {
    href: '/conference/report',
    localHref: '/report',
    label: 'Reporting',
    icon: 'solar:chart-outline',
    role: 'Organizer',
  },
];

export const bottomLinks: NavLink[] = [
  { href: '/news', label: 'News', icon: 'solar:globus-outline' },
  {
    href: '/terms',
    label: 'Terms of Service',
    icon: 'solar:document-text-outline',
  },
];
