import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/config/tailwind';

const config: Config = {
  presets: [sharedConfig],
  prefix: 'comps-',
  content: ['./src/**/*.tsx'],
};
export default config;
