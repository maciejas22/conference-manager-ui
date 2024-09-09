import { graphql } from '@repo/shared/graphql';

export const getConferencesMetricsQuery = graphql(`
  query GetConferencesMetrics {
    conferencesMetrics {
      runningConferences
      startingInLessThan24Hours
      totalConducted
      participantsToday
    }
  }
`);
