import { Navbar, NavbarContent, NavbarItem } from '#libs/nextui/index.ts';

import { type User } from '../../get-user';
import { Avatar } from './avatar';

const getUserIdentifier = (user: NonNullable<User>) => {
  if (user.name && user.surname) {
    return `${user.name} ${user.surname}`;
  } else if (user.username) {
    return user.username;
  }

  return user.email;
};

type NavProps = {
  user: NonNullable<User>;
};

function Nav({ user }: NavProps) {
  return (
    <Navbar
      isBordered
      isBlurred={false}
      maxWidth="full"
      position="sticky"
      className="left-auto right-0 w-navbar fixed"
    >
      <NavbarContent justify="end">
        <NavbarItem>
          <Avatar username={getUserIdentifier(user)} role={user.role} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export { Nav as Navbar };
