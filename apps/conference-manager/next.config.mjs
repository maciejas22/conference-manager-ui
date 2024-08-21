import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: process.env.NEXT_PUBLIC_UI_GQL_PROXY_URL,
        destination: process.env.NEXT_PUBLIC_API_URL,
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      '@repo/conference-management',
      '@repo/config',
      '@repo/info',
      '@repo/shared',
      '@repo/user-management',
    ],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
