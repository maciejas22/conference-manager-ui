import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/config/tailwind';
import { nextui } from '@repo/shared/nextui';

const config: Config = {
  presets: [sharedConfig],
  prefix: 'comps-',
  content: ['./src/**/*.tsx'],
  plugins: [nextui()],
};
export default config;
