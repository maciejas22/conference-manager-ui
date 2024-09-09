const sharedConfig = require('@repo/config/prettier/prettier.config.js');

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
module.exports = {
  ...sharedConfig,
  tailwindConfig: './tailwind.config.ts',
};
