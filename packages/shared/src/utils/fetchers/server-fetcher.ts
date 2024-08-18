import { type RequestOptions, type Variables } from 'graphql-request';

import { getGqlClient } from '#libs/graphql-client/index.ts';

export const serverFetcher = async <T, V extends Variables = Variables>(
  options: RequestOptions<V, T>,
) => getGqlClient().request<T, V>(options);
