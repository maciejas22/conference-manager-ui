import {
  ConferencesMetrics,
  getConferencesMetricsFragment,
} from '@/features/conference/app/conferences-metrics';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const getConferencesMetricsQuery = graphql(
  `
    query GetConferencesMetrics {
      conferences {
        metrics {
          ...ConferenceMetrics
        }
      }
    }
  `,
  [getConferencesMetricsFragment],
);

export default async function Metics() {
  const metricsData = await serverFetcher({
    document: getConferencesMetricsQuery,
  });

  return <ConferencesMetrics data={metricsData.conferences.metrics} />;
}
