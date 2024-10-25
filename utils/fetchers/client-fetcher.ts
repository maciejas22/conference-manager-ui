'use server';

import { cookies } from 'next/headers';

import { type RequestOptions, type Variables } from 'graphql-request';

import { publicEnv } from '@/config/env';
import { sessionIdCookie } from '@/config/session';
import { getGqlClient } from '@/libs/gql-client';

export const clientFetcher = async <T, V extends Variables = Variables>(
  options: RequestOptions<V, T>,
) => {
  const sessionId = cookies().get(sessionIdCookie);
  const headers = new Headers();
  if (sessionId) {
    headers.set('Authorization', `Bearer ${sessionId?.value}`);
  }

  return await getGqlClient(publicEnv.apiBaseUrl, headers).request<T, V>(
    options,
  );
};
