import { graphql } from '@/libs/graphql';

export const getConferencesMetricsFragment = graphql(`
  fragment ConferenceMetrics on ConferencesMetrics {
    runningConferences
    startingInLessThan24Hours
    totalConducted
    participantsToday
  }
`);
