import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      width: {
        sidebar: '18rem',
        navbar: 'calc(100% - 18rem)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
};
export default config;
