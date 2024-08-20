import { headers } from 'next/headers';

import { type RequestOptions, type Variables } from 'graphql-request';

import { env } from '@repo/config/env/client';

import { getGqlClient } from '#libs/graphql-client/index.ts';

export const serverFetcher = async <T, V extends Variables = Variables>(
  options: RequestOptions<V, T>,
) => {
  const headerlist = headers();
  const protocol = headerlist.get('x-forwarded-proto') ?? 'http';
  const host = headerlist.get('x-forwarded-host') ?? 'localhost:3000';
  const apiUrl = new URL(
    env.NEXT_PUBLIC_UI_GQL_PROXY_URL,
    `${protocol}://${host}`,
  );

  return getGqlClient(apiUrl.toString()).request<T, V>(options);
};
