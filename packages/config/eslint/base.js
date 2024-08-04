const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    'turbo',
    ...[
      '@vercel/style-guide/eslint/browser',
      '@vercel/style-guide/eslint/node',
      '@vercel/style-guide/eslint/typescript',
    ].map(require.resolve),
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/order': 'off',
  },
  ignorePatterns: [
    '.*.js',
    'node_modules/',
    'dist/',
    'tailwind.config.ts',
    '*.d.ts',
  ],
  parserOptions: {
    project,
  },
  plugins: ['only-warn'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
};
