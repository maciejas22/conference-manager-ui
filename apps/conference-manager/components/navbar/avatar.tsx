"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";

import { getUserQueryOptions } from "@/services/user/queries";

import { logoutUser } from "@/actions/user";
import { navigate } from "@/actions/utils";

const usernameFallback = "User";

interface Item {
  key: string;
  label: string;
  color?:
    | "default"
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  className?: string;
  action?: () => void;
}

const items: Item[] = [
  {
    key: "settings",
    label: "Settings",
    color: "default",
    action: () => navigate("/user/settings/personal"),
  },
  {
    key: "news",
    label: "News",
    color: "default",
    action: () => navigate("/info/news"),
  },
  {
    key: "terms",
    label: "Terms of Service",
    color: "default",
    action: () => navigate("/info/terms"),
  },
  {
    key: "logout",
    label: "Logout",
    color: "danger",
    className: "text-danger",
    action: logoutUser,
  },
];

function UserAvatar() {
  const { data } = useQuery(getUserQueryOptions());

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="focus:outline-none">
          <User
            name={data?.user?.username ?? usernameFallback}
            avatarProps={{
              size: "sm",
              color: "primary",
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
            color={item?.color}
            onClick={async () => item.action?.()}
            className={item?.className}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

export { UserAvatar as Avatar };
