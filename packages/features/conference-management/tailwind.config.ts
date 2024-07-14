import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/config/tailwind';
import { nextui } from '@repo/libs/nextui';

export default {
  prefix: 'cm-',
  content: ['./src/**/*.tsx'],
  presets: [sharedConfig],
  plugins: [nextui()],
} satisfies Config;
