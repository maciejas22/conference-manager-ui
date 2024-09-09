import { MetricCardGroup } from '@repo/shared/components';
import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getOrganizerMetrics } from '@/graphql/get-organizer-metrics';

export async function OrganizerMetrics() {
  const metricsData = await serverFetcher({
    document: getOrganizerMetrics,
  });

  if (!metricsData.organizerMetrics) {
    return null;
  }

  const metrics = [
    {
      metric: 'Total Participants',
      value: metricsData.organizerMetrics.participantsCount.toString(),
    },
    {
      metric: 'Running Conferences',
      value: metricsData.organizerMetrics.runningConferences.toString(),
    },
    {
      metric: 'Avg. Participants/Conference',
      value: metricsData.organizerMetrics.averageParticipantsCount.toString(),
    },
    {
      metric: 'Total Conferences',
      value: metricsData.organizerMetrics.totalOrganizedConferences.toString(),
    },
  ];

  return <MetricCardGroup metrics={metrics} />;
}
