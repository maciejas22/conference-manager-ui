import { serverFetcher } from '@repo/shared/utils/fetchers/server-fetcher';

import { getParticipantsJoiningTrend } from '@/graphql/get-participants-joining-trend';

import { Chart } from './chart';

export async function ParticipantsChart() {
  const trend = await serverFetcher({
    document: getParticipantsJoiningTrend,
  });

  if (!trend.participantsJoiningTrend) {
    return null;
  }

  const chartData = trend.participantsJoiningTrend.trend.map((item) => ({
    label: item.date,
    value: item.count,
  }));

  return (
    <div className="py-6">
      <Chart chartData={chartData} />
    </div>
  );
}
