/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [require.resolve('@repo/config/eslint/nextjs.js')],
  rules: {
    'import/no-default-export': 'off',
  },
};
