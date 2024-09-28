import { graphql } from '@/libs/graphql';

export const participantsJoiningTrendFragment = graphql(`
  fragment ParticipantsJoiningTrend on OrganizerMetrics {
    newParticipantsTrend {
      date
      newParticipants
    }
  }
`);
