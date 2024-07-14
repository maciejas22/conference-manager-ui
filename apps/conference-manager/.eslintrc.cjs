const sharedConfig = require('@repo/config/eslint/nextjs.js');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ...sharedConfig,
  rules: {
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/order': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } },
    ],
  },
};
