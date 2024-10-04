import { MetricCardGroup } from '@/components/metric-card-group';
import { FragmentOf, readFragment } from '@/libs/graphql';

import { organizerMetricsFragment } from './get-organizer-metrics';

type OrganizerMetricsProps = {
  data: FragmentOf<typeof organizerMetricsFragment>;
};

async function OrganizerMetrics({ data }: OrganizerMetricsProps) {
  const metrics = readFragment(organizerMetricsFragment, data);

  return (
    <MetricCardGroup
      metrics={[
        {
          metric: 'Total Participants',
          value: metrics.participantsCount.toString(),
        },
        {
          metric: 'Running Conferences',
          value: metrics.runningConferences.toString(),
        },
        {
          metric: 'Avg. Participants/Conference',
          value: metrics.averageParticipantsCount.toFixed(2).toString(),
        },
        {
          metric: 'Total Conferences',
          value: metrics.totalOrganizedConferences.toString(),
        },
      ]}
    />
  );
}

export { OrganizerMetrics, organizerMetricsFragment };
