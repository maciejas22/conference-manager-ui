import { type NextConfig } from 'next';

import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  redirects: async () => [
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
    reactCompiler: true,
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
