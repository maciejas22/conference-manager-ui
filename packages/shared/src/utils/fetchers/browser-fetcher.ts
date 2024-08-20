import { type RequestOptions, type Variables } from 'graphql-request';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { env } from '@repo/config/env/client';

import { getGqlClient } from '#libs/graphql-client/index.ts';

const fetcher = async <T, V extends Variables = Variables>(
  options: RequestOptions<V, T>,
) => {
  const apiUrl = new URL(
    env.NEXT_PUBLIC_UI_GQL_PROXY_URL,
    window.location.origin,
  );

  return getGqlClient(apiUrl.toString()).request<T, V>(options);
};

export const useQuery = <T, V extends Variables = Variables>(
  options: RequestOptions<V, T>,
) => useSWR<T>(options, () => fetcher(options));

export const useMutation = <T, V extends Variables = Variables>(
  options: RequestOptions<V, T>,
) => useSWRMutation<T>(options, () => fetcher(options));
