import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";

import { getUserQueryOptions } from "@/services/user/queries";

import { Avatar } from "./avatar";
import { HomeLink, NavigationLinks } from "./links";

async function Nav() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getUserQueryOptions());

  return (
    <Navbar isBordered>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NavbarContent justify="start">
          <HomeLink />
        </NavbarContent>

        <NavbarContent justify="center">
          <NavigationLinks />
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Avatar />
          </NavbarItem>
        </NavbarContent>
      </HydrationBoundary>
    </Navbar>
  );
}

export { Nav as Navbar };
