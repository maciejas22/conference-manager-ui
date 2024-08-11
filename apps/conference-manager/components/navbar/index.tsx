import { Navbar, NavbarContent, NavbarItem } from '@repo/shared/nextui';

import { getUser } from '@/services/get-user';

import { Avatar } from './avatar';

async function Nav() {
  const userData = await getUser().catch(() => {
    return null;
  });

  if (!userData?.user) {
    return null;
  }

  const getUserIdentifier = () => {
    if (userData.user?.name && userData.user.surname) {
      return `${userData.user.name} ${userData.user.surname}`;
    } else if (userData.user?.username) {
      return userData.user.username;
    }

    return userData.user?.email;
  };

  return (
    <Navbar
      isBordered
      isBlurred={false}
      maxWidth="full"
      position="sticky"
      className="main-left-auto main-right-0 main-w-navbar main-fixed"
    >
      <NavbarContent justify="end">
        <NavbarItem>
          <Avatar username={getUserIdentifier()} role={userData.user.role} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export { Nav as Navbar };
