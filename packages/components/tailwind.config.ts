import sharedConfig from '@repo/config/tailwind';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [sharedConfig],
  prefix: 'comps-',
  content: ['./src/**/*.tsx'],
};
export default config;
