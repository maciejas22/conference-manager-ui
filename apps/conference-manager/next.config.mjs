import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@repo/components',
    '@repo/libs',
    '@repo/user-management',
    '@repo/info',
    '@repo/conference-management',
  ],
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
