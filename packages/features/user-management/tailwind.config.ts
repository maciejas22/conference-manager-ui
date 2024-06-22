import sharedConfig from '@repo/config/tailwind/tailwind.config';
import type { Config } from 'tailwindcss';

const config: Config = {
  ...sharedConfig,
  content: ['./src/**/*.tsx'],
};
export default config;
