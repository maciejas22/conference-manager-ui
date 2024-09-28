'use server';

import { type RequestOptions, type Variables } from 'graphql-request';

import { getGqlClient } from '@/libs/gql-client';

export const serverFetcher = async <T, V extends Variables = Variables>(
  options: RequestOptions<V, T>,
) => {
  return await getGqlClient(
    process.env.API_URL ?? 'http://localhost:3000',
  ).request<T, V>(options);
};
