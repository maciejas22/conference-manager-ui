import { graphql } from '@repo/shared/graphql';
import { getGqlClient } from '@repo/shared/graphql-client';

export const isParticipantQuery = graphql(`
  query isParticipant($conferenceID: ID!) {
    isParticipant(conferenceId: $conferenceID)
  }
`);

export const isParticipant = (id: string) => {
  const gqlClient = getGqlClient();
  return gqlClient.request(isParticipantQuery, { conferenceID: id });
};
