/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  plugins: [
    'prettier-plugin-tailwindcss',
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-packagejson',
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
