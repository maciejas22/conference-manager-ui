'use server';

import { serverFetcher } from '@repo/shared/server-fetcher';

import { getConferencesMetricsQuery } from '#graphql/get-conferences-metrics';

export const getConferencesMetrics = () => {
  return serverFetcher({
    document: getConferencesMetricsQuery,
  });
};
