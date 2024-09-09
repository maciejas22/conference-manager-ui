import withBundleAnalyzer from '@next/bundle-analyzer';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: process.env.NEXT_PUBLIC_UI_GQL_PROXY_URL,
        destination: process.env.NEXT_PUBLIC_API_URL,
      },
      {
        source: `${process.env.NEXT_PUBLIC_CONFERENCE_MANAGEMENT_ZONE_BASE_PATH}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_CONFERENCE_MANAGEMENT_ZONE_DOMAIN}/${process.env.NEXT_PUBLIC_CONFERENCE_MANAGEMENT_ZONE_BASE_PATH}/:path*`,
      },
      {
        source: `${process.env.NEXT_PUBLIC_USER_MANAGEMENT_ZONE_BASE_PATH}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_USER_MANAGEMENT_ZONE_DOMAIN}/${process.env.NEXT_PUBLIC_USER_MANAGEMENT_ZONE_BASE_PATH}/:path*`,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ['@repo/config', '@repo/shared'],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
