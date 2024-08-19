import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/config/tailwind';
import { nextui } from '@repo/shared/nextui';

export default {
  presets: [sharedConfig],
  prefix: 'um-',
  content: ['./src/**/*.tsx'],
  plugins: [nextui()],
} satisfies Config;
