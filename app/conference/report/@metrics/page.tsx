import {
  OrganizerMetrics,
  organizerMetricsFragment,
} from '@/features/conference/app/report/organizer-metrics';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/fetchers/server-fetcher';

const getOrganizerMetricsQuery = graphql(
  `
    query GetOrganizerMetrics {
      user {
        metrics {
          ...OrganizerMetrics
        }
      }
    }
  `,
  [organizerMetricsFragment],
);

export default async function OrganizerMetricsSection() {
  const metricsData = await serverFetcher({
    document: getOrganizerMetricsQuery,
  });
  const metrics = metricsData.user?.metrics;

  if (!metrics) {
    return null;
  }

  return <OrganizerMetrics data={metrics} />;
}
