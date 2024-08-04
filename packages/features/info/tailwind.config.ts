import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/config/tailwind';
import { nextui } from '@repo/shared/nextui';

const config: Config = {
  prefix: 'info-',
  content: ['./src/**/*.tsx', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
  plugins: [nextui()],
};
export default config;
