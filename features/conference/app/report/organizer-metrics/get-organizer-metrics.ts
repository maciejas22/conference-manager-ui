import { graphql } from '@/libs/graphql';

export const organizerMetricsFragment = graphql(`
  fragment OrganizerMetrics on OrganizerMetrics {
    participantsCount
    averageParticipantsCount
    runningConferences
    totalOrganizedConferences
  }
`);
