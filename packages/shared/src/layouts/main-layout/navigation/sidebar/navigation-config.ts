import { type User } from '../../get-user';

type NavLink = {
  href: string;
  label: string;
  icon: string;
  role?: NonNullable<User>['role'];
};

export const topLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: 'solar:home-2-outline' },
  {
    href: '/conferences/list',
    label: 'Conferences',
    icon: 'solar:videocamera-outline',
  },
  {
    href: '/conference/create',
    label: 'Create conference',
    role: 'Organizer',
    icon: 'solar:add-square-outline',
  },
  {
    href: '/report',
    label: 'Reporting',
    icon: 'solar:chart-outline',
  },
];

export const bottomLinks: NavLink[] = [
  { href: '/info/news', label: 'News', icon: 'solar:globus-outline' },
  {
    href: '/info/terms',
    label: 'Terms of Service',
    icon: 'solar:document-text-outline',
  },
];
