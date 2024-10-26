import { cookies } from 'next/headers';

import { type RequestOptions, type Variables } from 'graphql-request';

import { cookiesNames } from '@/config/cookies';
import { publicEnv } from '@/config/env';
import { getGqlClient } from '@/libs/gql-client';

export const serverFetcher = async <T, V extends Variables = Variables>(
  options: RequestOptions<V, T>,
) => {
  const sessionId = cookies().get(cookiesNames.sessionId);
  const headers = new Headers();
  if (sessionId) {
    headers.set('Authorization', `Bearer ${sessionId?.value}`);
  }

  return await getGqlClient(publicEnv.apiBaseUrl, headers).request<T, V>(
    options,
  );
};
