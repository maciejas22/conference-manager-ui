import {
  ParticipantsChart,
  participantsJoiningTrendFragment,
} from '@/features/conference/app/report/participants-joining-chart';
import { graphql } from '@/libs/graphql';
import { serverFetcher } from '@/utils/server-fetcher';

const getParticipantsJoiningTrendQuery = graphql(
  `
    query GetParticipantsJoiningTrend {
      user {
        metrics {
          ...ParticipantsJoiningTrend
        }
      }
    }
  `,
  [participantsJoiningTrendFragment],
);

export default async function Chart() {
  const chartData = await serverFetcher({
    document: getParticipantsJoiningTrendQuery,
  });
  const metrics = chartData.user?.metrics;

  if (!metrics) {
    return null;
  }

  return <ParticipantsChart data={metrics} />;
}
