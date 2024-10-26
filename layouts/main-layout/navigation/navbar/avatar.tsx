'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { User } from '@nextui-org/user';

import { logoutUser } from '@/actions/logout';

type UserAvatarProps = {
  username?: string;
  role?: string;
};

const usernameFallback = 'Anonymous';
const roleFallback = 'User';

type Item = {
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
  redirectUrl?: string;
};

const items: Item[] = [
  {
    key: 'settings',
    label: 'Settings',
    color: 'default',
    redirectUrl: '/user/settings',
  },
  {
    key: 'logout',
    label: 'Logout',
    color: 'danger',
    className: 'text-danger',
    action: () => void logoutUser(),
    redirectUrl: '/user/login',
  },
];

function UserAvatar({ username, role }: UserAvatarProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="focus:outline-none" type="button">
          <User
            name={username ?? usernameFallback}
            description={role ?? roleFallback}
            avatarProps={{
              size: 'sm',
              color: 'primary',
              isBordered: true,
            }}
            className="cursor-pointer flex-row-reverse gap-4"
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
              item.action && (await item.action());
              item.redirectUrl && (window.location.href = item.redirectUrl);
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
