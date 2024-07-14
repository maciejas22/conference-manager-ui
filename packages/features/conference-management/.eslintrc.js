const sharedConfig = require("@repo/config/eslint/nextjs.js");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ...sharedConfig,
};
