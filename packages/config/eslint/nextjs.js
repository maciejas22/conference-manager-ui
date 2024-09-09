module.exports = {
  extends: [
    ...[
      "./base.js",
      "@vercel/style-guide/eslint/react",
      "@vercel/style-guide/eslint/next",
    ].map(require.resolve),
  ],
  globals: {
    React: true,
    JSX: true,
  },
  plugins: ["only-warn"],
  rules: {
    "import/no-default-export": "off",
  },
};
