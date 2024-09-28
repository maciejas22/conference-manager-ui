import { FragmentOf, readFragment } from 'gql.tada';

import { MetricCardGroup } from '@/components';

import { getConferencesMetricsFragment } from './get-conferences-metrics';

type ConferencesMetricsProps = {
  data: FragmentOf<typeof getConferencesMetricsFragment>;
};

async function ConferencesMetrics({ data }: ConferencesMetricsProps) {
  const metrics = readFragment(getConferencesMetricsFragment, data);

  return (
    <MetricCardGroup
      metrics={[
        {
          metric: 'Running',
          value: metrics.runningConferences.toString(),
        },
        {
          metric: 'Starting in less than 24h',
          value: metrics.startingInLessThan24Hours.toString(),
        },
        {
          metric: 'Total conducted',
          value: metrics.totalConducted.toString(),
        },
        {
          metric: 'Total participants today',
          value: metrics.participantsToday.toString(),
        },
      ]}
    />
  );
}

export { ConferencesMetrics, getConferencesMetricsFragment };
