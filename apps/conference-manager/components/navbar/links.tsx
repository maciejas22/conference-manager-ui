"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@nextui-org/link";
import { NavbarItem } from "@nextui-org/navbar";

import { Role } from "@/graphql/__types__/types";

import { getUserQueryOptions } from "@/services/user/queries";

interface ILink {
  href: string;
  label: string;
  role?: Role;
}

const links: ILink[] = [
  { href: "/conferences/list", label: "Conferences" },
  {
    href: "/conference/create",
    label: "Create conference",
    role: Role.Organizer,
  },
];

function HomeLink() {
  const pathname = usePathname();

  return (
    <NavbarItem isActive={pathname === "/"}>
      <Link href="/" color={pathname === "/" ? "primary" : "foreground"}>
        Conference Manager
      </Link>
    </NavbarItem>
  );
}

function NavigationLinks() {
  const { data } = useQuery(getUserQueryOptions());
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, label, role }) => {
        const shouldShowLink = !role || data?.user?.role === role;

        return (
          shouldShowLink && (
            <NavbarItem key={href} isActive={pathname === href}>
              <Link
                href={href}
                color={pathname === href ? "primary" : "foreground"}
              >
                {label}
              </Link>
            </NavbarItem>
          )
        );
      })}
    </>
  );
}

export { HomeLink, NavigationLinks };
