const sharedConfig = require("@repo/config/prettier/prettier.config");

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
module.exports = {
  ...sharedConfig,
};
