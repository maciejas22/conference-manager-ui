const sharedConfig = require('@repo/config/eslint/base.js');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ...sharedConfig,
};
