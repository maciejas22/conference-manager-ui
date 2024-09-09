'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '#libs/nextui/index.ts';
import { logout } from '#libs/supabase/actions.ts';
import { navigate } from '#utils/navigate.ts';

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
  action: () => Promise<void> | void;
};

const items: Item[] = [
  {
    key: 'settings',
    label: 'Settings',
    color: 'default',
<<<<<<< Updated upstream
    action: () => {
      navigate('/user/settings/account');
    },
=======
    redirectUrl: '/user/settings',
>>>>>>> Stashed changes
  },
  {
    key: 'logout',
    label: 'Logout',
    color: 'danger',
    className: 'text-danger',
    action: async () => {
      await logout();
    },
<<<<<<< Updated upstream
=======
    redirectUrl: '/user/login',
>>>>>>> Stashed changes
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
            onClick={() => {
<<<<<<< Updated upstream
              void item.action();
=======
              void item.action?.();
              item.redirectUrl && (window.location.href = item.redirectUrl);
>>>>>>> Stashed changes
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
