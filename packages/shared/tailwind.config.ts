import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/config/tailwind';

const config: Config = {
  presets: [sharedConfig],
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'dark',
    'bg-background', 
    'text-foreground'
  ],
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
