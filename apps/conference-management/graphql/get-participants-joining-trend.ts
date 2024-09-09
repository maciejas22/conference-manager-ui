import { graphql } from '@repo/shared/graphql';

export const getParticipantsJoiningTrend = graphql(`
  query GetParticipantsJoiningTrend {
    participantsJoiningTrend {
      trend {
        date
        count
      }
      granularity
    }
  }
`);
