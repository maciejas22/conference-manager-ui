'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getConferencesMetricsQuery } from '@/graphql/get-conferences-metrics';

export const getConferencesMetrics = async () => {
  return await serverFetcher({
    document: getConferencesMetricsQuery,
  }).catch(() => {
    throw new Error('Failed to fetch conferences metrics');
  });
};
