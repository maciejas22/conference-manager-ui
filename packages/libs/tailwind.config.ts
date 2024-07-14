import { nextui } from "@nextui-org/theme";
import sharedConfig from "@repo/config/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  ...sharedConfig,
  content: [
    "./node_modules/@nextui-org/theme/dist/components/(accordion|button|card|chip|date-input|divider|dropdown|input|link|navbar|pagination|popover|radio|select|spinner|toggle|table|tabs|user|ripple|menu|listbox|scroll-shadow|checkbox|spacer|avatar).js",
    "../../node_modules/@nextui-org/theme/dist/components/(accordion|button|card|chip|date-input|divider|dropdown|input|link|navbar|pagination|popover|radio|select|spinner|toggle|table|tabs|user|ripple|menu|listbox|scroll-shadow|checkbox|spacer|avatar).js",
  ],
  plugins: [nextui()],
};
export default config;
