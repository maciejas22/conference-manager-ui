import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar';

import { getUser, type User } from '@/actions/get-user';

import { Avatar } from './avatar';
import { StripeOnBoardingCta } from './stripe-onboarding-cta';

const getUserIdentifier = (user: User) => {
  if (user?.name && user?.surname) {
    return `${user.name} ${user.surname}`;
  } else if (user?.username) {
    return user.username;
  }

  return user?.email ?? 'Anonymous';
};

async function Nav() {
  const { user } = await getUser();

  return (
    <Navbar
      isBordered
      isBlurred={false}
      maxWidth="full"
      position="sticky"
      classNames={{
        base: 'left-auto right-0 !w-navbar fixed',
      }}
    >
      <NavbarContent justify="end">
        {user?.role === 'Organizer' && (
          <NavbarItem>
            <StripeOnBoardingCta />
          </NavbarItem>
        )}
        <NavbarItem>
          <Avatar username={getUserIdentifier(user)} role={user?.role} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export { Nav as Navbar };
