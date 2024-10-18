import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    UI_URL: process.env.UI_URL,
    PUBLISHABLE_KEY: process.env.PUBLISHABLE_KEY,
  },
  redirects: () => [
    {
      source: '/user/settings',
      destination: '/user/settings/personal',
      permanent: true,
    },
    {
      source: '/conference',
      destination: '/conference/list',
      permanent: true,
    },
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
