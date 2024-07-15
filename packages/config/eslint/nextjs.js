const sharedConfig = require("./base.js");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...sharedConfig,
  extends: [
    ...[
      "@vercel/style-guide/eslint/browser",
      "@vercel/style-guide/eslint/node",
      "@vercel/style-guide/eslint/typescript",
      "@vercel/style-guide/eslint/react",
      "@vercel/style-guide/eslint/next",
    ].map(require.resolve),
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-implicit-coercion": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "import/order": "off",
    "no-console": "off",
  },
};
