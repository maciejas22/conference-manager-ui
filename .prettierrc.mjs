/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-packagejson',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '^react$',
    '',
    '^next(/.*)?$',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@repo/(.*)$',
    '',
    '^#(.*)$',
    '',
    '^@/(.*)$',
    '',
    '^[.]',
  ],
  tailwindConfig: './tailwind.config.ts',
};

export default config;
