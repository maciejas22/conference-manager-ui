import { type RequestOptions, type Variables } from 'graphql-request';
import useSWR from 'swr';

import { serverFetcher } from './server-fetcher';

export const useQuery = <T, V extends Variables = Variables>(
  options: RequestOptions<V, T>,
) => useSWR<T>(options, () => serverFetcher(options));
