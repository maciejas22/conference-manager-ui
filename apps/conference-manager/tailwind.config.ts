import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/config/tailwind';

const config: Config = {
  presets: [sharedConfig],
  prefix: 'main-',
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  darkMode: 'class',
};
export default config;
