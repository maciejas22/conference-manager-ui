import { headers } from 'next/headers';

import { type RequestOptions, type Variables } from 'graphql-request';

import { getGqlClient } from '#libs/graphql-client/index.ts';

export const serverFetcher = async <T, V extends Variables = Variables>(
  options: RequestOptions<V, T>,
) => {
  const origin = headers().get('x-origin');
  const apiUrl = new URL('/api/graphql', origin ?? '');

  return getGqlClient(apiUrl.toString()).request<T, V>(options);
};
