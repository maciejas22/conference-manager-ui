import { type User } from '@/actions/get-user';

type NavLink = {
  href: string;
  localHref?: string;
  label: string;
  icon: string;
  role?: NonNullable<User>['role'];
  isExternal?: boolean;
};

export const topLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: 'solar:home-2-outline' },
  {
    href: '/conference/list',
    label: 'Conferences',
    icon: 'solar:videocamera-outline',
  },
  {
    href: '/conference/tickets',
    label: 'Tickets',
    icon: 'solar:ticket-sale-outline',
    role: 'Participant',
  },
  {
    href: '/conference/create',
    label: 'Create conference',
    role: 'Organizer',
    icon: 'solar:add-square-outline',
  },
  {
    href: '/conference/report',
    label: 'Reporting',
    icon: 'solar:chart-outline',
    role: 'Organizer',
  },
  {
    href: `https://dashboard.stripe.com/`,
    label: 'Stripe Dashboard',
    icon: 'solar:dollar-outline',
    role: 'Organizer',
    isExternal: true,
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
