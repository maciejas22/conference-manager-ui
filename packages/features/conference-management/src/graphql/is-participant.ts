import { graphql } from '@repo/shared/graphql';

export const isParticipantQuery = graphql(`
  query isParticipant($conferenceID: ID!) {
    isParticipant(conferenceId: $conferenceID)
  }
`);
