'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@repo/libs/nextui';
import { logout } from '@repo/user-management';

import { navigate } from '@/actions/utils';

interface UserAvatarProps {
  username?: string;
}

const usernameFallback = 'User';

interface Item {
  key: string;
  label: string;
  color?:
    | 'default'
    | 'danger'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning';
  className?: string;
  action?: () => Promise<void> | void;
}

const items: Item[] = [
  {
    key: 'settings',
    label: 'Settings',
    color: 'default',
    action: async () => {
      await navigate('/user/settings/personal');
    },
  },
  {
    key: 'news',
    label: 'News',
    color: 'default',
    action: async () => {
      await navigate('/info/news');
    },
  },
  {
    key: 'terms',
    label: 'Terms of Service',
    color: 'default',
    action: async () => {
      await navigate('/info/terms');
    },
  },
  {
    key: 'logout',
    label: 'Logout',
    color: 'danger',
    className: 'text-danger',
    action: async () => {
      await logout();
    },
  },
];

function UserAvatar({ username }: UserAvatarProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="focus:outline-none" type="button">
          <User
            name={username ?? usernameFallback}
            avatarProps={{
              size: 'sm',
              color: 'primary',
              isBordered: true,
            }}
            className="cursor-pointer flex-row-reverse"
          />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        items={items}
        aria-label="Dropdown with user specific options"
      >
        {(item) => (
          <DropdownItem
            key={item.label}
            color={item.color}
            onClick={async () => {
              await item.action?.();
            }}
            className={item.className}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

export { UserAvatar as Avatar };
