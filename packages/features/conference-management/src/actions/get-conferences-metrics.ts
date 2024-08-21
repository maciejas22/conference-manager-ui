'use server';

import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getConferencesMetricsQuery } from '#graphql/get-conferences-metrics';

export const getConferencesMetrics = () => {
  return serverFetcher({
    document: getConferencesMetricsQuery,
  });
};
