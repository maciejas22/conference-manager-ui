import { getLocalTimeZone, now } from '@internationalized/date';

import { FragmentOf, readFragment } from '@/libs/graphql';

import { Chart } from './chart';
import { participantsJoiningTrendFragment } from './participants-joining-trend-fragment';

type ParticipantsChartProps = {
  data: FragmentOf<typeof participantsJoiningTrendFragment>;
};

async function ParticipantsChart({ data }: ParticipantsChartProps) {
  const trend = readFragment(participantsJoiningTrendFragment, data);

  const chartData = (trend?.newParticipantsTrend ?? []).map((item) => ({
    label: item.date,
    value: item.newParticipants,
  }));

  return (
    <Chart
      chartData={
        chartData.length > 0
          ? chartData
          : [{ label: now(getLocalTimeZone()).toAbsoluteString(), value: 0 }]
      }
    />
  );
}

export { ParticipantsChart, participantsJoiningTrendFragment };
