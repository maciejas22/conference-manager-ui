import { Navbar, NavbarContent, NavbarItem } from '@repo/shared/nextui';

import { getUser } from '@/services/get-user';

import { Avatar } from './avatar';
import { HomeLink, NavigationLinks } from './links';

async function Nav() {
  const userData = await getUser().catch(() => {
    return null;
  });

  if (!userData?.user) {
    return null;
  }

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <HomeLink />
      </NavbarContent>

      <NavbarContent justify="center">
        <NavigationLinks userRole={userData.user.role} />
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Avatar username={userData.user.username ?? userData.user.email} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export { Nav as Navbar };
