'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@repo/shared/nextui';

import { logout } from '@/actions/logout';
import { navigate } from '@/actions/utils';

interface UserAvatarProps {
  username?: string;
  role?: string;
}

const usernameFallback = 'Anonymous';
const roleFallback = 'User';

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
  action: () => Promise<void>;
}

const items: Item[] = [
  {
    key: 'settings',
    label: 'Settings',
    color: 'default',
    action: async () => {
      await navigate('/user/settings/account');
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

function UserAvatar({ username, role }: UserAvatarProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="main-focus:outline-none" type="button">
          <User
            name={username ?? usernameFallback}
            description={role ?? roleFallback}
            avatarProps={{
              size: 'sm',
              color: 'primary',
              isBordered: true,
            }}
            className="main-cursor-pointer main-flex-row-reverse main-gap-4"
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
            onClick={() => {
              void item.action();
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
