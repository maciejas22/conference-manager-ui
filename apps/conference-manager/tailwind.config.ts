import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/config/tailwind';

const config: Config = {
  presets: [sharedConfig],
  prefix: 'main-',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
};
export default config;
