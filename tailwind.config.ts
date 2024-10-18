import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  plugins: [nextui()],
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/components/(accordion|button|card|chip|date-input|date-picker|divider|dropdown|input|link|modal|navbar|pagination|popover|radio|select|skeleton|spinner|toggle|table|tabs|user|ripple|calendar|menu|listbox|scroll-shadow|checkbox|spacer|avatar).js',
  ],
  theme: {
    extend: {
      width: {
        sidebar: '18rem',
        navbar: 'calc(100% - 18rem)',
      },
    },
  },
};
export default config;
