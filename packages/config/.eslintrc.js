/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['./eslint/base.js'],
  rules: {
    'import/no-default-export': 'off',
  },
};
