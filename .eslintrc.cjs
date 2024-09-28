const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    'turbo',
    ...[
      '@vercel/style-guide/eslint/browser',
      '@vercel/style-guide/eslint/node',
      '@vercel/style-guide/eslint/typescript',
      '@vercel/style-guide/eslint/react',
      '@vercel/style-guide/eslint/next',
    ].map(require.resolve),
  ],
  globals: {
    React: true,
    JSX: true,
  },
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/order': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    'import/no-default-export': 'off',
  },
  parserOptions: {
    project,
  },
  plugins: ['only-warn'],
  ignorePatterns: [
    '.*.js',
    'node_modules/',
    'dist/',
    'tailwind.config.ts',
    '*.d.ts',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
};
