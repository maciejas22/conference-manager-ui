import { MetricCardGroup } from '@repo/shared/components';

import { getConferencesMetrics } from '#actions/get-conferences-metrics';

import { ConferencesTable } from './table';

export async function ConferenceListPage() {
  const metrics = await getConferencesMetrics();

  if (!metrics.conferencesMetrics) {
    return null;
  }

  return (
    <div className="cm-mt-6 cm-space-y-4">
      <MetricCardGroup
        metrics={[
          {
            metric: 'Running',
            value: metrics.conferencesMetrics.runningConferences.toString(),
          },
          {
            metric: 'Starting in less than 24h',
            value:
              metrics.conferencesMetrics.startingInLessThan24Hours.toString(),
          },
          {
            metric: 'Total conducted',
            value: metrics.conferencesMetrics.totalConducted.toString(),
          },
          {
            metric: 'Total participants today',
            value: metrics.conferencesMetrics.participantsToday.toString(),
          },
        ]}
      />

      <ConferencesTable />
    </div>
  );
}
