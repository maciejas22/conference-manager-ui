import { graphql } from '@repo/shared/graphql';

export const getOrganizerMetrics = graphql(`
  query GetOrganizerMetrics {
    organizerMetrics {
      averageParticipantsCount
      participantsCount
      runningConferences
      totalOrganizedConferences
    }
  }
`);
